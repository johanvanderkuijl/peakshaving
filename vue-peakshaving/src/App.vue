<template>
  <v-app id="peakshaving">
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
    >
      <v-list >
        <v-list-item
          v-for="item in menuItems"
          :key=item.title
          :to="item.link"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/user/login" v-if="!userIsAuthenticated">
          <v-list-item-action><v-icon left>mdi-lock-open</v-icon></v-list-item-action>
            <v-list-item-content>
              <v-list-item-title >
              login
              </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="userIsAuthenticated" @click="logout">
          <v-list-item-action><v-icon left>mdi-logout</v-icon></v-list-item-action>
            <v-list-item-content>logout</v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dense>
      <v-app-bar-nav-icon
        class="d-flex d-sm-none"
        @click.stop="drawer = !drawer">
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to='/' tag='span' style="cursor: pointer">Peakshaving LS</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-switch :disabled="!userIsAuthenticated" class="mr-2" hide-details @change="toggleSimulation" :input-value="simulation" label="simulatie"></v-switch>

      <v-btn class="mr-2 d-none d-sm-flex"
        v-for="item in menuItems"
        :key=item.title
        text
        :to="item.link"
        >
        <v-icon left>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
      <v-btn class="d-none d-sm-flex" to='/user/login' v-if="!userIsAuthenticated">
        <v-icon left>mdi-lock-open</v-icon>
        login
      </v-btn>
      <v-btn v-if="userIsAuthenticated" @click="logout">
        <v-icon left>mdi-logout</v-icon>
        logout
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app >
      <span>&copy; Alliander Beheer en Realisatie 2020</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer: false
  }),
  methods: {
    logout () {
      this.$store.dispatch('logout')
    },
    toggleSimulation () {
      this.$store.dispatch('toggleSimulation')
    }
  },
  watch: {
    '$route' (to, from) {
      document.title = to.meta.title || 'Peakshaving'
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        { icon: 'mdi-chart-bell-curve', title: 'Metingen', link: '/measurements' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'mdi-chart-bell-curve', title: 'Metingen', link: '/measurements' }
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    simulation () {
      return this.$store.getters.simulation
    }
  }
}
</script>
