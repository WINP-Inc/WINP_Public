import { useState, useEffect } from 'react';

interface WindowSizeType {
  width: number | undefined;
  height: number | undefined;
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSizeType>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export function useDeviceType() {
  const windowSize = useWindowSize();

  const isMobile = windowSize.width && windowSize.width <= 480;
  const isTablet = windowSize.width && windowSize.width > 480 && windowSize.width <= 768;
  const isDesktop = windowSize.width && windowSize.width > 768;

  return { isMobile, isTablet, isDesktop };
}