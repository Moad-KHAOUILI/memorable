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
  // iOS-style type scale, based on the Figma frames but one step smaller
  sm: { fontSize: 12, lineHeight: 16 },
  md: { fontSize: 14, lineHeight: 19 },
  lg: { fontSize: 15, lineHeight: 20 },
  xl: { fontSize: 18, lineHeight: 23 },
  xxl: { fontSize: 26, lineHeight: 32 },
  display: { fontSize: 36, lineHeight: 42 },
  normal: { fontWeight: '400' },
  medium: { fontWeight: '500' },
  bold: { fontWeight: '700' },
  underline: { textDecorationLine: 'underline' },
  italic: { fontStyle: 'italic' },
});
