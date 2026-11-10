import { Text as RNText, StyleSheet } from 'react-native';
import { colors } from '../../theme';

interface TextProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'display';
  weight?: 'normal' | 'medium' | 'bold';
  color?: string;
  align?: 'left' | 'center' | 'right';
  numberOfLines?: number;
  underline?: boolean;
  italic?: boolean;
}

export function Text({
  children,
  size = 'md',
  weight = 'normal',
  color,
  align = 'left',
  numberOfLines,
  underline = false,
  italic = false,
}: TextProps) {
  return (
    <RNText
      style={[
        styles.base,
        styles[size],
        styles[weight],
        { textAlign: align },
        underline && styles.underline,
        italic && styles.italic,
        color !== undefined && { color },
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.text,
  },
  sm: { fontSize: 12, lineHeight: 16 },
  md: { fontSize: 14, lineHeight: 20 },
  lg: { fontSize: 16, lineHeight: 24 },
  xl: { fontSize: 20, lineHeight: 28 },
  xxl: { fontSize: 28, lineHeight: 34 },
  display: { fontSize: 40, lineHeight: 48 },
  normal: { fontWeight: '400' },
  medium: { fontWeight: '500' },
  bold: { fontWeight: '700' },
  underline: { textDecorationLine: 'underline' },
  italic: { fontStyle: 'italic' },
});
