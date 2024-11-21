export const useBreadcrumbs = (route: any, router: any) => {
  const crumbs = computed(() => {
    const fullPath = route.fullPath
    const params = fullPath.startsWith('/')
      ? fullPath.substring(1).split('/')
      : fullPath.split('/')
    const crumbs: any[] = []

    crumbs.push({
      title: 'Home',
      ...router.resolve('/'),
    })

    const { locale } = useI18n()

    let path = ''

    params.forEach((param: any) => {
      path = `${path}/${param}`
      const match = router.resolve(path)
      if (match.name !== null && param !== locale.value) {
        crumbs.push({
          title: toTitleCase(param.replace(/-/g, ' ')),
          ...match,
        })
      }
    })

    return crumbs
  })

  return {
    breadcrumbs: crumbs,
  }
}
