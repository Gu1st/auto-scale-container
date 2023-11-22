import { Debounce, normalizeOptions, createStyle } from "./utils";
import type { ignoreList, DefaultOptions } from "../types";

let RenderContainer: HTMLElement | null;
let ResizeScale: any;

const autoScale = (width: number, height: number, ignore: ignoreList) => {
  const clientWidth = document.documentElement.clientWidth;
  const clientHeight = document.documentElement.clientHeight;

  const Scale =
    clientWidth / clientHeight < width / height
      ? clientWidth / width
      : clientHeight / height;

  if (RenderContainer) {
    RenderContainer.style.width = `${clientWidth / Scale}px`;
    RenderContainer.style.height = `${clientHeight / Scale}px`;
    RenderContainer.style.transform = `scale(${Scale})`;
  }

  // Ignore style set
  const ignoreStyleDOM = document.querySelector("#ignoreStyle");
  if (ignoreStyleDOM) {
    ignoreStyleDOM.innerHTML = "";

    for (let item of ignore) {
      let ignoreElement;
      let ignoreScale;
      let ignoreWidth;
      let ignoreHeight;
      let ignoreFontSize;

      typeof item === "string" && (ignoreElement = item);
      if (typeof item === "object") {
        ignoreElement = item.el;
        ignoreScale = item.scale ? item.scale : 1 / Scale;
        ignoreWidth = item.scale !== Scale ? item.width : "something";
        ignoreHeight = item.scale !== Scale ? item.height : "something";
        ignoreFontSize = item.scale !== Scale ? item.fontSize : "something";
      }

      if (!ignoreElement) {
        console.warn("auto-sclae-container：Ignore selector error");
        continue;
      }

      const reg = new RegExp(`.${ignoreElement}(\x20|{)`, "gm");
      // Repeat filter
      if (reg.test(ignoreStyleDOM.innerHTML)) continue;

      ignoreStyleDOM.innerHTML += `\n${ignoreElement}{
        transform: scale(${ignoreScale})!important;
        transform-origin: 0 0;
        width: ${ignoreWidth}px!important;
        height: ${ignoreHeight}px!important;
      }`;

      if (ignoreFontSize) {
        ignoreStyleDOM.innerHTML += `\n${ignoreElement} div,${ignoreElement} span,${ignoreElement} a,${ignoreElement} *{
          font-size: ${ignoreFontSize}px;
        }`;
      }
    }
  }
};

const offAutoScale = () => {
  window.removeEventListener("resize", ResizeScale);
  const ignoreStyleDom = document.querySelector("#ignoreStyle");
  ignoreStyleDom && ignoreStyleDom.remove();
  const containerDom = document.querySelector("#containerStyle");
  containerDom && containerDom.remove();
};

function autoScaleContainer(options: DefaultOptions) {
  const Options = normalizeOptions(options);
  // Check container
  RenderContainer = document.querySelector(Options.container);
  if (!RenderContainer) {
    console.error("auto-scale-container: container is not exist");
    return;
  }

  // Create style
  createStyle();

  // Reset container
  RenderContainer.style.width = `${Options.designWidth}px`;
  RenderContainer.style.height = `${Options.designHeight}px`;
  RenderContainer.style.transformOrigin = `0 0`;
  RenderContainer.style.overflow = `hidden`;

  // Run scale
  autoScale(Options.designWidth, Options.designHeight, Options.ignore);

  if (Options.resize) {
    ResizeScale = Debounce(autoScale, Options.delay);
    window.addEventListener("resize", ResizeScale);
  }

  console.info("auto-scale-container: App Run!");
  RenderContainer.style.transition = `${Options.transition}s`;
}

autoScaleContainer.off = offAutoScale;

export default autoScaleContainer;
