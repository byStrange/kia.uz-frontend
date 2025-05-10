export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    const { lockHeader, unlockHeader, closeExtendedMenu } = useHeaderService()
    const nuxtApp = useNuxtApp()

    nuxtApp.hook('page:finish', () => {
      // some pages might require locking the header (read more about locking in the ~composables/useHeaderService)
      // pages that require locking header will have meta.lockHover set to true
      if (to.meta?.lockHover) lockHeader()
      else unlockHeader()

      // scroll to top
      if (to.path !== from.path) window.scrollTo(0, 0)
    })

    // close extended menu on route change
    closeExtendedMenu()
  }

  if (to.path === '/news') {
    return navigateTo('/media-center', { replace: true });
  }
})
