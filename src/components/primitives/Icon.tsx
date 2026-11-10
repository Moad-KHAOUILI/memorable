import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

export type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export function Icon({ name, size = 24, color }: IconProps) {
  return <Ionicons name={name} size={size} color={color} style={styles.base} />;
}

const styles = StyleSheet.create({
  base: {},
});
