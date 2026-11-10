import { useEffect } from 'react';
import { Platform } from 'react-native';

const DEFAULT_COLOR = '#FFFFFF';

// Sets the page background colour, which is what shows in the strip at the bottom of the screen
// in the installed iPhone web app (see app/+html.tsx). Resets to white when the screen closes.
export function useStripColor(color: string) {
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const html = document.documentElement;
    html.style.backgroundColor = color;
    document.body.style.backgroundColor = color;
    return () => {
      html.style.backgroundColor = DEFAULT_COLOR;
      document.body.style.backgroundColor = DEFAULT_COLOR;
    };
  }, [color]);
}
