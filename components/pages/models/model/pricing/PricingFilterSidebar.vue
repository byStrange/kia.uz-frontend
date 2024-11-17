<script setup lang="tsx">
const { bounding } = useContainer()
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
          <PrimeCheckbox />
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
          <PrimeCheckbox />
          <label class="text-base">{{ item }}</label>
        </li>
      </ul>
    </div>
    <div class="pt-15 pr-5">
      <h2 class="text-lg font-semibold">Опции</h2>
      <div class="mt-5 border-t border-t-protection">
        <PrimeAccordion unstyled class="divide-y divide-protection" value="0">
          <template #collapseicon>
            <UITickToTop class="min-w-5" />
          </template>
          <template #expandicon>
            <UITickToBottom class="min-w-5" />
          </template>

          <PrimeAccordionPanel
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
            <PrimeAccordionHeader
              unstyled
              class="py-5 w-full justify-between items-center flex text-left text-base font-semibold"
              >{{ tab }}</PrimeAccordionHeader
            >
            <PrimeAccordionContent unstyled>
              <div
                class="w-full h-1h bg-protection flex justify-center items-center"
              >
                Content
              </div>
            </PrimeAccordionContent>
          </PrimeAccordionPanel>
        </PrimeAccordion>
      </div>
    </div>
  </div>
</template>
