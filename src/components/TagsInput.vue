<template>
  <input v-model="text" type="text" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ContextEditor",
  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const text = computed({
      get: () => props.modelValue.join(" "),
      set: (t) => emit("update:modelValue", t.split(" ")),
    });
    return { text };
  },
});
</script>
