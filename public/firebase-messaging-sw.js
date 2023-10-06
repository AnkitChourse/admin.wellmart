
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

var firebaseConfig = {
 

  apiKey: "AIzaSyDo2y1PoSiG_huWdNmQtGTG8UIa07f8rGE",
  authDomain: "easysolution-5d8b3.firebaseapp.com",
  projectId: "easysolution-5d8b3",
  storageBucket: "easysolution-5d8b3.appspot.com",
  messagingSenderId: "47297759745",
  appId: "1:47297759745:web:1c76ea1296419c53828e00",
  measurementId: "G-1W0XD2RN9J"

};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // console.log(
  //   "[firebase-messaging-sw.js] Received background message ",
  //   payload
  // );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});






