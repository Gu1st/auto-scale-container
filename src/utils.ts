import type { DefaultObjectOptions, DefaultOptions } from "../types";

export const Debounce = (
  fn: Function,
  delay: number,
  ...args: any[]
): Function => {
  let timer: any = null;
  return function (this: any) {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
};

export const normalizeOptions = (
  options: DefaultOptions
): DefaultObjectOptions => {
  let normalize: DefaultOptions = {
    designWidth: 1920,
    designHeight: 929,
    container: "#app",
    resize: true,
    ignore: [],
    transition: "all 1s",
    delay: 1000,
  };

  if (typeof options === "string") {
    normalize = {
      ...normalize,
      container: options,
    };
  }
  if (typeof options === "object") {
    normalize = {
      designWidth: options.designWidth || normalize.designWidth,
      designHeight: options.designHeight || normalize.designHeight,
      container: options.container || normalize.container,
      resize: options.resize || normalize.resize,
      ignore: options.ignore || normalize.ignore,
      transition: options.transition || normalize.transition,
      delay: options.delay || normalize.delay,
    };
  }
  return normalize;
};

export const createStyle = () => {
  const style = document.createElement("style");
  const ignoreStyle = document.createElement("style");

  // Body overflow cut
  style.lang = "text/css";
  style.innerHTML = `body{overflow:hidden};`;
  style.id = "containerStyle";

  // Ignore style element
  ignoreStyle.lang = "text/css";
  ignoreStyle.id = "ignoreStyle";

  const body = document.querySelector("body");
  body?.appendChild(style);
  body?.appendChild(ignoreStyle);
};
