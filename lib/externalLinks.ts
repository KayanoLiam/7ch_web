const OWNED_7CH_HOSTNAMES = new Set([
  '7ch.net',
  'www.7ch.net',
  '7ch-web.vercel.app',
  'backend-7ch.onrender.com',
]);

const isSubdomainOf7ch = (hostname: string) => hostname.endsWith('.7ch.net');

interface CurrentLocation {
  href: string;
  origin: string;
}

const getCurrentLocation = (): CurrentLocation => {
  if (typeof window !== 'undefined') return window.location;
  return { href: 'https://7ch.net/', origin: 'https://7ch.net' };
};

export const isHttpUrl = (url: URL) => url.protocol === 'http:' || url.protocol === 'https:';

export const is7chOwnedUrl = (url: URL, currentLocation: CurrentLocation = getCurrentLocation()) => {
  if (url.origin === currentLocation.origin) return true;

  const hostname = url.hostname.toLowerCase();
  return OWNED_7CH_HOSTNAMES.has(hostname) || isSubdomainOf7ch(hostname);
};

export const isExternalHttpUrl = (href: string, currentLocation: CurrentLocation = getCurrentLocation()) => {
  try {
    const url = new URL(href, currentLocation.href);
    return isHttpUrl(url) && !is7chOwnedUrl(url, currentLocation);
  } catch {
    return false;
  }
};
