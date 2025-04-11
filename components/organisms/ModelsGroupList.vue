<script setup lang="ts">
const { safe } = useSafeAccessMedia()

const { modelPriceClass = 'mt-1.5 flex gap-3 text-primary', groupTitleClass = 'text-2xl font-semibold text-primary md:text-3xl', modelNameClass = 'text-lg font-semibold text-primary', pricesButtonClass = 'flex items-center mt-1 link-hover link-hover-dark' } = defineProps<{ modelsGroup: GroupedItems<ModelWithLessData>, groupTitleClass?: string, modelNameClass?: string, modelPriceClass?: string, pricesButtonClass?: string, showPriceButton?: boolean }>();

defineEmits<{
  choose: [slug: string, id: uuid]
}>()
</script>
<template>
  <div class="space-y-10 md:space-y-12 2xl:space-y-15">
    <div v-for="[id, group] in Object.entries(modelsGroup)" :key="id">
      <h1 class="text-2xl font-semibold text-primary md:text-3xl" :class="groupTitleClass">
        {{ group.categoryName }}
      </h1>
      <div class="flex-wrap mt-4 md:mt-8 md:flex md:gap-9 2xl:mt-10">
        <div v-for="model in group.items" :key="model.name" class="max-w-md md:min-w-[310px] md:max-w-[310px]">
          <button class="relative" @click="$emit('choose', model.slug, model.id)">
            <img :src="safe(model.main_image)" class="object-cover w-full" />
            <UIElectroCarIcon v-if="model.is_electric" class="absolute top-0 right-0 size-6" />
          </button>
          <div class="mt-4">
            <h2 class="text-lg font-semibold text-primary" :class="modelNameClass">
              {{ model.name }}
            </h2>
            <p :class="modelPriceClass">
              {{ $t('prefixes.from', { price: formatPrice(model.starting_price) }) }}
              <UIInfoIcon class="text-disabled" />
            </p>
            <p v-if="model.old_price" class="text-caption text-sm mt-0.5">
              Выгода до
              {{ formatPrice(model.old_price) }}
            </p>
          </div>
          <button
            v-if="showPriceButton"
class="flex items-center mt-1 link-hover link-hover-dark" :style="{ '--l-bottom': '-2px' }"
            :class="pricesButtonClass" @click="$emit('choose', model.slug, model.id)">
            <span class="text-base font-semibold text-primary">Цены</span>
            <UITickToRight />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
