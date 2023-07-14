<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option">
      <input
        id="frontend"
        type="checkbox"
        :checked="activeFilters.frontend"
        @change="setFilter"
      />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input
        id="backend"
        type="checkbox"
        :checked="activeFilters.backend"
        @change="setFilter"
      />
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input
        id="career"
        type="checkbox"
        :checked="activeFilters.career"
        @change="setFilter"
      />
      <label for="career">Career</label>
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

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
