interface BreadcrumbsOptions {
  dynamicTitles?: Record<string, string | Ref<string>>
}

const options: BreadcrumbsOptions = {
  dynamicTitles: {}
}

const dynamicTitles = ref<Record<string, string>>(
  options.dynamicTitles ?
    Object.entries(options.dynamicTitles).reduce((acc, [key, value]) => {
      acc[key] = typeof value === 'string' ? value : value.value
      return acc
    }, {} as Record<string, string>) :
    {}
)

export const useBreadcrumbs = (
  route: any,
  router: any,
  locale: string
) => {
  const updateBreadcrumbTitle = (path: string, title: string) => {
    dynamicTitles.value[path] = title
  }

  const generateCrumb = computed(() => {
    const _crumbs = ref<any[]>([])
    const fullPath = route.fullPath.split('#')[0] // Remove hash and everything after it
    const params = fullPath.startsWith('/')
      ? fullPath.substring(1).split('/')
      : fullPath.split('/')

    _crumbs.value.push({
      title: 'Home',
      ...router.resolve('/'),
    })

    let path = ''

    params.forEach((param: any) => {
      path = `${path}/${param}`
      const match = router.resolve(path)
      if (match.name !== null && param !== locale) {
        const title = dynamicTitles.value[path] || toTitleCase(param.replace(/-/g, ' '))
        _crumbs.value.push({
          title,
          ...match,
        })
      }
    })

    return _crumbs.value.filter(c => c.title)
  })


  return {
    breadcrumbs: generateCrumb,
    updateBreadcrumbTitle,
    dynamicTitles,
  }
}
