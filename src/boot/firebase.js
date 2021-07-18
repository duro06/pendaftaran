// // Firebase App (the core Firebase SDK) is always required and must be listed first
// import firebase from "firebase/app";
// // If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// // import * as firebase from "firebase/app"

// // If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// // Add the Firebase products that you want to use
// import "firebase/auth";

// import "firebase/database";
// import "firebase/messaging";

// import * as notif from "boot/mynotif";
// // importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js');
// // importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js');

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDVdud-AWU-YPRd6PI3CQILyVRWQ6eLIvg",
//   authDomain: "system-pendaftaran.firebaseapp.com",
//   projectId: "system-pendaftaran",
//   storageBucket: "system-pendaftaran.appspot.com",
//   messagingSenderId: "63384877331",
//   appId: "1:63384877331:web:76acb3704e2f6c3a5782e6",
//   measurementId: "G-GW98K8Q1BB"
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const firebaseAuth = firebaseApp.auth();
// const GoogleProvider = new firebase.auth.GoogleAuthProvider();
// const dataBase = firebaseApp.database();
// const messaging = firebaseApp.messaging();
// const messaging = firebaseApp.messaging();
// messaging.usePublicVapidKey(
//   "BPjYiGQpZOYuQQcfTYv7HNwXAhBOt5S52qUjE2899IF4B2xbwlx1B3GknGkbnbVGmAKfw2FAUK7wUUVpubT_3Qw"
// );
// const myToken = "";
// messaging
//   .requestPermission()
//   .then(() => {
//     console.log("permission granted");
//     return messaging.getToken();
//   })
//   .then(token => {
//     // dari sini kirim token ke server
//     console.log(token);
//   })
//   .catch(err => {
//     // console.log('Error ');
//     console.log("error ", err);
//   });

// // messaging.onMessage(payload => {
// //   console.log("onMessage firestore js: ", payload);
// // });

// export { messaging };
