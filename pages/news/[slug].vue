<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { safe } = useSafeAccessMedia()
const { locale } = useI18n()
const { data: pageData } = await useFetch(`/api/news/${route.params.slug}`)
const { updateBreadcrumbTitle } = useBreadcrumbs(route, router, locale.value)

updateBreadcrumbTitle(route.fullPath, pageData.value?.news.title || '')

definePageMeta({
  lockHover: true
})

useSeoMeta({
  title: () => pageData.value?.news.title || ''
})
</script>
<template>
  <div>
    <UISafeAreaView>
      <UIContainer>
        <UIDesktopOnly class="pt-6">
          <MoleculeBreadcrumb theme="dark" />
        </UIDesktopOnly>
      </UIContainer>
      <UIContainer class="relative text-primary 2xl:max-w-1.06k 2xl:px-0">
        <div class="space-y-6 pt-12 pb-6 md:space-y-5 md:pt-15 md:pb-7.5 2xl:space-y-4 2xl:pt-10 2xl:pb-8">
          <p class="text-center text-sm md:text-base+">{{ $d(new Date(pageData?.news.created_at || '')) }}</p>
          <h1 class="text-2xl text-center md:text-4xl 2xl:text-5xl">{{ pageData?.news.title }}</h1>
        </div>

        <div class="-mx-page-padding-2 py-6 md:-mx-0 md:py-7.5 2xl:py-8">
          <MoleculeResponsiveImage :desktop-image="safe(pageData?.news.desktop_image)"
            :default-image="safe(pageData?.news.default_image)" :tablet-image="safe(pageData?.news.tablet_image)" />
        </div>

        <template v-for="content in useHTMLRenderer(pageData?.news.content || '')">
          <template v-if="content.type === 'image'">
            <div :key="content.type" class="-mx-page-padding-2 py-6 md:-mx-0 md:py-7.5 2xl:py-8">
              <img :src="content.src" alt="${0}" class="relative w-full ">
            </div>
          </template>

          <template v-if="content.type === 'text'">
            <div :key="content.type"
              class="py-6 space-y-6 md:py-7.5 md:space-y-8 2xl:py-8 2xl:space-y-8 2xl:max-w-7h 2xl:mx-auto">
              <p class="text-sm md:text-base+">{{ content.text }}</p>
            </div>
          </template>

          <template v-if="content.type == 'heading'">
            <div :key="content.type"
              class="py-6 space-y-6 md:py-7.5 md:space-y-8 2xl:py-8 2xl:space-y-8 2xl:max-w-7h 2xl:mx-auto">
              <h2 class="text-xl md:text-4xl 2xl:text-2xl">{{ content.text }}</h2>
            </div>
          </template>

          <template v-if="content.type == 'list'">
            <div :key="content.type" class="pb-6  md:pb-7.5  2xl:pb-8 2xl:space-y-8 2xl:max-w-7h 2xl:mx-auto">
              <ul class="text-sm list-disc md:text-base+ pl-6">
                <li v-for="item in content.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </template>

          <template v-if="content.type == 'html'">
            <div :key="content.type" class="pb-6  md:pb-7.5  2xl:pb-8 2xl:space-y-8 2xl:max-w-7h 2xl:mx-auto"
              v-html="content.html">
            </div>
          </template>

        </template>
      </UIContainer>
    </UISafeAreaView>
  </div>
</template>
