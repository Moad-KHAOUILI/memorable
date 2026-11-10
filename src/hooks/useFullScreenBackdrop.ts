import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Asset } from 'expo-asset';

function isInstalledWebApp(): boolean {
  return Platform.OS === 'web' && typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches;
}

// In the installed iPhone web app, iOS leaves a strip at the bottom of the screen where it only draws the
// page background (see app/+html.tsx). To show a photo over the whole screen, the photo is set as the page
// background, sized like "cover" over the full screen. Returns true when that is active, so the screen
// can skip its own background image and let the page background show through.
// `imageModule` is the result of require('...png'); `fallbackSize` is used if the size is unknown.
export function useFullScreenBackdrop(imageModule: number, fallbackSize: { width: number; height: number }): boolean {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isInstalledWebApp()) return;

    const asset = Asset.fromModule(imageModule);
    const imageWidth = asset.width ?? fallbackSize.width;
    const imageHeight = asset.height ?? fallbackSize.height;
    const screenWidth = window.innerWidth;
    const screenHeight = window.screen.height;
    const scale = Math.max(screenWidth / imageWidth, screenHeight / imageHeight);
    const width = imageWidth * scale;
    const height = imageHeight * scale;
    const left = (screenWidth - width) / 2;
    const top = (screenHeight - height) / 2;

    const html = document.documentElement;
    html.style.background = `url("${asset.uri}") ${left}px ${top}px / ${width}px ${height}px no-repeat`;
    // The body's own background would cover the photo inside the app area.
    document.body.style.background = 'transparent';
    setIsActive(true);

    return () => {
      html.style.background = '';
      document.body.style.background = '';
    };
  }, [imageModule, fallbackSize.width, fallbackSize.height]);

  return isActive;
}
