/**
 * Resolves once the loading screen (components/Splash.tsx) has started to
 * lift, or straight away if it isn't showing. Entrance animations wait on
 * this so they play in view rather than hidden behind the splash.
 */
export function splashDone(): Promise<void> {
  if (typeof document === 'undefined' || document.documentElement.dataset.splash !== 'on') {
    return Promise.resolve();
  }
  return new Promise(resolve => window.addEventListener('hop:splash-done', () => resolve(), { once: true }));
}
