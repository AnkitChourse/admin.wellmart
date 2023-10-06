import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import { useMaterialUIController } from "context";
import { IconButton, useMediaQuery } from "@mui/material";
import { Close } from "@mui/icons-material";
export default function SkModal({ children, show, unShow, width, height, overflowY, padding, maxHeight }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const isMobile = useMediaQuery("(max-width:870px)");
  // const style = {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   width: width ? width : 600,
  //   height: height ? height : 600,
  //   overflowY: overflowY ? "scroll" : "",
  //   // bgcolor: darkMode ? white.main : dark.main,
  //   border: "0px solid #000",
  //   boxShadow: 24,
  //   borderRadius: 8,
  //   p: padding ? padding : 4,
  //   scrollBehavior: "smooth",
  //   "&::-webkit-scrollbar": {
  //     width: "0.4em",
  //     display: "none",
  //   },
  // };
  return (
    <div>
      <Modal
        open={show}
        onClose={() => unShow(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={({ palette: { dark, white } }) => ({
            backgroundColor: darkMode ? dark.main : white.main,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "100%" : width ? width : 600,
            height: maxHeight ? 'auto' : height ? height : 600,
            borderRadius: 5,
            maxHeight: maxHeight ? maxHeight : height,
            boxShadow: 24,
            p: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",

          })}
        >
          <IconButton
            onClick={() => {
              unShow(false);
            }}
            sx={({ palette: { dark, error, info } }) => ({
              color: darkMode ? error.main : error.main,
              position: "fixed",
              top: 10.5,
              right: 10.5,
              border: 1,
              borderRadius: 3,
              p: 0.5,
              borderColor: darkMode ? error.main : error.main,
              zIndex: 999,
            })}
          >
            {" "}
            <Close
              sx={({ palette: { dark, error, info } }) => ({
                color: darkMode ? error.main : error.main,
              })}
            />{" "}
          </IconButton>
          <Box
            sx={({ palette: { dark, white } }) => ({
              backgroundColor: "transparent",

              width: "98%",
              height: maxHeight ? '0' : "98%",
              overflowY: overflowY ? "scroll" : "",
              // bgcolor: darkMode ? white.main : dark.main,
              maxHeight: maxHeight ? maxHeight : "100%",

              p: padding ? padding : 4,
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": {
                width: "0.4em",
                display: "none",
              },
            })}
          >
            {children}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
SkModal.propTypes = {
  children: PropTypes.node,
  overflowY: PropTypes.bool,
  show: PropTypes.bool.isRequired,
  unShow: PropTypes.func.isRequired,
  width: PropTypes.any,
  height: PropTypes.any,
  padding: PropTypes.string,
  maxHeight: PropTypes.string,

  //   sorted: PropTypes.oneOf([false, "none", "asce", "desc"]),
};
