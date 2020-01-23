<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
    >
      <v-list  dense>
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

        <v-list-item v-if="!userIsAuthenticated" @click="login">
          <v-list-item-action><v-icon left>mdi-lock-open</v-icon></v-list-item-action>
            <v-list-item-content>login</v-list-item-content>
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
      <v-toolbar-items class="d-none d-sm-flex">
        <v-btn
          v-for="item in menuItems"
          :key=item.title
          text
          :to="item.link"
          >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn v-if="!userIsAuthenticated" @click="login">
          <v-icon left>mdi-lock-open</v-icon>
          login
        </v-btn>
        <v-btn v-if="userIsAuthenticated" @click="logout">
          <v-icon left>mdi-logout</v-icon>
          logout
        </v-btn>
      </v-toolbar-items>
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
    login () {
      console.log('login')
      this.$store.dispatch('login')
    },
    logout () {
      console.log('logout')
      this.$store.dispatch('logout')
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        { icon: 'mdi-chart-bell-curve', title: 'Measurements', link: '/measurements' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'mdi-settings', title: 'Settings', link: 'measurements/add' },
          { icon: 'mdi-chart-bell-curve', title: 'Measurements', link: '/measurements' }
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.userIsAuthenticated
    }
  }
}
</script>
