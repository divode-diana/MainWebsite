import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const progress = progressRef.current;
    if (!progress) return;

    window.scrollTo(0, 0);
    gsap.set(progress, { scaleX: 0 });

    let st: ReturnType<typeof ScrollTrigger.create> | null = null;

    const id = setTimeout(() => {
      const tween = gsap.to(progress, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      });
      st = tween.scrollTrigger ?? null;
    }, 50);

    return () => {
      clearTimeout(id);
      st?.kill();
    };
  }, [location.pathname]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/10">
      <div
        ref={progressRef}
        className="h-full origin-left"
        style={{ background: 'linear-gradient(to right, #2ebce4, #0678c5, #cf0501)' }}
      />
    </div>
  );
}
