import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

// HTML page shell for the web/PWA build (only used on web).
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* viewport-fit=cover: draw under the iPhone status bar and home indicator (safe areas are handled in the app).
            maximum-scale / user-scalable: the app behaves like a native app, so no pinch zoom. */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        {/* Installed app: transparent status bar, so the screens (login photo, blue headers) fill the top of the screen. */}
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: appShellStyles }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const appShellStyles = `
/* The page itself never scrolls or bounces; only the lists inside the app scroll. */
html, body {
  height: 100%;
  overflow: hidden;
  overscroll-behavior: none;
  background-color: #FFFFFF;
  /* No double-tap zoom. */
  touch-action: manipulation;
  -webkit-text-size-adjust: 100%;
}
body {
  position: fixed;
  inset: 0;
  width: 100%;
}
#root {
  height: 100%;
}
/* Desktop browser: grey around the phone-width app column. */
@media (min-width: 520px) {
  html, body {
    background-color: #D9DEE5;
  }
}
/* Installed on the iPhone home screen with a translucent status bar, iOS gives the page a window that is
   one status bar height shorter than the screen (measured: 848 of 896px) and never draws the app in the
   bottom strip; only this background colour shows there. The app is sized to that window (100%), the
   navigation bar sits right above the strip, and the login screen shows its photo there via the page background (see useFullScreenBackdrop). */
/* Native-app feel: no text selection, no long-press menu, no grey tap flash. Text fields stay editable. */
* {
  -webkit-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}
input, textarea {
  -webkit-user-select: text;
  user-select: text;
}
`;
