import { useState } from "react";

type Options = {
  root: HTMLElement | null | undefined;
  rootMargin: string;
  threshold: number;
};

type Callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void;

export const useIntersectionObserver = (callback: Callback, options: Options) => {
  const [observer] = useState<IntersectionObserver>(
    new IntersectionObserver(callback, options)
  );

  const [currentTarget, setCurrentTarget] = useState<HTMLElement | null>(null);

  const setTarget = (target: HTMLElement) => {

    setCurrentTarget(prev => {
      if (prev) {
      observer.unobserve(prev);
      }

      return target
    });
    observer.observe(target);
  };

  return {
    setTarget
  };
};
