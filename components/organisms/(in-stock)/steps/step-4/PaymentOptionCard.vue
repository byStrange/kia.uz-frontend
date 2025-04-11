<template>
	<div class="p-4 transition-colors flex flex-col bg-background border-2 border-transparent" :class="{ '!border-primary': selected }">
		<div class="flex items-center mb-4 gap-x-3">
			<div class="flex items-center justify-center">
				<button
class="flex items-center justify-center rounded-full size-10 border-2 border-primary
						" :class="{ 'bg-primary': selected }">
					<UICheckIcon v-if="selected" class="text-white" />
				</button>
			</div>
			<h2 class="text-base font-medium">{{ option.title }}</h2>
		</div>

		<div class="text-xl font-bold mb-1">{{ formatPrice(option.mainAmount) }} сум</div>
		<div class="text-sm text-gray-500 mb-4">{{ option.mainDescription }}</div>

		<template v-if="option.additionalInfo && option.additionalInfo.length > 0">
			<div v-for="(info, index) in option.additionalInfo" :key="index" class="mt-2">
				<div class="text-sm">от {{ formatPrice(info.amount) }} сум</div>
				<div class="text-xs text-gray-500">{{ info.description }}</div>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
interface AdditionalInfo {
	amount: number;
	description: string;
}

interface PaymentOption {
	id: string;
	title: string;
	mainAmount: number;
	mainDescription: string;
	additionalInfo?: AdditionalInfo[];
}

defineProps<{
	option: PaymentOption;
	selected: boolean;
}>();

defineEmits<{
	(e: 'select', id: string): void;
}>();
</script>
