export const throttle = (func: Function, delay: number) => {
  let lastCall: number = 0;
  return function (...args: any) {
    const now: number = new Date().getTime();
    if (delay > now - lastCall) {
      return;
    }
    lastCall = now;
    func(...args);
  };
};

export const debounce = (func: Function, delay: number) => {
  let timeoutId: any;
  return function (...args: any) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const isProbablyReactComponent = (prop: any) => {
  return (
    typeof prop === "function" &&
    prop.name &&
    prop.name[0] === prop.name[0].toUpperCase()
  );
};

export const isFunction = (prop: any) => {
  return typeof prop === "function" && !isProbablyReactComponent(prop);
};

export const RandomsColors = [
  "var(--cRandom1)",
  "var(--cRandom2)",
  "var(--cRandom3)",
  "var(--cRandom4)",
  "var(--cRandom5)",
  "var(--cRandom6)",
  "var(--cRandom7)",
  "var(--cRandom8)",
  "var(--cRandom9)",
  "var(--cRandom10)",
  "var(--cRandom11)",
  "var(--cRandom12)",
  "var(--cRandom13)",
  "var(--cRandom14)",
  "var(--cRandom15)",
  "var(--cRandom16)",
  "var(--cRandom17)",
  "var(--cRandom18)",
  "var(--cRandom19)",
];
