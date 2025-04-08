<script setup lang="ts">
import { DataTable, Column } from 'primevue'

const { paddingTop } = useSafeArea()

const router = useRouter()

const { bounding } = useContainer()

const route = useRoute()

const { locale } = useI18n()

const { data: pageData } = await useFetch(`/api/special-offers/${route.params.id}`)


const { updateBreadcrumbTitle } = useBreadcrumbs(route, router, locale.value)

updateBreadcrumbTitle(route.fullPath, pageData.value?.title || '')
console.log(useHTMLRenderer(pageData.value?.content))
</script>

<template>
  <div>
    <div
      class="h-5h overflow-hidden grid place-items-end md:place-items-start md:pt-[--safe-area-padding-top] md:h-[420px] 2xl:h-6h 2xl:place-items-end relative"
      :style="{
        '--safe-area-padding-top': paddingTop,
      }">
      <div
        class="shadowman absolute w-full h-full top-0 left-0 z-10 bg-[image:--gradient] md:bg-[image:none] md:bg-primary md:bg-opacity-60"
        :style="{
          '--gradient':
            'linear-gradient(180deg, rgba(8, 20, 30, 0.4) 0%, rgba(8, 20, 30, 0.589696) 40.99%, #08141E 65.6%)',
        }"></div>
      <picture>

        <source :srcset="pageData?.desktop_image" media="(min-width: 1440px)" />
        <source :srcset="pageData?.tablet_image" media="(min-width: 768px)" />
        <img class="w-full object-center absolute top-0 left-0 h-2/3 object-cover md:h-full"
          :src="pageData?.default_image" />
      </picture>
      <div class="!px-0 py-5 absolute left-[--left] top-[--safe-area-padding-top] hidden 2xl:block z-20"
        :style="{ '--left': bounding.x.value + 'px' }">
        <MoleculeBreadcrumb theme="light" />
      </div>
      <div
        class="container py-10 md:h-[360px] md:flex md:flex-col md:justify-between md:items-start 2xl:h-auto 2xl:pt-10 2xl:pb-20 relative z-20">
        <div class="text-white space-y-4 md:max-w-5h md:space-y-3 2xl:max-w-7.25h">
          <h1 class="text-3xl md:text-4xl 2xl:text-5xl">
            {{ pageData?.title }}
          </h1>
          <p class="text-base 2xl:text-lg">
            {{ pageData?.subtitle }}
          </p>
        </div>
        <AtomLink to="/feedback" :label="$t('common.request_a_callback')" color="secondary" mode="full"
          class="mt-4 2xl:mt-10" />
      </div>
    </div>
    <UIContainer class="prose pt-10 2xl:pt-20 pb-10 html-rendered-content"
      :style="{ '--container-max-width': '1060px' }">
      <template v-for="(block, index) in useHTMLRenderer(pageData?.content || '')">
        <div v-if="block.type == 'html'" :key="index + block.type" class="!max-w-[--container-max-width] mx-auto"
          v-html="block.html">
        </div>

        <template v-if="block.type === 'text'">
          <div :key="block.type" class="max-w-[--container-max-width] mx-auto">
            <p class="text-sm md:text-base">{{ block.text }}</p>
          </div>
        </template>

        <template v-if="block.type == 'list'">
          <div :key="block.type" class="max-w-[--container-max-width] mx-auto">
            <ul class="space-y-2.5">
              <li v-for="item in block.items" :key="item" class="text-sm md:text-base">{{ item }}</li>
            </ul>
          </div>
        </template>

        <template v-if="block.type == 'heading'">
          <div :key="block.type" class="max-w-[--container-max-width] mx-auto">
            <h1 v-if="block.level == 'h1'" class="text-lg font-semibold md:text-2xl 2xl:text-5xl" v-html="block.text">
            </h1>
            <h6 v-if="block.level == 'h6'" class="text-xs md:text-sm text-caption" v-html="block.text"></h6>
          </div>
        </template>

        <div v-else-if="block.type == 'table'" :key="index" class="max-w-[--container-max-width] mx-auto">
          <DataTable :value="block.options?.body" striped-rows
            :style="{ '--container-width': bounding.width.value + 'px' }">
            <Column v-for="field in block.options?.fields" :key="field.field" :field="field.field" :header="field.label"
              header-class="min-w-[calc(var(--container-width)/2)] md:min-w-[calc(var(--container-width)/3)] 2xl:min-w-[213px]" />
          </DataTable>
        </div>


        <div v-else-if="block.type === 'divider'" :key="block.type"
          class="divider w-full h-[1px] bg-caption 2xl:block opacity-30 left-0 max-w-[--container-max-width] mx-auto"></div>
      </template>


    </UIContainer>
  </div>
</template>

<style>
.p-datatable th,
.p-datatable td {
  @apply text-primary;
}

.p-datatable.p-datatable-striped .p-datatable-tbody>tr.p-row-odd {
  @apply !bg-transparent;
}

.p-datatable.p-datatable-striped .p-datatable-tbody>tr.p-row-even {
  @apply bg-background;
}
</style>
