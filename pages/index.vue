<template>
  <div v-if="newCoaches || errorData.isError" class="import-wrapper">
    <!-- <base-dialog
      v-if="errorMessage"
      :show="!!errorData.isError"
      :title="errorData.errorMessage"
      @close="handleFileUploadError"
    >
      <p>{{ error }}</p>
    </base-dialog> -->
    <confirm-imported-coaches
      :new-coaches="newCoaches"
      :cancel-import="cancelImport"
      :confirm-import="confirmImport"
    ></confirm-imported-coaches>
  </div>
  <div v-else>
    <router-view></router-view>
    <div>
      <!-- <base-dialog
        :show="!!error"
        title="An error occured!"
        @close="handleError"
      >
        <p>{{ error }}</p>
      </base-dialog> -->
      <section>
        <coach-filter></coach-filter>
      </section>
      <section>
        <base-card>
          <div class="controls">
            <base-button mode="outline" @click="loadCoaches(true)"
              >Refresh</base-button
            >
            <div v-if="isLoggedIn">
              <label for="file-upload" class="custom-file-upload">
                Upload coaches CSV
              </label>
              <input
                id="file-upload"
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
          <ul v-else-if="hasCoaches">
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
          <h3 v-else>No coaches found.</h3>
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

      // Filter coaches depends on checked activeFilters
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
  },
}
</script>

<style scoped>
.import-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
  margin-bottom: 10vh;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}

input[type='file'] {
  display: none;
}

.custom-file-upload {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

.custom-file-upload:hover,
.custom-file-upload:active {
  background-color: #270041;
  border-color: #270041;
}
</style>
