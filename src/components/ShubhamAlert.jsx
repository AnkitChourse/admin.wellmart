import { Alert, Slide, Snackbar } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAlert } from "redux/festures/alertSlice";
import MDSnackbar from "./MDSnackbar";
// import { handleAlert } from "../../redux/AlertsTostify/alertSlice";

function TransitionLeft(props) {
  return <Slide {...props} direction="Top" />;
}
const AlertTost = () => {
  const { alerts } = useSelector((state) => ({
    ...state.isAlert,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (alerts?.isOpen) {
      setTimeout(() => {
        dispatch(handleAlert({ ...alerts, isOpen: false }));
      }, 3000);
    }
  }, [alerts?.isOpen]);
  return (
    <>
      <MDSnackbar
        color={alerts.type}
        icon={alerts.type === "success" ? "task_alt" : "error"}
        title="Admin_EasySolutions"
        content={alerts.msg}
        dateTime={""}
        open={alerts?.isOpen}
        onClose={() => dispatch(handleAlert({ ...alerts, isOpen: false }))}
      />
    </>
  );
};

export default AlertTost;
