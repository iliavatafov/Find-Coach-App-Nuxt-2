<template>
  <base-card>
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <form
      class="m-4 p-4 border border-solid border-gray rounded-3xl"
      @submit.prevent="submitForm"
    >
      <div class="my-2">
        <label class="base-label" for="email">Your E-Mail</label>
        <input
          id="email"
          v-model.trim="email"
          class="base-input"
          type="text"
          :disabled="isAuthenticated"
        />
      </div>
      <div class="my-2">
        <label class="base-label" for="message">Message</label>
        <textarea
          id="message"
          v-model.trim="message"
          class="base-textarea"
          rows="5"
        ></textarea>
      </div>
      <p v-if="!formIsValid" class="fw-bold text-red">
        Please enter a valid input and non-empty message
      </p>
      <div class="text-center mt-5">
        <base-button>Send Message</base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      email: '',
      message: '',
      formIsValid: true,
      isLoading: false,
      error: null,
      hasLoggedInUser: false,
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'getUserEmail']),
    ...mapGetters('breadcrumbs', ['getBreadcrumbs']),
    ...mapGetters('coaches', ['coaches']),
  },
  created() {
    const coachId = this.$route.params.id

    const coach = this.coaches.find((coach) => coach.id === coachId)
    const coachFullName = coach.firstName + ' ' + coach.lastName

    this.setBreadcrumbs([
      { text: 'All Coaches', to: { path: '/coaches' } },
      {
        text: coachFullName,
        to: { path: `/coaches/${coachId}` },
      },
      {
        text: 'Contact',
        to: { path: `/coaches/${coachId}/contact` },
      },
    ])

    // Check is user is authenticated and if it is set the email input with auth user email
    if (this.isAuthenticated) {
      this.email = this.getUserEmail
    }
  },
  methods: {
    ...mapActions('breadcrumbs', ['setBreadcrumbs']),
    async submitForm() {
      this.formIsValid = true
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.message === ''
      ) {
        this.formIsValid = false
        return
      }

      this.isLoading = true

      try {
        // Perform POST request and save the message and email of the sender to the database and in Vuex store
        await this.$store.dispatch('requests/contactCoach', {
          email: this.email,
          message: this.message,
          coachId: this.$route.params.id,
        })
        this.isLoading = false
      } catch (error) {
        this.error = error.message || 'Save data is faild'
        this.isLoading = false
        return
      }

      this.$router.replace('/coaches')
    },
    handleError() {
      this.error = null
    },
  },
}
</script>
