<script setup lang="ts">
import { DataTable, Column } from 'primevue'

const { paddingTop } = useSafeArea()

const { bounding } = useContainer()

const { src } = useUploadcareSource()



const htmlString = `<h1 class="text-primary font-semibold text-lg md:text-2xl 2xl:text-5xl">Успей приобрести авто своей мечты на выгодных условиях</h1>
<p class="text-primary text-base">Предложение действует до 31/10/2024 на&nbsp;модели <strong>Sorento, K8, Cerato, Seltos и&nbsp;Bongo</strong>&nbsp;</p>
<p>&nbsp;</p>
<table style="border-collapse: collapse; width: 100%; border-width: 1px; border-style: dashed;" border="1"><colgroup><col style="width: 14.2469%;"><col style="width: 14.2469%;"><col style="width: 14.2469%;"><col style="width: 14.2469%;"><col style="width: 14.2469%;"><col style="width: 14.2469%;"><col style="width: 14.2469%;"></colgroup>
<thead>
<tr>
<td>yes please</td>
<td>another header</td>
<td>another one</td>
<td>different</td>
<td>yes</td>
<td>good</td>
<td>okay</td>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>ogo</td>
<td>sdf</td>
<td>dfsd</td>
<td>asdf</td>
<td>asdf</td>
<td>asdf</td>
</tr>
<tr>
<td>asdf</td>
<td>qsdf</td>
<td>asdf</td>
<td>thre</td>
<td>sdf</td>
<td>ds</td>
<td>dfsd</td>
</tr>
<tr>
<td>sdf</td>
<td>sdf</td>
<td>dfsf</td>
<td>dsfasdf</td>
<td>dsfad</td>
<td>sd</td>
<td>sdf</td>
</tr>
<tr>
<td>sdfasdf</td>
<td>sdfadsf</td>
<td>sdfasdf</td>
<td>sdfasdfgd</td>
<td>dgg</td>
<td>fgfgsdf</td>
<td>dd</td>
</tr>
</tbody>
</table>`
const fields = ref()
const values = ref()
const blocks = ref()

onMounted(() => {
  const res = useTableRenderer(htmlString)
  blocks.value = useHTMLRenderer(htmlString)
  if (res) {
    fields.value = res.fields
    values.value = res.body
  }
})



</script>

<template>
  <div>
    <div
      class="h-5h overflow-hidden grid place-items-end md:place-items-start md:pt-[--safe-area-padding-top] md:h-[420px] 2xl:h-6h 2xl:place-items-end relative"
      :style="{
        '--safe-area-padding-top': paddingTop,
      }">
      <div
        class="shadowman absolute w-full h-full top-0 left-0 z-10 bg-[image:--gradient] md:bg-[image:none] md:bg-primary md:bg-opacity-60"
        :style="{
          '--gradient':
            'linear-gradient(180deg, rgba(8, 20, 30, 0.4) 0%, rgba(8, 20, 30, 0.589696) 40.99%, #08141E 65.6%)',
        }"></div>
      <picture>
        <source
media="(min-width: 1600px)" :srcset="src(
          'c4cf135d-9589-487e-b461-bdaa8c182d02',
          {
            crop: '1439x692/0,258',
            preview: '3000x3000/438b1403d5a9198cef0a0d3906f6c60c',
            format: '',
            quality: '',
          },
          false,
        )
          " />
        <source
:srcset="src('d3ca786f-29fa-45ac-b5de-ef5da8f64557', { preview: '1440x600' })
          " media="(min-width: 1440px)" />
        <source
:srcset="src('16c972c6-01c4-4aa4-a695-ec1552e6303d', { preview: '768x420' })
          " media="(min-width: 768px)" />
        <img
class="w-full absolute top-0 left-0 h-2/3 object-cover md:h-auto" :src="src('a9a133a8-6bb2-4862-b3e4-d0053e85fa44', { preview: '375x490' })
          " />
      </picture>
      <div
class="!px-0 py-5 absolute left-[--left] top-[--safe-area-padding-top] hidden 2xl:block z-20"
        :style="{ '--left': bounding.x.value + 'px' }">
        <MoleculeBreadcrumb theme="light" />
      </div>
      <div
        class="container py-10 md:h-[360px] md:flex md:flex-col md:justify-between md:items-start 2xl:h-auto 2xl:pt-10 2xl:pb-20 relative z-20">
        <div class="text-white space-y-4 md:max-w-5h md:space-y-3 2xl:max-w-7.25h">
          <h1 class="text-3xl md:text-4xl 2xl:text-5xl">
            Выгода до 94 880 000 сум: Sorento, K8, Cerato, Seltos и Bongo
          </h1>
          <p class="text-base 2xl:text-lg">
            Предложение действует до 31/10/2024
          </p>
        </div>
        <AtomButton label="Заказать обратный звонок" color="secondary" mode="full" class="mt-4 2xl:mt-10" />
      </div>
    </div>

    <UIContainer class="prose pt-10 2xl:pt-20 pb-10">
      <template v-for="(block, index) in blocks">
        <div v-if="block.type == 'html'" :key="index + block.type" class="!max-w-[1060px] mx-auto" v-html="block.html">
        </div>
        <div v-else-if="block.type == 'table'" :key="index">
          <DataTable
:value="block.options.body" striped-rows
            :style="{ '--container-width': bounding.width.value + 'px' }">
            <Column
v-for="field in block.options.fields" :key="field.field" :field="field.field" :header="field.label"
              header-class="min-w-[calc(var(--container-width)/2)] md:min-w-[calc(var(--container-width)/3)] 2xl:min-w-[213px]" />
          </DataTable>
        </div>
      </template>

    </UIContainer>

  </div>
</template>

<style>
.p-datatable th,
.p-datatable td {
  @apply text-primary;
}

.p-datatable.p-datatable-striped .p-datatable-tbody>tr.p-row-odd {
  @apply !bg-transparent;
}

.p-datatable.p-datatable-striped .p-datatable-tbody>tr.p-row-even {
  @apply bg-background;
}
</style>
