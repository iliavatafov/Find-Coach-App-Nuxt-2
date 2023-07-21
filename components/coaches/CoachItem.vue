<template>
  <li class="my-4 border border-solid border-gray-700 rounded-lg p-4">
    <h3 id="name" class="text-lg font-bold my-2">{{ fullName }}</h3>
    <h4 class="my-2">${{ rate }}/hour</h4>
    <div class="my-2">
      <base-badge
        v-for="area of areas"
        :key="area"
        :type="area"
        :title="area"
        class="base-badge"
      ></base-badge>
    </div>
    <div class="flex justify-end my-2">
      <nuxt-link class="outline base-btn" :to="coachContactLink"
        >Contact</nuxt-link
      >
      <nuxt-link class="details-link base-btn" :to="coachDetailsLink"
        >View Details</nuxt-link
      >
    </div>
  </li>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: null,
    },
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    rate: {
      type: Number,
      default: null,
    },
    areas: {
      type: Array,
      default: null,
    },
  },
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName
    },
    coachContactLink() {
      return this.$route.path + '/' + this.id + '/contact'
    },
    coachDetailsLink() {
      return this.$route.path + '/' + this.id
    },
  },
}
</script>

<style>
.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.outline:hover,
.outline:active {
  background-color: #edd2ff;
}
</style>
