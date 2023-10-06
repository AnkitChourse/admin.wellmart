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

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import backgroundImage from "assets/images/bg-profile.jpeg";
import { useDispatch, useSelector } from "react-redux";
import MDButton from "components/MDButton";
import {
  Cancel,
  CircleNotifications,
  DriveFileRenameOutline,
  Notifications,
  Preview,
} from "@mui/icons-material";
import NotificationItem from "examples/Items/NotificationItem";
import { Badge, Box, Menu, useEventCallback } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SkLoading from "components/SkLoading";
import ImagePicker from "components/ApnaUploader";
import MDInput from "components/MDInput";
import { updateAdminProfile } from "redux/festures/adminSlice";
import { handleAlert } from "redux/festures/alertSlice";
import { getAdminDetails } from "redux/festures/adminSlice";
import { useMaterialUIController } from "context";
import { getAllNotification } from "redux/festures/notificationSlice";
import MDBadge from "components/MDBadge";
import { formattedDateServer } from "Utils/dateFunc";
import { handleModalStatus } from "redux/festures/orderSlice";
import { handleOrderId } from "redux/festures/orderSlice";
import { camelToFlat } from "Utils/dateFunc";

function Header({ children }) {
  const adminId = localStorage.getItem("admin_id");

  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const { Loading, isAdmin } = useSelector((data) => ({ ...data?.admin }));

  // useEffect(() => {
  //  if(isAdmin){
  //   dispatch(getAdminDetails(`${process.env.REACT_APP_API}/getUserById/${adminId}`));
  //  }
  // }, [])

  // console.log(isAdmin, "Admin");
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [fullName, setfullName] = useState("");
  const [isShow, setIsShow] = useState("");
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  useEffect(() => {
    if (isAdmin) {
      setfullName(isAdmin?.fullName);
      setIsShow(isAdmin?.image);
    }
  }, [isAdmin]);
  const isDispatch = useDispatch();
  // useEffect(() => {
  //   isDispatch(getAllNotification(`getUserId/${admin_id}`));
  // }, []);
  // const { isSetLoading, notification, isCount } = useSelector((data) => ({
  //   ...data.isNotification,
  // }));
  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const navigate = useNavigate();
  // const renderMenu = () => (
  //   <Menu
  //     anchorEl={openMenu}
  //     anchorReference={null}
  //     anchorOrigin={{
  //       vertical: "bottom",
  //       horizontal: "left",
  //     }}
  //     open={Boolean(openMenu)}
  //     onClose={handleCloseMenu}
  //     sx={{ mt: 2 }}
  //   >
  //     <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
  //     <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
  //     <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" />
  //   </Menu>
  // );

  const isUpdate = (
    <Card
      sx={({ breakpoints }) => ({
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "column",
        width: "100%",
        height: "auto",
        p: 2.5,
        my: 2,
        border: 0.5,
        gap: 3,
        [breakpoints.up("xs")]: {
          width: "100%",
        },
        [breakpoints.up("sm")]: {
          width: "100%",
        },
        [breakpoints.up("md")]: {
          width: "100%",
        },
        [breakpoints.up("lg")]: {
          width: " 100%",
        },
      })}
    >
      <MDBox lineHeight={1} gap={3} width={"90%"}>
        <MDTypography variant="h6">name</MDTypography>
        <MDInput
          type="text"
          placeholder="name"
          fullWidth
          name="fullName"
          value={fullName}
          onChange={(e) => setfullName(e.target.value)}
        />
      </MDBox>
      <MDBox lineHeight={1} gap={3} width={"90%"}>
        <MDTypography variant="h6">Profile Picture</MDTypography>
        <ImagePicker
          // required={true}
          name=" Image"
          multiple={false}
          images={image}
          setImages={setImage}
          //
        />
        {isShow && image === "" && (
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <span
              style={{
                display: "inline-block",
                width: "50px",
                height: "50px",
                margin: "0 0.5rem",
              }}
            >
              <img
                className="Image"
                style={{ width: "100%", height: "100%" }}
                src={`${process.env.REACT_APP_URI}/${isShow}`}
              />
            </span>
            <span
              className="cross"
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                setIsShow(null);
              }}
            >
              <Cancel
                sx={({ palette: { dark, white, info } }) => ({
                  color: darkMode ? white?.main : dark.main,
                })}
              />
            </span>
          </div>
        )}
      </MDBox>
      <MDBox
        sx={{
          width: "100%",
          justifyContent: "flex-end",
          textAlign: "center",
          display: "flex",
        }}
      >
        <MDButton
          color={"info"}
          verdant={"gradient"}
          onClick={() => {
            const formData = new FormData();
            formData.append("fullName", fullName);
            formData.append("image", image);

            dispatch(
              updateAdminProfile({
                url: `${process.env.REACT_APP_API}/updateUser/${adminId}`,
                data: formData,
              })
            ).then((data) => {
              dispatch(
                handleAlert({
                  isOpen: true,
                  type: data?.payload?.success ? "success" : "error",
                  msg: data?.payload?.message,
                })
              );
              if (data?.payload?.success) {
                dispatch(getAdminDetails(`${process.env.REACT_APP_API}/getUserById/${adminId}`));
                setIsShow("");
                setfullName("");
                setImage("");
              }
            });
          }}
        >
          Update Profile
        </MDButton>
      </MDBox>
    </Card>
  );
  // const isMessage = (
  //   <Card
  //     sx={({ breakpoints }) => ({
  //       display: "flex",
  //       alignItems: "flex-start",
  //       justifyContent: "flex-start",
  //       flexDirection: "column",
  //       width: "100%",
  //       minHeight: "80vh",

  //       p: 2.5,
  //       my: 2,
  //       border: 0.5,
  //       gap: 3,
  //       [breakpoints.up("xs")]: {
  //         width: "100%",
  //       },
  //       [breakpoints.up("sm")]: {
  //         width: "100%",
  //       },
  //       [breakpoints.up("md")]: {
  //         width: "100%",
  //       },
  //       [breakpoints.up("lg")]: {
  //         width: "100%",
  //       },
  //     })}
  //   >
  //     {isSetLoading ? (
  //       <SkLoading />
  //     ) : notification && notification.length > 0 ? (
  //       notification.map((value) => (
  //         <NotificationItem
  //           key={value?._id}
  //           icon={`${process.env.REACT_APP_URI}/${value?.icon}`}
  //           title={value?.title}
  //           date={value?.date}
  //           isClick={() => {
  //             isDispatch(handleModalStatus({ isModalStatus: value?.orderId ? true : false }));
  //             isDispatch(handleOrderId({ isNewOrderId: value?.orderId ? value?.orderId : null }));
  //             value?.orderId && navigate("/orders");
  //           }}
  //           discription={value?.discription}
  //           isDivider={true}
  //         />
  //       ))
  //     ) : (
  //       <MDTypography display="inline" variant="h6" textTransform="capitalize" fontWeight="bold">
  //         No Notifications !
  //       </MDTypography>
  //     )}
  //   </Card>
  // );
  const isDetails = Loading ? (
    <SkLoading />
  ) : (
    <>
      <MDBox
        id="sishubham"
        sx={
          (({ palette: { dark, white, info } }) => ({
            border: 0.5,
            borderColor: darkMode ? white.main : dark.main,
            borderRadius: 3,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            flexDirection: "row",
            gap: 2.5,
          }),
          ({ breakpoints }) => ({
            [breakpoints.up("xs")]: {
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            },
            [breakpoints.up("sm")]: {
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            },
            [breakpoints.up("md")]: {
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            },
            [breakpoints.up("lg")]: {
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            },
          }))
        }
      >
        <MDBox
          sx={({ breakpoints }) => ({
            [breakpoints.up("xs")]: {
              flexDirection: "column",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              gap: 2,
              my: 3,
            },
            [breakpoints.up("sm")]: {
              flexDirection: "column",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              gap: 2,
              my: 3,
            },
            [breakpoints.up("md")]: {
              flexDirection: "column",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "38%",
              gap: 2,
            },
            [breakpoints.up("lg")]: {
              flexDirection: "column",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "38%",
              gap: 2,
            },
          })}
        >
          <MDBox
            width={250}
            height={250}
            borderRadius={"100%"}
            sx={
              (({ palette: { dark, white, info } }) => ({
                borderRadius: "100%",
                width: 250,
                height: 250,
              }),
              ({ breakpoints }) => ({
                [breakpoints.up("xs")]: {
                  width: 100,
                  height: 100,
                },
                [breakpoints.up("sm")]: {
                  width: 100,
                  height: 100,
                },
                [breakpoints.up("md")]: {
                  width: 250,
                  height: 250,
                },
                [breakpoints.up("lg")]: {
                  width: 250,
                  height: 250,
                },
              }))
            }
          >
            <img
              src={`${process.env.REACT_APP_URI}/${isAdmin?.image}`}
              onError={(e) => {
                (e.onError = null),
                  (e.target.src = require("../../../../assets/images/bg-sign-up-cover.jpeg"));
              }}
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
            />
          </MDBox>
          <MDTypography fontSize={12}> User Image </MDTypography>
        </MDBox>
        <MDBox
          sx={({ breakpoints }) => ({
            [breakpoints.up("xs")]: {
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 2.5,
            },
            [breakpoints.up("sm")]: {
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 2.5,
            },
            [breakpoints.up("md")]: {
              width: "60%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 2.5,
            },
            [breakpoints.up("lg")]: {
              width: "60%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 2.5,
            },
          })}
        >
          {isAdmin?.fullName && (
            <MDBox
              display={"flex"}
              gap={3}
              sx={{ justifyContent: "space-between", width: "80%", alignItems: "center" }}
            >
              <MDTypography fontSize={12}> Full Name :</MDTypography>
              <MDTypography fontSize={12}> {isAdmin?.fullName}</MDTypography>
            </MDBox>
          )}
          {isAdmin?.phoneNumber && (
            <MDBox
              display={"flex"}
              gap={3}
              sx={{ justifyContent: "space-between", width: "80%", alignItems: "center" }}
            >
              <MDTypography fontSize={12}> Mobile :</MDTypography>
              <MDTypography fontSize={12}> {isAdmin?.phoneNumber}</MDTypography>
            </MDBox>
          )}
          {isAdmin?.email && (
            <MDBox
              display={"flex"}
              gap={3}
              sx={{ justifyContent: "space-between", width: "80%", alignItems: "center" }}
            >
              <MDTypography fontSize={12}> Email :</MDTypography>
              <MDTypography fontSize={12}> {isAdmin?.email}</MDTypography>
            </MDBox>
          )}

          {isAdmin?.userType && (
            <MDBox
              display={"flex"}
              gap={3}
              sx={{ justifyContent: "space-between", width: "80%", alignItems: "center" }}
            >
              <MDTypography fontSize={12}> User Type :</MDTypography>
              {isAdmin?.userType.map((ele, i) => (
                <MDTypography fontSize={12} key={i}>
                  {" "}
                  {ele}
                </MDTypography>
              ))}
            </MDBox>
          )}
          {/* {isAdmin?.permissions && (
            <MDBox
              display={"flex"}
              gap={3}
              sx={{ justifyContent: "space-between", width: "80%", alignItems: "center" }}
            >
              <MDTypography fontSize={12}> Permissions :</MDTypography>
              {/* {isAdmin?.permissions.map((ele,i)=>
               <MDTypography fontSize={12} key={i}> {ele}</MDTypography>
              )} */}
          {/* {Object.entries(isAdmin?.permissions).map(([key, value], i) =>
               <MDTypography fontSize={12} key={i}> {value}</MDTypography>
              )} */}

          {/* {console.log(isAdmin?.permissions)} */}

          {/* </MDBox>
          )}  */}

          {isAdmin?.permissions ? (
            <>
              <MDTypography fontWeight={"medium"} fontSize={12} variant="button">
                Permissions
              </MDTypography>
              <MDBox
                sx={({ palette: { dark, white, info } }) => ({
                  // border: 0.5,
                  // borderColor: darkMode ? white.main : dark.main,
                  // borderRadius: 3,
                  p: 2,
                  width: "100%",
                  height: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 2,
                })}
              >
                {Object.entries(isAdmin?.permissions).map(([key, value], index) => (
                  <MDBox
                    key={index}
                    sx={({ palette: { dark, white, info }, breakpoints }) => ({
                      borderBottom: "2px",
                      borderColor: darkMode ? white.main : dark.main,
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      width: "100%",
                      gap: 3,
                      [breakpoints.up("xs")]: {
                        px: 1,
                      },
                      [breakpoints.up("sm")]: {
                        px: 1,
                      },
                      [breakpoints.up("md")]: {
                        px: 6,
                      },
                      [breakpoints.up("lg")]: {
                        px: 6,
                      },
                    })}
                  >
                    <MDTypography
                      fontWeight={"medium"}
                      textAlign="left"
                      fontSize={12}
                      variant="button"
                    >
                      {camelToFlat(key)}
                      <MDTypography
                        fontWeight={"medium"}
                        textAlign="left"
                        fontSize={12}
                        variant="button"
                        component="span"
                      ></MDTypography>
                    </MDTypography>

                    <MDTypography
                      fontWeight={"medium"}
                      textAlign="left"
                      fontSize={12}
                      variant="button"
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "wrap",
                        textOverflow: "ellipsis",
                        maxWidth: "70%",
                      }}
                    >
                      {/* {value.split(",")} */}

                      {/* {value.split(",").map((permission, index) => (
    <span key={index}>{permission.trim()}</span>


  ))} */}

                      {value.split(" ")
                        // .replace(/^\[|\]$/g, "")
                       
                        .map((permission, index) => (
                          <span key={index}>{permission}</span>
                        ))}
                    </MDTypography>
                  </MDBox>
                ))}
              </MDBox>
            </>
          ) : null}
          {/* {isAdmin?.updatedAt && (
            <MDBox
              display={"flex"}
              gap={3}
              sx={{ justifyContent: "space-between", width: "80%", alignItems: "center" }}
            >
              <MDTypography fontSize={12}> Last Updated :</MDTypography>
              <MDTypography fontSize={12}>
                {formattedDateServer(new Date(isAdmin?.updatedAt))}
              </MDTypography>
            </MDBox>
          )} */}
          {/* <MDBox
            display={"flex"}
            gap={3}
            sx={{ justifyContent: "space-between", width: "80%", alignItems: "center" }}
          >
            <MDTypography fontSize={12}> User Otp Verify :</MDTypography>
            {isAdmin?.disable ? (
              <MDBadge badgeContent={"Yes"} color={"info"} variant="gradient" size="lg" />
            ) : (
              <MDBadge badgeContent={"No"} color={"error"} variant="gradient" size="lg" />
            )}
          </MDBox> */}
          {/* <MDBox
            display={"flex"}
            gap={3}
            sx={{ justifyContent: "space-between", width: "80%", alignItems: "center" }}
          >
            <MDTypography fontSize={12}> Social Login :</MDTypography>
            {isAdmin?.socilaLogin ? (
              <MDBadge badgeContent={"Yes"} color={"info"} variant="gradient" size="lg" />
            ) : (
              <MDBadge badgeContent={"No"} color={"error"} variant="gradient" size="lg" />
            )}
          </MDBox> */}
          <MDBox
            display={"flex"}
            gap={3}
            sx={{ justifyContent: "space-between", width: "80%", alignItems: "center" }}
          >
            <MDTypography fontSize={12}> User Visible :</MDTypography>
            {isAdmin?.disable ? (
              <MDBadge badgeContent={"True"} color={"info"} variant="gradient" size="lg" />
            ) : (
              <MDBadge badgeContent={"False"} color={"error"} variant="gradient" size="lg" />
            )}
          </MDBox>
        </MDBox>
      </MDBox>
    </>
  );
  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar size="xxl" shadow="sm">
              <img
                src={`${process.env.REACT_APP_URI}/${isAdmin?.image}`}
                style={{ height: "100%", width: "100%" }}
                alt="profile-image"
                onError={(e) => {
                  e.target.src = require("../../../../assets/images/bg-sign-in-basic.jpeg");
                }}
              />
            </MDAvatar>
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              {isAdmin?.fullName && (
                <MDTypography variant="h5" fontWeight="medium">
                  {isAdmin?.fullName}
                  <MDTypography variant="button" color="text" fontWeight="medium" fontSize={12}>
                    ({isAdmin?.email})
                  </MDTypography>
                </MDTypography>
              )}

              {/* <MDTypography variant="button" color="text" fontWeight="regular">
                CEO / Co-Founder
              </MDTypography> */}
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                {[
                  {
                    name: "Details",
                    icon: <Preview />,
                  },
                  // {
                  //   name: "Notification",
                  //   icon: isCount ? (
                  //     <Badge color="secondary" overlap="circular" badgeContent=" " variant="dot">
                  //       <CircleNotifications />{" "}
                  //     </Badge>
                  //   ) : (
                  //     <CircleNotifications />
                  //   ),
                  // },
                  {
                    name: "update",
                    icon: <DriveFileRenameOutline />,
                  },
                ].map((items, index) => (
                  <Tab
                    label={items?.name}
                    icon={items?.icon}
                    key={index}
                    sx={({ palette: { dark, white, info } }) => ({
                      // backgroundColor: darkMode ? white.main : info.main,
                      "&.MuiButtonBase-root-MuiTab-root": {
                        px: 1,
                      },
                      "&.Mui-selected": {
                        px: 1,
                      },
                    })}
                  />
                ))}
              </Tabs>
              {/* <MDButton
                color={"info"}
                verdant={"gradient"}
                sx={{ m: 1 }}
                startIcon={<Notifications />}
                aria-controls="notification-menu"
                aria-haspopup="true"
                onClick={handleOpenMenu}
              >
                Message
              </MDButton>
              {renderMenu()}
              <MDButton
                color={"error"}
                verdant={"gradient"}
                sx={{ m: 1 }}
                onClick={() => {
                  localStorage.clear();
                  navigate("/authentication/sign-in");
                }}
              >
                LogOut
              </MDButton> */}
            </AppBar>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} xl={12}>
          {[
            {
              name: "Details",
              icon: <CircleNotifications />,
              isProp: isDetails,
            },
            // {
            //   name: "Notification",
            //   icon: <CircleNotifications />,
            //   isProp: isMessage,
            // },
            {
              name: "update",
              icon: <DriveFileRenameOutline />,
              isProp: isUpdate,
            },
          ].map((items, index) => (
            <TabPanel value={tabValue} index={index} key={index}>
              <MDBox
                sx={({ breakpoints }) => ({
                  p: 1,
                  my: 3,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                })}
              >
                {Loading ? <SkLoading /> : isAdmin && items?.isProp}
              </MDBox>
            </TabPanel>
          ))}
        </Grid>
        {children}
      </Card>
    </MDBox>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
