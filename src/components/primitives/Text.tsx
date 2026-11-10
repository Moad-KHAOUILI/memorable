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
  // iOS-style type scale (measured from the Figma frames)
  sm: { fontSize: 13, lineHeight: 18 },
  md: { fontSize: 15, lineHeight: 20 },
  lg: { fontSize: 17, lineHeight: 22 },
  xl: { fontSize: 22, lineHeight: 28 },
  xxl: { fontSize: 32, lineHeight: 38 },
  display: { fontSize: 44, lineHeight: 52 },
  normal: { fontWeight: '400' },
  medium: { fontWeight: '500' },
  bold: { fontWeight: '700' },
  underline: { textDecorationLine: 'underline' },
  italic: { fontStyle: 'italic' },
});
