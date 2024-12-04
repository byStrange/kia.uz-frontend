export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== from.path && import.meta.client) {
    useHeaderService().headerService.value.isMenuOpen = false
    useHeaderService().closeExtendedMenu()
    window.scrollTo(0, 0)
  }
})
