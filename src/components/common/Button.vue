<script setup lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "flex items-center justify-center whitespace-nowrap transition-colors outline-none font-semibold",
  variants: {
    color: {
      primary:
        "bg-white focus:ring ring-primary-300 ring-offset-2 ring-offset-white text-semantic-text",
      secondary:
        "bg-semantic-primary text-white bg-opacity-40 hover:bg-opacity-100",
      transparent:
        "bg-transparent text-white bg-opacity-60 hover:bg-opacity-100 border border-city-gray",
      danger:
        "bg-secondary text-white focus:ring focus:ring-secondary-300 ring-offset-2 ring-offset-white",
    },
    size: {
      sm: "px-2 py-2 text-sm md:py-3",
      md: "px-3  py-2.5 text-base md:py-4.5 md:px-10",
      "md+": "px-3  py-3 text-base md:py-4",
    },
    mode: {
      full: "w-full",
      normal: "w-auto",
    },
    corner: {
      normal: "",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
    corner: "normal",
    mode: "normal",
  },
});

type ButtonVariants = VariantProps<typeof button>;

defineProps<{
  color?: ButtonVariants["color"];
  size?: ButtonVariants["size"];
  mode?: ButtonVariants["mode"];
  corner?: ButtonVariants["corner"];
  label?: string;
}>();
</script>

<template>
  <button :class="button({ color, size, mode, corner })">
    <slot>{{ label }}</slot>
  </button>
</template>
