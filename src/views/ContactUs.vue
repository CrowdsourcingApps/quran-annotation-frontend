<template>
    <v-card class="mx-auto px-6 py-8"
      style="text-align:center;margin-top: 50px"
      max-width="344">
        <p class="font-weight-bold text-h4 ma-2 pa-2">
          {{ $t('nav.contact')}}
        </p>
        <p class="font-weight-bold text-h6 ma-2 pa-2">{{ $t('contact.happy') }}</p>
        <v-spacer></v-spacer>
        <v-alert
          variant="outlined"
          type="warning"
          prominent
          border="top"
          style="color: #F79191 !important;margin-bottom: 20px;"
          v-if="w_message"
        >
          {{ $t('error')  }}
        </v-alert>
        <v-alert
          variant="outlined"
          type="success"
          prominent
          border="top"
          style="color: #5FD083 !important;margin-bottom: 20px;"
          v-if="s_message"
        >
          {{ $t('contact.success') }}
        </v-alert>
        <v-form
          v-model="form"
          @submit.prevent="onSubmit"
        >
          <v-text-field
            v-model="msg.email"
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
            v-model="msg.name"
            :readonly="loading"
            :rules="[]"
            class="mb-2"
            clearable
            variant="underlined"
            :label="$t('contact.name')"
            :placeholder="$t('contact.name_placeholder')"
            prepend-inner-icon="mdi-account"
          ></v-text-field>

          <v-textarea
            v-model="msg.message"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            clearable
            variant="underlined"
            :label="$t('contact.message')"
            :placeholder="$t('contact.message_placeholder')"
            prepend-inner-icon="mdi-message-outline"
          ></v-textarea>

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
            {{ $t('contact.send')}}
          </v-btn> 
        </v-form>
      </v-card>
      <Navbar/>
</template>
<script>
  import { useHead } from '@unhead/vue'
  import Navbar from '@/components/Navbar.vue';
  import Message from '@/models/message'
  import AuthService from "@/services/auth.service";
  import amplitude from '@/amplitude/index.js'
  export default {
    components: {Navbar},
    setup(){
      const CurrentLocale = localStorage.getItem('userLocale');
      if(CurrentLocale == 'AR')
      {
        useHead({
        title: 'صوت القرآن - تواصل معنا',
        meta: [
            {
            name: 'description',
            content: 'تواصل معنا عن طريق البريد الالكتروني. تابعنا على مواقع التواصل الاجتماعي.',
            },
        ],
        link:[
            {
                rel: 'canonical',
                href: 'https://www.quranvoice.live/contactus', // Canonical URL
            }
        ]
        })
      }
      else if(CurrentLocale == 'RU')
      {

      }
      else{
        useHead({
        title: 'Quran Voice - Contact us',
        meta: [
            {
            name: 'description',
            content: 'Contact us by email. Follow us on social media',
            },
        ],
        link:[
            {
                rel: 'canonical',
                href: 'https://www.quranvoice.live/contactus', // Canonical URL
            }
        ]
        })
      }
    },
    data: () => ({
      form: false,
      msg: new Message(null,null,null),
      loading: false,
      w_message: false,
      s_message: false,
      error:false
    }),
    methods: {
      onSubmit () {
        if (!this.form) return
        this.w_message = false;
        this.s_message = false;
        this.error = false;
        this.loading = true
        this.msg.email = this.msg.email.trim();
        if(this.msg.name !==null){
          this.msg.name = this.msg.name.trim();
        }
        if(this.msg.message !==null){
          this.msg.message = this.msg.message.trim();
        }
        if(this.msg.message==="" || this.msg.message===null){
          this.error = true;
          this.loading = false;
        }
        if(this.error===false){
          AuthService.sendmessage(this.msg).then(
            (response) => {
              amplitude.track('New Email Sent');
              this.loading = false;
              this.w_message = false;
              this.s_message = true;
              this.msg = new Message(null,null,null)
              this.form = false;
            },
            (error) => {
              this.w_message = true
              console.log(error);
              this.loading = false;
            }
          );
        }
      },
      required (v) {
        return !!v || this.$t('login.required')
      },
      valid_mail (v) {
        return /.+@.+\..+/.test(v) || this.$t('login.notvalid_mail')
      }
    },
  }
</script>