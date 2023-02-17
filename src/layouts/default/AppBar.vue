<template>
  <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

  <v-app-bar
      color="primary"
      prominent>
      <!-- hide on screens larger than md-->
      <img class="d-md-none ml-5 mr-5" src="src/assets/logo.png" height="40"/>

      <!-- hide on screens smaller than md-->
      <img class="d-none d-md-block ml-16" src="src/assets/Quran-Icon.png" height="40"/>
      <v-toolbar-title class="d-none d-md-block mr-1">Quran Voice</v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <v-btn @click="scroll('contribute_section')" variant="text" class="d-none d-md-block mr-2">{{ $t('nav.contribute') }}</v-btn>

        <v-btn variant="text" class="d-none d-md-block">{{ $t('nav.about') }}</v-btn>

        <v-btn variant="text" class="d-none d-md-block mr-4">{{ $t('nav.contact') }}</v-btn>

        <v-btn
          class="mr-2"
          style="background-color: white;"
          rounded="pill"
          color="secondary"
          variant="outlined"
          to="/login"
          v-if="!currentUser"
        >
          {{ xsvalue? $t('nav.login') : $t('nav.register') }}
        </v-btn>

        <v-select
            style="margin-top: 22px;"
            class="mr-2"
            variant="solo"
            density="compact"
            v-model="$i18n.locale"
            :items="$i18n.availableLocales"
            prepend-inner-icon="mdi-earth"
          >
        </v-select>
      </div>
      <v-app-bar-nav-icon v-if="currentUser||!mdAndUpvalue" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer 
      v-model="drawer"
      location="right"
      temporary
      >
      <v-list nav>
        <v-list-item
          v-if="currentUser"
          v-for="(item, index) in items"
          :key="index"
          :prepend-icon="item.icon"
          :value="item.value"
          class="justify-center"
        >
          {{ $t(item.title) }}
        </v-list-item>
      </v-list>
      <v-divider class="d-md-none" v-if="currentUser"></v-divider>
      <v-list class="d-md-none" nav>
        <v-list-item @click="scroll('contribute_section')" class="justify-center">{{ $t('nav.contribute') }}</v-list-item>
        <v-list-item value="about" class="justify-center">{{ $t('nav.about') }}</v-list-item>
        <v-list-item value="contact" class="justify-center">{{ $t('nav.contact') }}</v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>


<script>
  import { useDisplay } from 'vuetify'

  export default {
    setup () {
        // Destructure only the keys we want to use
        const { xs, mdAndUp } = useDisplay()
        var mdAndUpvalue = mdAndUp.value
        var xsvalue = xs.value
        return {mdAndUpvalue,xsvalue}
        },
    data: () => ({
      drawer: false,
      group: null,
      items: [
        {
          title: 'nav.home',
          value: 'home',
          icon: 'mdi-home-city',
        },
        {
          title: 'nav.account',
          value: 'account',
          icon: 'mdi-account',
        },
        {
          title: 'nav.logout',
          value: 'logout',
          icon: 'mdi-logout',
        }
      ],
    }),

    computed: {
      currentUser() {
      return false;
      }
    },
    methods: {
      scroll(id) {  
      document.getElementById(id).scrollIntoView({
        behavior: "smooth"
      });
      if(this.drawer){
        this.drawer = false
      }
      }
    },
    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>