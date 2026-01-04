importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyB8CTCmnbObpTLpAiwdg_gn5_8-ZUTbM94",
  authDomain: "careerai-1ba40.firebaseapp.com",
  projectId: "careerai-1ba40",
  storageBucket: "careerai-1ba40.firebasestorage.app",
  messagingSenderId: "1019326785506",
  appId: "1:1019326785506:web:bd577a469c7e02ba9ebbbb"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});
