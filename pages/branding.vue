<script setup lang="ts">
const { src } = useUploadcareSource()

const { bounding } = useContainer()

const logoOffsetLeft = ref(0)
const logoRef = useTemplateRef('logo')

const { paddingTop } = useSafeArea()

const extraLinksCard = [
  {
    title: 'Бренд',
    href: '#',
    image: src('8701cf69-f335-45be-b0d7-2c939d629d0f', { preview: '1000x664' }),
  },
  {
    title: 'Kia в Узбекистане',
    href: '#',
    image: src('907872e6-383c-4eee-8d95-4779a60485ca', { preview: '1000x664' }),
  },
  {
    title: 'Технологии',
    href: '#',
    image: src('b3436484-91af-4e8c-9678-d36a564a1a3f', {
      preview: '1000x664',
    }),
  },
]

onMounted(() => {
  console.log(logoRef.value.$el.getBoundingClientRect())
  logoOffsetLeft.value = logoRef.value.$el.getBoundingClientRect().left
})

definePageMeta({
  lockHover: true,
})
</script>
<template>
  <div>
    <UIDesktopOnly>
      <OrganismBrandBar />
    </UIDesktopOnly>
    <div class="pt-[--padding-top]" :style="{ '--padding-top': paddingTop }">
      <div class="relative flex items-center justify-center">
        <img
          :src="src('629506cf-36e9-4a27-baa9-e918f57dc4c2')"
          alt="${0}"
          class="h-[430px] object-cover w-full 2xl:w-full 2xl:h-full"
        />
        <button class="absolute">play</button>
      </div>
    </div>

    <div class="bg-primary">
      <UIContainer>
        <MoleculeSection
          section-title="Любое творчество начинается с движения"
          subtitle="МАНИФЕСТ"
        >
          <template #title="{ sectionTitle, subtitle }">
            <div class="space-y-2.5">
              <p
                class="text-disabled uppercase text-xs+ md:text-xs-long 2xl:text-xs+"
              >
                {{ subtitle }}
              </p>
              <h1
                class="text-lg font-semibold text-white md:text-2xl 2xl:text-3xl"
              >
                {{ sectionTitle }}
              </h1>
            </div>
          </template>
          <div
            class="mt-5 text-white space-y-4 2xl:mt-10 2xl:grid 2xl:grid-cols-2 2xl:gap-x-10 2xl:space-y-0"
          >
            <p class="text-sm md:text-base+">
              Как дизайнеры, создающие для потребителей, местных сообществ
              и общества в целом устойчивые мобильные решения,
              <mark
                >наша цель в Kia заключается в создании инновационных
                продуктов</mark
              >, которые вдохновляют вас, когда вы находитесь в движении,
              и в предоставлении востребованных и удобных услуг, демонстрируя
              нашу веру в то, что самый ценный ресурс для каждого человека — это
              его время.
            </p>
            <p class="text-sm md:text-base+">
              Мы рождены в центре вдохновения, страсти и энтузиазма. Наш
              <mark>настрой на рост и прогресс проявляется</mark> в каждом
              сотруднике Kia по всему миру.<mark>
                И мы стремимся реализовывать цель бренда каждый день.</mark
              >
            </p>
          </div>
        </MoleculeSection>
      </UIContainer>

      <img
        :src="src('4470c77e-2f0d-40c1-bef7-12ceda37662d')"
        class="w-full object-cover max-h-[951px] max-w-[1440px] mx-auto"
      />

      <UIContainer>
        <div
          class="text-white space-y-12 py-12 md:py-15 2xl:py-1h md:space-y-15 2xl:space-y-16"
          :style="{
            '--logo-width-lg': '1153px',
          }"
        >
          <div class="space-y-12 md:space-y-20 w-full 2xl:space-y-1h">
            <div class="px-3.5 md:px-0">
              <UIMainLogoWhite
                ref="logo"
                class="w-full md:h-1.5h 2xl:h-[260px] 2xl:w-[--logo-width-lg] 2xl:mx-auto"
              />
            </div>

            <div
              class="space-y-5 text-center 2xl:w-[--logo-width-lg] 2xl:mx-auto 2xl:grid 2xl:grid-cols-2 2xl:text-left 2xl:gap-x-10 2xl:space-y-0"
              :style="{ '--offset-left-2xl': logoOffsetLeft + 'px' }"
            >
              <h1 class="text-lg font-semibold md:text-2xl 2xl:text-3xl">
                Источник вдохновения: значение нового логотипа
              </h1>
              <p class="text-sm md:text-base+ 2xl:text-xl">
                Новый логотип как воплощение полной трансформации бренда
              </p>
            </div>
          </div>
          <div class="relative flex-center">
            <img
              :src="src('31908fdd-f12e-4eb4-9a97-04987fd5d13b')"
              alt="${0}"
              class="2xl:h-[720px] w-full object-cover"
            />
            <button class="absolute">play</button>
          </div>
          <div
            class="2xl:grid 2xl:grid-cols-2 space-y-4 2xl:space-y-0 2xl:gap-x-10"
          >
            <p class="text-sm md:text-base+">
              Эволюция человечества происходила посредством миграции. По ходу
              истории люди мигрировали, открывали новые континенты.
              <mark
                >Это желание и потребность в движении заложены в ДНК всего
                человечества.</mark
              > Когда мы в движении, мы открываем новые миры, получаем новые
              впечатления, знакомимся с новыми людьми, открываем новые
              перспективы. <mark>Мы вдохновляемся.</mark>
            </p>
            <p class="text-sm md:text-base+">
              <mark>Движение связано с концепцией постоянных изменений</mark> —
              изменений окружающей среды, пространства, и, как следствие,
              изменений в нас самих. Когда вы в движении, у вас есть время
              подумать. Движение стимулирует мышление, творчество, новые идеи и
              <mark> прогресс. </mark>
            </p>
          </div>
        </div>
      </UIContainer>

      <img
        :src="src('f997d80d-49c8-4775-8ae8-2fcea5c99917')"
        class="w-full object-cover max-h-[951px] max-w-[1440px] mx-auto"
      />

      <MoleculeSection
        section-title="Единство противоположностей"
        subtitle="ФИЛОСОФИЯ"
      >
        <template #title="{ sectionTitle, subtitle }">
          <div class="space-y-2.5 container">
            <p
              class="text-disabled uppercase text-xs+ md:text-xs-long 2xl:text-xs+"
            >
              {{ subtitle }}
            </p>
            <h1
              class="text-lg font-semibold text-white md:text-2xl 2xl:text-3xl"
            >
              {{ sectionTitle }}
            </h1>
          </div>
        </template>

        <div
          class="container mt-5 space-y-4 2xl:grid 2xl:grid-cols-2 2xl:gap-x-10 2xl:mt-10 2xl:space-y-0"
        >
          <p class="text-white text-sm md:text-base+">
            Представляем вам нашу новую философию дизайна —
            <mark>единство противоположностей.</mark>  В основе идея
            противопоставления, которую мы используем для формирования
            уникального стиля Kia. Мы применяем концепции разрушения связей
            и контраста, чтобы создавать ярко выраженный дизайн.
          </p>
          <p class="text-white text-sm md:text-base+">
            Философия <mark>единства противоположностей</mark> позволяет нам
            выделяться и символизирует наступление новой эры бренда. Kia
            адаптируется к меняющемуся миру вокруг нас. Мы вдохновлены
            изменениями, которые происходят вокруг нас, и приглашаем вас вместе
            с нами создавать будущее.
          </p>
        </div>

        <div class="relative container mt-10 md:mt-15 2xl:mt-16">
          <img
            :src="src('62bdb5d8-6ca9-4c99-8d1d-c86a254fd01a')"
            class="relative z-10"
          />
          <div
            class="absolute w-full h-[155px] bg-white left-0 -bottom-12 md:-bottom-15 md:h-[245px]"
          ></div>
        </div>
      </MoleculeSection>

      <UIContainer class="bg-white">
        <MoleculeSection
          section-title="Движение вдохновляет на идеи"
          subtitle="ВДОХНОВЕНИЕ"
          class="pt-0"
        >
          <template #title="{ sectionTitle, subtitle }">
            <div class="space-y-2.5">
              <p
                class="text-disabled uppercase text-xs+ md:text-xs-long 2xl:text-xs+"
              >
                {{ subtitle }}
              </p>
              <h1
                class="text-lg font-semibold text-primary md:text-2xl 2xl:text-3xl"
              >
                {{ sectionTitle }}
              </h1>
            </div>
          </template>
          <p
            class="text-sm md:text-base+ text-primary mt-5 2xl:mt-10 2xl:max-w-7.5h"
          >
            В Kia, сотрудничая с художниками и нейробиологами, мы создали
            анимацию, которая разработана для того, чтобы вдохновить каждого,
            кто смотрит на нее. В результате многочисленных исследований, мы
            выявили, что произведения искусства раскрывают сущность движения в
            природе за счет упрощения формы с помощью таких методов, как
            изменение цвета в зависимости от скорости.
          </p>
        </MoleculeSection>
      </UIContainer>

      <div
        class="flex overflow-auto snap-x snap-mandatory 2xl:grid 2xl:grid-cols-3"
      >
        <div
          class="h-[515px] 2xl:h-[715px] relative shrink-0 w-screen snap-start md:w-half-screen 2xl:w-auto"
        >
          <video
            src="../assets/video-ocean.mp4"
            autoplay
            muted
            loop
            class="h-full object-cover w-full"
          ></video>
          <div class="absolute bottom-0 pb-7.5">
            <UIContainer class="space-y-2.5 text-white md:!px-7.5">
              <h1 class="text-lg font-semibold md:text-2xl">
                Движение в воздухе
              </h1>
              <p class="text-base">
                Завораживающее движение частиц создает ощущение присутствия.
              </p>
            </UIContainer>
          </div>
        </div>
        <div
          class="h-[515px] 2xl:h-[715px] relative shrink-0 w-screen snap-start md:w-half-screen 2xl:w-auto"
        >
          <video
            src="../assets/video-ocean.mp4"
            autoplay
            muted
            loop
            class="h-full object-cover w-full"
          ></video>
          <div class="absolute bottom-0 pb-7.5">
            <UIContainer class="space-y-2.5 text-white md:!px-7.5">
              <h1 class="text-lg font-semibold md:text-2xl">
                Движение в воздухе
              </h1>
              <p class="text-base">
                Завораживающее движение частиц создает ощущение присутствия.
              </p>
            </UIContainer>
          </div>
        </div>
        <div
          class="h-[515px] 2xl:h-[715px] relative shrink-0 w-screen snap-start md:w-half-screen 2xl:w-auto"
        >
          <video
            src="../assets/video-ocean.mp4"
            autoplay
            muted
            loop
            class="h-full object-cover w-full"
          ></video>
          <div class="absolute bottom-0 pb-7.5">
            <UIContainer class="space-y-2.5 text-white md:!px-7.5">
              <h1 class="text-lg font-semibold md:text-2xl">
                Движение в воздухе
              </h1>
              <p class="text-base">
                Завораживающее движение частиц создает ощущение присутствия.
              </p>
            </UIContainer>
          </div>
        </div>
      </div>

      <UIContainer class="bg-white">
        <MoleculeSection class="text-primary space-y-5 2xl:space-y-10">
          <h1
            class="text-lg font-semibold md:text-2xl 2xl:text-3xl 2xl:max-w-8.5h"
          >
            Движение вперед, постоянные усилия и совершенствование — вот наш
            менталитет роста
          </h1>
          <p class="text-sm md:text-base+ max-w-[620px]">
            Движение является важной частью нашего менталитета в Kia. Его
            разделяют все сотрудники на всех уровнях компании.
          </p>
        </MoleculeSection>
      </UIContainer>

      <div class="bg-white relative">
        <img
          :src="src('ae7dcd8f-2b2c-4b75-b0c6-6c5527e80b58')"
          alt="${0}"
          class="w-full object-cover max-h-[951px] max-w-[1440px] mx-auto"
        />
        <div
          class="2xl:absolute 2xl:bottom-0 2xl:max-w-[1440px] left-1/2 -translate-x-1/2 2xl:flex 2xl:justify-end w-full"
        >
          <UIContainer
            class="text-sm text-primary space-y-4 pt-6 pb-12 md:pt-10 md:pb-15 md:text-base+ 2xl:bg-white 2xl:max-w-[620px] 2xl:m-0"
          >
            <p>
              У Kia долгая история производства автомобилей. Но если быть
              точнее, мы начали в 1944 году с производства велосипедов.
            </p>
            <p>
              С тех пор вот уже 75 лет мы приводим людей в движение.
              Мы с гордостью предоставляем решения, которые помогают людям
              перемещаться из одной точки в другую, объединяя людей друг
              с другом физически и эмоционально.
            </p>
            <p>
              Как вы видите, <mark light
                >движение всегда было в сердце нашего бренда,</mark
              >
              а передвижение людей в основе нашего бизнеса, и это
              так и останется в будущем, независимо от любых изменений в нашей
              отрасли.
            </p>
          </UIContainer>
        </div>
      </div>

      <div class="text-primary bg-white 2xl:pt-1h relative">
        <img
          :src="src('f4bc8716-33dc-4792-bd59-f9246173c7e2')"
          class="w-full object-cover max-h-[951px] max-w-[1440px] mx-auto"
        />
        <div
          class="2xl:absolute 2xl:max-w-[1440px] 2xl:w-full 2xl:bottom-0 2xl:left-1/2 2xl:-translate-x-1/2"
        >
          <UIContainer
            class="bg-background 2xl:max-w-[620px] 2xl:m-0 2xl:bg-transparent text-primary 2xl:text-white"
          >
            <MoleculeSection
              section-title="Креативное мышление, инновации и прогресс — наш жизненный менталитет"
              subtitle="ЦЕННОСТИ"
              class="pt-6"
            >
              <template #title="{ sectionTitle, subtitle }">
                <div class="space-y-2.5">
                  <p
                    class="text-disabled uppercase text-xs+ md:text-xs-long 2xl:text-xs+"
                  >
                    {{ subtitle }}
                  </p>
                  <h1 class="text-lg font-semibold md:text-2xl 2xl:text-3xl">
                    {{ sectionTitle }}
                  </h1>
                </div>
              </template>
              <p class="mt-5 text-sm md:text-base+ 2xl:mt-10">
                Мы верим в то, что эти ценности находят отклик в наших
                потребителях. Людях с прогрессивным мировоззрением,
                оптимистичных и позитивных, готовых меняться и адаптироваться к
                будущему, которые движимы новыми идеями и во всем видят
                возможности. <br />
                <br />

                Честно отвечать на вопрос «Для чего» — это критически важно,
                чтобы достигать цель нашего бренда. Быть брендом, который
                воплощает это видение и следовать ему каждый день — это то,
                с чего мы все начинаем.
              </p>
            </MoleculeSection>
          </UIContainer>
        </div>
      </div>

      <UIContainer class="bg-white">
        <MoleculeSection
          section-title="В Kia мы верим, что движение вдохновляет на идеи. Именно поэтому мы создаем пространство, где вы можете обретать вдохновение и получать больше времени на воплощение своих идей в жизнь"
          subtitle="ЦЕЛЬ"
          class="pt-6"
        >
          <template #title="{ sectionTitle, subtitle }">
            <div class="space-y-2.5">
              <p
                class="text-disabled uppercase text-xs+ md:text-xs-long 2xl:text-xs+"
              >
                {{ subtitle }}
              </p>
              <h1
                class="text-lg font-semibold md:text-2xl 2xl:text-3xl 2xl:max-w-8.5h"
              >
                {{ sectionTitle }}
              </h1>
            </div>
          </template>
          <p class="mt-5 text-sm md:text-base+ 2xl:mt-10 2xl:max-w-[620px]">
            Это и есть цель существования нашего бренда. Мы создаем
            пространства, где вы сможете вдохновляться, и не только благодаря
            нашим продуктам, но и находясь в наших шоурумах, где вы получите
            опыт взаимодействия с нашими продуктами. <br />
            <br />
            Кроме того, мы существуем, чтобы предоставлять значимые и удобные
            услуги, которые освобождают вам время на то, что вас больше всего
            вдохновляет, например, общение с семьей и друзьями, путешествия или
            просто отдых.
          </p>
        </MoleculeSection>
      </UIContainer>

      <UIContainer class="space-y-2 bg-white md:flex-center">
        <div class="flex-center">
          <img
            :src="src('67ecc4c2-5688-4285-a210-b0e94e4ff141')"
            alt="${0}"
            class="w-full"
          />
          <button class="absolute md:hidden">play button</button>
        </div>
        <div
          class="md:absolute md:h-[243px] md:flex md:flex-col md:justify-end md:text-white md:text-center 2xl:h-[164px]"
        >
          <button class="hidden md:block">play button</button>
          <h2 class="text-xs font-semibold md:text-2xl md:mt-7.5 2xl:text-3xl">
            Inspired by nature
          </h2>
          <p class="text-xs md:text-base md:mt-1.5 2xl:mt-2.5 2xl:text-lg">
            Новые ценности, цели и философия дизайна
          </p>
        </div>
      </UIContainer>

      <UIContainer class="bg-white">
        <MoleculeSection
          section-title="С новым Kia мы выходим за рамки производителя автомобилей и становимся брендом новой эпохи мобильности"
          class="pt-6"
        >
          <template #title="{ sectionTitle, subtitle }">
            <div class="space-y-2.5">
              <p
                class="text-disabled uppercase text-xs+ md:text-xs-long 2xl:text-xs+"
              >
                {{ subtitle }}
              </p>
              <h1
                class="text-lg font-semibold md:text-2xl 2xl:text-3xl 2xl:max-w-8.5h"
              >
                {{ sectionTitle }}
              </h1>
            </div>
          </template>
          <div
            class="mt-5 space-y-4 md:mt-7.5 2xl:mt-10 2xl:space-y-10 2xl:max-w-[620px]"
          >
            <p class="text-sm md:text-base+">
              Брендом, который понимает потребности людей в решениях мобильности
              не только с точки зрения продуктов, но и с точки зрения услуг,
              и предлагает удобные услуги, учитывая самый ценный ресурс каждого
              человека — время.
            </p>
            <p class="text-sm md:text-base+">
              <b
                >И это не просто слова, это цель бренда, которую мы будем
                реализовывать и руководствоваться ей во всем, что мы делаем.</b
              >
            </p>
          </div>
        </MoleculeSection>
      </UIContainer>

      <img
        :src="
          src('a62a2ac6-fcd1-4954-8450-cb6178a7c0a3', { quality: 'lightest' })
        "
        class="w-full object-cover max-h-[951px] max-w-[1440px] mx-auto"
      />

      <MoleculeSection class="bg-white space-y-4 md:space-y-8">
        <h1
          class="text-center text-lg font-semibold md:text-4xl 2xl:text-5xl md:max-w-6.5 2xl:max-w-5.5h mx-auto"
        >
          Представители компании про новый бренд Kia
        </h1>

        <div
          class="flex px-[--padding-x] gap-x-[--padding-x] overflow-auto snap-x snap-mandatory md:gap-x-7.5 no-scrollbar 2xl:grid 2xl:grid-cols-4 2xl:grid-x-10 2xl:gap-x-10"
          :style="{
            '--container-width': bounding.width.value + 'px',
            '--container-width-md':
              (bounding.width.value - bounding.x.value) / 2 + 'px',
            '--padding-x': bounding.x.value + 'px',
          }"
        >
          <div
            v-for="i in 4"
            :key="i"
            class="space-y-4 shrink-0 w-[--container-width] md:w-[--container-width-md] snap-center 2xl:w-auto"
          >
            <div>
              <div>
                <img
                  :src="src('c0cda4b4-ca9f-4509-a9ec-acec3c9a886b')"
                  alt=""
                />
              </div>

              <div class="p-4 bg-background">
                <h2 class="text-sm font-semibold">
                  Часть I: Полная трансформация
                </h2>
              </div>
            </div>
          </div>
        </div>
      </MoleculeSection>

      <div class="bg-white relative">
        <img
          :src="src('57407d62-cc4a-4da7-a822-d401c3faf773')"
          class="w-full object-cover max-h-[951px] max-w-[1440px] mx-auto"
          alt=""
        />
        <div
          class="md:absolute md:bottom-0 md:max-w-[1440px] w-full md:flex md:justify-end 2xl:left-1/2 2xl:-translate-x-1/2"
        >
          <UIContainer class="md:text-white md:max-w-[540px] md:m-0">
            <MoleculeSection>
              <h2 class="text-lg font-semibold md:text-2xl">
                Label Kia адаптируется к меняющемуся миру вокруг нас.
                Мы вдохновлены изменениями, которые происходят вокруг нас, и
                приглашаем вас присоединиться к нам для создания будущего
              </h2>
            </MoleculeSection>
          </UIContainer>
        </div>
      </div>

      <MoleculeSection class="bg-white">
        <h2
          class="container text-lg font-semibold text-primary md:text-2xl 2xl:text-3xl"
        >
          Подробнее о Kia
        </h2>
        <div
          class="no-scrollbar p-[--padding] mt-6 snap-x space-y-9 overflow-auto 2xl:container md:flex md:gap-x-10 md:space-y-0 2xl:snap-none"
          :style="{ '--padding': `0 ${bounding.x.value}px` }"
        >
          <div
            v-for="slide in extraLinksCard"
            :key="slide.title"
            class="relative mx-auto flex h-[208px] max-w-[310px] snap-center justify-center md:mx-0 md:w-[310px] md:max-w-none md:shrink-0 2xl:h-[265px] 2xl:w-[400px] 2xl:snap-none"
          >
            <img :src="slide.image" class="h-full" loading="lazy" />
            <div class="absolute bottom-0 z-10 w-full p-4 md:px-7.5 md:py-5">
              <p class="text-base font-semibold text-white md:text-2xl">
                {{ slide.title }}
              </p>
            </div>
          </div>
        </div>
      </MoleculeSection>
    </div>
  </div>
</template>
