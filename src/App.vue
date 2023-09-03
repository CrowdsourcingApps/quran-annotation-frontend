<template>
  <router-view />
</template>

<script setup>
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import NotificationService from "@/services/notification.service";

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
    // if the cache is empty -> create anonymuse user & save id in cache -> store token in server & update the cache

    // ...
    console.log("Notification token is: ",currentToken)
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});

// Updating Registration Tokens
// To ensure that a device’s registration token is fresh, you should periodically retrieve and update all existing registration tokens. 
// To do so, you’ll need to add app logic in the client app to retrieve the current token, and then send the token along with a 
// timestamp to the server to store. This could be a monthly job.
</script>
