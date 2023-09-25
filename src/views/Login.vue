<template>
    <v-sheet class="absolute-fill pa-12" style="background-color: #F5F5F5;">
      <v-card class="mx-auto px-6 py-8"
      :style="$i18n.locale === 'AR' ? 'direction: rtl;text-align:center;margin-top: 50px' :  'text-align:center;margin-top: 50px'"
      max-width="344">
        <p class="font-weight-bold text-h4 ma-2 pa-2">
          {{ isLoginMode? $t('nav.login') : $t('login.create') }}
        </p>
        <img class="ml-5 mr-5" src="@/assets/logo.svg" />
        <p class="font-weight-bold text-h6 ma-2 pa-2">{{ $t('homepage.goal') }}</p>
        <v-spacer></v-spacer>
        <v-alert
          variant="outlined"
          type="warning"
          prominent
          border="top"
          style="color: #F79191 !important;margin-bottom: 20px;"
          v-if="message"
        >
          {{ message }}
        </v-alert>
        <v-form
          v-model="form"
          @submit.prevent="onSubmit"
        >
          <v-text-field
            v-model="user.email"
            :readonly="loading"
            :rules="[required, valid_mail]"
            class="mb-2"
            clearable
            variant="underlined"
            :label="$t('login.email')"
            :placeholder="$t('login.email_placeholder')"
            prepend-inner-icon="mdi-email-outline"
          ></v-text-field>
  
          <v-text-field
            v-model="user.password"
            :readonly="loading"
            variant="underlined"
            :type="show1 ? 'text' : 'password'"
            :label="$t('login.password')"
            prepend-inner-icon="mdi-lock-outline"
            :placeholder="$t('login.password_placeholder')"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[required, min]"
            :hint="$t('login.hint')"
            clearable
            @click:append="show1 = !show1"
          ></v-text-field>

          <v-text-field
            v-if="!isLoginMode"
            v-model="repeat_password"
            :readonly="loading"
            variant="underlined"
            :type="show2 ? 'text' : 'password'"
            :label="$t('login.repeat_password')"
            :placeholder="$t('login.repeat_password_placeholder')"
            prepend-inner-icon="mdi-lock-outline"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[required, PasswordMatch]"
            :hint="$t('login.hint')"
            clearable
            @click:append="show2 = !show2"
          ></v-text-field>
  
          <br>
          <v-btn
          :disabled="!form"
          :loading="loading"
          block
          style="background-color:#5FD083; color: #fff;"
          size="large"
          type="submit"
          variant="elevated"
          >
            {{ isLoginMode? $t('nav.login') : $t('login.create') }}
          </v-btn> 
          <v-btn style="margin-top:20px" variant="text" color="info" @click="onSwitchMode()">
            {{ isLoginMode? $t('login.no_account') : $t('login.have_account')}}
          </v-btn>
        </v-form>
      </v-card>
    </v-sheet>
  </template>
  <script>
  import { useHead } from '@unhead/vue'
  import User from '@/models/user'
  import amplitude from '@/amplitude/index.js'
  export default {
    setup(){
        useHead({
        title: 'Quran Voice - Login',
        meta: [
            {
            name: 'description',
            content: 'Login with your account to Quran Voice website',
            },
        ],
        link:[
            {
                rel: 'canonical',
                href: 'https://www.quranvoice.live/login', // Canonical URL
            }
        ]
        })
    },
    data: () => ({
      form: false,
      user: new User(null,null),
      repeat_password: null,
      loading: false,
      show1: false,
      show2: false,
      isLoginMode: true,
      message:null
    }),
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
    },
    created() {
      if (this.loggedIn) {
        this.$router.push("/");
      }
    },
    methods: {
      onSubmit () {
        if (!this.form) return
        this.message = null;
        this.loading = true
        this.user.email = this.user.email.trim()
        if(this.isLoginMode) {
          this.$store.dispatch("auth/login", this.user).then(
            () => {
              this.$router.replace(this.$route.query.redirect || '/');
            },
            (error) => {
              this.loading = false;
              if(error.response.status === 401)
                  this.message = this.$t('login.401_message')
              else
                  this.message = this.$t('error')
            }
          );
        }
        else{
          this.$store.dispatch("auth/register", this.user).then(
            () => {
              amplitude.track('New User Registered');
              this.$router.replace(this.$route.query.redirect || '/');
            },
            (error) => {
              this.loading = false;
              if(error.response.status === 400)
                  this.message = this.$t('login.400_message')
              else
                  this.message = this.$t('error')
            }
          );

        }
      },
      required (v) {
        return !!v || this.$t('login.required')
      },
      valid_mail (v) {
        return /.+@.+\..+/.test(v) || this.$t('login.notvalid_mail')
      },
      min (v) {
        return v.length >= 8 || this.$t('login.min_8')
      },
      PasswordMatch(v) {
        return v === this.user.password || this.$t('login.mismatch_password')
      },
      onSwitchMode() {
        if(this.isLoginMode === true) {
          amplitude.track('Register Clicked');
        }
        this.isLoginMode = !this.isLoginMode;
      }
    },
  }
</script>