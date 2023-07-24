<template>
  <div
    v-if="newCoaches || errorData.isError"
    class="flex flex-col items-center mt-10 mb-10"
  >
    <base-dialog
      v-if="errorData.errorMessage"
      :show="!!errorData.isError"
      :title="errorData.errorMessage"
      @close="handleFileUploadError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <confirm-imported-coaches
      :new-coaches="newCoaches"
      :cancel-import="cancelImport"
      :confirm-import="confirmImport"
    ></confirm-imported-coaches>
  </div>
  <div v-else>
    <!-- <router-view></router-view> -->
    <div>
      <base-dialog
        :show="!!error"
        title="An error occured!"
        @close="handleError"
      >
        <p>{{ error }}</p>
      </base-dialog>
      <section>
        <coach-filter></coach-filter>
      </section>
      <section>
        <base-card>
          <div class="flex justify-between">
            <button class="refresh-btn" @click="loadCoaches(true)">
              Refresh
            </button>
            <div v-if="isLoggedIn">
              <label for="file-upload" class="base-btn">
                Upload coaches CSV
              </label>
              <input
                id="file-upload"
                class="hidden"
                type="file"
                accept=".csv"
                @change="handleFileUpload"
              />
            </div>
            <base-button v-if="!isLoggedIn" link to="/auth?redirect=register"
              >Login to Register as Coach</base-button
            >
            <base-button
              v-if="isLoggedIn && !isCoach && !isLoading"
              link
              to="/register"
              >Register as Coach</base-button
            >
          </div>
          <div v-if="isLoading">
            <base-spinner></base-spinner>
          </div>
          <ul v-else-if="hasCoaches" class="m-0 p-0 list-none">
            <coach-item
              v-for="coach in filterCoaches"
              :id="coach.id"
              :key="coach.id"
              :first-name="coach.firstName"
              :last-name="coach.lastName"
              :rate="coach.hourlyRate"
              :areas="coach.areas"
            ></coach-item>
          </ul>
          <h3 v-else class="mt-4">No coaches found.</h3>
        </base-card>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import csvParser from '~/mixins/csvParser.js'

import CoachItem from '~/components/coaches/CoachItem.vue'
import BaseCard from '~/components/ui/BaseCard.vue'
import CoachFilter from '~/components/coaches/CoachFilter.vue'
import ConfirmImportedCoaches from '~/components/coaches/ConfirmImportedCoaches.vue'

export default {
  name: 'IndexPage',
  components: {
    CoachItem,
    BaseCard,
    CoachFilter,
    ConfirmImportedCoaches,
  },
  mixins: [csvParser],
  data() {
    return {
      isLoading: false,
      error: null,
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated
    },
    activeFilters() {
      return this.$store.getters['coaches/getFilters']
    },
    filterCoaches() {
      // Get coaches list from Vuex and save it in variable
      const coaches = this.$store.getters['coaches/coaches']
      return this.filter(coaches)
      // Filter coaches depends on checked activeFilters
    },
    hasCoaches() {
      // Check are any coaches stored in the Vuex store
      return !this.isLoading && this.$store.getters['coaches/hasCoaches']
    },
    isCoach() {
      // Check is the current user registrated as a coach
      return this.$store.getters['coaches/isCoach']
    },
  },
  created() {
    this.setBreadcrumbs([{ text: 'All Coaches', to: { path: '/coaches' } }])
  },
  methods: {
    ...mapActions('breadcrumbs', ['setBreadcrumbs']),
    ...mapActions('coaches', ['registerCoaches']),
    async loadCoaches(refresh = false) {
      this.isLoading = true
      try {
        // Fetch caoches list from database and save it to Vuex store
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: refresh,
        })
      } catch (error) {
        this.error = error.message || 'Somthing get wrong!'
      }
      this.isLoading = false
    },
    handleError() {
      this.error = null
    },
    async confirmImport() {
      this.isLoading = true
      try {
        await this.registerCoaches(this.newCoaches)
      } catch (error) {
        this.error = error.message || 'Somthing get wrong!'
      }
      this.newCoaches = null
      this.isLoading = false
    },
    cancelImport() {
      this.newCoaches = null
    },
    filter(coaches) {
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true
        } else if (
          this.activeFilters.backend &&
          coach.areas.includes('backend')
        ) {
          return true
        } else if (
          this.activeFilters.career &&
          coach.areas.includes('career')
        ) {
          return true
        }
        return false
      })
    },
  },
}
</script>
