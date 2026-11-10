import { View, Pressable, StyleSheet } from 'react-native';
import { colors, shadows } from '../../theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  elevated?: boolean;
}

export function Card({ children, onPress, elevated = false }: CardProps) {
  if (onPress !== undefined) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        style={({ pressed }) => [styles.base, elevated && shadows.soft, pressed && styles.pressed]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={[styles.base, elevated && shadows.soft]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderRadius: 20,
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
});
