import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { handletoken } from "redux/festures/alertSlice";



export const firebaseConfig = {

  apiKey: "AIzaSyDo2y1PoSiG_huWdNmQtGTG8UIa07f8rGE",
  authDomain: "easysolution-5d8b3.firebaseapp.com",
  projectId: "easysolution-5d8b3",
  storageBucket: "easysolution-5d8b3.appspot.com",
  messagingSenderId: "47297759745",
  appId: "1:47297759745:web:1c76ea1296419c53828e00",
  measurementId: "G-1W0XD2RN9J"
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestPermission = (setValue) => {
  // console.log("Requesting User Permission......");
  Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        // console.log("Notification User Permission Granted.");
        return getToken(messaging, {
          vapidKey: `BCLqy-YQGnrt8BAOjJA7EfiIYDFiySa4VbM_Y3OaLT5DnlsJLWhW_yErkYdqudy3wrkb-XQM-aM-n_VKN_sQxRk`,
        });
      } else {
        console.log("User Permission Denied.");
      }
    })
    .then((currentToken) => {
      // console.log(currentToken,"currentToken")
      if (currentToken) {

        // console.log("Client Token: ", currentToken);
        setValue(handletoken(currentToken));
      } else {
        console.log("Failed to generate the app registration token.");
      }
    })
    .catch((err) => {
      console.error("An error occurred:", err);
    });
};


requestPermission();

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
