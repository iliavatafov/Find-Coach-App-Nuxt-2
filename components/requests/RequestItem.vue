<template>
  <li class="my-4 border border-gray-300 p-4">
    <div>
      <a
        class="text-[#3d008d] underline-none font-bold hover:text-[#8d007a] active:text-[#8d007a]"
        :href="emailLink"
        >{{ email }}</a
      >
    </div>
    <p class="mt-2 mb-0">{{ message }}</p>
  </li>
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      default: null,
    },
  },
  computed: {
    emailLink() {
      return 'mailto:' + this.email
    },
  },
}
</script>
