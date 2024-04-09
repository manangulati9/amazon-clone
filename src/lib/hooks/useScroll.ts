import { useEffect, useState } from 'react';

const useScroll = () => {
  const [scrollDirection, setScrollDirection] = useState('none');

  useEffect(() => {
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const scrollHandler = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return scrollDirection;
};

export default useScroll;
