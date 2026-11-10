import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Stack } from '../../src/components/primitives/Stack';
import { Row } from '../../src/components/primitives/Row';
import { Text } from '../../src/components/primitives/Text';
import { Icon } from '../../src/components/primitives/Icon';
import { Badge } from '../../src/components/primitives/Badge';
import { Divider } from '../../src/components/primitives/Divider';
import { Spinner } from '../../src/components/primitives/Spinner';
import { StyledButton } from '../../src/components/StyledButton';
import { TaskCard } from '../../src/components/TaskCard';
import { RosterItem } from '../../src/components/RosterItem';
import { getTasksForDay, getRoster, markAdministered, rosterSlots } from '../../src/services';
import { useAuthStore } from '../../src/state/useAuthStore';
import type { RosterEntry, Task } from '../../src/types';
import { colors, shadows, spacing } from '../../src/theme';
import { formatHeaderDate, toDateKey } from '../../src/utils/date';
import { useLayoutInsets } from '../../src/hooks/useLayoutInsets';

export default function HomeScreen() {
  const staff = useAuthStore((state) => state.user);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [roster, setRoster] = useState<RosterEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { headerTop, topGap } = useLayoutInsets();
  // Height of the scroll area, so the grey panel is always tall enough to cover the header.
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    Promise.all([getTasksForDay(toDateKey(new Date())), getRoster()])
      .then(([taskList, rosterList]) => {
        setTasks(taskList);
        setRoster(rosterList);
      })
      .catch(() => setError('Could not load your data. Please try again.'))
      .finally(() => setIsLoading(false));
  }, []);

  const handleAdminister = async (id: string) => {
    try {
      await markAdministered(id);
      setRoster((current) =>
        current.map((entry) => (entry.id === id ? { ...entry, status: 'administered' } : entry)),
      );
    } catch {
      setError('Could not save. Please try again.');
    }
  };

  return (
    <View style={styles.page}>
      {/* Scroll area starts below the status bar; its rounded corners shape the panel at the top. */}
      <View
        style={[styles.scrollArea, { top: topGap }]}
        onLayout={(event) => setScrollHeight(event.nativeEvent.layout.height)}
      >
        {/* The header (index 0) sticks to the top while the grey panel scrolls up over it. */}
        <ScrollView style={styles.scroll} stickyHeaderIndices={[0]}>
          {/* Header with today's tasks */}
          <View style={[styles.header, { paddingTop: headerTop - topGap }]}>
            <Stack gap="lg">
              <Row justify="space-between" align="flex-start">
                <Stack flex={1}>
                  <Text size="md" weight="medium" color={colors.textOnPrimary}>{formatHeaderDate(new Date())}</Text>
                  <Text size="xxl" weight="bold" color={colors.textOnPrimary}>
                    {staff !== undefined ? `Welcome ${[staff.title.replace('.', ''), staff.firstName].filter((part) => part !== '').join(' ')}` : 'Welcome'}
                  </Text>
                </Stack>
                <Pressable
                  onPress={() => router.push('/settings')}
                  accessibilityRole="button"
                  accessibilityLabel="Settings"
                  style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
                  testID="settings-button"
                >
                  <Icon name="settings-outline" size={40} color={colors.textOnPrimary} />
                </Pressable>
              </Row>

              <Row justify="space-between">
                <Row gap="sm" align="flex-start">
                  <Text size="lg" color={colors.textOnPrimary}>Tasks</Text>
                  <Badge label={String(tasks.length)} variant="count" />
                </Row>
                <Pressable
                  onPress={() => router.navigate('/tasks')}
                  accessibilityRole="link"
                  style={({ pressed }) => pressed && styles.pressed}
                  testID="see-all-tasks"
                >
                  <Text size="lg" color={colors.textOnPrimary} underline>See All</Text>
                </Pressable>
              </Row>

              {isLoading ? (
                <Spinner size="large" color={colors.textOnPrimary} />
              ) : (
                <Stack gap="lg">
                  {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} onPress={() => router.navigate('/tasks')} />
                  ))}
                </Stack>
              )}
            </Stack>
          </View>

          {/* Grey panel that slides up over the header */}
          <View style={[styles.panel, { minHeight: scrollHeight }]}>
            {/* Help */}
            <View style={styles.helpSection}>
              <StyledButton
                label="Need help ?"
                icon="headset-outline"
                variant="secondary"
                size="md"
                onPress={() => router.push('/help')}
                testID="help-button"
              />
            </View>

            {/* Medication roster */}
            <Stack padding="lg" gap="lg">
              <Text size="xxl" weight="bold" align="center">Your Medication Roster</Text>
              {error !== '' && <Text color={colors.danger} align="center">{error}</Text>}
              {rosterSlots.map(({ slot, label, time }) => {
                const entries = roster.filter((entry) => entry.slot === slot);
                if (entries.length === 0) return null;

                return (
                  <Stack key={slot} gap="sm">
                    <Row gap="md" align="flex-end">
                      <Text size="xl" weight="bold">{label}</Text>
                      <Text size="lg" color={colors.textSecondary}>{time}</Text>
                    </Row>
                    <View style={styles.rosterGroup}>
                      {entries.map((entry, index) => (
                        <Stack key={entry.id} gap="md">
                          {index > 0 && <Divider />}
                          <RosterItem entry={entry} onAdminister={() => handleAdminister(entry.id)} />
                        </Stack>
                      ))}
                    </View>
                  </Stack>
                );
              })}
            </Stack>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

// How far the grey panel overlaps the bottom of the blue header before scrolling.
const HEADER_OVERLAP = spacing.xxl - spacing.sm;

const styles = StyleSheet.create({
  iconButton: { minWidth: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.6 },
  rosterGroup: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    gap: spacing.md,
    ...shadows.soft,
  },
  page: { flex: 1, backgroundColor: colors.primary },
  // Below the status bar strip (top is set from the safe area), rounded at the top.
  scrollArea: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
  },
  scroll: { flex: 1 },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl + spacing.lg,
  },
  // Rounded grey panel; drawn above the sticky header so it covers it while scrolling.
  panel: {
    position: 'relative',
    zIndex: 20,
    marginTop: -HEADER_OVERLAP,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
    backgroundColor: colors.backgroundMuted,
  },
  helpSection: {
    backgroundColor: colors.surfaceMuted,
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
});
