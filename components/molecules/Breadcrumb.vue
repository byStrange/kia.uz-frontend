<template>
  <nav>
    <ul class="flex items-center text-primary">
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <slot name="item">
          <div v-if="index !== breadcrumbs.length - 1" class="flex items-center">
            <NuxtLinkLocale :to="crumb.fullPath" :class="[
              styles({ theme }),
              {
                '!text-caption link-hover-dark hover:!text-primary':
                  theme === 'dark',
              },
            ]" class="link-hover py-0.5 transition-colors">
              {{ getBreadcrumbTitle(crumb) }}
            </NuxtLinkLocale>
            <UIBreadCrumbsTickToRight :class="theme === 'light' ? 'text-white' : 'text-primary'" />
          </div>
          <div v-else :class="styles({ theme })" class="font-semibold">
              {{ getBreadcrumbTitle(crumb) }}
          </div>
        </slot>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { tv } from 'tailwind-variants'
import type { VariantProps } from 'tailwind-variants'

const styles = tv({
  base: 'text-xs',
  variants: {
    theme: {
      light: 'text-white',
      dark: 'text-primary',
    },
  },
  defaultVariants: {
    theme: 'dark',
  },
})
type StyleProps = VariantProps<typeof styles>

defineProps<{ theme: StyleProps['theme'] }>()

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()

const { breadcrumbs } = useBreadcrumbs(route, router, locale.value)

const getBreadcrumbTitle = (crumb: any) => {
  const translationKey = `common.${crumb.title.toLowerCase().replaceAll(' ', '_')}`
  const translated = t(translationKey)

  // Check if the translation exists and isn't just returning the key
  return translated !== translationKey ? translated : crumb.title
}
</script>

<style scoped>
/* Add your breadcrumb styling here */
</style>
