<template>
  <button class="base-btn" v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <nuxt-link class="base-btn" v-else :to="to" :class="mode">
    <slot></slot>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: '/',
    },
  },
}
</script>

<style scoped>
.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.green {
  background-color: green;
  color: #fff;
  border: none;
}

.green:hover,
.green:active {
  background-color: #fff;
  border: 2px solid green;
  color: green;
}

.red {
  background-color: red;
  color: #fff;
  border: none;
}

.red:hover,
.red:active {
  background-color: #fff;
  border: 2px solid red;
  color: red;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}
</style>
