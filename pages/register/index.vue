<template>
  <div>
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-spinner v-if="isLoading"></base-spinner>
    <section v-else>
      <base-card>
        <h2 class="font-bold text-xl">Register as a coach now!</h2>
        <coach-form @save-data="saveData"></coach-form>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachForm from '~/components/coaches/CoachForm.vue'

export default {
  components: {
    CoachForm,
  },
  middleware: 'auth',
  data() {
    return {
      isLoading: false,
      error: null,
    }
  },
  methods: {
    async saveData(data) {
      this.isLoading = true
      try {
        // Add new coach to the database and set newly created coach to Vuex store
        await this.$store.dispatch('coaches/registerCoach', data)
        this.isLoading = false
        this.$router.replace('/coaches')
      } catch (error) {
        this.error = error.message || 'Save data is faild'
        this.isLoading = false
      }
    },
    handleError() {
      this.error = null
    },
  },
}
</script>
