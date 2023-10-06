import React, { useState, useEffect } from "react";
// import { Toaster, toast } from "react-hot-toast";
import { requestPermission, onMessageListener } from "../../firebase";
import { useDispatch } from "react-redux";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import SkModal from "components/SkModal";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";

function Notification() {
  const [notification, setNotification] = useState({ title: "", body: "",rentalType:"" });
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    requestPermission(dispatch);
    const unsubscribe = onMessageListener().then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
        rentalType:payload?.notification?.rentalType,
      });

      handleClickOpen();

      Store.addNotification({
        title: `${payload?.notification?.title}`,
        message: `${payload?.notification?.body}`,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 10000,
          onScreen: true,
        },
      });
    });
    return () => {
      unsubscribe.catch((err) => console.log("failed: ", err));
    };
  }, []);

  return (
    <div>



    
     <ReactNotifications />
      
    </div>
  );
}
export default Notification;
