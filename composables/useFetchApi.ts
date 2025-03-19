export const useFetchApi = <T>(
  endpoint: string,
  locale: string = 'uz',
  options?: Parameters<typeof $fetch>[1],
) => {
  const config = useRuntimeConfig()
  const url = `${config.public.apiBaseUrl}/${locale ? locale + '/' : ''}api/v1${endpoint}`
  return $fetch<T>(url, options)
}
