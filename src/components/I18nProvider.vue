<template>
  <slot></slot>
</template>

<script setup>
import { provide } from 'vue';

import { useI18n } from 'vue-i18n';

import { useI18n as useI18nStore } from '@/composables/useI18n';

const i18n = useI18n();

const { setI18n } = useI18nStore();

setI18n(i18n);

provide('i18n', { i18n });
</script>
