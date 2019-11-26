let isMobile = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1) || localStorage.getItem("MobileEnable") === "true"

export { isMobile }