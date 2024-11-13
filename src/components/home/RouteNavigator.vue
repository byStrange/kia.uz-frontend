<script setup lang="tsx">
import { onMounted } from 'vue';
import { ref } from 'vue';

import { RouteLocationRaw, RouteRecordRaw, useRouter } from 'vue-router';

const router = useRouter();
const routes = router.options.routes;
const isOpen = ref(false);

const changeRoute = (to: RouteLocationRaw) => {
  router.push(to);
  isOpen.value = false;
};

onMounted(() => {
  console.log(routes);
});

const Tree = (props: { node: RouteRecordRaw; depth: number }) => {
  return (
    <div
      style={{ marginLeft: props.depth * 20 + 'px' }}
      class="flex flex-col divide-y divide-red-200"
    >
      <button
        class="bg-slate-200 px-3 py-4 transition-colors hover:bg-slate-300"
        onClick={() =>
          changeRoute({ name: props.node.name, params: { id: 'carnival' } })
        }
      >
        {props.node.name}
      </button>
      {props.node.children?.length &&
        props.node.children.map((node) => (
          <Tree node={node} depth={props.depth + 1} />
        ))}
    </div>
  );
};
</script>

<template>
  <div
    class="text-font-color-primary fixed left-0 top-10 z-50 flex h-[calc(100vh-40px)] items-start overflow-auto"
  >
    <Transition name="slide__right">
      <div class="flex flex-col gap-4" v-if="isOpen">
        <Tree :node="route" v-for="route in routes" :depth="0" />
      </div>
    </Transition>

    <button
      :key="+isOpen"
      class="h-10 w-4 bg-slate-500 opacity-50 transition-all hover:opacity-100"
      :class="{ 'opacity-100': isOpen }"
      @click="isOpen = !isOpen"
    ></button>
  </div>
</template>

<style>
.slide__right-enter-active,
.slide__right-leave-active {
  @apply transition duration-300;
}

.slide__right-enter-from,
.slide__right-leave-to {
  @apply -translate-x-full scale-95 opacity-0;
}
</style>
