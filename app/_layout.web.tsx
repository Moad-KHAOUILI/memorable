import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Slot } from 'expo-router';
import Head from 'expo-router/head';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuthStore } from '../src/state/useAuthStore';
import { colors } from '../src/theme';

export default function RootLayout() {
  const initializeSession = useAuthStore((state) => state.initializeSession);

  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  useEffect(() => {
    const preventZoom = (event: Event) => event.preventDefault();
    document.addEventListener('gesturestart', preventZoom);
    return () => document.removeEventListener('gesturestart', preventZoom);
  }, []);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    if (__DEV__) {
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => registrations.forEach((registration) => registration.unregister()))
        .catch(() => {});
      return;
    }

    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }, []);

  return (
    <>
      <Head>
        <title>Memorable</title>
        <meta name="description" content="Care tracking and reminders for clinic staff caring for elderly patients" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content={colors.primary} />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Memorable" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </Head>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <View style={styles.outer}>
          <View style={styles.app}>
            <Slot />
          </View>
        </View>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  outer: { flex: 1, alignItems: 'center' },
  app: { flex: 1, width: '100%', maxWidth: 480 },
});
