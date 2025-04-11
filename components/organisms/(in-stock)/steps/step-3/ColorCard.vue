<script setup lang="ts">
import type { ModelColor } from '~/server/api/models/[id]/index.get';

interface Props {
	color: ModelColor | undefined,
	selected?: boolean
}

defineEmits<{
	showAllFeatures: [],
	choose: [string]
}>()

defineProps<Props>()
</script>
<template>
	<div
v-if="color" class="space-y-6 p-6 border-2 border-transparent relative bg-background cursor-pointer"
		:class="{ '!border-primary': selected }" @click="$emit('choose', color.id)">
		<div class="space-y-5">
			<div class="flex gap-x-3 md:gap-x-6">
				<div class="flex items-center justify-center">
						<button
class="flex items-center justify-center rounded-full size-10 border-2 border-primary
						" :class="{ 'bg-primary': selected }">
						<UICheckIcon v-if="selected" class="text-white" />
					</button>
				</div>
				<div class="space-y-1 md:max-w-2.5h flex items-center gap-x-3">
					<div class="size-6 bg-[--color] rounded-full" :style="{ '--color': color.code}"></div>
					<h3 class="text-base font-semibold md:text-lg">{{ color.name }}</h3>
				</div>
			</div>
		</div>

		<div v-if="color.add_to_cost" class="space-y-1 md:absolute md:!mt-0 md:top-6 md:right-6 md:text-right">
			<h1 class="text-base font-semibold md:text-lg">{{ color.add_to_cost }}</h1>
		</div>
	</div>
</template>
