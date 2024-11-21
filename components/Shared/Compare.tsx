'use client';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import { classNames } from '@utils/helpers';
import { gsap } from 'gsap';
import { useCallback, useEffect, useRef, useState } from 'react';

interface CompareProps {
  firstImage?: string;
  secondImage?: string;
  className?: string;
  firstImageClassName?: string;
  secondImageClassname?: string;
  initialSliderPercentage?: number;
  slideMode?: 'hover' | 'drag';
  showHandlebar?: boolean;
  autoplay?: boolean;
  autoplayDuration?: number;
}

const Compare = ({
  firstImage = '',
  secondImage = '',
  className,
  firstImageClassName,
  secondImageClassname,
  initialSliderPercentage = 50,
  slideMode = 'hover',
  showHandlebar = true,
  autoplay = false,
  autoplayDuration = 5000,
}: CompareProps) => {
  const [sliderXPercent, setSliderXPercent] = useState(initialSliderPercentage);
  const sliderRef = useRef<HTMLDivElement>(null);
  const handlebarRef = useRef<HTMLDivElement>(null);
  const firstImageRef = useRef<HTMLImageElement>(null);
  const autoplayRef = useRef<number | null>(null);
  const isMouseInsideRef = useRef(false);

  // Start autoplay animation
  const startAutoplay = useCallback(() => {
    if (!autoplay) return;

    const startTime = Date.now();
    const animate = () => {
      if (isMouseInsideRef.current) return; // Pause autoplay when mouse is inside

      const elapsedTime = Date.now() - startTime;
      const progress = (elapsedTime % (autoplayDuration * 2)) / autoplayDuration;
      const percentage = progress <= 1 ? progress * 100 : (2 - progress) * 100;

      gsap.to(handlebarRef.current, {
        left: `${percentage}%`,
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.to(firstImageRef.current, {
        clipPath: `inset(0 ${100 - percentage}% 0 0)`,
        duration: 0.5,
        ease: 'power2.out',
      });

      autoplayRef.current = requestAnimationFrame(animate);
    };

    animate();
  }, [autoplay, autoplayDuration]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current !== null) {
      cancelAnimationFrame(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  // Mouse enter: stop autoplay and set slider position to cursor
  const handleMouseEnter = (e: React.MouseEvent) => {
    isMouseInsideRef.current = true;
    stopAutoplay();

    const rect = sliderRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));

      setSliderXPercent(percent);

      // Immediately move the slider to the mouse position without animation
      gsap.set(handlebarRef.current, { left: `${percent}%` });
      gsap.set(firstImageRef.current, {
        clipPath: `inset(0 ${100 - percent}% 0 0)`,
      });
    }
  };

  // Mouse leave: resume autoplay
  const handleMouseLeave = () => {
    isMouseInsideRef.current = false;
    startAutoplay();
  };

  // Mouse move: update slider position
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!sliderRef.current || !isMouseInsideRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));

    // Smoothly animate the slider to the mouse position
    gsap.to(handlebarRef.current, {
      left: `${percent}%`,
      duration: 0.1,
      ease: 'power2.out',
    });

    gsap.to(firstImageRef.current, {
      clipPath: `inset(0 ${100 - percent}% 0 0)`,
      duration: 0.1,
      ease: 'power2.out',
    });
  }, []);

  useEffect(() => {
    startAutoplay();

    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  return (
    <div
      ref={sliderRef}
      className={classNames('w-full h-full overflow-hidden', className)}
      style={{
        position: 'relative',
        cursor: slideMode === 'drag' ? 'grab' : 'col-resize',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div
        ref={handlebarRef}
        className="h-full w-px absolute top-0 z-30 bg-gradient-to-b from-transparent from-[5%] to-[95%] via-indigo-500 to-transparent"
        style={{ left: `${sliderXPercent}%` }}
      >
        {showHandlebar && (
          <div className="h-5 w-5 rounded-md top-1/2 -translate-y-1/2 bg-white z-30 -right-2.5 absolute flex items-center justify-center shadow-[0px_-1px_0px_0px_#FFFFFF40]">
            <DotsVerticalIcon className="w-4 h-4 text-black" />
          </div>
        )}
      </div>
      <div className="absolute inset-0 z-20 w-full h-full">
        {firstImage && (
          <img
            ref={firstImageRef}
            alt="first image"
            src={firstImage}
            className={classNames(
              'absolute inset-0 z-20 rounded-2xl flex-shrink-0 w-full h-full select-none',
              firstImageClassName
            )}
            style={{
              clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`,
            }}
            draggable={false}
          />
        )}
        {secondImage && (
          <img
            alt="second image"
            src={secondImage}
            className={classNames(
              'absolute top-0 left-0 z-[19] rounded-2xl w-full h-full select-none',
              secondImageClassname
            )}
            draggable={false}
          />
        )}
      </div>
    </div>
  );
};

export default Compare;
