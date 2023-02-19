<template>
  <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

  <v-app-bar
      color="primary"
      prominent>
      <!-- hide on screens larger than md-->
      <img class="d-md-none ml-5 mr-5" src="@/assets/logo.svg" height="40"/>

      <!-- hide on screens smaller than md-->
      <img class="d-none d-md-block ml-16" src="@/assets/Quran-Icon.png" height="40"/>
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
          v-if="!loggedIn"
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
      <v-app-bar-nav-icon v-if="loggedIn||!mdAndUpvalue" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer 
      v-model="drawer"
      location="right"
      temporary
      >
      <v-list v-if="loggedIn" nav>
        <v-list-item @click.prevent="Home" value="home" class="justify-center" prepend-icon="mdi-home-city">{{ $t('nav.home') }}</v-list-item>
        <v-list-item @click.prevent="me" value="account" class="justify-center" prepend-icon="mdi-account">{{ $t('nav.account') }}</v-list-item>
        <v-list-item @click.prevent="logOut" value="logout" class="justify-center" prepend-icon="mdi-logout">{{ $t('nav.logout') }}</v-list-item>
      </v-list>
      <v-divider class="d-md-none" v-if="loggedIn"></v-divider>
      <v-list class="d-md-none" nav>
        <v-list-item @click="scroll('contribute_section')" class="justify-center">{{ $t('nav.contribute') }}</v-list-item>
        <v-list-item value="about" class="justify-center">{{ $t('nav.about') }}</v-list-item>
        <v-list-item value="contact" class="justify-center">{{ $t('nav.contact') }}</v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>


<script>
  import { useDisplay } from 'vuetify'
  import EventBus from "@/common/EventBus";
  import UserService from "@/services/user.service";

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
    }),

    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
    },
    mounted() {
      EventBus.on("logout", () => {
        this.logOut();
      });
    },
    beforeDestroy() {
      EventBus.remove("logout");
    },
    methods: {
      scroll(id) {  
        document.getElementById(id).scrollIntoView({
          behavior: "smooth"
        });
        if(this.drawer){
          this.drawer = false
        }
      },
      logOut() {
        this.$store.dispatch('auth/logout');
        this.drawer = false
        this.$router.push('/');
      },
      Home(){
        this.drawer = false
        this.$router.push('/');
      },
      me(){
        UserService.getme().then(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>