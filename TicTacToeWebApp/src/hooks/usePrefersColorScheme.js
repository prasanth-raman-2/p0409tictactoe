import { useEffect, useState } from 'react';

/**
 * Returns true if user prefers dark color scheme.
 */
export function usePrefersColorScheme() {
  const getPref = () =>
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [prefersDark, setPrefersDark] = useState(getPref());

  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setPrefersDark(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  return prefersDark;
}
