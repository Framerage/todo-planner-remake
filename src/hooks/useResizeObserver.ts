import {useRef, useState, useSyncExternalStore} from "react";
/**
 * Использует ссылку на элемент, чтобы следить за изменением его размеров /
 * Use element's reference to watch for sizes
 * @returns возвращает ссылку на объект и  объект с текущими размерами / return obj ref and current element size
 */
export const useResizeObserver = () => {
  const targetRef = useRef(null);
  const [size, setSize] = useState<{width: number; height: number}>({
    width: 0,
    height: 0,
  });

  const getSnapShot = () => size;

  const sizeSubscriber = (cb: () => void) => {
    const sizeObserver = new ResizeObserver(entries => {
      if (entries[0]) {
        const {width, height} = entries[0].contentRect;
        setSize({width, height});
        cb();
      }
    });
    if (targetRef.current) {
      sizeObserver.observe(targetRef.current);
    }
    return () => sizeObserver.disconnect();
  };

  return [targetRef, useSyncExternalStore(sizeSubscriber, getSnapShot)];
};
