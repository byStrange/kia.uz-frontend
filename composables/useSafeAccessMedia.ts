export const useSafeAccessMedia = () => {
  const conf = useRuntimeConfig()
  const baseUrl = conf.public.apiBaseUrl;
  type AccessUrl = string | undefined | null | RelativeUrl | AbsoluteUrl


  const safe = (url: AccessUrl, format?: 'png' | 'avif' | 'webp'): string => {
    if (!url) return '';

    if (url.startsWith('https://')) return url;

    const split = url.split('.');
    const originalFormat = split.pop() || ''; // Extract last element safely
    const baseName = split.join('.'); // Remaining parts

    return baseUrl + baseName + '.' + (format || originalFormat);
  };


  const stripExt = (url: AccessUrl, ext?: string): string => {
    const safeUrl = safe(url)
    const make = safeUrl.split('.')
    make.pop()

    return ext ? `${make.join('.')}.${ext}` : make.join('.')
  }

  const quality = (url: AccessUrl, qualityOption: 'low' | 'mid' = 'low'): string => {
    const safeUrl = safe(url);

    return safeUrl.replace(/(.*\/)([^/]+)(\.png)/, `$1$2_${qualityOption}$3`);
  }

  return { safe, quality, stripExt }
}
