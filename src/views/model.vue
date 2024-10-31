<script setup lang="tsx">
import { useHeaderService } from '@/services/headerService';
import { onMounted, ref } from 'vue';

import SafeAreaView from '@/components/layout/SafeAreaView.vue';
import BreadCrumbs from '@/components/common/BreadCrumbs.vue';
import DropdownInput from '@/components/common/DropdownInput.vue';
import InfoIcon from '@/components/icons/20x20/InfoIcon.vue';
const { headerService } = useHeaderService();

const availableOptions = ref([
  { label: 'Carens', value: 'car' },
  { label: 'Carnival', value: 'carnival' },
  { label: 'Ceed', value: 'ceed' },
  { label: 'Ceed GT', value: 'ceed-gt' },
  { label: 'Ceed SW', value: 'ceed-sw' },
  { label: 'Carnival', value: 'carnival' },
  { label: 'Seed', value: 'seed' },
  { label: 'Seed', value: 'seed' },
  { label: 'Seed', value: 'seed' },
  { label: 'Seed', value: 'seed' },
]);

const selectedOption = ref(null);

onMounted(() => {
  headerService.value.lockHover = true;
});

const modelGroups = ref([
  {
    label: 'Новинки',
    models: [
      {
        name: 'K5',
        image: '',
        from: '379 900 000 сум',
        benefitUpto: '90 000 000 сум',
      },
    ],
  },
]);

const ModelCard = ({ model }: { model: any }) => {
  return (
    <div>
      <img src={model.image} class="h-full w-full object-cover" />
      <div>
        <h2 class="text-lg font-medium text-primary">{model.name}</h2>
        <p class="mt-1.5 flex gap-3 text-primary">
          от {model.from}
          <InfoIcon class="text-disabled" />
        </p>
        <p class="text-caption">выгода до {model.benefitUpto}</p>
      </div>
    </div>
  );
};
ModelCard({ model: { name: 'K5', image: '', from: '379 900 000 сум' } });
modelGroups;
</script>

<template>
  <SafeAreaView class="bg-white">
    <div class="container">
      <BreadCrumbs class="mt-6 hidden 2xl:block" />
      <div class="pb-5 pt-10">
        <h1 class="text-3xl font-semibold text-primary">Все модели Kia</h1>
        <DropdownInput
          v-model:selectedOption="selectedOption"
          v-model:availableOptions="availableOptions"
        />
      </div>
    </div>
  </SafeAreaView>
</template>
