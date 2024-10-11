// hooks/useScroll.ts
import { useEffect } from 'react';

const useScroll = (scrollAmount: number) => {
  useEffect(() => {
    const handleScroll = () => {
      window.scrollBy(0, scrollAmount);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollAmount]);
};

export default useScroll;