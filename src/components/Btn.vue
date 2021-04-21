<template>
  <button :class="{ highlight: isOn }">
    <p v-if="icon" class="icon">{{ icon }}</p>
    <p v-if="text">{{ text }}</p>
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    icon: { type: String, default: "" },
    text: { type: String, default: "" },
    isOn: Boolean,
  },
});
</script>
