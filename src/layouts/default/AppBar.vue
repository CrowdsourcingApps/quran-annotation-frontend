<template>
  <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

  <v-app-bar
      color="primary"
      prominent>
     
      <router-link to="/">
         <!-- hide on screens larger than md-->
        <img class="d-md-none ml-5 mr-5 mt-2" src="@/assets/logo.svg" height="60"/>
        <!-- hide on screens smaller than md-->
        <img class="d-none d-md-block ml-16" src="@/assets/Quran-Icon.png" height="60"/>
      </router-link>
      <!-- <v-toolbar-title class="d-none d-md-block mr-1">صوت القرآن</v-toolbar-title> -->

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <v-btn @click="scroll('contribute_section')" variant="text" class="d-none d-md-block mr-2">{{ $t('nav.contribute') }}</v-btn>

        <v-btn variant="text" class="d-none d-md-block" @click="about()">{{ $t('nav.about') }}</v-btn>

        <v-btn variant="text" class="d-none d-md-block mr-4" @click="Contactus()">{{ $t('nav.contact') }}</v-btn>

        <v-btn
          class="mr-2"
          style="background-color: white;"
          rounded="pill"
          color="secondary"
          variant="outlined"
          @click.prevent="login()"
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
            :on-change="handleLanguageChange()"
          >
        </v-select>
      </div>
      <v-app-bar-nav-icon v-if="loggedIn||!mdAndUpvalue" variant="text" @click.stop="NavbarIconClicked()"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer 
      v-model="drawer"
      location="right"
      temporary
      >
      <v-list v-if="loggedIn" nav>
        <!-- <v-list-item class="justify-center" prepend-icon="mdi-account"></v-list-item> -->
        <v-list-item @click.prevent="Home" value="home" class="justify-center" prepend-icon="mdi-home-city">{{ $t('nav.home') }}</v-list-item>
        <!-- <v-list-item @click.prevent="me" value="account" class="justify-center" prepend-icon="mdi-account">{{ $t('nav.account') }}</v-list-item> -->
        <v-list-item @click.prevent="logOut" value="logout" class="justify-center" prepend-icon="mdi-logout">{{ $t('nav.logout') }}</v-list-item>
      </v-list>
      <v-divider class="d-md-none" v-if="loggedIn"></v-divider>
      <v-list class="d-md-none" nav>
        <v-list-item @click="scroll('contribute_section')" class="justify-center">{{ $t('nav.contribute') }}</v-list-item>
        <v-list-item value="about" class="justify-center" to="about">{{ $t('nav.about') }}</v-list-item>
        <v-list-item value="contact" class="justify-center" to="contactus">{{ $t('nav.contact') }}</v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>


<script>
  import { useDisplay } from 'vuetify'
  import EventBus from "@/common/EventBus";
  import amplitude from '@/amplitude/index.js';
  import AuthService from "@/services/auth.service";

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
      group: null
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
      about(){
        this.$router.push('/about');
      },
      Contactus(){
        this.$router.push('/contactus');
      },
      scroll(id) {  
        if(this.$route.path!=='/')
        {
          this.$router.push('/');
        }
        const eventProperties = {
            location: 'Navbar',
        };
        amplitude.track('Contribute Clicked', eventProperties);
        document.getElementById(id).scrollIntoView({
          behavior: "smooth"
        });
        if(this.drawer){
          this.drawer = false
        }
      },
      login(){
        const eventProperties = {
            location: 'Navbar',
        };
        amplitude.track('Login Clicked', eventProperties);
        this.$router.push('/login');
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
      NavbarIconClicked(){
        if(this.drawer=== false) {
          amplitude.track('Navbar Icon Clicked')
        }
        this.drawer = !this.drawer
      },
      handleLanguageChange(){
        const previousLocale = localStorage.getItem('userLocale');
        let newLocale = this.$i18n.locale
        if(previousLocale != newLocale)
        {
          if(this.loggedIn){
            AuthService.update_language(newLocale.toLowerCase()).then(
              (response) => {
              },
              (error) => {
                  console.log(error);
              }
            );
          }
          else{
            const anonymous_id = localStorage.getItem('anonymous_id');
            if(anonymous_id){
              AuthService.update_language_anonymous(newLocale.toLowerCase(),anonymous_id).then(
                (response) => {
                  console.log("anonymous_update_language")
                },
                (error) => {
                    console.log(error);
                }
              );
            }
          }
          document.documentElement.setAttribute('lang', newLocale.toLowerCase());
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