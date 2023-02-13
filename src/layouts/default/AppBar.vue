<template>
  <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

  <v-app-bar
      color="primary"
      prominent>
      <!-- hide on screens larger than md-->
      <img class="d-md-none ml-5 mr-10" src="src/assets/logo.png" height="40"/>

      <!-- hide on screens smaller than md-->
      <img class="d-none d-md-block ml-16" src="src/assets/Quran-Icon.png" height="40"/>
      <v-toolbar-title class="d-none d-md-block mr-1">Quran Voice</v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <v-btn variant="text" class="d-none d-md-block">Contribute</v-btn>

        <v-btn variant="text" class="d-none d-md-block">About us</v-btn>

        <v-btn variant="text" class="d-none d-md-block mr-4">Contact us</v-btn>

        <v-btn
          class="mr-2"
          style="background-color: white;"
          rounded="pill"
          color="secondary"
          variant="outlined"
        >
          Login / Singup
        </v-btn>

        <v-select
            style="margin-top: 22px;"
            class="mr-2"
            variant="solo"
            density="compact"
            v-model="language"
            :items="languages"
            prepend-inner-icon="mdi-earth"
          >
        </v-select>
      </div>
      <v-app-bar-nav-icon v-if="currentUser" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer 
      v-model="drawer"
      location="right"
      temporary
      >
      <v-list nav>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :prepend-icon="item.icon"
          :value="item.value"
          class="justify-center"
        >
          {{ item.title }}
        </v-list-item>
      </v-list>
      <v-divider class="d-md-none"></v-divider>
      <v-list class="d-md-none" nav>
        <v-list-item
          v-for="(item, index) in nav_items"
          :key="index"
          :value="item.value"
          class="justify-center"
        >
          {{ item.title }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>


<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
      items: [
        {
          title: 'Home',
          value: 'home',
          icon: 'mdi-home-city',
        },
        {
          title: 'My Account',
          value: 'account',
          icon: 'mdi-account',
        }
      ],
      nav_items: [
        {
          title: 'Contribute',
          value: 'contribute',
        },
        {
          title: 'About us',
          value: 'about',
        },
        {
          title: 'Contact us',
          value: 'contact',
        }
      ],
      languages: ['EN','AR','RU'],
      language: 'EN',
    }),

    computed: {
      currentUser() {
      return false;
      }
    },

    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>