<script setup lang="ts">
import { useSvgAnnotator } from '~/composables/useSvgAnnotator';

const { src } = useUploadcareSource()
const { svgRef, addConnector, getSvgPoint, connectors, generatePath, removeConnector, opts } = useSvgAnnotator({
  breakPointOffset: 50,
  animationDuration: 500,
  lineColor: 'gray',
  lineWidth: 1,
  dotRadius: 12
})

const connectorIds = computed(() => {
  return connectors.value.map((c) => c.id);
})

const handlePartClick = ([startingPointX, startingPointY]: [number, number], x: number, y: number) => {
  const targetPoint = getSvgPoint(x, y)
  if (targetPoint) {
    for (let i = 0; i < connectorIds.value.length; i++) {
      removeConnector(connectorIds.value[i])
    }
    const connectorId = addConnector(
      { x: startingPointX, y: startingPointY }, // Start point (from part list)
      targetPoint // End point (on car image)
    )
    console.log(connectorId);
  }
}

definePageMeta({
  lockHover: true
})
</script>
<template>
  <UISafeAreaView class="min-h-screen">
    <!--<svg ref="svgRef" width="800" height="600">
       Your car image 
      <image :href="src('01fc1d59-8aeb-4a9c-84bf-897061f6c7c8')" width="100%" height="100%" @click="(event) => {
        handlePartClick([50, 400], event.clientX, event.clientY)
      }" />
      <template v-for="connector in connectors" :key="connector.id">
        <g>
          <path :d="generatePath(connector)" :stroke="opts.lineColor ? opts.lineColor : 'currentColor'"
            :stroke-width="opts.lineWidth" fill="none" stroke-dasharray="1000"
            :stroke-dashoffset="1000 * (1 - connector.progress)" class="transition-all"
            :style="{ transitionDuration: opts.animationDuration + 'ms' }" />
          <circle :cx="connector.end.x" :cy="connector.end.y" :r="opts.dotRadius" fill="#E4BC1A" class="blur-sm" :style="{
            opacity: connector.progress,
            transition: 'opacity 500ms'
          }" />
        </g>
      </template>
</svg> -->

    <div>
      <div>
        <div>
          <h1>Запчасти</h1>
          <p>Производитель обеспечивает своих дилеров необходимым количеством запчастей, деталей и комплектующих для
            профессионального ремонта. Оригинальные запчасти обеспечивают высокое качество ремонтных и сервисных работ.
          </p>
        </div>
        <div>
          <div>
            <p>Безопасность превыше всего</p>
          </div>
          <div>
            <p>Надежность, проверенная исследованиями</p>
          </div>
        </div>
      </div>
    </div>
  </UISafeAreaView>
</template>
