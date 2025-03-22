<script setup lang="tsx">
const { footerLinks } = useFooterService()
const { headerService } = useHeaderService()
const locale = useLocalePath()
</script>
<template>
  <footer class="bg-primary py-[60px]">
    <div class="container">
      <div class="space-y-2">
        <p class="text-sm text-disabled" aria-label="Footer text">
          {{$t('footer.kia_price_disclaimer')}}
        </p>
      </div>

      <div aria-hidden="true" class="my-8 border-b border-b-description" />

      <div aria-label="Footer menu">
        <NuxtLinkLocale to="/">
          <div class="logo">
            <img
              src="@/assets/logo/main-logo.svg"
              alt="Logo"
              aria-label="Logo"
            />
          </div>
        </NuxtLinkLocale>

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
                  :to="item.to"
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
            <AtomButton
              label="Обратная связь"
              mode="full"
              class="md:!w-full"
              color="primaryDark"
              @click="$router.push(locale('/feedback'))"
            />
          </div>

          <p class="order-1 text-xs text-caption 2xl:col-span-8">
            {{$t('footer.legal_notice')}}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
