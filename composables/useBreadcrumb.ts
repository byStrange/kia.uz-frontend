

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
) => {
  const updateBreadcrumbTitle = (path: string, title: string) => {
    dynamicTitles.value[path] = title
  }
  const _crumbs = ref<any[]>([])

  watch(dynamicTitles, () => {
    generateCrumb()
  })

  const generateCrumb = () => {
    const fullPath = route.fullPath
    const params = fullPath.startsWith('/')
      ? fullPath.substring(1).split('/')
      : fullPath.split('/')

    _crumbs.value.push({
      title: 'Home',
      ...router.resolve('/'),
    })



    const { locale } = useI18n()

    let path = ''

    params.forEach((param: any) => {
      path = `${path}/${param}`
      const match = router.resolve(path)
      if (match.name !== null && param !== locale.value && !dynamicTitles.value[path]) {
        const title = dynamicTitles.value[path] || toTitleCase(param.replace(/-/g, ' '))
        _crumbs.value.push({
          title,
          ...match,
        })
      }
    })

    console.log(dynamicTitles)

    _crumbs.value = _crumbs.value.filter(c => c.title)
  }

  generateCrumb()

  return {
    breadcrumbs: _crumbs,
    updateBreadcrumbTitle
  }
}
