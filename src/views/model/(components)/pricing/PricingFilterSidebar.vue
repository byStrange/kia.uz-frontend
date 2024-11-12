<script setup lang="tsx">
import Accordion from 'primevue/accordion';
import AccordionContent from 'primevue/accordioncontent';
import AccordionHeader from 'primevue/accordionheader';
import AccordionPanel from 'primevue/accordionpanel';
import Checkbox from 'primevue/checkbox';

import { useContainer } from '@/composables/useContainer';

import TickToBottom from '@/components/icons/20x20/TickToBottom.vue';
import TickToTop from '@/components/icons/20x20/TickToTop.vue';

const { bounding } = useContainer();
</script>
<template>
  <div
    class="col-span-3 bg-background border-r border-r-protection pl-[--padding-x] pb-15"
    :style="{ '--padding-x': bounding.x.value + 'px' }"
  >
    <div class="py-5">
      <h3 class="text-base font-semibold">Двигатель</h3>
      <ul class="space-y-2.5 mt-4">
        <li
          class="flex gap-2"
          v-for="item in [
            '1.5 GDI / 170 л.с., Бензин',
            '2.0 GDI / 240 л.с., Бензин',
          ]"
        >
          <Checkbox />
          <label class="text-base">{{ item }}</label>
        </li>
      </ul>
    </div>
    <div class="py-5">
      <h3 class="text-base font-semibold">Комплектация</h3>
      <ul class="space-y-2.5 mt-4">
        <li
          class="flex gap-2"
          v-for="item in [
            'Comfort',
            'Comfort+',
            'Prestige',
            'Style Light T',
            'Style Light',
            'Style T',
            'Style',
            'Premium',
          ]"
        >
          <Checkbox />
          <label class="text-base">{{ item }}</label>
        </li>
      </ul>
    </div>
    <div class="pt-15 pr-5">
      <h2 class="text-lg font-semibold">Опции</h2>
      <div class="mt-5 border-t border-t-protection">
        <Accordion unstyled class="divide-y divide-protection" value="0">
          <template #collapseicon>
            <TickToTop class="min-w-5" />
          </template>
          <template #expandicon>
            <TickToBottom class="min-w-5" />
          </template>

          <AccordionPanel
            :value="tab"
            unstyled
            v-for="tab in [
              'Пакет «Тёплые опции»',
              'Экстерьер',
              'Интерьер',
              'Безопасность',
              'Комфорт',
              'Мультимедиа',
              'Современные системы помощи водителю',
            ]"
            :key="tab"
          >
            <AccordionHeader
              unstyled
              class="py-5 w-full justify-between items-center flex text-left text-base font-semibold"
              >{{ tab }}</AccordionHeader
            >
            <AccordionContent unstyled>
              <div
                class="w-full h-1h bg-protection flex justify-center items-center"
              >
                Content
              </div>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </div>
  </div>
</template>
