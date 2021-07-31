
export function getTargetElement(target, defaultElement) {
  let targetElement;
  if (!target) {
    return defaultElement;
  }

  if (typeof target === "function") {
    targetElement = target();
  } else if ("current" in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
}
