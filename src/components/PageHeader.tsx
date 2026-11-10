import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Icon, type IconName } from './primitives/Icon';
import { Row } from './primitives/Row';
import { Stack } from './primitives/Stack';
import { Text } from './primitives/Text';
import { colors, spacing } from '../theme';
import { useLayoutInsets } from '../hooks/useLayoutInsets';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  actionIcon?: IconName;
  actionLabel?: string;
  onAction?: () => void;
  // Leave room below the title for a white sheet that overlaps the header.
  withSheet?: boolean;
}

// Blue page header used on every screen, matching the Figma frames.
export function PageHeader({
  title,
  subtitle,
  showBack = false,
  actionIcon,
  actionLabel,
  onAction,
  withSheet = true,
}: PageHeaderProps) {
  const { headerTop } = useLayoutInsets();

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/');
  };

  return (
    <View style={[styles.header, withSheet && styles.withSheet, { paddingTop: headerTop }]}>
      <Row justify="space-between" align="flex-end" gap="sm">
        <Row gap="sm" flex={1}>
          {showBack && (
            <Pressable
              onPress={goBack}
              accessibilityRole="button"
              accessibilityLabel="Back"
              style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
            >
              <Icon name="chevron-back" size={32} color={colors.textOnPrimary} />
            </Pressable>
          )}
          <Stack flex={1}>
            {subtitle !== undefined && (
              <Text size="md" weight="medium" color={colors.textOnPrimary}>{subtitle}</Text>
            )}
            <Text size="xxl" weight="bold" color={colors.textOnPrimary}>{title}</Text>
          </Stack>
        </Row>
        {actionIcon !== undefined && (
          <Pressable
            onPress={onAction}
            accessibilityRole="button"
            accessibilityLabel={actionLabel}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          >
            <Icon name={actionIcon} size={40} color={colors.textOnPrimary} />
          </Pressable>
        )}
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  withSheet: { paddingBottom: spacing.xxl + spacing.lg },
  iconButton: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.6 },
});
