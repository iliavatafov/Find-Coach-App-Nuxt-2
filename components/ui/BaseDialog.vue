<template>
  <portal to="body-dialog">
    <div
      v-if="show"
      class="fixed top-0 left-0 h-screen w-full bg-[#000000bf] z-10"
      @click="tryClose"
    ></div>
    <transition name="dialog">
      <dialog
        v-if="show"
        open
        class="fixed z-50 custom-top left-1/10 width-4/5 rounded-xl border-none default-shadow p-0 m-0 overflow-hidden bg-white"
      >
        <header class="bg-[#3a0061] text-white w-full p-4">
          <slot name="header">
            <h2 class="m-0">{{ title }}</h2>
          </slot>
        </header>
        <section class="p-4">
          <slot></slot>
        </section>
        <menu v-if="!fixed" class="p-4 m-0 flex justify-end">
          <slot name="actions">
            <button class="base-btn" @click="tryClose">Close</button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </portal>
</template>

<script>
export default {
  name: 'BaseDialog',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: null,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['close'],
  methods: {
    tryClose() {
      if (this.fixed) {
        return
      }
      this.$emit('close')
    },
  },
}
</script>

<style scoped>
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
