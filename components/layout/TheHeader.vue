<template>
  <header v-if="coaches">
    <nav>
      <div class="left-nav">
        <h1><nuxt-link to="/">Find a Coach</nuxt-link></h1>
        <div>
          <div class="dynamic-links">
            <nuxt-link
              v-for="(getBreadcrumb, index) in getBreadcrumbs"
              :key="getBreadcrumb.text"
              :to="getBreadcrumb.to"
              class="dynamic-link"
              >{{ getBreadcrumb.text }}
              <span v-if="showDivider(index)">/</span>
            </nuxt-link>
          </div>
        </div>
      </div>
      <ul>
        <li v-if="isLoggedIn">
          <nuxt-link to="/requests">Requests</nuxt-link>
        </li>
        <li v-else>
          <nuxt-link to="/auth">Login</nuxt-link>
        </li>
        <li v-if="isLoggedIn">
          <button @click="logout">Logout</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      isBreadcrumbs: false,
    }
  },
  computed: {
    ...mapGetters('coaches', ['coaches']),
    ...mapGetters('breadcrumbs', ['getBreadcrumbs']),
    isLoggedIn() {
      return this.$store.getters.isAuthenticated
    },
    isNeastedRoutes() {
      return true
    },
    routesDataLastIndex() {
      return this.getBreadcrumbs.length - 1
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      const currentPath = this.$router.currentRoute.path
      if (currentPath !== '/coaches') {
        this.$router.replace('/coaches')
      }
    },
    showDivider(index) {
      if (this.isNeastedRoutes && this.routesDataLastIndex !== index) {
        return true
      }
    },
  },
}
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.nuxt-link-exact-active {
  border: 1px solid #f391e3;
}

header .dynamic-links {
  display: flex;
  align-items: center;
  justify-content: center;
}

header .dynamic-link {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
  padding: 0;
  margin: 0;
}

header .dynamic-link:hover,
header .dynamic-link:active,
header .dynamic-link.nuxt-link-exact-active {
  font-weight: 900;
  border: none;
}

span {
  padding: 1rem;
}

h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.nuxt-link-exact-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

li {
  margin: 0 0.5rem;
  list-style: none;
}

.left-nav {
  display: flex;
  align-items: center;
}

button {
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

button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}
</style>
