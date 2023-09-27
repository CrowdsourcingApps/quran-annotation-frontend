// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object

firebase.initializeApp({
  apiKey: "AIzaSyBRadxrp_saY1CDAxJY-qFgQojyEJvEMgA",
  authDomain: "quran-voice-notification.firebaseapp.com",
  projectId: "quran-voice-notification",
  storageBucket: "quran-voice-notification.appspot.com",
  messagingSenderId: "689227498753",
  appId: "1:689227498753:web:c96052624ecd5b68968700",
  measurementId: "G-9ED35RV0GP"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/logo.ico',
    };

    // self.registration.showNotification(notificationTitle, notificationOptions);
  });