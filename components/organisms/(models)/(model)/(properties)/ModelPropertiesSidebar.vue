<script setup lang="ts">
import type { ModelLandingPage } from '~/server/api/models/[id]/index.get';
import type { ModelPropertiesPage } from '~/server/api/models/[id]/properties.get';

const { bounding } = useContainer()
const modelData = useSharedPageData<ModelLandingPage>()

const props = defineProps<{
	configurations: ModelPropertiesPage['configurationWithEngines'] | null,
}>()

const emit = defineEmits(['update:filteredData'])

const selectedEngines = ref<string[]>([])

// Combined watcher that handles all filters together
watch([selectedEngines,], () => {
	if (!props.configurations) return

	let filteredConfigurations = [...props.configurations]

	// Apply engine filter if any engines are selected
	if (selectedEngines.value.length > 0) {
		filteredConfigurations = filteredConfigurations.filter(config =>
			selectedEngines.value.includes(config.engine || '')
		)
	}

	emit('update:filteredData', filteredConfigurations)
})

</script>
<template>
	<div class="col-span-3 bg-background border-r border-r-protection pl-[--padding-x] pb-15"
		:style="{ '--padding-x': bounding.x.value + 'px' }">
		<div class="py-5">
			<h3 class="text-base font-semibold">Двигатель</h3>
			<ul class="space-y-2.5 mt-4">
				<li v-for="engine in modelData?.model.engines" :key="engine.id" class="flex gap-2">
					<PrimeCheckbox v-model="selectedEngines" :input-id="'engineInput' + engine.id"
						:value="engine.name + ' / ' + engine.desc" />
					<label :for="'engineInput' + engine.id" class="text-base">{{ engine.name + " / "
						+ engine.desc }}</label>
				</li>
			</ul>
		</div>
	</div>
</template>
