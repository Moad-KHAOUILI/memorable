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

// Tab with an icon and a label underneath; the active tab is shown in the primary colour.
export function NavItem({ label, onPress, active = false, icon }: NavItemProps) {
  const color = active ? colors.primary : colors.text;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.base, pressed && styles.pressed]}
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected: active }}
    >
      {icon !== undefined && <Icon name={icon} size={24} color={color} />}
      <Text size="sm" weight={active ? 'medium' : 'normal'} color={color} numberOfLines={1}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  pressed: { opacity: 0.6, transform: [{ scale: 0.95 }] },
});
