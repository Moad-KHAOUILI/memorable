import { useEffect } from 'react';
import { Slot } from 'expo-router';
import Head from 'expo-router/head';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }, []);

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F7F8FA" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Memorable" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </Head>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Slot />
      </SafeAreaProvider>
    </>
  );
}
