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
              label: 'Мощность двигателя',
              unit: 'л. с.',
              value: engine.power || ''
            },
            {
              label: 'Крутящий момент',
              unit: 'Н·м',
              value: engine.torque || ''
            },
            {
              label: 'Разгон от 0 до 100 км/ч с (минимальным значением для данного двигателя)',
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
    <OrganismModelUIDoubleTab v-if="is('engineBlock', section)" :key="section.id" :section="generateEngineBlockMeta(engines, section)" />
  </template>
</template>
