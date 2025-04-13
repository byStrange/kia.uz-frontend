<script setup lang="ts">
import type { InstallmentPlan } from '~/server/api/models/[id]/index.get';

defineProps<{ selected: boolean, installmentPlan: InstallmentPlan | undefined, isDisabled?: () => boolean }>()
defineEmits<{
	select: [id: string],
	showDetail: [id: string]
}>()
</script>
<template>
	<div
v-if="installmentPlan"
		class="p-4 transition-all cursor-pointer flex flex-col bg-background border-2 border-transparent space-y-6 2xl:flex-row 2xl:items-center 2xl:space-y-0 2xl:justify-between 2xl:gap-x-6"
		:class="{ '!border-primary': selected, 'pointer-events-none opacity-50': isDisabled ? isDisabled() : false, }">
		<div class="flex items-center gap-x-3">
			<div class="flex items-center justify-center">
				<button
class="flex items-center justify-center rounded-full size-10 border-2 border-primary
						" :class="{ 'bg-primary': selected }">
					<UICheckIcon v-if="selected" class="text-white" />
				</button>
			</div>
			<div>

				<UIDesktopOnly>
					<h5 class="text-sm md:text-base 2xl:text-xs 2xl:text-caption">Срок</h5>
				</UIDesktopOnly>
				<h2 class="text-base font-semibold">{{ installmentPlan.months }} months</h2>
			</div>
		</div>
		<div class="space-y-3 md:space-y-2 2xl:flex 2xl:space-y-0 flex-1 2xl:gap-x-7.5">
			<div class="md:flex md:justify-between 2xl:flex-col space-y-1">
				<h5 class="text-sm md:text-base 2xl:text-xs 2xl:text-caption">Первоначальный платеж</h5>
				<p class="text-base font-semibold">
					{{ formatPrice(installmentPlan.prepayment_calculated) }} ({{
						installmentPlan.minimum_prepayment }}%)</p>
			</div>

			<div class="md:flex md:justify-between 2xl:flex-col space-y-1">
				<h5 class="text-sm md:text-base 2xl:text-xs 2xl:text-caption">Ежемесячный платеж </h5>
				<p class="text-base font-semibold">{{ formatPrice(installmentPlan.monthly_payment || 0)
					}}</p>
			</div>
			<div class="md:flex md:justify-between 2xl:flex-col space-y-1 ">
				<h5 class="text-sm md:text-base 2xl:text-xs 2xl:text-caption">Страхование в год</h5>
				<p class="text-base font-semibold">0 UZS</p>
			</div>
		</div>
		<button class="flex items-center" @click="$emit('showDetail', installmentPlan.id)">
			<span class="text-base font-semibold 2xl:text-base+">График погашения</span>
			<UITickToRight class="size-5 text-primary" />
		</button>

	</div>
</template>
