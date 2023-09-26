<template>
  <router-view />
</template>

<script setup>
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import NotificationService from "@/services/notification.service";
import AuthService from "@/services/auth.service";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import CustomToast from "./components/CustomToast.vue";
import notificationSound from '@/assets/alert.mp3';
import { useHead } from '@unhead/vue';

const CurrentLocale = localStorage.getItem('userLocale');
document.documentElement.setAttribute('lang', CurrentLocale.toLowerCase());

if(CurrentLocale == 'AR')
{
  useHead({
  title: 'صوت القرآن',
  meta:[
      {
      name: 'description',
      content: 'قرآن فويس هو منصة تعهيد جماعي تهدف لجمع بيانات للقرآن للناطقين بغير اللغة العربية و توفيرها للمتطوعين الراغبين بتصنيفها بدقة بهدف بناء تطبيقات تعليمية للقرآن الكريم تستخدم الذكاء الاصطناعي',
      },
      {
          name: 'keywords',
          content: 'المسلمين, تصحيح التلاوة, مساعدة الناطقين بغير اللغة العربية,الذكاء الاصطناعي في خدمة القرآن الكريم, تلاوة, التعهيد الجماعي, صوت القرآن, القرآن ,منصة تعهيد جماعي لتصنيف تلاوات القرآن الكريم, المساهمة في تعلم القرآن',
      },
      {
          name: 'author',
          content: 'رغد سلامة',
      },
      {
          name: 'robots',
          content: 'index, follow', // Control search engine indexing
      },
      {
          property: 'og:title',
          content: 'صوت القرآن - منصة لجمع بيانات للقرآن الكريم', // Open Graph title
      },
      {
          property: 'og:description',
          content: 'قرآن فويس هو منصة تعهيد جماعي تهدف لجمع بيانات للقرآن للناطقين بغير اللغة العربية و توفيرها للمتطوعين الراغبين بتصنيفها بدقة بهدف بناء تطبيقات تعليمية للقرآن الكريم تستخدم الذكاء الاصطناعي', // Open Graph description
      },
      {
          property: 'og:image',
          content: 'https://www.quranvoice.live/src/assets/Quran-voice-meta.png', // Open Graph image URL
      },
      {
          property: 'og:image:type',
          content: 'image/png', // Open Graph image URL
      },
      {
          property: 'og:image:height',
          content: '630', // Open Graph image URL
      },
      {
          property: 'og:image:width',
          content: '1200', // Open Graph image URL
      },
      {
          property: 'og:url',
          content: 'https://www.quranvoice.live', // Canonical URL
      },
      {
          property: 'og:type',
          content: 'website', // Type of content
      },
  ],
  link: [
      {
          rel: 'canonical',
          href: 'https://www.quranvoice.live', // Canonical URL
      },
  ],
});
}
else if(CurrentLocale == 'RU')
{

}
else
{
  useHead({
  title: 'Quran Voice',
  meta:[
      {
      name: 'description',
      content: 'Quran voice is a crowdsourcing platform that aims to collect carefully annotated Quran data for non-Arabic Muslims. This data can be used for building Quran learning apps using AI technologies.',
      },
      {
          name: 'keywords',
          content: 'quran, koran, quran voice, quran dataset, quran labeling, muslims, recitation correction,quran ai,quran crowdsourcing annotation platform, crowdsourcing',
      },
      {
          name: 'author',
          content: 'Raghad Salameh',
      },
      {
          name: 'robots',
          content: 'index, follow', // Control search engine indexing
      },
      {
          property: 'og:title',
          content: 'Quran Voice - Crowdsouring Annotation Platform', // Open Graph title
      },
      {
          property: 'og:description',
          content: 'Quran voice is a crowdsourcing platform that aims to collect carefully annotated Quran data for non-Arabic Muslims. This data can be used for building Quran learning apps using AI technologies.', // Open Graph description
      },
      {
          property: 'og:image',
          content: 'https://www.quranvoice.live/src/assets/Quran-voice-meta.png', // Open Graph image URL
      },
      {
          property: 'og:image:type',
          content: 'image/png', // Open Graph image URL
      },
      {
          property: 'og:image:height',
          content: '630', // Open Graph image URL
      },
      {
          property: 'og:image:width',
          content: '1200', // Open Graph image URL
      },
      {
          property: 'og:url',
          content: 'https://www.quranvoice.live', // Canonical URL
      },
      {
          property: 'og:type',
          content: 'website', // Type of content
      },
  ],
  link: [
      {
          rel: 'canonical',
          href: 'https://www.quranvoice.live', // Canonical URL
      },
  ],
});
}

const firebaseConfig =JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging();

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
getToken(messaging, { vapidKey: import.meta.env.VITE_FIREBASE_API_KEY}).then((currentToken) => {
  if (currentToken) {
    // Check if the user has an account on our website.
    const loggedIn = localStorage.getItem('user');
    if(loggedIn){
      console.log("yes! logged in")
      NotificationService.store_token(currentToken).then(
      (response) => {
         console.log(response)
      },
      (error) => {
          console.log(error);
      }
      );
    }
    else {
      // check if user is anonymous
      console.log("Not logged in")
      var anonymous_id = localStorage.getItem('anonymous_id');
      // I don't want to create anonymous account for users that are logged out and they have account already
      const notification_token = localStorage.getItem('notification_token');
      var notification_token_empty_or_different = !notification_token || (notification_token != currentToken)
      if(!anonymous_id && notification_token_empty_or_different ){
        console.log("register_anonymous")
        // user open the website for the first time
        AuthService.register_anonymous().then(
        (response) => {
          anonymous_id = response.anonymous_id
          localStorage.setItem('notification_token',currentToken);
          console.log('notification token is cached')
          // store token for anonymous 
          storeAnonymousToken(anonymous_id, currentToken)
        },
        (error) => {
            console.log(error);
        }
        );
      }
      else if(anonymous_id)
      {
        // store token for anonymous 
        storeAnonymousToken(anonymous_id, currentToken)
        // TODO: remove the if condition and call a new endpoint to update the timestamp without 
        // the need for providing the Id.
      }
    }
    console.log("Notification token is: ",currentToken)
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
});

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  var title = payload.notification.title
  var body = payload.notification.body
  var link = payload.fcmOptions?.link
  const language = localStorage.getItem('userLocale')
  if(language == 'AR'){
    toast(CustomToast, {
        autoClose: false,
        type: 'success',
        icon: "🔔",
        rtl: true,
        position: toast.POSITION.BOTTOM_RIGHT,
        data:{
          title:title,
          body: body,
          link: link,
          close: 'هيّا',
          lang: language
        }
      }); // ToastOptions
  }
  else{
    let close = 'Let\'s go'
    if(language == 'RU')
      close = 'Давай'
      
    toast(CustomToast, {
        autoClose: false,
        type: 'success',
        icon: "🔔",
        rtl: false,
        position: toast.POSITION.BOTTOM_LEFT,
        data:{
          title:title,
          body: body,
          link: link,
          close: close,
          lang: language
        }
      }); // ToastOptions
  }
  var audioFile = new Audio(notificationSound);
  audioFile.play();
});

function storeAnonymousToken(anonymous_id, currentToken){
  console.log(anonymous_id)
  NotificationService.store_token_anonymous(anonymous_id, currentToken).then(
    (response) => {
        console.log("store_token_anonymous: ",response)
    },
    (error) => {
        console.log(error);
    }
  );
}
</script>
