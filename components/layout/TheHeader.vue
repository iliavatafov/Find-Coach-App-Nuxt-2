<template>
  <header v-if="coaches">
    <nav>
      <div class="left-nav">
        <h1><nuxt-link to="/">Find a Coach</nuxt-link></h1>
        <div>
          <!-- <nuxt-link to="/coaches">All Coaches</nuxt-link> -->
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
          <base-button @click="logout">Logout</base-button>
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
      this.$router.replace('/coaches')
    },
    showDivider(index) {
      if (this.isNeastedRoutes && this.routesDataLastIndex !== index) {
        return true
      }
    },
  },
  // watch: {
  //   getBreadcrumbs(value) {
  //     if (value.length > 0) {
  //       this.isBreadcrumbs = true;
  //     }
  //   },
  // },
  // watch: {
  //   "$route.params": {
  //     handler: function (params) {
  //       // Set routesData to inicial state
  //       this.routesData = [
  //         {
  //           text: "All Coaches",
  //           href: "/coaches",
  //         },
  //       ];
  //       // Create dynamic variable for href
  //       let href = "/coaches";

  //       // Walk throw all params in route object and push text and href in routesData for each param
  //       for (const param in params) {
  //         let text = "";

  //         // Check is param is id and if it is select the coach with the same id and assign coach full name as a text
  //         if (param.includes("id")) {
  //           // Fetch data from rest API
  //           const coach = this.coaches.find(
  //             (coach) => coach.id === params[param]
  //           );

  //           text = coach.firstName + " " + coach.lastName;
  //         } else {
  //           // Assign param value as text and capitalize first letter
  //           text =
  //             params[param].charAt(0).toUpperCase() + params[param].slice(1);
  //         }

  //         // Add param to the href
  //         href = href + "/" + params[param];

  //         this.routesData.push({
  //           text,
  //           href,
  //         });
  //       }
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },
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
a.nuxt-link-active {
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
header .dynamic-link.nuxt-link-active {
  font-weight: 900;
  border: none;
}

span {
  padding: 1rem;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.nuxt-link-active {
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
</style>
