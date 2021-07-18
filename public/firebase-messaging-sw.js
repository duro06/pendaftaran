importScripts("https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js");

self.addEventListener("notificationclick", function(event) {
  // let button = document.getElementById("notif");
  // console.log(" Button ", button);
  // button.click();
  const notification = event.notification;
  console.log("event Outs", event);
  console.log("The notification data has the following parameters:");

  Object.keys(notification).forEach(key => {
    console.log(`  ${key}: ${notification[key]}`);
  });
});

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcoAAlfu8Zm8YUov_Og4CKsQ03C7B61bE",
  authDomain: "lelang-koi-probolinggo.firebaseapp.com",
  projectId: "lelang-koi-probolinggo",
  storageBucket: "lelang-koi-probolinggo.appspot.com",
  messagingSenderId: "369915115614",
  appId: "1:369915115614:web:f8da1410ddb249f6fc1ccf",
  measurementId: "G-SPKHJXPRHD"
};

firebase.initializeApp(firebaseConfig);

const pesan = firebase.messaging();

// export function pesan(){}
pesan.onBackgroundMessage(function(payload) {
  console.log("[public] Received background message ", payload);
  // let button = document.getElementById("notif");
  // console.log(" Button ", button);
  // button.click();
  // Customize notification here
  // const notificationTitle = "Diambil alih";
  // const notificationTitle = payload.notification.title;
  // const notificationOptions = {
  //   body: payload.notification.body,
  //   priority: payload.data.priority,
  //   vibrate: payload.data.vibrate,
  //   icon: payload.notification.icon,
  //   // click_action: payload.data.link,
  //   link: payload.data.link
  // };
  // self.registration.showNotification(notificationTitle,
  // notificationOptions);

  // return self.registration.showNotification(notificationTitle,
  // notificationOptions);
  // serviceWorkerRegistration.showNotification(notificationTitle, notificationOptions);
});
