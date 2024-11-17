<script setup lang="tsx">
import { NuxtLink, UIButton, UITickToBottom } from '#components'

const { headerService } = useHeaderService()

const openMenu = (item: HeaderItem) => {
  if (openedItem.value === item) {
    openedItem.value = null
    return
  }
  openedItem.value = item
}

const openedItem = ref<HeaderItem | null>(null)

let footerMenuItemCommonClasses =
  'menu-item md:py-0 py-5 text-sm+ font-semibold text-white block w-full text-start'

const FooterMenuItem = ({ item }: { item: HeaderItem }) => {
  return (
    <>
      {item.children?.length ? (
        <button class={footerMenuItemCommonClasses + ' ' + 'order-1'}>
          <div
            class="flex items-center justify-between"
            onClick={(e) => {
              if (e.target === e.currentTarget) openMenu(item)
            }}
          >
            {item.label}
            {h(UITickToBottom, {
              onClick: () => openMenu(item),
              class: [
                'text-white transition-transform md:hidden',
                { 'rotate-180': openedItem.value === item },
              ],
            })}
          </div>
          <div
            class={[
              'grid grid-rows-[0fr] overflow-hidden transition-all md:!mt-4 md:block',
              { 'mt-5 !grid-rows-[1fr]': openedItem.value === item },
            ]}
          >
            <div
              class={[
                'invisible flex min-h-0 flex-col space-y-2.5 text-white opacity-0 transition-all md:visible md:opacity-100',
                { '!visible opacity-100': openedItem.value === item },
              ]}
            >
              {item.children?.length
                ? item.children.map((i) => {
                    return (
                      <NuxtLink to={i.to} class="font-normal text-disabled">
                        {i.label}
                      </NuxtLink>
                    )
                  })
                : null}
            </div>
          </div>
        </button>
      ) : (
        <NuxtLink
          to={item.to}
          class={footerMenuItemCommonClasses + ' md:hidden'}
        >
          {item.label}
        </NuxtLink>
      )}
    </>
  )
}

const MenuFooterSocials = () => {
  return (
    <div class="mt-12 space-y-2.5">
      <h3 class="text-sm+ text-disabled">Kia в соцсетях</h3>
      <div class="flex gap-2">
        {headerService.value.socials.map((item) => (
          <a
            href={item.link}
            target="_blank"
            class="text-white"
            key={item.link}
          >
            {h(item.icon, { class: 'w-7.5 h-7.5 text-white' })}
          </a>
        ))}
      </div>
    </div>
  )
}

const MenuFooter = () => {
  return (
    <div class={['border-t border-t-description py-12 md:border-t-0 md:py-0']}>
      <div class="space-y-6">
        <div class="space-y-2.5">
          <h3 class="text-sm+ text-disabled">Горячая линия Kia</h3>
          <p class="font-semibold text-white">
            {headerService.value.phoneLine1}
          </p>
        </div>
        <div class="space-y-2.5">
          <h3 class="text-sm+ text-disabled">Информационная линия Kia</h3>
          <p class="font-semibold text-white">
            {headerService.value.phoneLine2}
          </p>
        </div>
        <div class="space-y-2.5">
          <h3 class="text-sm+ text-disabled">Телефон доверия</h3>
          <p class="font-semibold text-white">
            {headerService.value.phoneLine3}
          </p>
        </div>
        {h(MenuFooterSocials, { class: 'mt-12 md:hidden' })}
      </div>
    </div>
  )
}
</script>
<template>
  <footer class="bg-primary py-[60px]">
    <div class="container">
      <div class="space-y-2">
        <p class="text-xs text-disabled" aria-label="Footer text">
          Сведения о ценах на продукцию бренда Kia, содержащиеся на сайте, носят
          исключительно информационный характер. Указанные цены могут отличаться
          от действительных цен дилеров Kia. Для получения подробной информации
          об актуальных ценах на продукцию Kia обращайтесь к дилерам Kia.
          Приобретение любой продукции бренда Kia осуществляется в соответствии
          с условиями индивидуального договора купли-продажи. Представленные
          изображения автомобиля могут отличаться от реализуемого.
        </p>
        <UIButton
          label="Подробнее"
          size="md"
          class="!border-none !bg-transparent !p-0 text-white ring-offset-0"
        >
          Подробнее
          <UITickToBottom class="text-white" width="20" height="20" />
        </UIButton>
      </div>

      <div aria-hidden="true" class="my-10 border-b border-b-description"></div>

      <div aria-label="Footer menu">
        <div class="logo">
          <img src="@/assets/logo/main-logo.svg" alt="Logo" aria-label="Logo" />
        </div>

        <div
          class="md:md:mt-12 md:grid md:grid-cols-6 md:gap-9 2xl:grid-cols-12"
        >
          <div class="md:col-span-4 2xl:col-span-8">
            <div
              class="mt-5 flex-wrap divide-y divide-description md:mt-0 md:grid md:w-full md:grid-cols-2 md:items-start md:gap-9 md:divide-y-0 2xl:grid-cols-4"
              aria-label="Footer menu links"
            >
              <div class="hidden flex-col md:flex md:gap-5">
                <NuxtLink
                  to="/"
                  class="font-semibold text-white"
                  v-for="item in headerService.routes.filter(
                    (i) => !i.children?.length,
                  )"
                >
                  {{ item.label }}
                </NuxtLink>
              </div>
              <FooterMenuItem
                :item="item"
                v-for="item in headerService.routes"
              />
            </div>
          </div>

          <MenuFooter class="md:col-span-2 2xl:col-start-10" />
        </div>
        <div class="hidden md:mt-12 md:block">
          <MenuFooterSocials />
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
              size="md"
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
