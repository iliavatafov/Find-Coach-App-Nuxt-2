<template>
  <div>
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header class="text-center">
          <h2 class="font-bold text-xl">Requests Received</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul
          v-else-if="hasRequests && !isLoading"
          class="mx-auto my-8 p-0 max-w-[30rem]"
        >
          <request-item
            v-for="req in receivedRequests"
            :key="req.id"
            :email="req.userEmail"
            :message="req.message"
          ></request-item>
        </ul>
        <h3 v-else class="bold text-center">
          You haven't received any requests yet!
        </h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue'

export default {
  components: {
    RequestItem,
  },
  middleware: 'auth',
  data() {
    return {
      isLoading: false,
      error: null,
    }
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/requests']
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests']
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
  },
  created() {
    this.loadRequests()
  },
  methods: {
    async loadRequests() {
      this.isLoading = true
      try {
        // Fetch requests by loggedin user (coach) id and save the data in the Vuex store
        await this.$store.dispatch('requests/fetchRequests')
      } catch (error) {
        if (!this.isAuthenticated) {
          this.error = error.message || 'Somthing went wrong!'
        }
      }
      this.isLoading = false
    },
    handleError() {
      this.error = null
    },
  },
}
</script>
