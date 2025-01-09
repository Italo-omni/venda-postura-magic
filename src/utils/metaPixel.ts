declare global {
  interface Window {
    fbq: any;
  }
}

export const trackEvent = (event: string, data?: any) => {
  if (window.fbq) {
    window.fbq('track', event, data);
  }
};

export const trackCustomEvent = (event: string, data?: any) => {
  if (window.fbq) {
    window.fbq('trackCustom', event, data);
  }
};