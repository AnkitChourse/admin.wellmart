/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import MDButton from "components/MDButton";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotification } from "redux/festures/notificationSlice";
import SkLoading from "components/SkLoading";
import MDTypography from "components/MDTypography";

import { Badge, Button } from "@mui/material";
import { UpdateNotification } from "redux/festures/notificationSlice";
import MDAvatar from "components/MDAvatar";
import { getAdminDetails } from "redux/festures/adminSlice";
import SkModal from "components/SkModal";
import DefaultNavbarLink from "../DefaultNavbar/DefaultNavbarLink";
import { handleModalStatus } from "redux/festures/orderSlice";
import { handleOrderId } from "redux/festures/orderSlice";
import { Close } from "@mui/icons-material";
import { getNotificationCount } from "redux/festures/notificationSlice";

function DashboardNavbar({ absolute, light, isMini }) {
  const adminId = localStorage.getItem("admin_id");
  const [navbarType, setNavbarType] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const isDispatch = useDispatch();

  const { isSetLoading, notification, isCount } = useSelector((data) => ({
    ...data.isNotification,
  }));
  // console.log(notification, "notification");
  // console.log(isCount, "isCount");
  const { Loading, isAdmin } = useSelector((data) => ({ ...data?.admin }));

  useEffect(() => {
    isDispatch(getAdminDetails(`${process.env.REACT_APP_API}/getUserById/${adminId}`));
  }, []);

  // useEffect(() => {
  //   const dispatchAction = () => {
  //     isDispatch(getNotificationCount(`${process.env.REACT_APP_API}/seenCount/${admin}`));
  //   };

  //   dispatchAction();

  //   const intervalId = setInterval(dispatchAction, 60000);

  //   return () => clearInterval(intervalId);
  // }, []);

  // useEffect(() => {
  //   isDispatch(getNotificationCount(`${process.env.REACT_APP_APII}/seenCount/${admin}`));
  // }, []);

  // useEffect(() => {
  //   const dispatchAction = () => {
  //     if (isAdmin) {
  //       isDispatch(
  //         getAllNotification(
  //           `${process.env.REACT_APP_API}/getByUserId/${admin}?userType=${isAdmin.userType}`
  //         )
  //       );
  //     }
  //   };

  //   dispatchAction();

  //   const intervalId = setInterval(dispatchAction, 1200000);

  //   return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    if (isAdmin) {
      isDispatch(
        getAllNotification(
          `${process.env.REACT_APP_APII}/getByUserId/${adminId}?userType=${isAdmin?.userType}`
        )
      );
    }
  }, [isAdmin]);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleIsOpenMenu = (event) => setIsOpenMenu(event.currentTarget);
  const handleIsCloseMenu = () => setIsOpenMenu(false);
  const handleCloseMenu = () => {
    setOpenMenu(false);
    isDispatch(
      UpdateNotification({ url: `${process.env.REACT_APP_APII}/seenCount/${adminId}` })
    ).then((data) => {
      if (data?.payload?.success) {
        isDispatch(getAllNotification(`${process.env.REACT_APP_APII}/getByUserId/${adminId}?userType=${isAdmin?.userType}`));
      }
    });
  };

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2, p: 0.5 }}
    >
      <MDBox
        // sx={{
        //
        // }}
        sx={({ breakpoints }) => ({
          [breakpoints.up("xs")]: {
            p: 1,
            width: "100%",
          },
          [breakpoints.up("sm")]: {
            width: "100%",
            p: 1,
          },
          [breakpoints.up("md")]: {
            width: 500,
            p: 1,
          },
          [breakpoints.up("lg")]: {
            p: 1,
            width: 500,
          },
        })}
      >
        <MDBox
          sx={({ palette: { dark, error, info, white } }) => ({
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            position: "relative",
            my: 1,
            p: 1,
            borderColor: "transparent",
          })}
        >
          <MDTypography
            display="inline"
            variant="h6"
            textTransform="capitalize"
            fontWeight="bold"
            width="100%"
            textAlign="center"
          >
            Your Notification !
          </MDTypography>
          <IconButton
            onClick={() => {
              handleCloseMenu();
            }}
            sx={({ palette: { dark, error, info } }) => ({
              color: darkMode ? error.main : error.main,
              position: "fixed",
              // top: -1.5,
              // right: 25.5,
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
        </MDBox>

        {/* {console.log(notification,"notification")} */}
        {isSetLoading ? (
          <SkLoading />
        ) : notification && notification.length > 0 ? (
          notification.map((value) => (
            <NotificationItem
              key={value?._id}
              icon={`${process.env.REACT_APP_URI}/${value?.icon}`}
              title={value?.title}
              message={value?.message}
              date={value?.date}
              isClick={() => {
                isDispatch(handleModalStatus({ isModalStatus: value?.orderId ? true : false }));
                isDispatch(handleOrderId({ isNewOrderId: value?.orderId ? value?.orderId : null }));
                value?.orderId && navigate("/orders");
                // handleCloseMenu();
              }}
              discription={value?.discription}
            />
          ))
        ) : (
          <MDTypography display="inline" variant="h6" textTransform="capitalize" fontWeight="bold">
            No Notifications !
          </MDTypography>
        )}
      </MDBox>
    </Menu>
  );
  const renderIsMenu = () => (
    <Menu
      anchorEl={isOpenMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(isOpenMenu)}
      onClose={handleIsCloseMenu}
      sx={{ mt: 2, p: 0.5 }}
    >
      <MDBox px={0.5} width={185}>
        <DefaultNavbarLink icon="person" name="Profile" route="/profile" />
        <DefaultNavbarLink
          icon="account_circle"
          name="Logout"
          // route="/authentication/sign-up"
          isOnClick={true}
          onClick={() => setIsOpen(true)}
        />
      </MDBox>
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });
  const navigate = useNavigate();

  return (
    <>
      <AppBar
        position={absolute ? "absolute" : navbarType}
        color="inherit"
        sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
      >
        <Toolbar sx={(theme) => navbarContainer(theme)}>
          <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
            <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
          </MDBox>
          {isMini ? null : (
            <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
              <MDBox pr={1}>
                {/* <MDButton
                  variant="gradient"
                  color="info"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/authentication/sign-in");
                  }}
                >
                  Logout
                </MDButton> */}
              </MDBox>
              <MDBox color={light ? "white" : "inherit"}>
                {/* <Link to="/profile"> */}
                {/* <IconButton sx={navbarIconButton} size="small" disableRipple>
                  <Icon sx={iconsStyle}>account_circle</Icon>
                </IconButton> */}
                <IconButton
                  sx={navbarIconButton}
                  aria-label="admin details"
                  // onClick={() => {
                  //   setIsOpen(true);
                  //   // navigate("/profile");
                  // }}
                  size="small"
                  disableRipple
                  color="inherit"
                  aria-controls="notification-menu"
                  aria-haspopup="true"
                  variant="contained"
                  onClick={handleIsOpenMenu}
                >
                  <MDAvatar size="xs" shadow="sm">
                    <img
                      src={`${process.env.REACT_APP_URI}/${isAdmin?.image}`}
                      style={{ height: "100%", width: "100%" }}
                      alt="profile-image"
                      onError={(e) => {
                        e.target.src = require("../../../assets/images/bg-sign-in-basic.jpeg");
                      }}
                    />
                  </MDAvatar>
                </IconButton>
                {renderIsMenu()}
                <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  sx={navbarMobileMenu}
                  onClick={handleMiniSidenav}
                >
                  <Icon sx={iconsStyle} fontSize="medium">
                    {miniSidenav ? "menu_open" : "menu"}
                  </Icon>
                </IconButton>
                <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  sx={navbarIconButton}
                  onClick={handleConfiguratorOpen}
                >
                  <Icon sx={iconsStyle}>settings</Icon>
                </IconButton>
                <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  sx={navbarIconButton}
                  aria-controls="notification-menu"
                  aria-haspopup="true"
                  variant="contained"
                  onClick={handleOpenMenu}
                >
                  <Badge badgeContent={isCount && isCount} color="secondary" max={10}>
                    <Icon sx={iconsStyle}>notifications</Icon>
                  </Badge>
                </IconButton>
                {renderMenu()}
              </MDBox>
            </MDBox>
          )}
        </Toolbar>
      </AppBar>
      <SkModal
        show={isOpen}
        unShow={setIsOpen}
        width={{ sx: "50%", md: "45%", xl: "45%", sm: "50%" }}
        height={"45%"}
        padding={2}
        overflowY={true}
      >
        <MDBox
          sx={({ palette: { dark, white, info } }) => ({
            color: darkMode ? info.main : dark.main,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            flexDirection: "column",
            // border: 1,
            // borderRadius: 3,
            p: 1.5,
          })}
        >
          <MDTypography variant="h3" fontWeight="medium" color="text">
            Are You Sure You Want To LogOut
          </MDTypography>
          <MDBox
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 3,
              width: "100%",
              px: 3,
            }}
          >
            <MDButton
              variant="outlined"
              color="info"
              sx={{ width: "50%" }}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </MDButton>
            <MDButton
              variant="gradient"
              sx={{ width: "50%" }}
              color="info"
              onClick={() => {
                localStorage.clear();
                navigate("/authentication/sign-in");
              }}
            >
              yes
            </MDButton>
          </MDBox>
        </MDBox>
      </SkModal>
    </>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
