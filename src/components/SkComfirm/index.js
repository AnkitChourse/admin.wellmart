import React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import MDTypography from "components/MDTypography";
import { useMaterialUIController } from "context";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SkConfirm({ dialogTitle, dialogContent, dialogAction, open, setOpen }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  return (
    <Dialog
      open={open.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => {
        setOpen((Preview) => ({
          ...Preview,
          open: false,
          isId: null,
        }));
      }}
      aria-describedby="alert-dialog-slide-description"
      sx={({ palette: { dark, error, info, white } }) => ({
        "& .MuiPaper-root": {
          backgroundColor: darkMode ? dark.main : white.main, // Customize the background color
        },
        "& .MuiDialog-paper": {
          color: !darkMode ? dark.main : white.main, // Customize the text color
        },
      })}
    >
      <DialogTitle>
        {" "}
        <MDTypography variant="h4">{dialogTitle}</MDTypography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <MDTypography variant="h6">{dialogContent}</MDTypography>
          <MDTypography variant="subtitle2">This is permanently deleted !</MDTypography>
        </DialogContentText>
      </DialogContent>
      {/* <DialogTitle></DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">{dialogContent}</DialogContentText>
      </DialogContent> */}
      <DialogActions>{dialogAction}</DialogActions>
    </Dialog>
  );
}

SkConfirm.propTypes = {
  dialogTitle: PropTypes.string.isRequired,
  dialogContent: PropTypes.string.isRequired,
  dialogAction: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
