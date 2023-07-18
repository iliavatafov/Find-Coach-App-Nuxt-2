<template>
  <base-card>
    <h2 class="my-2">Find Your Coach</h2>
    <span class="mr-4">
      <input
        id="frontend"
        class="align-middle"
        type="checkbox"
        :checked="activeFilters.frontend"
        @change="setFilter"
      />
      <label class="align-middle ml-1" for="frontend">Frontend</label>
    </span>
    <span class="mr-4">
      <input
        id="backend"
        class="align-middle"
        type="checkbox"
        :checked="activeFilters.backend"
        @change="setFilter"
      />
      <label class="align-middle ml-1" for="backend">Backend</label>
    </span>
    <span class="mr-4">
      <input
        id="career"
        class="align-middle"
        type="checkbox"
        :checked="activeFilters.career"
        @change="setFilter"
      />
      <label class="align-middle ml-1" for="career">Career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  computed: {
    activeFilters() {
      return this.$store.getters['coaches/getFilters']
    },
  },
  methods: {
    setFilter(event) {
      // Set filters data depends on user input
      const inputId = event.target.id
      const isActive = event.target.checked

      const updatedFilters = {
        ...this.activeFilters,
        [inputId]: isActive,
      }
      this.$store.dispatch('coaches/setFilter', updatedFilters)
    },
  },
}
</script>
