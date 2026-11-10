import { Pressable, StyleSheet } from 'react-native';
import { Text } from './Text';
import { Icon, type IconName } from './Icon';
import { colors } from '../../theme';

interface NavItemProps {
  label: string;
  onPress: () => void;
  active?: boolean;
  icon?: IconName;
}

// With an icon the label is only used for screen readers (the design shows icons only).
export function NavItem({ label, onPress, active = false, icon }: NavItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.base, active && styles.active]}
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected: active }}
    >
      {icon !== undefined ? (
        <Icon name={icon} size={36} color={colors.navIcon} />
      ) : (
        <Text size="md" weight={active ? 'bold' : 'normal'}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minWidth: 48,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {},
});
