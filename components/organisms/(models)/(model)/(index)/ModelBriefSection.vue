<script setup lang="ts">
import type { ModelEngine } from '~/server/api/models/[id]/index.get';

function is(type: ModelBlock['type'], section: ModelBlock) {
  return type === section.type
}

interface DoubleTabBlockTabItem {
  label: string
  unit: string
  value: string | number
}

const { t } = useI18n()

interface DoubleTabBlockTab {
  title: string
  items: DoubleTabBlockTabItem[]
}

export interface DoubleTabBlock extends ModelBlock {
  meta: {
    tabs: DoubleTabBlockTab[],
    activeTabIndex?: number
  }
}

function generateEngineBlockMeta(engines: ModelEngine[], section: ModelBlock): DoubleTabBlock {
  return {
    ...section,
    meta: {
      tabs: engines.map((engine) => {
        return {
          title: `${engine.name}, ${engine.desc}`,
          items: [
            {
              label: t('models.engine_power'),
              unit: 'л. с.',
              value: engine.power || ''
            },
            {
              label: t('models.torque'),
              unit: 'Н·м',
              value: engine.torque || ''
            },
            {
              label: t('models.acceleration_from_0_to_100km'),
              unit: 'c',
              value: engine.acceleration_time || ''
            }
          ]
        }
      })
    }
  }
}

defineProps<{ blocks: ModelBlock[], engines: ModelEngine[] }>()
</script>
<template>
  <template v-for="section in blocks">
    <OrganismModelUIDoubleSlides v-if="is('doubleSlide', section)" :key="section.id" :section />
    <OrganismModelUITriple v-if="is('triple', section)" :key="section.id" :section />
    <OrganismModelUIBigTripleSlide v-if="is('tripleTab', section)" :key="section.id" :section />
    <OrganismModelUIDoubleTab v-if="is('engineBlock', section)" :key="section.id" :section="generateEngineBlockMeta(engines, section)" />
  </template>
</template>
