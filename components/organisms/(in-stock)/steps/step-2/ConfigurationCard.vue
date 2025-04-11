<script setup lang="ts">
import type { Configuration } from '~/server/api/models/[id]/index.get';

interface Props {
	configuration: Configuration | undefined,
	selected?: boolean
}

defineEmits<{
	showAllFeatures: [],
	choose: [string]
}>()

defineProps<Props>()
</script>
<template>
	<div v-if="configuration"
		class="space-y-6 p-6 border-2 border-transparent relative bg-background cursor-pointer"
		@click="$emit('choose', configuration.id)" :class="{ '!border-primary': selected }">
		<div class="space-y-5">
			<div class="flex gap-x-3 md:gap-x-6">
				<div class="flex items-center justify-center">
					<button class="flex items-center justify-center rounded-full size-10 border-2 border-primary
						" :class="{ 'bg-primary': selected }">
						<UICheckIcon v-if="selected" class="text-white" />
					</button>
				</div>
				<div class="space-y-1 md:max-w-2.5h">
					<h3 class="text-base font-semibold md:text-lg">{{ configuration.name }}</h3>
					<p class="text-sm md:text-base">{{ configuration.engine }}
					</p>
				</div>
			</div>
			<div v-if="selected" class="space-y-3 md:pl-15">
				<p v-for="feature in configuration.feature_groups.map((g) => g.features).flat().slice(0, 5)"
					:key="feature.id" class="text-sm md:text-base">{{ feature.name }}</p>
			</div>
			<button v-if="selected" class="flex items-center md:ml-15" @click.prevent="$emit('showAllFeatures', )">
				<span class="text-sm font-semibold">Показать все</span>
				<UITickToRight class="size-5" />
			</button>
		</div>

		<hr class="bg-protection md:hidden">

		<div class="space-y-1 md:absolute md:!mt-0 md:top-6 md:right-6 md:text-right">
			<h1 class="text-base font-semibold md:text-lg">{{ formatPrice(configuration.price) }}</h1>
			<p v-if="configuration.compare_price" class="text-sm md:text-base">С учетом выгод {{
				formatPrice(configuration.compare_price - configuration.price) }}
			</p>
		</div>
	</div>
</template>
