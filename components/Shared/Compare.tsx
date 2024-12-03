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
}: CompareProps) => {
  const [sliderXPercent, setSliderXPercent] = useState(initialSliderPercentage);
  const sliderRef = useRef<HTMLDivElement>(null);
  const handlebarRef = useRef<HTMLDivElement>(null);
  const firstImageRef = useRef<HTMLImageElement>(null);
  const isMouseInsideRef = useRef(false);

  const updateSliderPosition = useCallback((percent: number) => {
    const clampedPercent = Math.max(0, Math.min(100, percent));
    setSliderXPercent(clampedPercent);

    // Update GSAP position directly
    gsap.set(handlebarRef.current, { left: `${clampedPercent}%` });
    gsap.set(firstImageRef.current, {
      clipPath: `inset(0 ${100 - clampedPercent}% 0 0)`,
    });
  }, []);

  const handleInteraction = useCallback(
    (x: number, rect: DOMRect) => {
      const percent = ((x - rect.left) / rect.width) * 100;
      updateSliderPosition(percent);
    },
    [updateSliderPosition]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!sliderRef.current || !isMouseInsideRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      handleInteraction(e.clientX, rect);
    },
    [handleInteraction]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      handleInteraction(touch.clientX, rect);
    },
    [handleInteraction]
  );

  const handleMouseEnter = () => {
    isMouseInsideRef.current = true;
  };

  // const handleMouseLeave = () => {
  //   isMouseInsideRef.current = false;
  //   updateSliderPosition(initialSliderPercentage);
  // };

  useEffect(() => {
    updateSliderPosition(initialSliderPercentage);
  }, [initialSliderPercentage, updateSliderPosition]);

  return (
    <div
      ref={sliderRef}
      className={classNames('w-full h-full overflow-hidden', className)}
      style={{
        position: 'relative',
        cursor: slideMode === 'drag' ? 'grab' : 'col-resize',
      }}
      onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      <div
        ref={handlebarRef}
        className="absolute top-0 z-30 w-[2px] h-full bg-white"
        style={{ left: `${sliderXPercent}%` }}
      >
        {showHandlebar && (
          <div className="h-8 w-8 top-1/2 -translate-y-1/2 bg-gradient-to-br from-spj-red to-spj-yellow z-30 -right-[0.95rem] absolute flex items-center justify-center shadow-lg rounded-full p-1.5 border-[2px] border-white">
            <DotsVerticalIcon className="w-8 h-8 text-white" />
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
              'absolute inset-0 z-20 flex-shrink-0 w-full h-full select-none rounded-t-[1rem] lg:rounded-[1rem]',
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
              'absolute top-0 left-0 z-[19] w-full h-full select-none rounded-t-[1rem] lg:rounded-[1rem]',
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
