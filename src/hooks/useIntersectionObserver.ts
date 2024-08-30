import {useCallback, useRef, useSyncExternalStore} from "react";
/**
 * @param options initial intersection data
 * @param checkRefType boolean for check ref type, example : HTMLDivElement.prototype instanceof Node
 * Использует ссылку на элемент, чтобы следить за видимостью /
 * Use element's reference to watch for visability
 * @returns возвращает ссылку на объект и  и булевое значение на видимость элемента  / return obj ref and current element visavility
 */
export const useIntersectionObserver = <T>(
  options: IntersectionObserverInit,
  checkRefType: boolean,
) => {
  const targetRef = useRef<
    | (T extends HTMLElement ? (T extends Element ? T : Element) : HTMLElement)
    | null
  >(null);

  const getSnapShot = useCallback(() => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= window.innerHeight;
    }
    return false;
  }, [targetRef]);

  const intersectionSubscriber = useCallback(
    (cb: () => void) => {
      const elemObserver = new IntersectionObserver(cb, options);

      if (checkRefType && targetRef.current) {
        elemObserver.observe(targetRef.current);
      }
      return () => elemObserver.disconnect();
    },
    [targetRef],
  );

  const isVisible = useSyncExternalStore(intersectionSubscriber, getSnapShot);

  return [targetRef, isVisible];
};
