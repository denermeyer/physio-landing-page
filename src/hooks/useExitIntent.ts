import { useEffect } from 'react';

export function useExitIntent(callback: () => void) {
  useEffect(() => {
    if (sessionStorage.getItem('exitIntentShown')) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) {
        sessionStorage.setItem('exitIntentShown', 'true');
        callback();
      }
    };

    // 3s delay so it doesn't fire on page load
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [callback]);
}
