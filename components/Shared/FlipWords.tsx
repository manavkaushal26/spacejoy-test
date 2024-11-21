'use client';
import { classNames } from '@utils/helpers';
import { gsap } from 'gsap';
import { useCallback, useEffect, useRef, useState } from 'react';

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const wordRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const splitWordIntoSpans = (word: string) => {
    return word.split(' ').map((w, wordIndex) => (
      <span key={w + wordIndex} className="inline-block whitespace-nowrap">
        {w.split('').map((char, charIndex) => (
          <span
            key={w + charIndex}
            className="inline-block"
            style={{ opacity: 0, transform: 'translateY(10px) blur(8px)' }}
          >
            {char}
          </span>
        ))}
        <span>&nbsp;</span>
      </span>
    ));
  };

  const startAnimation = useCallback(() => {
    const nextWord = words[(words.indexOf(currentWord) + 1) % words.length];
    setCurrentWord(nextWord);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating) {
      const timeout = setTimeout(() => {
        startAnimation();
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [isAnimating, duration, startAnimation]);

  useEffect(() => {
    if (wordRef.current) {
      const chars = wordRef.current.querySelectorAll('span span');

      gsap.fromTo(
        chars,
        { opacity: 0, y: 10, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.05,
          duration: 0.2,
          onComplete: () => setIsAnimating(false),
        }
      );
    }
  }, [currentWord]);

  return (
    <div ref={wordRef} className={classNames('z-10 inline-block relative text-left', className)}>
      {splitWordIntoSpans(currentWord)}
    </div>
  );
};
