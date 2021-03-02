export default function getScroll(target: HTMLElement | Window | null, top: boolean): number {
  if (typeof window === "undefined") {
    return 0;
  }

  const prop = top ? "pageYOffset" : "pageXOffset";
  const method = top ? "scrollTop" : "scrollLeft";
  const isWindow = target === window;

  let ret = isWindow ? (target as Window)[prop] : (target as HTMLElement)[method];
  // ie6,7,8 standard mode
  if (isWindow && typeof ret !== "number") {
    ret = (document.documentElement as HTMLElement)[method];
  }

  return ret;
}



export function getOffsetTop(element: HTMLElement, container: HTMLElement | Window): number {
  if (!element.getClientRects().length) {
    return 0;
  }

  const rect = element.getBoundingClientRect();

  if (rect.width || rect.height) {
    if (container === window) {
      container = element.ownerDocument!.documentElement!;
      return rect.top - container.clientTop;
    }
    return rect.top - (container as HTMLElement).getBoundingClientRect().top;
  }

  return rect.top;
}
