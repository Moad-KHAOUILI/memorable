import { StyleSheet, View } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { BottomNav } from '../../src/components/BottomNav';
import { Spinner } from '../../src/components/primitives/Spinner';
import { useAuthStore } from '../../src/state/useAuthStore';
import { colors } from '../../src/theme';

export default function AppLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

  // Still checking whether someone is logged in on this device.
  if (isLoading && !isAuthenticated) {
    return (
      <View style={styles.loading}>
        <Spinner size="large" color={colors.primary} />
      </View>
    );
  }

  if (!isAuthenticated) return <Redirect href="/login" />;

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
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background },
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1 },
});
