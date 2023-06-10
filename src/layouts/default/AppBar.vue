<template>
  <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

  <v-app-bar
      color="primary"
      prominent>
     
      <router-link to="/">
         <!-- hide on screens larger than md-->
        <img class="d-md-none ml-5 mr-5 mt-2" src="@/assets/logo.svg" height="40"/>
        <!-- hide on screens smaller than md-->
        <img class="d-none d-md-block ml-16" src="@/assets/Quran-Icon.png" height="40"/>
      </router-link>
      <v-toolbar-title class="d-none d-md-block mr-1">Quran Voice</v-toolbar-title>

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
        <v-list-item class="font-weight-bold justify-center">{{ $t('nav.mycontribution') }}</v-list-item>
        <v-list-item class="justify-center" prepend-icon="mdi-checkbox-marked-circle-outline">{{$t('nav.today')}}{{ $t('nav.space') }}{{ this.validate_correctness_today }}</v-list-item>
        <v-list-item class="justify-center" prepend-icon="mdi-checkbox-marked-circle-outline">{{$t('nav.total')}}{{ $t('nav.space') }}{{ this.validate_correctness_total }}</v-list-item>
        <v-list-item class="justify-center" prepend-icon="mdi-checkbox-marked-circle-outline">{{$t('nav.accuracy')}}{{ $t('nav.space') }}{{ this.validate_correctness_accuracy }}</v-list-item>
      </v-list>
      <v-divider v-if="loggedIn"></v-divider>
      <v-list v-if="loggedIn" nav>
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
  import AuthService from "@/services/auth.service";
  import TaskService from "@/services/tasks.service";
  import controltasksService from '@/services/controltasks.service';
  import amplitude from '@/amplitude/index.js'

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
      validate_correctness_total: localStorage.getItem("vc_points"),
      validate_correctness_today: localStorage.getItem("vc_points_today"),
      validate_correctness_accuracy: localStorage.getItem("vc_accuracy")
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
      this.me();
      this.get_today_vc_contribution();
      this.get_vc_user_accuracy();
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
      me(){
        AuthService.getme().then(
          (response) => {
            localStorage.setItem("vc_points", response.data.validate_correctness_tasks_no);
            this.validate_correctness_total=response.data.validate_correctness_tasks_no
          },
          (error) => {
            console.log(error);
          }
        );
      },
      get_today_vc_contribution(){
        TaskService.get_today_vc_contribution().then(
          (response) => {
            localStorage.setItem("vc_points_today", response.data.count);
            this.validate_correctness_today=response.data.count
          },
          (error) => {
            console.log(error);
          }
        );
      },
      get_vc_user_accuracy(){
        controltasksService.get_validate_correctness_user_accuracy().then(
          (response) => {
            let acc = Math.round(response.data.acc)
            localStorage.setItem("vc_accuracy", acc);
            this.validate_correctness_accuracy=acc
          },
          (error) => {
            console.log(error);
          }
        );
      },
      NavbarIconClicked(){
        if(this.drawer=== false) {
          amplitude.track('Navbar Icon Clicked')
        }
        this.drawer = !this.drawer
      }
    },
    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>