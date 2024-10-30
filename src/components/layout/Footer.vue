<script setup lang="tsx">
import TickToBottom from "../icons/20x20/TickToBottom.vue";
import { HeaderItem } from "@/services/headerService";

import { useHeaderService } from "@/services/headerService";
import { h, ref } from "vue";
import Button from "@/components/common/Button.vue";
import { RouterLink } from "vue-router";

const { headerService } = useHeaderService();

const openMenu = (item: HeaderItem) => {
  if (openedItem.value === item) {
    openedItem.value = null;
    return;
  }
  console.log(item);
  openedItem.value = item;
};

const openedItem = ref<HeaderItem | null>(null);

let footerMenuItemCommonClasses =
  "menu-item md:py-0 py-5 text-sm+ font-semibold text-white block w-full text-start";

const FooterMenuItem = ({ item }: { item: HeaderItem }) => {
  return (
    <>
      {item.children?.length ? (
        <button class={footerMenuItemCommonClasses + " " + "order-1"}>
          <div
            class="flex justify-between items-center"
            onClick={(e) => {
              if (e.target === e.currentTarget) openMenu(item);
            }}
          >
            {item.label}
            {h(TickToBottom, {
              onClick: () => openMenu(item),
              class: [
                "text-white transition-transform md:hidden",
                { "rotate-180": openedItem.value === item },
              ],
            })}
          </div>
          <div
            class={[
              "grid grid-rows-[0fr] transition-all overflow-hidden md:!mt-4 md:block",
              { "!grid-rows-[1fr] mt-5": openedItem.value === item },
            ]}
          >
            <div
              class={[
                "text-white min-h-0 invisible transition-all flex flex-col space-y-2.5 opacity-0 md:visible md:opacity-100",
                { "!visible opacity-100": openedItem.value === item },
              ]}
            >
              {item.children?.length
                ? item.children.map((i) => {
                    return (
                      <router-link
                        to={i.to}
                        class="text-disabled-elements font-normal"
                      >
                        {i.label}
                      </router-link>
                    );
                  })
                : null}
            </div>
          </div>
        </button>
      ) : (
        <router-link
          to={item.to}
          class={footerMenuItemCommonClasses + " md:hidden"}
        >
          {item.label}
        </router-link>
      )}
    </>
  );
};

const MenuFooterSocials = () => {
  return (
    <div class="space-y-2.5 !mt-12">
      <h3 class="text-sm+ text-disabled-elements">Kia в соцсетях</h3>
      <div class="flex gap-2">
        {headerService.value.socials.map((item) => (
          <a
            href={item.link}
            target="_blank"
            class="text-white"
            key={item.link}
          >
            {h(item.icon, { class: "w-7.5 h-7.5 text-white" })}
          </a>
        ))}
      </div>
    </div>
  );
};

const MenuFooter = (
  { includeSocials }: { includeSocials: boolean } = { includeSocials: true }
) => {
  return (
    <div class={["py-12 border-t border-t-description md:border-t-0 md:py-0"]}>
      <div class="space-y-6 ">
        <div class="space-y-2.5">
          <h3 class="text-sm+ text-disabled-elements">Горячая линия Kia</h3>
          <p class="text-white font-semibold">
            {headerService.value.phoneLine1}
          </p>
        </div>
        <div class="space-y-2.5">
          <h3 class="text-sm+ text-disabled-elements">
            Информационная линия Kia
          </h3>
          <p class="text-white font-semibold">
            {headerService.value.phoneLine2}
          </p>
        </div>
        <div class="space-y-2.5">
          <h3 class="text-sm+ text-disabled-elements">Телефон доверия</h3>
          <p class="text-white font-semibold">
            {headerService.value.phoneLine3}
          </p>
        </div>
        {includeSocials && MenuFooterSocials()}
      </div>
    </div>
  );
};
</script>
<template>
  <footer class="bg-semantic-primary py-[60px]">
    <div class="container">
      <div class="space-y-2">
        <p class="text-xs text-disabled-elements" aria-label="Footer text">
          Сведения о ценах на продукцию бренда Kia, содержащиеся на сайте, носят
          исключительно информационный характер. Указанные цены могут отличаться
          от действительных цен дилеров Kia. Для получения подробной информации
          об актуальных ценах на продукцию Kia обращайтесь к дилерам Kia.
          Приобретение любой продукции бренда Kia осуществляется в соответствии
          с условиями индивидуального договора купли-продажи. Представленные
          изображения автомобиля могут отличаться от реализуемого.
        </p>
        <Button
          label="Подробнее"
          size="md"
          class="!p-0 text-white !bg-transparent !border-none ring-offset-0"
        >
          Подробнее
          <TickToBottom class="text-white" width="20" height="20" />
        </Button>
      </div>

      <div aria-hidden="true" class="border-b border-b-description my-10"></div>

      <div aria-label="Footer menu">
        <div class="logo">
          <img src="@/assets/logo/main-logo.svg" alt="Logo" aria-label="Logo" />
        </div>

        <div
          class="md:md:mt-12 md:gap-9 md:grid md:grid-cols-6 2xl:grid-cols-12"
        >
          <div class="md:flex md:col-span-4 2xl:col-span-8">
            <div
              class="mt-5 divide-y divide-description md:grid md:mt-0 md:grid-cols-2 2xl:grid-cols-4 md:gap-9 md:divide-y-0 md:items-start flex-wrap md:w-full"
              aria-label="Footer menu links"
            >
              <div class="hidden md:flex flex-col md:gap-5">
                <router-link
                  to="/"
                  class="text-white font-semibold"
                  v-for="item in headerService.routes.filter(
                    (i) => !i.children?.length
                  )"
                >
                  {{ item.label }}
                </router-link>
              </div>
              <FooterMenuItem
                :item="item"
                v-for="item in headerService.routes"
              />
            </div>
          </div>

          <MenuFooter
            :includeSocials="false"
            class="md:col-span-2 2xl:col-start-10"
          />
        </div>
        <div class="hidden md:block md:mt-12">
          <MenuFooterSocials />
        </div>
        <div
          class="space-y-7.5 2xl:space-y-0 md:mt-12 2xl:grid 2xl:grid-cols-12 grid-rows-1"
        >
          <div class="2xl:col-span-3 order-2 2xl:col-start-10">
            <Button
              label="Обратная связь"
              mode="full"
              class="md:!w-full border border-city-gray"
              color="secondary"
              size="md"
            />
          </div>

          <p class="text-caption text-xs 2xl:col-span-8 order-1">
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
