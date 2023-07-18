<template>
  <div>
    <base-dialog
      :show="error.isError"
      title="An error occured"
      @close="handleError"
    >
      <p>
        {{ error.msg }}
      </p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form class="p-4 m-4" @submit.prevent="submitForm">
        <div class="my-2">
          <label class="base-label" for="email">E-Mail</label>
          <!-- eslint-disable-next-line vue/max-attributes-per-line -->
          <input
            id="email"
            v-model.trim="email"
            class="base-input"
            type="email"
          />
        </div>
        <div class="my-2">
          <label class="base-label" for="password">Password</label>
          <!-- eslint-disable-next-line vue/max-attributes-per-line -->
          <input
            id="password"
            v-model.trim="password"
            class="base-input"
            type="password"
          />
        </div>
        <p v-if="!formIsValid">
          Please enter valid email and password (must be at least 6 characters
          long)
        </p>
        <button class="base-btn">
          {{ submitButtonCaption }}
        </button>
        <button
          type="button"
          class="text-purple no-underline py-3 px-6 hover:bg-violet hover:border hover:border-solid hover:border-purple hover:text-purple cursor-pointer rounded-3xl mr-2 inline-block"
          @click="switchAuthMode"
        >
          {{ switchModeButtonCaption }}
        </button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  middleware: 'not-auth',
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: {
        msg: null,
        isError: false,
      },
    }
  },
  computed: {
    submitButtonCaption() {
      // set submit button caption based on the mode
      if (this.mode === 'login') {
        return 'Login'
      } else {
        return 'Signup'
      }
    },
    switchModeButtonCaption() {
      // Set switch button caption based on the mode
      if (this.mode === 'login') {
        return 'Signup instead'
      } else {
        return 'Login instead'
      }
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false
        return
      }

      this.isLoading = true

      const actionPayload = {
        email: this.email,
        password: this.password,
      }

      try {
        // Perform POST request based on the mode if login mode, login request if singup, register request
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPayload)
        } else {
          await this.$store.dispatch('signup', actionPayload)
        }
        this.$router.replace('/coaches')
      } catch (error) {
        this.error.isError = true
        this.error.msg = error.message || 'Faild to authenticate, try later.'
      }

      this.isLoading = false
    },

    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'singup'
      } else {
        this.mode = 'login'
      }
    },
    handleError() {
      this.error = {
        msg: null,
        isError: false,
      }
    },
  },
}
</script>

<style scoped>
p {
  color: red;
}
</style>
