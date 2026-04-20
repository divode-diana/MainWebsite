import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceBubbleProps {
  title: string;
  size: 'small' | 'medium' | 'large';
  position: { x: string; y: string };
  index: number;
}

export function ServiceBubble({ title, size, position, index }: ServiceBubbleProps) {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const sizes = {
    small: 'w-72 h-72',
    medium: 'w-96 h-96',
    large: 'w-[31rem] h-[31rem]',
  };

  useEffect(() => {
    const bubble = bubbleRef.current;
    const content = contentRef.current;
    if (!bubble || !content) return;

    // Floating animation
    gsap.to(bubble, {
      y: '+=20',
      duration: 3 + index * 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // Parallax effect on scroll
    gsap.to(bubble, {
      scrollTrigger: {
        trigger: bubble,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      y: -50 * (index + 1),
    });

    // Content reveal animation
    gsap.fromTo(
      content,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: index * 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: bubble,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Hover animation
    const handleMouseEnter = () => {
      gsap.to(bubble, {
        scale: 1.08,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(bubble, {
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    bubble.addEventListener('mouseenter', handleMouseEnter);
    bubble.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      bubble.removeEventListener('mouseenter', handleMouseEnter);
      bubble.removeEventListener('mouseleave', handleMouseLeave);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [index]);

  return (
    <div
      ref={bubbleRef}
      className={`absolute ${sizes[size]} cursor-pointer`}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div className="relative w-full h-full">
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(46, 188, 228, 0.5), transparent 70%)',
          }}
        />

        {/* Main bubble */}
        <div className="absolute inset-0 rounded-full backdrop-blur-md bg-white/90 shadow-2xl border border-white/20 flex items-center justify-center overflow-hidden">
          {/* Inner shadow effect */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: 'inset 10px 10px 20px rgba(0, 0, 0, 0.05)',
            }}
          />

          {/* Animated gradient */}
          <div className="absolute inset-0 opacity-30 animate-pulse">
            <div
              className="w-full h-full rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(46, 188, 228, 0.3), transparent 60%)',
              }}
            />
          </div>

          {/* Content */}
          <div ref={contentRef} className="relative z-10 px-12 text-center">
            <p className="text-black font-semibold text-xl leading-relaxed">
              {title.split('**').map((part, i) =>
                i % 2 === 1 ? (
                  <span key={i} className="font-extrabold">
                    {part}
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
