import { useEffect, useRef, useState } from 'react';
import { useInView } from './useInView';

export function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useInView({ once: true, threshold: 0.3 });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return { count, ref };
}
