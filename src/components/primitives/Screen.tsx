import { Image, ScrollView, View, StyleSheet, type ImageSourcePropType } from 'react-native';
import { colors, spacing } from '../../theme';

interface ScreenProps {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  backgroundColor?: string;
  backgroundImage?: ImageSourcePropType;
  scrollable?: boolean;
}

export function Screen({
  children,
  padding = 'md',
  scrollable = true,
  backgroundColor = colors.background,
  backgroundImage,
}: ScreenProps) {
  if (backgroundImage !== undefined) {
    return (
      <View style={[styles.container, styles[padding], { backgroundColor }]}>
        <Image source={backgroundImage} resizeMode="cover" style={styles.backgroundImage} />
        {children}
      </View>
    );
  }

  if (!scrollable) {
    return (
      <View style={[styles.container, styles[padding], { backgroundColor }]}>
        {children}
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor }]}
      contentContainerStyle={[styles.content, styles[padding]]}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { flex: 1 },
  backgroundImage: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
  content: { flexGrow: 1 },
  none: {},
  sm: { padding: spacing.sm },
  md: { padding: spacing.md },
  lg: { padding: spacing.lg },
});
