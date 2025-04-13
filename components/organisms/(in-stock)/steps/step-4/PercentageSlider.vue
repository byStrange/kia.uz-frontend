<template>
	<div class="w-full max-w-3.5h">
		<div class="mb-2">{{ label }}</div>
		<div class="relative">
			<AtomInput
v-model="formattedAmount" label="price" border="full" input-id="price-slider"
				color="secondary" type="text" :input-props="{ onInput: updateAmountFromInput }" />

			<div class="mt-2 relative -translate-y-5">
				<div
class="h-1 w-[--width] bg-primary absolute top-2.5"
					:style="{ '--width': percentagePosition + '%' }"></div>
				<input
v-model.number="percentage" type="range" :min="minPercentage"
					:max="maxPercentage"
					class="w-full cursor-pointer appearance-none h-1 rounded-lg focus:outline-none bg-transparent -translate-y-1 relative z-10"
					@input="updateAmountFromPercentage" />

				<div
class="absolute top-0 h-5 w-5 bg-primary rounded-full transform -translate-x-1/2"
					:style="{ left: `${percentagePosition}%` }"></div>

				<div class="flex justify-between">
					<span class="text-xs text-caption">{{ minPercentage }}%</span>
					<span class="text-sm block translate-y-1 text-primary">{{ percentage }}%</span>
					<span class="text-xs text-caption">{{ maxPercentage }}%</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

interface Props {
	label: string;
	totalAmount: number;
	minPercentage: number;
	maxPercentage: number;
	initialPercentage?: number;
	currency?: string;
}

const props = withDefaults(defineProps<Props>(), {
	initialPercentage: 70,
	currency: 'сум'
});

const emit = defineEmits<{
	'update:amount': [value: number],
	'update:percentage': [value: number]
}>()

const percentage = ref(props.initialPercentage);
const amount = ref(calculateAmount(props.initialPercentage));

function formatNumber(num: number): string {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function calculateAmount(percent: number): number {
	return Math.round((percent / 100) * props.totalAmount);
}

function calculatePercentage(amt: number): number {
	return Math.round((amt / props.totalAmount) * 100);
}

const formattedAmount = computed(() => {
	return formatNumber(amount.value);
});

const percentagePosition = computed(() => {
	return ((percentage.value - props.minPercentage) / (props.maxPercentage - props.minPercentage)) * 100;
});

// Methods
function updateAmountFromPercentage() {
	amount.value = calculateAmount(percentage.value);
	emitUpdates();
}

function updateAmountFromInput(event: Event) {
	const element = event.target as HTMLInputElement
	const parsedValue = parseInt(element.value.replace(/\s/g, ''));
	const p = calculatePercentage(parsedValue)

	if (p < props.minPercentage || p > props.maxPercentage) return;

	if (!isNaN(parsedValue)) {
		amount.value = parsedValue;
		percentage.value = calculatePercentage(parsedValue);
		emitUpdates();
	}
}

function emitUpdates() {
	emit('update:amount', amount.value);
	emit('update:percentage', percentage.value);
}

watch(() => props.totalAmount, () => {
	// Recalculate amount when total changes but keep the same percentage
	amount.value = calculateAmount(percentage.value);
	emitUpdates();
});

watch([amount, percentage], () => {
	console.log('amoutn changed', amount.value)
	emitUpdates()
})

emitUpdates();
</script>

<style scoped>
input[type="range"] {
	-webkit-appearance: none;
	appearance: none;
	height: 2px;
}

input[type="range"]::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	opacity: 0;
}

input[type="range"]::-moz-range-thumb {
	opacity: 0;
}
</style>
