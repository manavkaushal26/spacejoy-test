import { gsap } from 'gsap';
import { ReactNode, useEffect } from 'react';

interface FadeInFadeOutProps {
  children: ReactNode;
  duration?: number; // Optional: duration of fade effect
  delay?: number; // Optional: delay before fade in
}

const FadeInFadeOut: React.FC<FadeInFadeOutProps> = ({ children, duration = 1, delay = 0 }) => {
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in-fade-out');

    // Fade in animation on mount
    gsap.fromTo(elements, { opacity: 0 }, { opacity: 1, duration, delay, ease: 'power2.out' });

    // Fade out animation on unmount
    return () => {
      gsap.to(elements, {
        opacity: 0,
        duration,
        ease: 'power2.in',
      });
    };
  }, [duration, delay]);

  return <div className="fade-in-fade-out">{children}</div>;
};

export default FadeInFadeOut;
