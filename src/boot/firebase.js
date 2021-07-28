// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";

// import "firebase/database";
import "firebase/messaging";

// import * as notif from "boot/mynotif";
// importScripts("https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js");
// importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js');

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVdud-AWU-YPRd6PI3CQILyVRWQ6eLIvg",
  authDomain: "system-pendaftaran.firebaseapp.com",
  projectId: "system-pendaftaran",
  storageBucket: "system-pendaftaran.appspot.com",
  messagingSenderId: "63384877331",
  appId: "1:63384877331:web:76acb3704e2f6c3a5782e6",
  measurementId: "G-GW98K8Q1BB"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const messaging = firebaseApp.messaging();
const firebaseAuth = firebaseApp.auth();
// const GoogleProvider = new firebase.auth.GoogleAuthProvider();
messaging.usePublicVapidKey(
  "BH0EkVq4Qz09x2q1YJOgGGC8njH1-9v8-8ku5QahcnoMgCiaDxnf9ksymhn7jdM40jJrT-CkeFX4CleElG0xVzE"
);
const myToken = "";
messaging.requestPermission().then(() => {
  return messaging.getToken();
});

export { messaging };
