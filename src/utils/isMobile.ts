export const isMobile = ()=>{
  const ua = window.navigator.userAgent;
  const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  const isAndroid = ua.match(/(Android)\s+([\d.]+)/);
  return isIphone || isAndroid;
}
