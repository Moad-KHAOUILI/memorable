// TEMPORARY: shows the viewport sizes iOS reports in the installed (home screen) app,
// to fix the white strip at the bottom. Remove once the layout is fixed.

function measureCss(value: string, property: 'height' | 'paddingTop'): number {
  const probe = document.createElement('div');
  probe.style.position = 'fixed';
  probe.style.visibility = 'hidden';
  probe.style.pointerEvents = 'none';
  probe.style[property] = value;
  document.body.appendChild(probe);
  const result = property === 'height' ? probe.getBoundingClientRect().height : parseFloat(getComputedStyle(probe).paddingTop);
  probe.remove();
  return Math.round(result);
}

export function showViewportDebug(): () => void {
  const box = document.createElement('div');
  Object.assign(box.style, {
    position: 'fixed',
    top: '50%',
    left: '8px',
    right: '8px',
    zIndex: '99999',
    padding: '8px',
    background: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
    font: '12px/16px monospace',
    borderRadius: '8px',
    pointerEvents: 'none',
    whiteSpace: 'pre',
  });
  document.body.appendChild(box);

  const update = () => {
    const root = document.getElementById('root');
    const rootRect = root !== null ? root.getBoundingClientRect() : undefined;
    box.textContent = [
      `screen: ${window.screen.width} x ${window.screen.height}`,
      `inner: ${window.innerWidth} x ${window.innerHeight}  outer: ${window.outerHeight}`,
      `visualViewport: ${window.visualViewport !== null ? Math.round(window.visualViewport.height) : '-'}`,
      `html client: ${document.documentElement.clientHeight}`,
      `body rect: ${Math.round(document.body.getBoundingClientRect().top)} / ${Math.round(document.body.getBoundingClientRect().height)}`,
      `root rect: ${rootRect !== undefined ? `${Math.round(rootRect.top)} / ${Math.round(rootRect.height)}` : '-'}`,
      `100vh ${measureCss('100vh', 'height')}  100dvh ${measureCss('100dvh', 'height')}  100svh ${measureCss('100svh', 'height')}  100lvh ${measureCss('100lvh', 'height')}`,
      `100% (fixed) ${measureCss('100%', 'height')}`,
      `safe top ${measureCss('env(safe-area-inset-top)', 'paddingTop')}  bottom ${measureCss('env(safe-area-inset-bottom)', 'paddingTop')}`,
      `standalone ${window.matchMedia('(display-mode: standalone)').matches}  dpr ${window.devicePixelRatio}`,
    ].join('\n');
  };

  update();
  const timer = window.setInterval(update, 1000);
  return () => {
    window.clearInterval(timer);
    box.remove();
  };
}
