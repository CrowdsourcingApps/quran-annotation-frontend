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
        // the need for providing the Ip.
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
  toast(CustomToast, {
        autoClose: false,
        type: 'success',
        icon: "🔔",
        rtl: true,
        position: toast.POSITION.BOTTOM_RIGHT,
        data:{
          title:title,
          body: body,
          link: 'https://localhost:3000/task/vc',
        }
      }); // ToastOptions
});

function storeAnonymousToken(anonymous_id, currentToken){
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
