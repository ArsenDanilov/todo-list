export const useDebounce = <T extends (...args: unknown[]) => unknown>(fn: T, ms: number) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;

   return function (this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T> | undefined {
    const fnCall = () => {
      return fn.apply(this, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);

    return undefined;
  };
};
