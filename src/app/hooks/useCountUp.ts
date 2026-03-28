import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, duration = 1.6, startOnMount = false) {
  const [count, setCount] = useState(startOnMount ? 0 : target);
  const [triggered, setTriggered] = useState(startOnMount);
  const ref = useRef<Element | null>(null);

  // IntersectionObserver로 뷰포트 진입 감지
  const setRef = (el: Element | null) => {
    ref.current = el;
  };

  useEffect(() => {
    if (startOnMount) return;
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnMount]);

  useEffect(() => {
    if (!triggered) return;

    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [triggered, target, duration]);

  return { count, setRef, triggered };
}
