import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import { BottomNav } from '../../src/components/BottomNav';
import { colors } from '../../src/theme';

export default function AppLayout() {
  // Uncomment when you implement Supabase authentication:
  // const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  // if (!isAuthenticated) return <Redirect href="/login" />;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Stack screenOptions={{ headerShown: false, animation: 'none' }} />
      </View>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1 },
});
