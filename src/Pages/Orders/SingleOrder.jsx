import { CheckCircle, Unpublished } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import SkLoading from "components/SkLoading";
import { useMaterialUIController } from "context";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAlert } from "redux/festures/alertSlice";
import { updateOrderDetails } from "redux/festures/orderSlice";
import { getAllOrders } from "redux/festures/orderSlice";
import { getSingleOrders } from "redux/festures/orderSlice";
import { getSingleUser } from "redux/festures/userSlice";
import { SkDate } from "Utils/dateFunc";
import { camelToFlat } from "Utils/dateFunc";
import { formattedDateServer } from "Utils/dateFunc";

const mapStatusByName = {
  PENDING: "Pending",
  ORDERED: "Ordered",
  ACCEPTED: "Accepted",
  ONTHEWAY: "On The Way",
  WORKING: "Working",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  OUT_OF_DELIVERY: "Out For Delivery",
  DELIVERED: "Delivered",
  RETURN_REQUEST: "Return Request",
  RETURNED: "Returned",
  RETURN_REQUEST_APPROVED: "Return Request Approved",
  CANCELLED: "Cancelled",
  SHIPPED: "Shipped",
  MULTI_STATUS: "Multi Status",
};

const SingleOrderDetails = ({
  viewOrderId,
  setViewProductModal,
  isFindStatus,
  isOrder,
  setIsOrder,
  handleMenuOpen,
  ecom,
}) => {
  const dispatch = useDispatch();
  const { singleOrders, IsLoading } = useSelector((state) => ({ ...state.isOrders }));
  // console.log(viewOrderId, "vieworderId");
  // console.log(singleOrders, "singleOrder");
  useEffect(() => {
    dispatch(
      getSingleOrders(
        ecom
          ? `/eCommerce/getByOrderId/${viewOrderId}/${admin}`
          : `/getOrderByOrderId/${viewOrderId}/${admin}`
      )
    );
  }, [viewOrderId]);

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const admin = localStorage.getItem("admin_id");
  const [isOrderDetails, setIsOrderDetails] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [isIndex, setIsIndex] = useState(0);
  // const handleOpenMenu = ({ event }) => {
  //   setOpenMenu(event.currentTarget);
  // };

  // console.log(singleOrders,"singleOrders")

  
  const isStatusUpdateFunction = (isStatus) => {
    const status = { status: isStatus };
    // console.log(isOrderDetails, "isOrderDetails");
    // console.log(isStatus, "isStatus");
    if (isOrderDetails && isOrderDetails?._id) {
      dispatch(
        updateOrderDetails({
          url: `${process.env.REACT_APP_APII}/updateSingleStatus/${singleOrders?.userId}/${singleOrders?._id}/${admin}?productId=${isOrderDetails?.productId?._id}`,
          data: status,
        })
      ).then((data) => {
        // console.log(data);
        dispatch(
          handleAlert({
            isOpen: true,
            type: `${data?.payload?.success ? "success" : "error"}`,
            msg: `${data?.payload?.message}`,
          })
        );
        if (data?.payload?.success) {
          dispatch(
            getSingleOrders(
              ecom
                ? `/eCommerce/getByOrderId/${viewOrderId}/${admin}`
                : `/getOrderByOrderId/${viewOrderId}/${admin}`
            )
          );
          dispatch(
            getAllOrders(
              ecom
                ? `/eCommerce/filterOrderByDate/${admin}?page=1`
                : `/filterOrderByDate/${admin}?page=1`
            )
          );
        }
      });
    } else {
      dispatch(
        handleAlert({
          isOpen: true,
          type: "warning",
          msg: "try again !",
        })
      );
    }
  };
  return (
    <>
      <MDBox textAlign="center">
        {singleOrders?.customerId ? (
          <>
            <MDTypography fontWeight={"medium"} fontSize={20} variant="button">
              Customer Details
            </MDTypography>
            <MDBox
              sx={({ palette: { dark, white, info } }) => ({
                border: 0.5,
                borderColor: darkMode ? white.main : dark.main,
                borderRadius: 3,
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
              <MDBox
                sx={({ palette: { dark, white, info }, breakpoints }) => ({
                  borderBottom: "2px",
                  borderColor: darkMode ? white.main : dark.main,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "30vw",
                  height: "30vh",
                  // gap: 3,
                  [breakpoints.up("xs")]: {
                    // px: 1,
                    width: "90%",
                  },
                  [breakpoints.up("sm")]: {
                    // px: 1,
                    width: "90%",
                  },
                  [breakpoints.up("md")]: {
                    // px: 6,
                    width: "50%",
                  },
                  [breakpoints.up("lg")]: {
                    // px: 6,
                    width: "16vw",
                  },
                })}
              >
                <MDBox width="100%" height="100%" borderRadius="50%">
                  <img
                    src={`${process.env.REACT_APP_URI}/${singleOrders?.customerId?.image}`}
                    onError={(e) => {
                      (e.onError = null),
                        (e.target.src = require("../../assets/images/bg-profile.jpeg"));
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "fill",
                      borderRadius: "50%",
                    }}
                  />
                </MDBox>
              </MDBox>
              <MDBox
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
                <MDTypography fontWeight={"medium"} textAlign="left" fontSize={15} variant="button">
                  {camelToFlat("_id")}
                  <MDTypography
                    fontWeight={"medium"}
                    textAlign="left"
                    fontSize={15}
                    variant="button"
                    component="span"
                  >
                    :
                  </MDTypography>
                </MDTypography>

                <MDTypography
                  fontWeight={"medium"}
                  textAlign="left"
                  fontSize={15}
                  variant="button"
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "wrap",
                    textOverflow: "ellipsis",
                    maxWidth: "70%",
                  }}
                >
                  {singleOrders?.customerId?._id}
                </MDTypography>
              </MDBox>
              <MDBox
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
                <MDTypography fontWeight={"medium"} textAlign="left" fontSize={15} variant="button">
                  {camelToFlat("Full Name")}
                  <MDTypography
                    fontWeight={"medium"}
                    textAlign="left"
                    fontSize={15}
                    variant="button"
                    component="span"
                  >
                    :
                  </MDTypography>
                </MDTypography>

                <MDTypography
                  fontWeight={"medium"}
                  textAlign="left"
                  fontSize={15}
                  variant="button"
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "wrap",
                    textOverflow: "ellipsis",
                    maxWidth: "70%",
                  }}
                >
                  {singleOrders?.customerId?.fullName}
                </MDTypography>
              </MDBox>
              <MDBox
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
                <MDTypography fontWeight={"medium"} textAlign="left" fontSize={15} variant="button">
                  {camelToFlat("Phone Number")}
                  <MDTypography
                    fontWeight={"medium"}
                    textAlign="left"
                    fontSize={15}
                    variant="button"
                    component="span"
                  >
                    :
                  </MDTypography>
                </MDTypography>

                <MDTypography
                  fontWeight={"medium"}
                  textAlign="left"
                  fontSize={15}
                  variant="button"
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "wrap",
                    textOverflow: "ellipsis",
                    maxWidth: "70%",
                  }}
                >
                  {singleOrders?.customerId?.phoneNumber}
                </MDTypography>
              </MDBox>
              <MDBox
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
                <MDTypography fontWeight={"medium"} textAlign="left" fontSize={15} variant="button">
                  {camelToFlat("User Type")}
                  <MDTypography
                    fontWeight={"medium"}
                    textAlign="left"
                    fontSize={15}
                    variant="button"
                    component="span"
                  >
                    :
                  </MDTypography>
                </MDTypography>

                <MDTypography
                  fontWeight={"medium"}
                  textAlign="left"
                  fontSize={15}
                  variant="button"
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "wrap",
                    textOverflow: "ellipsis",
                    maxWidth: "70%",
                  }}
                >
                  {singleOrders?.customerId?.userType?.join(", ") || "N/A"}
                </MDTypography>
              </MDBox>
              <MDBox
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
                <MDTypography fontWeight={"medium"} textAlign="left" fontSize={15} variant="button">
                  {camelToFlat("Permissions")}
                  <MDTypography
                    fontWeight={"medium"}
                    textAlign="left"
                    fontSize={15}
                    variant="button"
                    component="span"
                  >
                    :
                  </MDTypography>
                </MDTypography>

                <MDTypography
                  fontWeight={"medium"}
                  textAlign="left"
                  fontSize={15}
                  variant="button"
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "wrap",
                    textOverflow: "ellipsis",
                    maxWidth: "70%",
                  }}
                >
                  {singleOrders?.customerId?.permissions?.join(", ") || "N/A"}
                </MDTypography>
              </MDBox>
            </MDBox>
          </>
        ) : null}
        {singleOrders?.partnerId ? (
          <>
            <MDTypography fontWeight={"medium"} fontSize={20} variant="button">
              Partner Details
            </MDTypography>
            <MDBox
              sx={({ palette: { dark, white, info } }) => ({
                border: 0.5,
                borderColor: darkMode ? white.main : dark.main,
                borderRadius: 3,
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
              <MDBox
                sx={({ palette: { dark, white, info }, breakpoints }) => ({
                  borderBottom: "2px",
                  borderColor: darkMode ? white.main : dark.main,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "30vw",
                  height: "30vh",
                  // gap: 3,
                  [breakpoints.up("xs")]: {
                    // px: 1,
                    width: "90%",
                  },
                  [breakpoints.up("sm")]: {
                    // px: 1,
                    width: "90%",
                  },
                  [breakpoints.up("md")]: {
                    // px: 6,
                    width: "50%",
                  },
                  [breakpoints.up("lg")]: {
                    // px: 6,
                    width: "16vw",
                  },
                })}
              >
                <MDBox width="100%" height="100%" borderRadius="50%">
                  <img
                    src={`${process.env.REACT_APP_URI}/${singleOrders?.partnerId?.image}`}
                    onError={(e) => {
                      (e.onError = null),
                        (e.target.src = require("../../assets/images/bg-profile.jpeg"));
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "fill",
                      borderRadius: "50%",
                    }}
                  />
                </MDBox>
              </MDBox>
              <MDBox
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
                <MDTypography fontWeight={"medium"} textAlign="left" fontSize={15} variant="button">
                  {camelToFlat("_id")}
                  <MDTypography
                    fontWeight={"medium"}
                    textAlign="left"
                    fontSize={15}
                    variant="button"
                    component="span"
                  >
                    :
                  </MDTypography>
                </MDTypography>

                <MDTypography
                  fontWeight={"medium"}
                  textAlign="left"
                  fontSize={15}
                  variant="button"
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "wrap",
                    textOverflow: "ellipsis",
                    maxWidth: "70%",
                  }}
                >
                  {singleOrders?.partnerId?._id}
                </MDTypography>
              </MDBox>
              <MDBox
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
                <MDTypography fontWeight={"medium"} textAlign="left" fontSize={15} variant="button">
                  {camelToFlat("Full Name")}
                  <MDTypography
                    fontWeight={"medium"}
                    textAlign="left"
                    fontSize={15}
                    variant="button"
                    component="span"
                  >
                    :
                  </MDTypography>
                </MDTypography>

                <MDTypography
                  fontWeight={"medium"}
                  textAlign="left"
                  fontSize={15}
                  variant="button"
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "wrap",
                    textOverflow: "ellipsis",
                    maxWidth: "70%",
                  }}
                >
                  {singleOrders?.partnerId?.fullName}
                </MDTypography>
              </MDBox>
              <MDBox
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
                <MDTypography fontWeight={"medium"} textAlign="left" fontSize={15} variant="button">
                  {camelToFlat("Phone Number")}
                  <MDTypography
                    fontWeight={"medium"}
                    textAlign="left"
                    fontSize={15}
                    variant="button"
                    component="span"
                  >
                    :
                  </MDTypography>
                </MDTypography>

                <MDTypography
                  fontWeight={"medium"}
                  textAlign="left"
                  fontSize={15}
                  variant="button"
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "wrap",
                    textOverflow: "ellipsis",
                    maxWidth: "70%",
                  }}
                >
                  {singleOrders?.partnerId?.phoneNumber}
                </MDTypography>
              </MDBox>
              <MDBox
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
                <MDTypography fontWeight={"medium"} textAlign="left" fontSize={15} variant="button">
                  {camelToFlat("User Type")}
                  <MDTypography
                    fontWeight={"medium"}
                    textAlign="left"
                    fontSize={15}
                    variant="button"
                    component="span"
                  >
                    :
                  </MDTypography>
                </MDTypography>

                <MDTypography
                  fontWeight={"medium"}
                  textAlign="left"
                  fontSize={15}
                  variant="button"
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "wrap",
                    textOverflow: "ellipsis",
                    maxWidth: "70%",
                  }}
                >
                  {singleOrders?.partnerId?.userType?.join(", ") || "N/A"}
                </MDTypography>
              </MDBox>
              <MDBox
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
                <MDTypography fontWeight={"medium"} textAlign="left" fontSize={15} variant="button">
                  {camelToFlat("Permissions")}
                  <MDTypography
                    fontWeight={"medium"}
                    textAlign="left"
                    fontSize={15}
                    variant="button"
                    component="span"
                  >
                    :
                  </MDTypography>
                </MDTypography>

                <MDTypography
                  fontWeight={"medium"}
                  textAlign="left"
                  fontSize={15}
                  variant="button"
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "wrap",
                    textOverflow: "ellipsis",
                    maxWidth: "70%",
                  }}
                >
                  {singleOrders?.partnerId?.permissions?.join(", ") || "N/A"}
                </MDTypography>
              </MDBox>
            </MDBox>
          </>
        ) : null}
        {singleOrders?.address ? (
          <>
            <MDTypography fontWeight={"medium"} fontSize={20} variant="button">
              Address
            </MDTypography>
            <MDBox
              sx={({ palette: { dark, white, info } }) => ({
                border: 0.5,
                borderColor: darkMode ? white.main : dark.main,
                borderRadius: 3,
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
              {Object.entries(singleOrders?.address).map(([key, value], index) =>
                key === "_id" ||
                key === "createdAt" ||
                key === "updatedAt" ||
                key === "__v" ? null : (
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
                      fontSize={15}
                      variant="button"
                    >
                      {camelToFlat(key)}
                      <MDTypography
                        fontWeight={"medium"}
                        textAlign="left"
                        fontSize={15}
                        variant="button"
                        component="span"
                      >
                        :
                      </MDTypography>
                    </MDTypography>

                    <MDTypography
                      fontWeight={"medium"}
                      textAlign="left"
                      fontSize={15}
                      variant="button"
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "wrap",
                        textOverflow: "ellipsis",
                        maxWidth: "70%",
                      }}
                    >
                      {value}
                    </MDTypography>
                  </MDBox>
                )
              )}
            </MDBox>
          </>
        ) : null}
        <MDBox
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 1,
            mt: 2,
          }}
        >
          <MDTypography fontWeight={"medium"} fontSize={20} variant="button">
            Order Status :{" "}
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                border: "0.5px solid",
                padding: "5px 8px",
                borderRadius: "5px",
              }}
            >
              {singleOrders?.orderDetails?.status}
            </span>
          </MDTypography>

          <Tooltip title={singleOrders?.orderDetails?.status || "N/A"}>
            <IconButton
              aria-controls="notification-menu"
              disabled={
                ecom
                  ? singleOrders?.orderDetails?.status === "PENDING" ||
                    singleOrders?.orderDetails?.status === "CANCELLED" ||
                    singleOrders?.orderDetails?.status === "DELIVERED" ||
                    singleOrders?.orderDetails?.status === "RETURN_REQUEST" ||
                    singleOrders?.orderDetails?.status === "RETURN_REQUEST_APPROVED" ||
                    singleOrders?.orderDetails?.status === "MULTI_STATUS" ||
                    singleOrders?.orderDetails?.status === "RETURNED"
                  : singleOrders?.orderDetails?.status === "PENDING" ||
                    singleOrders?.orderDetails?.status === "CANCELLED" ||
                    singleOrders?.orderDetails?.status === "WORKING"
              }
              aria-haspopup="true"
              component="a"
              target="_blank"
              rel="noreferrer"
              variant="gradient"
              color="info"
              size="small"
              circular
              onClick={(e) => {
                handleMenuOpen({ event: e });
                setIsOrder(singleOrders);
              }}
            >
              <MDBadge
                badgeContent="Update All Order Status"
                color="info"
                variant="gradient"
                size="lg"
              />
            </IconButton>
          </Tooltip>
          <MDBox
            sx={({ palette: { dark, white, info } }) => ({
              border: 0.5,
              borderColor: darkMode ? white.main : dark.main,
              borderRadius: 3,
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
            {singleOrders?.product &&
              singleOrders?.product.length > 0 &&
              singleOrders?.product.map((value, index) => (
                <MDBox
                  key={index}
                  sx={({ palette: { dark, white, info } }) => ({
                    border: 0.5,
                    borderColor: darkMode ? white.main : dark.main,
                    borderRadius: 3,
                    p: 1,
                    width: "100%",
                    height: "15rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                  })}
                >
                  {/* {console.log(value)} */}
                  {/* <MDBox
                    sx={({ palette: { dark, white, info }, breakpoints }) => ({
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
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
                    <Tooltip title={value?.status}>
                      <IconButton
                        aria-controls="notification-menu"
                        disabled={
                          value?.status === "DELIVERED" ||
                          value?.status === "CANCELLED" ||
                          value?.status === "CANCELLED" ||
                          value?.status === "DELIVERED"
                        }
                        aria-haspopup="true"
                        component="a"
                        target="_blank"
                        rel="noreferrer"
                        variant="gradient"
                        color="info"
                        size="small"
                        circular
                        onClick={(e) => {
                          handleOpenMenu({ event: e });
                          setIsOrderDetails(value);
                          setIsIndex(index);
                        }}
                      >
                        <MDBadge
                          badgeContent="Update Status"
                          color="primary"
                          variant="gradient"
                          size="lg"
                        />
                      </IconButton>
                    </Tooltip>
                  </MDBox> */}
                  <MDBox
                    sx={({ palette: { dark, white, info }, breakpoints }) => ({
                      display: "flex",
                      alignItems: "flex-start",
                      width: "50%",
                      height: "100%",
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
                    <MDBox width="100%" height="100%">
                      <img
                        style={{ width: "80%", height: "100%", p: 1, objectFit: "contain" }}
                        src={`${process.env.REACT_APP_URI}/${value?.productId?.thumnail}`}
                        onError={(e) => {
                          (e.onError = null),
                            (e.target.src = require("../../assets/images/bg-profile.jpeg"));
                        }}
                      />
                    </MDBox>
                  </MDBox>
                  <MDBox width="50%" display="flex" flexDirection="column" alignItems="flex-end">
                    <MDBox
                      sx={({ palette: { dark, white, info }, breakpoints }) => ({
                        display: "flex",
                        alignItems: "flex-start",
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
                        variant="h6"
                        sx={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          maxWidth: "100%",
                        }}
                      >
                        {value?.productId?.title || "N/A"}{" "}
                      </MDTypography>
                    </MDBox>
                    <MDBox
                      sx={({ palette: { dark, white, info }, breakpoints }) => ({
                        display: "flex",
                        alignItems: "flex-start",
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
                      <MDTypography variant="h6">
                        {value?.price?.toLocaleString("en-US", {
                          style: "currency",
                          currency: "INR",
                        }) || "N/A"}
                      </MDTypography>
                    </MDBox>
                    {/* <MDBox
                    sx={({ palette: { dark, white, info }, breakpoints }) => ({
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
                    <MDTypography variant="h6">Status :</MDTypography>
                    <MDBadge
                      badgeContent={value?.status || "N/A"}
                      color={
                        (value?.status === "DELIVERED" && "success") ||
                        (value?.status === "CANCELLED" && "error") ||
                        (value?.status === "RETURN" && "error") ||
                        (value?.status === "RETURN REQUESTED" && "primary") ||
                        (value?.status === " RETURN IN PROGRESS" && "primary") ||
                        (value?.status === "RETURNED" && "error") ||
                        (value?.status === "PENDING" && "warning") ||
                        (value?.status === "ORDERED" && "secondary") ||
                        (value?.status === "CONFIRMED" && "success") ||
                        (value?.status === "SHIPPED,OUT FOR DELIVERY" && "info")
                      }
                      variant="gradient"
                      size="lg"
                    />
                  </MDBox> */}
                    <MDBox
                      sx={({ palette: { dark, white, info }, breakpoints }) => ({
                        display: "flex",
                        alignItems: "flex-start",
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
                      <MDTypography variant="h6">Quantity :</MDTypography>
                      <MDTypography
                        variant="h6"
                        sx={{
                          overflow: "hidden",
                          whiteSpace: "wrap",
                          textOverflow: "ellipsis",
                          maxWidth: "70%",
                        }}
                      >
                        {value?.quantity || "N/A"}
                      </MDTypography>
                    </MDBox>
                    <MDBox
                      sx={({ palette: { dark, white, info }, breakpoints }) => ({
                        display: "flex",
                        alignItems: "flex-start",
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
                      <MDTypography variant="h6">Id :</MDTypography>
                      <MDTypography variant="h6">{value?.productId?._id || "N/A"}</MDTypography>
                    </MDBox>
                    {value?.status && (
                      <MDBox
                        sx={({ palette: { dark, white, info }, breakpoints }) => ({
                          display: "flex",
                          alignItems: "flex-start",
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
                        <MDTypography variant="h6">Status :</MDTypography>

                        <MDBadge
                          badgeContent={value?.status ? mapStatusByName[value?.status] : "N/A"}
                          color={
                            (value?.status === "DELIVERED" && "success") ||
                            (value?.status === "CANCELLED" && "error") ||
                            (value?.status === "OUT_OF_DELIVERY" && "info") ||
                            (value?.status === "RETURNED" && "error") ||
                            (value?.status === "RETURN_REQUEST" && "warning") ||
                            (value?.status === "RETURN_REQUEST_APPROVED" && "info") ||
                            (value?.status === "ACCEPTED" && "success") ||
                            (value?.status === "PENDING" && "warning") ||
                            (value?.status === "ORDERED" && "primary") ||
                            (value?.status === "ONTHEWAY" && "info") ||
                            (value?.status === "WORKING" && "secondary") ||
                            (value?.status === "COMPLETED" && "success") ||
                            (value?.status === "SHIPPED" && "secondary") ||
                            (value?.status === "MULTI_STATUS" && "warning")
                          }
                          variant="gradient"
                          size="lg"
                        />
                      </MDBox>
                    )}

                    {ecom ? (
                      <MDBox
                        sx={({ palette: { dark, white, info }, breakpoints }) => ({
                          display: "flex",
                          alignItems: "flex-start",
                          width: "100%",
                          gap: 3,
                          my: 2,
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
                        <Tooltip title={value?.status || "N/A"}>
                          <MDButton
                            disabled={
                              singleOrders?.orderDetails?.status === "PENDING" ||
                              singleOrders?.orderDetails?.status === "ORDERED" ||
                              singleOrders?.orderDetails?.status === "OUT_OF_DELIVERY" ||
                              singleOrders?.orderDetails?.status === "SHIPPED" ||
                              singleOrders?.orderDetails?.status === "CANCELLED" ||
                              singleOrders?.orderDetails?.status === "ACCEPTED"
                            }
                            variant="contained"
                            color="primary"
                            onClick={(e) => {
                              handleMenuOpen({ event: e });
                              isStatusUpdateFunction({
                                _id: singleOrders?._id,
                                productId: value?.productId?._id,
                              });
                            }}
                          >
                            Change Status
                          </MDButton>
                        </Tooltip>
                      </MDBox>
                    ) : null}
                    {/* <MDBox
                      sx={({ palette: { dark, white, info }, breakpoints }) => ({
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
                      <MDTypography variant="h6">Ordered Last Update At :</MDTypography>
                      <MDTypography
                        variant="h6"
                        sx={{
                          overflow: "hidden",
                          whiteSpace: "wrap",
                          textOverflow: "ellipsis",
                          maxWidth: "70%",
                        }}
                      >
                        {SkDate(new Date(value?.updatedAt))}{" "}
                      </MDTypography>
                    </MDBox> */}
                  </MDBox>
                </MDBox>
              ))}
          </MDBox>
        </MDBox>

        {/* {singleOrders?.product && singleOrders?.product?.length > 0 && (
          <MDBox
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 1,
              mt: 2,
            }}
          >
            <MDTypography fontWeight={"medium"} fontSize={20} variant="button">
              Order Status :{" "}
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  border: "0.5px solid",
                  padding: "5px 8px",
                  borderRadius: "5px",
                }}
              >
                {singleOrders?.status}
              </span>
            </MDTypography>

            <Tooltip title={isFindStatus(singleOrders) || "N/A"}>
              <IconButton
                aria-controls="notification-menu"
                disabled={
                  isFindStatus(singleOrders) === "DELIVERED" ||
                  isFindStatus(singleOrders) === "Multiple Status"
                }
                aria-haspopup="true"
                component="a"
                target="_blank"
                rel="noreferrer"
                variant="gradient"
                color="info"
                size="small"
                circular
                onClick={(e) => {
                  handleMenuOpen({ event: e });
                  setIsOrder(singleOrders);
                }}
              >
                <MDBadge
                  badgeContent="Update All Order Status"
                  color="info"
                  variant="gradient"
                  size="lg"
                />
              </IconButton>
            </Tooltip>
            <MDBox
              sx={({ palette: { dark, white, info } }) => ({
                border: 0.5,
                borderColor: darkMode ? white.main : dark.main,
                borderRadius: 3,
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
              {singleOrders?.product &&
                singleOrders?.product.length > 0 &&
                singleOrders?.product.map((value, index) => (
                  <MDBox
                    key={index}
                    sx={({ palette: { dark, white, info } }) => ({
                      border: 0.5,
                      borderColor: darkMode ? white.main : dark.main,
                      borderRadius: 3,
                      p: 1,
                      width: "100%",
                      height: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: 1,
                    })}
                  >
                    <MDBox
                      sx={({ palette: { dark, white, info }, breakpoints }) => ({
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
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
                      <Tooltip title={value?.status}>
                        <IconButton
                          aria-controls="notification-menu"
                          disabled={
                            value?.status === "DELIVERED" ||
                            value?.status === "CANCELLED" ||
                            value?.status === "CANCELLED" ||
                            value?.status === "DELIVERED"
                          }
                          aria-haspopup="true"
                          component="a"
                          target="_blank"
                          rel="noreferrer"
                          variant="gradient"
                          color="info"
                          size="small"
                          circular
                          onClick={(e) => {
                            handleOpenMenu({ event: e });
                            setIsOrderDetails(value);
                            setIsIndex(index);
                          }}
                        >
                          <MDBadge
                            badgeContent="Update Status"
                            color="primary"
                            variant="gradient"
                            size="lg"
                          />
                        </IconButton>
                      </Tooltip>
                    </MDBox>
                    <MDBox
                      sx={({ palette: { dark, white, info }, breakpoints }) => ({
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
                      <MDTypography variant="h6">Name :</MDTypography>
                      <MDTypography
                        variant="h6"
                        sx={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          maxWidth: "70%",
                        }}
                      >
                        {value?.productId?.name}{" "}
                      </MDTypography>
                    </MDBox>
                    <MDBox
                      sx={({ palette: { dark, white, info }, breakpoints }) => ({
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
                      <MDTypography variant="h6">Price :</MDTypography>
                      <MDTypography variant="h6">
                        {value?.price?.toLocaleString("en-US", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </MDTypography>
                    </MDBox>
                    <MDBox
                      sx={({ palette: { dark, white, info }, breakpoints }) => ({
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
                      <MDTypography variant="h6">Status :</MDTypography>
                      <MDBadge
                        badgeContent={value?.status || "N/A"}
                        color={
                          (value?.status === "DELIVERED" && "success") ||
                          (value?.status === "CANCELLED" && "error") ||
                          (value?.status === "RETURN" && "error") ||
                          (value?.status === "RETURN REQUESTED" && "primary") ||
                          (value?.status === " RETURN IN PROGRESS" && "primary") ||
                          (value?.status === "RETURNED" && "error") ||
                          (value?.status === "PENDING" && "warning") ||
                          (value?.status === "ORDERED" && "secondary") ||
                          (value?.status === "CONFIRMED" && "success") ||
                          (value?.status === "SHIPPED,OUT FOR DELIVERY" && "info")
                        }
                        variant="gradient"
                        size="lg"
                      />
                    </MDBox>
                    <MDBox
                      sx={({ palette: { dark, white, info }, breakpoints }) => ({
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
                      <MDTypography variant="h6">Ordered At :</MDTypography>
                      <MDTypography
                        variant="h6"
                        sx={{
                          overflow: "hidden",
                          whiteSpace: "wrap",
                          textOverflow: "ellipsis",
                          maxWidth: "70%",
                        }}
                      >
                        {SkDate(new Date(value?.createdAt))}{" "}
                      </MDTypography>
                    </MDBox>
                    <MDBox
                      sx={({ palette: { dark, white, info }, breakpoints }) => ({
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
                      <MDTypography variant="h6">Ordered Last Update At :</MDTypography>
                      <MDTypography
                        variant="h6"
                        sx={{
                          overflow: "hidden",
                          whiteSpace: "wrap",
                          textOverflow: "ellipsis",
                          maxWidth: "70%",
                        }}
                      >
                        {SkDate(new Date(value?.updatedAt))}{" "}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                ))}
            </MDBox>
          </MDBox>
        )} */}
        {singleOrders?.orderDetails && (
          <>
            <MDTypography fontWeight={"medium"} fontSize={20} variant="button">
              Order &apos;s details
            </MDTypography>
            <MDBox
              sx={({ palette: { dark, white, info } }) => ({
                border: 0.5,
                borderColor: darkMode ? white.main : dark.main,
                borderRadius: 3,
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
              {Object.entries(singleOrders?.orderDetails).map(([key, value], index) =>
                key === "completedOtp" || key === "status" ? null : (
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
                      fontSize={15}
                      variant="button"
                    >
                      {camelToFlat(key)}

                      <MDTypography
                        fontWeight={"medium"}
                        textAlign="left"
                        fontSize={15}
                        variant="button"
                        component="span"
                      ></MDTypography>
                    </MDTypography>

                    <MDTypography
                      fontWeight={"medium"}
                      textAlign="left"
                      fontSize={15}
                      variant="button"
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        maxWidth: "70%",
                      }}
                    >
                      {key === "workingOtp" || key === "orderTotal"
                        ? value
                        : key === "taxAmount" || key === "netAmount"
                        ? value?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "INR",
                          })
                        : key === "memberShipId"
                        ? null
                        : "-"}

                      {/* {value ? 
  typeof value === "number"
    ? value?.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      })
    : key === "workingOtp"
      ? value
      : 'N/A'
  : "-"
} */}

                      {/* {value ? typeof value === "number"
                      ? value?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "INR",
                      })
                      : key === "workingotp" ? value : 'N/A' :"-"} */}
                      {/* {console.log(typeof value)} */}
                    </MDTypography>
                  </MDBox>
                )
              )}
            </MDBox>
          </>
        )}
      </MDBox>
      <Menu
        anchorEl={openMenu}
        anchorReference={null}
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(openMenu)}
        onClose={() => setOpenMenu(false)}
      >
        {singleOrders?.product[isIndex]?.status === "PENDING" && (
          <>
            <MenuItem
              onClick={() => {
                setOpenMenu(false);
                isStatusUpdateFunction("ORDERED");
              }}
            >
              <MDAvatar size="sm">
                <CheckCircle />
              </MDAvatar>{" "}
              APPROVED
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpenMenu(false);
                isStatusUpdateFunction("CANCELLED");
              }}
            >
              <MDAvatar size="sm">
                <Unpublished sx={{ fontSize: "2rem" }} />
              </MDAvatar>
              REJECTED
            </MenuItem>
          </>
        )}
        {singleOrders?.product[isIndex]?.status === "ORDERED" && (
          <>
            <MenuItem
              onClick={() => {
                setOpenMenu(false);
                isStatusUpdateFunction("CONFIRMED");
              }}
            >
              <MDAvatar size="sm">
                <CheckCircle />
              </MDAvatar>{" "}
              CONFIRMED
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpenMenu(false);
                isStatusUpdateFunction("CANCELLED");
              }}
            >
              <MDAvatar size="sm">
                <Unpublished sx={{ fontSize: "2rem" }} />
              </MDAvatar>
              REJECTED
            </MenuItem>
          </>
        )}
        {singleOrders?.product[isIndex]?.status === "CONFIRMED" && (
          <>
            <MenuItem
              onClick={() => {
                setOpenMenu(false);
                isStatusUpdateFunction("SHIPPED");
              }}
            >
              <MDAvatar size="sm">
                <CheckCircle />
              </MDAvatar>{" "}
              SHIPPED
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpenMenu(false);
                isStatusUpdateFunction("CANCELLED");
              }}
            >
              <MDAvatar size="sm">
                <Unpublished sx={{ fontSize: "2rem" }} />
              </MDAvatar>
              REJECTED
            </MenuItem>
          </>
        )}
        {singleOrders?.product[isIndex]?.status === "SHIPPED" && (
          <>
            <MenuItem
              onClick={() => {
                setOpenMenu(false);
                isStatusUpdateFunction("OUT FOR DELIVERY");
              }}
            >
              <MDAvatar size="sm">
                <CheckCircle />
              </MDAvatar>{" "}
              OUT FOR DELIVERY
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpenMenu(false);
                isStatusUpdateFunction("CANCELLED");
              }}
            >
              <MDAvatar size="sm">
                <Unpublished sx={{ fontSize: "2rem" }} />
              </MDAvatar>
              REJECTED
            </MenuItem>
          </>
        )}
        {singleOrders?.product[isIndex]?.status === "OUT FOR DELIVERY" && (
          <>
            <MenuItem
              onClick={() => {
                setOpenMenu(false);
                isStatusUpdateFunction("DELIVERED");
              }}
            >
              <MDAvatar size="sm">
                <CheckCircle />
              </MDAvatar>{" "}
              DELIVERED
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpenMenu(false);
                isStatusUpdateFunction("CANCELLED");
              }}
            >
              <MDAvatar size="sm">
                <Unpublished sx={{ fontSize: "2rem" }} />
              </MDAvatar>
              REJECTED
            </MenuItem>
          </>
        )}
        {singleOrders?.product[isIndex]?.status === "RETURN REQUESTED" && (
          <>
            <MenuItem
              onClick={() => {
                setOpenMenu(false);
                isStatusUpdateFunction("RETURN IN PROGRESS");
              }}
            >
              <MDAvatar size="sm">
                <Unpublished sx={{ fontSize: "2rem" }} />
              </MDAvatar>
              RETURN IN PROGRESS
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpenMenu(false);
                isStatusUpdateFunction("RETURNED");
              }}
            >
              <MDAvatar size="sm">
                <Unpublished sx={{ fontSize: "2rem" }} />
              </MDAvatar>
              RETURNED
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
};

export default SingleOrderDetails;
SingleOrderDetails.propTypes = {
  //   children: PropTypes.node,
  viewOrderId: PropTypes.any,
  setViewProductModal: PropTypes.any,
  isFindStatus: PropTypes.any,
  isOrder: PropTypes.any,
  setIsOrder: PropTypes.any,
  handleMenuOpen: PropTypes.any,
  ecom: PropTypes.bool,
};
