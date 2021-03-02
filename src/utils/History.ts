export const replaceLocation = () => {
  const location = window.location;

  return window.history.replaceState({}, "淘特资", `//${location.host}${location.pathname}`);
};
