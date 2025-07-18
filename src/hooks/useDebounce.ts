export const useDebounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(fn: F, ms: number): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;

   return (...args: Parameters<F>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          fn(...args);
        }, ms);
      };
};