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
import { getTasksForDay, getRoster, getCurrentStaff, markAdministered, rosterSlots } from '../../src/services';
import type { RosterEntry, Staff, Task } from '../../src/types';
import { colors, shadows, spacing } from '../../src/theme';
import { formatHeaderDate, toDateKey } from '../../src/utils/date';

export default function HomeScreen() {
  const [staff, setStaff] = useState<Staff | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [roster, setRoster] = useState<RosterEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  // Sizes used to let the grey panel scroll up over the fixed header.
  const [headerHeight, setHeaderHeight] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {
    Promise.all([getCurrentStaff(), getTasksForDay(toDateKey(new Date())), getRoster()])
      .then(([currentStaff, taskList, rosterList]) => {
        setStaff(currentStaff);
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
    <View style={styles.page} onLayout={(event) => setPageHeight(event.nativeEvent.layout.height)}>
      {/* Header with today's tasks — stays in place, the panel below slides over it */}
      <View style={styles.header} onLayout={(event) => setHeaderHeight(event.nativeEvent.layout.height)}>
        <Stack gap="lg">
          <Row justify="space-between" align="flex-start">
            <Stack flex={1}>
              <Text size="md" weight="medium" color={colors.textOnPrimary}>{formatHeaderDate(new Date())}</Text>
              <Text size="xxl" weight="bold" color={colors.textOnPrimary}>
                {staff !== undefined ? `Welcome ${staff.title.replace('.', '')} ${staff.firstName}` : 'Welcome'}
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

      {/* Grey panel: starts below the header and scrolls up over it.
          box-none lets taps on the visible part of the header reach the header. */}
      <ScrollView style={styles.scrollLayer} contentContainerStyle={styles.passThrough}>
        <View style={[styles.spacer, { height: Math.max(headerHeight - HEADER_OVERLAP, 0) }]} />
        <View style={[styles.panel, { minHeight: pageHeight }]}>
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
  // The header sits behind the scroll layer.
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingTop: 44,
    paddingBottom: spacing.xxl + spacing.lg,
  },
  scrollLayer: { ...StyleSheet.absoluteFillObject, pointerEvents: 'box-none' },
  passThrough: { pointerEvents: 'box-none' },
  // Transparent space above the panel: taps go through to the header behind it.
  spacer: { pointerEvents: 'none' },
  // Rounded grey panel that slides up over the header.
  panel: {
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
