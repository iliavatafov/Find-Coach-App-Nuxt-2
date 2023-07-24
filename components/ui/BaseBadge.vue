<template>
  <span
    class="px-6 py-2 bg-[#ccc] text-[#252525] rounded-3xl inline-block mr-2"
    :class="type"
  >
    {{ text }}
  </span>
</template>

<script>
export default {
  name: 'BaseBadge',
  props: {
    type: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  },
  computed: {
    text() {
      return this.title.toUpperCase()
    },
  },
}
</script>

<style scoped>
.frontend {
  background-color: #3d008d;
  color: white;
}

.backend {
  background-color: #71008d;
  color: white;
}

.career {
  background-color: #8d006e;
  color: white;
}
</style>
