import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

// HTML page shell for the web/PWA build (only used on web).
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* viewport-fit=cover: draw under the iPhone status bar and home indicator (safe areas are handled in the app). */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/* Installed app: transparent status bar, so the screens (login photo, blue headers) fill the top of the screen. */}
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: lockPageStyles }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

// The page itself never scrolls or bounces; only the lists inside the app scroll.
const lockPageStyles = `
html, body {
  height: 100%;
  overflow: hidden;
  overscroll-behavior: none;
  background-color: #0A84FF;
}
body {
  position: fixed;
  inset: 0;
  width: 100%;
}
#root {
  height: 100%;
  height: 100dvh;
}
`;
