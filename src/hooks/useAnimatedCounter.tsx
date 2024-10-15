import { getProfitTextColor } from '@/utils/string';
import { useEffect, useState } from 'react';

export const useAnimatedCounter = (start: number, end: number, duration: number) => {
  const [countTextColor, setCountTextColor] = useState('text-foregound');
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;

      const progress = Math.min(elapsed / duration, 1);
      const easing = progress < 0.5 ? 2 * progress ** 2 : -1 + (4 - 2 * progress) * progress;
      const newCount = Math.floor(start + (end - start) * easing);

      setCount(newCount);
      if (progress < 1) requestAnimationFrame(step);
      else setCountTextColor(getProfitTextColor(0));
    };

    requestAnimationFrame(step);
  }, [start, end, duration]);

  useEffect(() => {
    setCountTextColor(getProfitTextColor(end - start));
  }, [start, end]);

  return { count, countTextColor };
};