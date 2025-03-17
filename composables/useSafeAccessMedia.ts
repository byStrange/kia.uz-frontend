export const useSafeAccessMedia = () => {
  const conf = useRuntimeConfig()
  const baseUrl = conf.public.apiBaseUrl;

  const safe = (url: string | null | undefined, prefix: string = ""): string => {
    if (url == null || url == undefined) return '';

    if (url.startsWith('https://')) return url;

    return baseUrl + prefix + url;
  }

  const quality = (url: string, qualityOption: 'low' | 'mid' = 'low'): string => {
    const safeUrl = safe(url);

    return safeUrl.replace(/(\/media\/)([^/]+)(\.png)/, `$1$2_${qualityOption}$3`);
  }

  return { safe, quality }
}
