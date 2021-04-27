<template>
  <hr :style="{ width }" />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    seek: { type: Number, default: 0 },
    check: { type: Boolean, default: true },
  },
  setup(props) {
    const width = computed(() => (props.check ? props.seek * 100 + "%" : "0"));
    return { width };
  },
});
</script>

<style lang="scss">
.seeker {
  position: relative;
}
</style>

<style lang="scss" scoped>
hr {
  padding: 0;
  background-color: var(--color-text);
  border-radius: $border-radius $border-radius 0 0;
  height: $border-radius;
  position: absolute;
  left: 0;
  top: 0;
  transition: 0.4 * $transition;
}
</style>
