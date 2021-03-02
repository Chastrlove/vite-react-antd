import "intersection-observer";
export const observerElementsMap = new Map();

export function getPooled(options: IntersectionObserverInit = {}) {
  const root = options.root || null;
  const rootMargin = parseRootMargin(options.rootMargin);
  const threshold = Array.isArray(options.threshold)
    ? options.threshold
    : [options.threshold != null ? options.threshold : 0];
  const observers = observerElementsMap.keys();
  let observer;
  while ((observer = observers.next().value)) {
    const unmatched =
      root !== observer.root ||
      rootMargin !== observer.rootMargin ||
      shallowCompare(threshold, observer.thresholds);

    if (!unmatched) {
      return observer;
    }
  }
  return null;
}

export function findObserverElement(observer, entry) {
  const elements = observerElementsMap.get(observer);
  if (elements) {
    const values = elements.values();
    let element;
    while ((element = values.next().value)) {
      if (element.target === entry.target) {
        return element;
      }
    }
  }
  return null;
}

export function callback(changes, observer) {
  for (let i = 0; i < changes.length; i++) {
    const element = findObserverElement(observer, changes[i]);
    if (element && changes[i].isIntersecting) {
      element.onTrigger(changes[i]);
    }
  }
}

export function createObserver(options) {
  return getPooled(options) || new IntersectionObserver(callback, options);
}

export function observeElement(element) {
  if (!observerElementsMap.has(element.observer)) {
    observerElementsMap.set(element.observer, new Set());
  }
  observerElementsMap.get(element.observer).add(element);
  element.observer.observe(element.target);
}

export function unobserveElement(element, target) {
  if (observerElementsMap.has(element.observer)) {
    const targets = observerElementsMap.get(element.observer);
    if (targets.delete(element)) {
      if (targets.size > 0) {
        element.observer.unobserve(target);
      } else {
        element.observer.disconnect();
        observerElementsMap.delete(element.observer);
      }
    }
  }
}

const marginRE = /^-?\d*\.?\d+(px|%)$/;

export function parseRootMargin(rootMargin) {
  const marginString = rootMargin ? rootMargin.trim() : "0px";
  const [m0 = "0px", m1 = m0, m2 = m0, m3 = m1] = marginString.split(/\s+/).map(margin => {
    if (!marginRE.test(margin)) {
      throw new Error(
        "rootMargin must be a string literal containing pixels and/or percent values"
      );
    }
    return margin;
  });

  return `${m0} ${m1} ${m2} ${m3}`;
}

export function shallowCompare(next, prev) {
  if (Array.isArray(next) && Array.isArray(prev)) {
    if (next.length === prev.length) {
      return next.some((_, index) => shallowCompare(next[index], prev[index]));
    }
  }
  return next !== prev;
}
