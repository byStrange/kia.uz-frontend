<script setup lang="tsx">
const { footerLinks } = useFooterService()
const { headerService } = useHeaderService()
</script>
<template>
  <footer class="bg-primary py-[60px]">
    <div class="container">
      <div class="space-y-2">
        <p class="text-sm text-disabled" aria-label="Footer text">
          Сведения о ценах на продукцию бренда Kia, содержащиеся на сайте, носят
          исключительно информационный характер. Указанные цены могут отличаться
          от действительных цен дилеров Kia. Для получения подробной информации
          об актуальных ценах на продукцию Kia обращайтесь к дилерам Kia.
          Приобретение любой продукции бренда Kia осуществляется в соответствии
          с условиями индивидуального договора купли-продажи. Представленные
          изображения автомобиля могут отличаться от реализуемого.
        </p>
      </div>

      <div aria-hidden="true" class="my-8 border-b border-b-description" />

      <div aria-label="Footer menu">
        <div class="logo">
          <img src="@/assets/logo/main-logo.svg" alt="Logo" aria-label="Logo" />
        </div>

        <div
          class="md:md:mt-12 md:grid md:grid-cols-6 md:gap-9 2xl:grid-cols-12"
        >
          <div class="md:col-span-4 2xl:col-span-8">
            <div
              class="mt-2 flex-wrap divide-y-reverse divide-y divide-description md:mt-0 md:grid md:w-full md:grid-cols-2 md:items-start md:gap-9 md:divide-y-0 2xl:grid-cols-4"
              aria-label="Footer menu links"
            >
              <div class="hidden flex-col md:flex md:gap-5">
                <NuxtLinkLocale
                  v-for="item in footerLinks.value.filter(
                    (i) => !i.children?.length,
                  )"
                  :key="item.label"
                  to="/"
                  class="font-semibold text-white"
                >
                  {{ item.label }}
                </NuxtLinkLocale>
              </div>

              <UIFooterMenuItem
                v-for="item in footerLinks.value"
                :key="item.label"
                :item="item"
              />
            </div>
          </div>

          <div class="py-8 md:py-0 md:col-span-2 2xl:col-start-10">
            <div class="space-y-6">
              <div class="space-y-2.5">
                <h3 class="text-sm+ text-disabled">Горячая линия Kia</h3>
                <p class="font-semibold text-white">
                  {{ headerService.phoneLine1 }}
                </p>
              </div>
              <div class="space-y-2.5">
                <h3 class="text-sm+ text-disabled">Информационная линия Kia</h3>
                <p class="font-semibold text-white">
                  {{ headerService.phoneLine2 }}
                </p>
              </div>
              <div class="space-y-2.5">
                <h3 class="text-sm+ text-disabled">Телефон доверия</h3>
                <p class="font-semibold text-white">
                  {{ headerService.phoneLine3 }}
                </p>
              </div>
              <UIMenuFooterSocials class="mt-12 md:hidden" />
            </div>
          </div>
        </div>
        <div class="hidden md:mt-12 md:block">
          <UIMenuFooterSocials />
        </div>
        <div
          class="grid-rows-1 space-y-7.5 md:mt-12 2xl:grid 2xl:grid-cols-12 2xl:space-y-0"
        >
          <div class="order-2 2xl:col-span-3 2xl:col-start-10">
            <UIButton
              label="Обратная связь"
              mode="full"
              class="border border-city-gray md:!w-full"
              color="secondary"
              
            />
          </div>

          <p class="order-1 text-xs text-caption 2xl:col-span-8">
            ООО «Roodell» ведет деятельность на территории Республики Узбекистан
            в соответствии с законодательством Республики Узбекистан.
            Реализуемые товары доступны к получению на территории Республики
            Узбекистан. Мониторинг потребительского поведения субъектов,
            находящихся за пределами Республики Узбекистан, не ведется.
            Информация о соответствующих моделях и комплектациях и их наличии,
            ценах, возможных выгодах и условиях приобретения доступна у дилеров
            Kia на территории Республики Узбекистан. Товар сертифицирован.
            Не является публичной офертой.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
