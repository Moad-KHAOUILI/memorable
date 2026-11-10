import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Screen } from '../../src/components/primitives/Screen';
import { Stack } from '../../src/components/primitives/Stack';
import { Row } from '../../src/components/primitives/Row';
import { Text } from '../../src/components/primitives/Text';
import { Spinner } from '../../src/components/primitives/Spinner';
import { EmptyState } from '../../src/components/primitives/EmptyState';
import { TaskCard } from '../../src/components/TaskCard';
import { getTasks } from '../../src/services';
import type { Task } from '../../src/types';
import { colors, spacing } from '../../src/theme';
import {
  addDays,
  formatLongDate,
  formatMonthYear,
  formatWeekdayLetter,
  fromDateKey,
  startOfWeek,
  toDateKey,
} from '../../src/utils/date';

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  // When a day is selected only that day's tasks are shown; otherwise all upcoming days.
  const [selectedDay, setSelectedDay] = useState<string | undefined>(undefined);

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(() => setError('Could not load your tasks. Please try again.'))
      .finally(() => setIsLoading(false));
  }, []);

  const today = new Date();
  const todayKey = toDateKey(today);
  const weekDays = Array.from({ length: 7 }, (_, index) => addDays(startOfWeek(today), index));
  const daysWithTasks = new Set(tasks.map((task) => task.date));

  const visibleTasks = tasks.filter((task) =>
    selectedDay !== undefined ? task.date === selectedDay : task.date >= todayKey,
  );
  const groupedDays = Array.from(new Set(visibleTasks.map((task) => task.date))).sort();
  const highlightedDay = selectedDay ?? todayKey;

  const toggleDay = (key: string) => {
    setSelectedDay((current) => (current === key ? undefined : key));
  };

  return (
    <Screen padding="none" backgroundColor={colors.primary}>
      <View style={styles.header}>
        <Stack gap="lg">
          <Text size="xxl" weight="bold" align="center" color={colors.textOnPrimary}>
            {formatMonthYear(today)}
          </Text>

          {/* Week strip */}
          <Row justify="space-between">
            {weekDays.map((date) => {
              const key = toDateKey(date);
              const isHighlighted = key === highlightedDay;
              return (
                <Pressable
                  key={key}
                  onPress={() => toggleDay(key)}
                  accessibilityRole="button"
                  accessibilityLabel={formatLongDate(date)}
                  accessibilityState={{ selected: isHighlighted }}
                  style={({ pressed }) => [styles.day, pressed && styles.pressed]}
                  testID={`day-${key}`}
                >
                  <Text size="lg" weight="bold" color={colors.textOnPrimary}>{formatWeekdayLetter(date)}</Text>
                  <View style={[styles.dayNumber, isHighlighted && styles.dayNumberActive]}>
                    <Text size="lg" weight="bold" color={isHighlighted ? colors.primary : colors.textOnPrimary}>
                      {date.getDate()}
                    </Text>
                  </View>
                  <View style={[styles.dot, daysWithTasks.has(key) && styles.dotVisible]} />
                </Pressable>
              );
            })}
          </Row>
        </Stack>
      </View>

      <Stack padding="lg" gap="lg">
        {isLoading && <Spinner size="large" color={colors.textOnPrimary} />}
        {error !== '' && <Text color={colors.textOnPrimary} align="center">{error}</Text>}
        {!isLoading && groupedDays.length === 0 && (
          <View style={styles.empty}>
            <EmptyState title="No tasks" description="There are no tasks planned for this day." />
          </View>
        )}
        {groupedDays.map((dayKey) => (
          <Stack key={dayKey} gap="md">
            <Text size="lg" weight="bold" color={colors.textOnPrimary}>
              {formatLongDate(fromDateKey(dayKey))}
            </Text>
            <Stack gap="lg">
              {visibleTasks
                .filter((task) => task.date === dayKey)
                .map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 44,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  day: { alignItems: 'center', gap: spacing.xs, minWidth: 44 },
  dayNumber: {
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNumberActive: { backgroundColor: colors.surface },
  dot: { width: 5, height: 5, borderRadius: 999 },
  dotVisible: { backgroundColor: colors.textOnPrimary },
  pressed: { opacity: 0.6 },
  empty: { backgroundColor: colors.surface, borderRadius: 20, padding: spacing.xl },
});
