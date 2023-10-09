import {
  CheckCircle,
  Close,
  Edit,
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
  Logout,
  PersonAdd,
  Settings,
  TaskAlt,
  Unpublished,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import {
  Card,
  FormControlLabel,
  FormGroup,
  Icon,
  Pagination,
  Stack,
  IconButton,
  Switch,
  Select,
  MenuItem,
  Menu,
  Tooltip,
  ListItemIcon,
  Divider,
  InputAdornment,
  Collapse,
} from "@mui/material";
import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import SkLoading from "components/SkLoading";
import SkModal from "components/SkModal";
import { useMaterialUIController } from "context";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "redux/festures/orderSlice";
import { formattedDateServer } from "Utils/dateFunc";
import SingleOrderDetails from "./SingleOrder";
import MDInput from "components/MDInput";
import MDAvatar from "components/MDAvatar";
import { updateOrderDetails } from "redux/festures/orderSlice";
import { handleAlert } from "redux/festures/alertSlice";
import { useLocation } from "react-router-dom";
import { getSingleOrders } from "redux/festures/orderSlice";
import { SkPrice } from "Utils/dateFunc";
import CreateServiceOrder from "./CreateServiceOrder";
import AssignPartner from "./AssignPartner";

const columns = {
  allOrders: [
    { Header: "S.No", accessor: "no", width: "20px" },
    { Header: "Order Details", accessor: "order details" },
    { Header: "Order Status", accessor: "order status" },
    { Header: "Payment Method ", accessor: "payment method" },
    { Header: "Order Total", accessor: "order total" },
    { Header: "Place Order", accessor: "place Order" },
    { Header: "Assign Partner", accessor: "assignPartner" },
    { Header: "Update", accessor: "update" },
    { Header: "View", accessor: "view" },
    // { Header: "action", accessor: "action" },
  ],
  allOrdersEcom: [
    { Header: "S.No", accessor: "no", width: "20px" },
    { Header: "Order Details", accessor: "order details" },
    { Header: "Order Status", accessor: "order status" },
    { Header: "Payment Method ", accessor: "payment method" },
    { Header: "Order Total", accessor: "order total" },
    { Header: "Place Order", accessor: "place Order" },
    { Header: "Update", accessor: "update" },
    { Header: "View", accessor: "view" },
    // { Header: "action", accessor: "action" },
  ],
};

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

//Static Filters

const dateFilter = [
  {
    _id: 0,
    name: "All Products",
  },
  {
    _id: "today",
    name: "Today",
  },
  {
    _id: "week",
    name: "This Week",
  },
  {
    _id: "month",
    name: "This Month",
  },
  {
    _id: "year",
    name: "This Year",
  },
  // {
  //   _id: 'manually',
  //   name: 'Manually'
  // },
];

const sortByPrice = [
  {
    _id: 0,
    name: "All",
  },
  {
    _id: "high_to_low",
    name: "High To Low",
  },
  {
    _id: "low_to_high",
    name: "Low To High",
  },
];

const filterByStatusService = [
  {
    _id: 0,
    name: "Choose Status",
  },
  {
    _id: "PENDING",
    name: "PENDING",
  },
  {
    _id: "ORDERED",
    name: "ORDERED",
  },
  {
    _id: "ACCEPTED",
    name: "ACCEPTED",
  },
  {
    _id: "ONTHEWAY",
    name: "ONTHEWAY",
  },
  {
    _id: "WORKING",
    name: "WORKING",
  },
  {
    _id: "COMPLETED",
    name: "COMPLETED",
  },
  {
    _id: "CANCELLED",
    name: "CANCELLED",
  },
];
const filterByStatusEcomm = [
  {
    _id: 0,
    name: "Choose Status",
  },
  {
    _id: "PENDING",
    name: "Pending",
  },
  {
    _id: "ORDERED",
    name: "Ordered",
  },
  {
    _id: "OUT_OF_DELIVERY",
    name: "Out For Delivery",
  },
  {
    _id: "DELIVERED",
    name: "Delivered",
  },
  {
    _id: "RETURN_REQUEST",
    name: "Return Request",
  },
  {
    _id: "RETURNED",
    name: "Returned",
  },
  {
    _id: "RETURN_REQUEST_APPROVED",
    name: "Return Request Approved",
  },
  {
    _id: "CANCELLED",
    name: "Cancelled",
  },
  {
    _id: "SHIPPED",
    name: "Shipped",
  },
  {
    _id: "MULTI_STATUS",
    name: "Multi Status",
  },
];

const filterByPaymentMethod = [
  {
    _id: 0,
    name: "Choose Payment Method",
  },
  {
    _id: "COD",
    name: "Cash On Delivery",
  },
  {
    _id: "ONLINE",
    name: "Online Transaction",
  },
];


const Orders = () => {
  // const location = useLocation();
  // const { state } = location;

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const [rowsData, setRowsData] = useState([]);
  const [ecom, setEcom] = useState(false);
  const { pathname } = useLocation();
  const [filterCollapse, setFilterCollapse] = useState(false);
  const [createOrderModal, setCreateOrderModal] = useState(false);
  // const [isStatus, setIsStatus] = useState(null);

  const [viewOrderId, setViewOrderId] = useState(null);
  const [viewProductModal, setViewProductModal] = useState(false);
  const [assignPartnerModal, setAssignPartnerModal] = useState(false);
  const [pagess, setPagess] = useState(1);
  const { AllOrders, Loading, isPages, isNewOrderId, isModalStatus } = useSelector((state) => ({
    ...state.isOrders,
  }));

  useEffect(() => {
    if (pathname === "/orders/ecomm-orders") {
      setPagess(1);
      setEcom(true);
    } else {
      setPagess(1);
      setEcom(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (isNewOrderId && isModalStatus) {
      setViewOrderId(isNewOrderId);
      setViewProductModal(isModalStatus);
    }
  }, [isNewOrderId, isModalStatus]);

  console.log(AllOrders, "Allorders");

  // console.log(viewOrderId, "viewOrderId");
  // console.log(viewProductModal, "viewProductModal");

  const [isOrderUpdate, setIsOrderUpdate] = useState("");
  const [filter, setFilter] = useState({
    filter: 0,
    status: 0,
    price: 0,
    paymentMethod: 0,
    others:0,
    search: "",
  });
  const [isOrderDetails, setIsOrderDetails] = useState(null);

  // console.log(isOrderDetails,"isOrderDetails")

  const isFindStatus = (isObject) => {
    let isStatusData = null;
    isObject?.items &&
      isObject?.items?.some((order) => {
        // console.log(order?.status, isObject?.items?.at(0)?.status);
        if (order?.status === isObject?.items?.at(0)?.status) {
          isStatusData = isObject?.items?.at(0)?.status;
        } else {
          isStatusData = "Multiple Status";
        }
      });
    return isStatusData;
  };

  // console.log(state);
  // useEffect(() => {
  //   if (state) {
  //     setViewProductModal(state?.viewProductModal);
  //     setViewOrderId(state?.viewOrderId);
  //   }
  // }, [state]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleClick = ({ event }) => {
    setAnchorEl(event.currentTarget);
    // console.log(open, "open");
    // console.log(event.currentTarget, "event.currentTarget");
  };
  const handleOpenMenu = ({ event }) => {
    setOpenMenu(event.currentTarget);
  };
  // console.log(isOrderDetails);
  const isStatusUpdateFunction = (isStatus, all) => {
    const status = { status: isStatus };
    // console.log(isOrderDetails, "isOrderDetails");
    // console.log(isStatus, "isStatus");
    dispatch(
      updateOrderDetails({
        url: ecom
          ? all
            ? `/eCommerce/updateAllProductStatus/${isOrderDetails?._id}/${admin}`
            : `/eCommerce/updateSingleStatus/${isOrderDetails?._id}/${admin}`
          : `/cancelOrderByAdmin/${isOrderDetails?._id}/${admin}`,
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
        // setIsSearch(!isSearch);
        if (!viewProductModal) {
          dispatch(
            getAllOrders(
              ecom
                ? `/eCommerce/filterOrderByDate/${admin}?${
                    filter?.filter ? `filter=${encodeURIComponent(filter?.filter)}` : ""
                  }${filter?.price ? `&price=${encodeURIComponent(filter?.price)}` : ""}${
                    filter?.paymentMethod
                      ? `&paymentMethod=${encodeURIComponent(filter?.paymentMethod)}`
                      : ""
                  }${filter?.status ? `&status=${encodeURIComponent(filter?.status)}` : ""}${
                    filter?.search ? `&search=${encodeURIComponent(filter?.search)}` : ""
                  }&page=${encodeURIComponent(pagess)}`
                : `/filterOrderByDate/${admin}?${
                    filter?.filter ? `filter=${encodeURIComponent(filter?.filter)}` : ""
                  }${filter?.price ? `&price=${encodeURIComponent(filter?.price)}` : ""}${
                    filter?.paymentMethod
                      ? `&paymentMethod=${encodeURIComponent(filter?.paymentMethod)}`
                      : ""
                  }${filter?.status ? `&status=${encodeURIComponent(filter?.status)}` : ""}${
                    filter?.search ? `&search=${encodeURIComponent(filter?.search)}` : ""
                  }&page=${encodeURIComponent(pagess)}`
            )
          ).then((data) => {
            // console.log("hwl", data);
            if (data.payload.success) {
              const temprows =
                data.payload?.data &&
                data.payload?.data?.at(0) &&
                data.payload?.data?.map((value, index) => {
                  return ecom
                    ? {
                        no: (
                          <MDTypography
                            sx={{ fontSize: 12, fontWeight: "medium", width: 10 }}
                            variant="text"
                          >
                            {index + 1}
                          </MDTypography>
                        ),
                        update: (
                          <>
                            <Tooltip title={value?.status || "N/A"}>
                              <IconButton
                                aria-controls="notification-menu"
                                disabled={
                                  value?.status === "PENDING" ||
                                  value?.status === "CANCELLED" ||
                                  value?.status === "DELIVERED" ||
                                  value?.status === "RETURN_REQUEST" ||
                                  value?.status === "RETURN_REQUEST_APPROVED" ||
                                  value?.status === "MULTI_STATUS" ||
                                  value?.status === "RETURNED"
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
                          </>
                        ),
                        "order details": (
                          <MDBox
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",

                              justifyContent: "flex-start",
                            }}
                          >
                            <MDTypography
                              sx={{ fontSize: 12, fontWeight: "medium" }}
                              variant="text"
                              style={{
                                maxWidth: "300px",
                                lineHeight: "20px",
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              Name: {value?.customerId?.fullName || "-"}
                            </MDTypography>
                            {/* <MDTypography
                          sx={{ fontSize: 12, fontWeight: "medium" }}
                          variant="text"
                          style={{
                            maxWidth: "300px",
                            lineHeight: "20px",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          Email: {value?.address?.email || "N/A"}
                        </MDTypography> */}

                            <MDTypography
                              sx={{ fontSize: 12, fontWeight: "medium" }}
                              variant="text"
                            >
                              OrderId: {value?._id || "N/A"}
                            </MDTypography>
                            {/* {console.log(isFindStatus(value), "isFindStatus(value)")} */}
                          </MDBox>
                        ),
                        "order status": (
                          <MDBadge
                            badgeContent={value?.status ? mapStatusByName[value?.status] : "-"}
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
                        ),
                        "payment method": (
                          <MDBox
                            sx={{
                              display: "flex",
                              // flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              // gap: 1,
                            }}
                          >
                            {(value?.paymentMethod === "COD" && (
                              <MDBadge
                                badgeContent="COD"
                                color="success"
                                variant="gradient"
                                size="lg"
                              />
                            )) ||
                              (value?.paymentMethod === "ONLINE" && (
                                <MDBadge
                                  badgeContent="ONLINE"
                                  color="primary"
                                  variant="gradient"
                                  size="lg"
                                />
                              )) || (
                                <MDBadge
                                  badgeContent="N/A"
                                  color="error"
                                  variant="gradient"
                                  size="lg"
                                />
                              )}
                          </MDBox>
                        ),
                        "order total": value?.orderTotal ? SkPrice(value?.orderTotal) : "-",
                        //   < MDBadge
                        //     badgeContent={ value?.orderTotal }
                        //     color="secondary"
                        //     variant="gradient"
                        //     size="lg"
                        // />
                        view: (
                          <IconButton
                            aria-label="action_edit"
                            onClick={() => {
                              setViewProductModal(true);
                              setViewOrderId(value?._id);
                            }}
                          >
                            <Visibility
                              sx={({ palette: { dark, white, info } }) => ({
                                color: darkMode ? info.main : dark.main,
                              })}
                            />
                          </IconButton>
                        ),
                        //   visibility: (
                        //     <Switch
                        //       value={value?.visibility}
                        //       checked={value?.visibility}
                        //       color={"info"}
                        //       onChange={(e) => handleChangeSwitch(value?._id)}
                        //       inputProps={{ "aria-label": "controlled" }}
                        //     />
                        //   ),
                        "place Order": (
                          <MDTypography sx={{ fontSize: 12, fontWeight: "medium" }} variant="text">
                            {formattedDateServer(new Date(value?.createdAt)) || "N/A"}
                          </MDTypography>
                        ),
                      }
                    : {
                        no: (
                          <MDTypography
                            sx={{ fontSize: 12, fontWeight: "medium", width: 10 }}
                            variant="text"
                          >
                            {index + 1}
                          </MDTypography>
                        ),
                        update: (
                          <>
                            <Tooltip title={value?.status || "N/A"}>
                              <IconButton
                                aria-controls="notification-menu"
                                disabled={
                                  value?.status === "PENDING" ||
                                  value?.status === "CANCELLED" ||
                                  value?.status === "WORKING"
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
                          </>
                        ),
                        "order details": (
                          <MDBox
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",

                              justifyContent: "flex-start",
                            }}
                          >
                            <MDTypography
                              sx={{ fontSize: 12, fontWeight: "medium" }}
                              variant="text"
                              style={{
                                maxWidth: "300px",
                                lineHeight: "20px",
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              Name: {value?.customerId?.fullName || "-"}
                            </MDTypography>
                            {/* <MDTypography
                          sx={{ fontSize: 12, fontWeight: "medium" }}
                          variant="text"
                          style={{
                            maxWidth: "300px",
                            lineHeight: "20px",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          Email: {value?.address?.email || "N/A"}
                        </MDTypography> */}

                            <MDTypography
                              sx={{ fontSize: 12, fontWeight: "medium" }}
                              variant="text"
                            >
                              OrderId: {value?._id || "N/A"}
                            </MDTypography>
                            {/* {console.log(isFindStatus(value), "isFindStatus(value)")} */}
                          </MDBox>
                        ),
                        "order status": (
                          <MDBadge
                            badgeContent={value?.status ? mapStatusByName[value?.status] : "-"}
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
                        ),
                        "payment method": (
                          <MDBox
                            sx={{
                              display: "flex",
                              // flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              // gap: 1,
                            }}
                          >
                            {(value?.paymentMethod === "COD" && (
                              <MDBadge
                                badgeContent="COD"
                                color="success"
                                variant="gradient"
                                size="lg"
                              />
                            )) ||
                              (value?.paymentMethod === "ONLINE" && (
                                <MDBadge
                                  badgeContent="ONLINE"
                                  color="primary"
                                  variant="gradient"
                                  size="lg"
                                />
                              )) || (
                                <MDBadge
                                  badgeContent="N/A"
                                  color="error"
                                  variant="gradient"
                                  size="lg"
                                />
                              )}
                          </MDBox>
                        ),
                        "order total": value?.orderTotal ? SkPrice(value?.orderTotal) : "-",
                        //   < MDBadge
                        //     badgeContent={ value?.orderTotal }
                        //     color="secondary"
                        //     variant="gradient"
                        //     size="lg"
                        // />
                        view: (
                          <IconButton
                            aria-label="action_edit"
                            onClick={() => {
                              setViewProductModal(true);
                              setViewOrderId(value?._id);
                            }}
                          >
                            <Visibility
                              sx={({ palette: { dark, white, info } }) => ({
                                color: darkMode ? info.main : dark.main,
                              })}
                            />
                          </IconButton>
                        ),
                        //   visibility: (
                        //     <Switch
                        //       value={value?.visibility}
                        //       checked={value?.visibility}
                        //       color={"info"}
                        //       onChange={(e) => handleChangeSwitch(value?._id)}
                        //       inputProps={{ "aria-label": "controlled" }}
                        //     />
                        //   ),
                        "place Order": (
                          <MDTypography sx={{ fontSize: 12, fontWeight: "medium" }} variant="text">
                            {formattedDateServer(new Date(value?.createdAt)) || "N/A"}
                          </MDTypography>
                        ),
                        assignPartner: (
                          <IconButton
                            aria-label="action_edit"
                            onClick={() => {
                              setAssignPartnerModal(true);
                              setViewOrderId(value?._id);
                            }}
                          >
                            <PersonAdd
                              sx={({ palette: { dark, white, info } }) => ({
                                color: darkMode ? info.main : dark.main,
                              })}
                            />
                          </IconButton>
                        ),
                      };
                });
              setRowsData(temprows);
            } else {
              setRowsData(["", " "]);
            }
          });
        } else
          dispatch(
            getSingleOrders(
              ecom
                ? `/eCommerce/getByOrderId/${viewOrderId}/${admin}`
                : `/getOrderByOrderId/${viewOrderId}/${admin}`
            )
          );
      }
    });
  };
  useEffect(() => {
    dispatch(
      getAllOrders()
      // `${process.env.REACT_APP_API}order/filterOrder`
      // `${process.env.REACT_APP_API}getAllBrand`
      // ecom
      //   ? `/eCommerce/filterOrderByDate/${admin}?${
      //       filter?.filter ? `filter=${encodeURIComponent(filter?.filter)}` : ""
      //     }${filter?.price ? `&price=${encodeURIComponent(filter?.price)}` : ""}${
      //       filter?.paymentMethod
      //         ? `&paymentMethod=${encodeURIComponent(filter?.paymentMethod)}`
      //         : ""
      //     }${filter?.status ? `&status=${encodeURIComponent(filter?.status)}` : ""}${
      //       filter?.search ? `&search=${encodeURIComponent(filter?.search)}` : ""
      //     }&page=${encodeURIComponent(pagess)}`
      //   : `/filterOrderByDate/${admin}?${
      //       filter?.filter ? `filter=${encodeURIComponent(filter?.filter)}` : ""
      //     }${filter?.price ? `&price=${encodeURIComponent(filter?.price)}` : ""}${
      //       filter?.paymentMethod
      //         ? `&paymentMethod=${encodeURIComponent(filter?.paymentMethod)}`
      //         : ""
      //     }${filter?.status ? `&status=${encodeURIComponent(filter?.status)}` : ""}${
      //       filter?.search ? `&search=${encodeURIComponent(filter?.search)}` : ""
      //     }&page=${encodeURIComponent(pagess)}`
    ).then((data) => {
      // console.log("hwl", data);
      if (data.payload.success) {
        const temprows =
          data.payload?.filterData &&
          data.payload?.filterData?.at(0) &&
          data.payload?.filterData?.map((value, index) => {
            return {
              no: (
                <MDTypography sx={{ fontSize: 12, fontWeight: "medium", width: 10 }} variant="text">
                  {index + 1}
                </MDTypography>
              ),
              update: (
                <>
                  <Tooltip title={value?.status || "N/A"}>
                    <IconButton
                      aria-controls="notification-menu"
                      disabled={
                        value?.status === "PENDING" ||
                        value?.status === "CANCELLED" ||
                        value?.status === "DELIVERED" ||
                        value?.status === "RETURN_REQUEST" ||
                        value?.status === "RETURN_REQUEST_APPROVED" ||
                        value?.status === "MULTI_STATUS" ||
                        value?.status === "RETURNED"
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
                </>
              ),
              "order details": (
                <MDBox
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",

                    justifyContent: "flex-start",
                  }}
                >
                  <MDTypography
                    sx={{ fontSize: 12, fontWeight: "medium" }}
                    variant="text"
                    style={{
                      maxWidth: "300px",
                      lineHeight: "20px",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Name: {value?.customerId?.fullName || "-"}
                  </MDTypography>
                  {/* <MDTypography
                    sx={{ fontSize: 12, fontWeight: "medium" }}
                    variant="text"
                    style={{
                      maxWidth: "300px",
                      lineHeight: "20px",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Email: {value?.address?.email || "N/A"}
                  </MDTypography> */}

                  <MDTypography sx={{ fontSize: 12, fontWeight: "medium" }} variant="text">
                    OrderId: {value?._id || "N/A"}
                  </MDTypography>
                  {/* {console.log(isFindStatus(value), "isFindStatus(value)")} */}
                </MDBox>
              ),
              "order status": (
                <MDBadge
                  badgeContent={value?.status ? mapStatusByName[value?.status] : "-"}
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
              ),
              "payment method": (
                <MDBox
                  sx={{
                    display: "flex",
                    // flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    // gap: 1,
                  }}
                >
                  {(value?.paymentMethod === "COD" && (
                    <MDBadge badgeContent="COD" color="success" variant="gradient" size="lg" />
                  )) ||
                    (value?.paymentMethod === "ONLINE" && (
                      <MDBadge badgeContent="ONLINE" color="primary" variant="gradient" size="lg" />
                    )) || (
                      <MDBadge
                        badgeContent={value?.paymentMethod || "N/A"}
                        color="error"
                        variant="gradient"
                        size="lg"
                      />
                    )}
                </MDBox>
              ),
              "order total": value?.orderTotal ? SkPrice(value?.orderTotal) : "-",
              //   < MDBadge
              //     badgeContent={ value?.orderTotal }
              //     color="secondary"
              //     variant="gradient"
              //     size="lg"
              // />
              view: (
                <IconButton
                  aria-label="action_edit"
                  onClick={() => {
                    setViewProductModal(true);
                    setViewOrderId(value?._id);
                  }}
                >
                  <Visibility
                    sx={({ palette: { dark, white, info } }) => ({
                      color: darkMode ? info.main : dark.main,
                    })}
                  />
                </IconButton>
              ),
              //   visibility: (
              //     <Switch
              //       value={value?.visibility}
              //       checked={value?.visibility}
              //       color={"info"}
              //       onChange={(e) => handleChangeSwitch(value?._id)}
              //       inputProps={{ "aria-label": "controlled" }}
              //     />
              //   ),
              "place Order": (
                <MDTypography sx={{ fontSize: 12, fontWeight: "medium" }} variant="text">
                  {formattedDateServer(new Date(value?.createdAt)) || "N/A"}
                </MDTypography>
              ),
            };
          });
        setRowsData(temprows);
      } else {
        setRowsData(["", " "]);
      }
    });
  }, []);

  useEffect(() => {
    dispatch(getAllOrders(`${process.env.REACT_APP_API}/order/filterOrder`));
  }, []);
  useEffect(() => {
    dispatch(getAllOrders(`${process.env.REACT_APP_API}/order/filterOrder?${
            filter?.filter ? `filter=${encodeURIComponent(filter?.filter)}` : ""
          }${filter?.price ? `&price=${encodeURIComponent(filter?.price)}` : ""}${
            filter?.paymentMethod
              ? `&paymentMethod=${encodeURIComponent(filter?.paymentMethod)}`
              : ""
          }${filter?.status ? `&status=${encodeURIComponent(filter?.status)}` : ""}${
            filter?.search ? `&search=${encodeURIComponent(filter?.search)}` : ""
          }&page=${encodeURIComponent(pagess)}`));
  }, [filter]);

  useEffect(() => {
    if (AllOrders && AllOrders.length > 0) {
      const temprows =
        AllOrders &&
        AllOrders?.at(0) &&
        AllOrders?.map((value, index) => ({
          no: (
            <MDTypography sx={{ fontSize: 12, fontWeight: "medium", width: 10 }} variant="text">
              {index + 1}
            </MDTypography>
          ),
          update: (
            <>
              <Tooltip title={value?.product.at(0)?.status || "N/A"}>
                <IconButton
                  aria-controls="notification-menu"
                  disabled={
                    value?.status === "PENDING" ||
                    value?.status === "CANCELLED" ||
                    value?.status === "DELIVERED" ||
                    value?.status === "RETURN_REQUEST" ||
                    value?.status === "RETURN_REQUEST_APPROVED" ||
                    value?.status === "MULTI_STATUS" ||
                    value?.status === "RETURNED"
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
            </>
          ),
          "order details": (
            <MDBox
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",

                justifyContent: "flex-start",
              }}
            >
              {/* <MDTypography
                sx={{ fontSize: 12, fontWeight: "medium" }}
                variant="text"
                style={{
                  maxWidth: "300px",
                  lineHeight: "20px",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Name: {value?.customerId?.fullName || "-"}
              </MDTypography> */}
              {/* <MDTypography
                sx={{ fontSize: 12, fontWeight: "medium" }}
                variant="text"
                style={{
                  maxWidth: "300px",
                  lineHeight: "20px",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Email: {value?.address?.email || "N/A"}
              </MDTypography> */}

              <MDTypography sx={{ fontSize: 12, fontWeight: "medium" }} variant="text">
                OrderId: {value?._id || "N/A"}
              </MDTypography>
              {/* {console.log(isFindStatus(value), "isFindStatus(value)")} */}
            </MDBox>
          ),
          "order status": (
            <MDBadge
              badgeContent={value?.product.at(0)?.status ? mapStatusByName[value?.product.at(0)?.status] : "-"}
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
          ),
          "payment method": (
            <MDBox
              sx={{
                display: "flex",
                // flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                // gap: 1,
              }}
            >
              {(value?.paymentStatus?.at(0) === "COD" && (
                <MDBadge badgeContent="COD" color="success" variant="gradient" size="lg" />
              )) ||
                (value?.paymentStatus?.at(0) === "ONLINE" && (
                  <MDBadge badgeContent="ONLINE" color="primary" variant="gradient" size="lg" />
                )) || (
                  <MDBadge
                    badgeContent={value?.paymentMethod || "N/A"}
                    color="error"
                    variant="gradient"
                    size="lg"
                  />
                )}
            </MDBox>
          ),
          "order total": (
            <>
              <MDTypography
                sx={{ fontSize: 12, fontWeight: "medium" }}
                variant="text"
                style={{
                  maxWidth: "300px",
                  lineHeight: "20px",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Payable Amount : {value?.totalPrice ? SkPrice(value?.totalPrice) : "-"}
              </MDTypography>
              <MDTypography
                sx={{ fontSize: 12, fontWeight: "medium" }}
                variant="text"
                style={{
                  maxWidth: "300px",
                  lineHeight: "20px",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Total Price: {value?.totalPrice ? SkPrice(value?.totalPrice) : "-"}
              </MDTypography>
            </>
          ),
          //   < MDBadge
          //     badgeContent={ value?.orderTotal }
          //     color="secondary"
          //     variant="gradient"
          //     size="lg"
          // />
          view: (
            <IconButton
              aria-label="action_edit"
              onClick={() => {
                setViewProductModal(true);
                setViewOrderId(value?._id);
              }}
            >
              <Visibility
                sx={({ palette: { dark, white, info } }) => ({
                  color: darkMode ? info.main : dark.main,
                })}
              />
            </IconButton>
          ),
          //   visibility: (
          //     <Switch
          //       value={value?.visibility}
          //       checked={value?.visibility}
          //       color={"info"}
          //       onChange={(e) => handleChangeSwitch(value?._id)}
          //       inputProps={{ "aria-label": "controlled" }}
          //     />
          //   ),
          "place Order": (
            <MDTypography sx={{ fontSize: 12, fontWeight: "medium" }} variant="text">
              {formattedDateServer(new Date(value?.createdAt)) || "N/A"}
            </MDTypography>
          ),
        }));
      setRowsData(temprows);
    } else {
      setRowsData(["", " "]);
    }
  }, [AllOrders]);

  return (
    <>
      {!ecom ? (
        <SkModal
          show={createOrderModal}
          unShow={setCreateOrderModal}
          width={{ sx: "100%", md: "55%", xl: "55%", sm: "100%" }}
          height={"auto"}
          padding={3}
          overflowY={true}
          maxHeight="90vh"
        >
          <CreateServiceOrder
            createOrderModal={createOrderModal}
            setCreateOrderModal={setCreateOrderModal}
          />
        </SkModal>
      ) : null}
      <AssignPartner
        show={assignPartnerModal}
        unshow={setAssignPartnerModal}
        orderId={viewOrderId}
        setOrderId={setViewOrderId}
      />
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mb={2} />
        {/* <MDBox py={5}>
          <Card id="delete-account">
            <MDBox p={1.5} display="flex" justifyContent="space-between" alignItems="center">
              <MDButton
                variant="gradient"
                sx={({ palette: { dark, white, info } }) => ({
                  color: white.main,
                  backgroundColor: darkMode ? info.main : dark.main,
                  "&:hover": {
                    color: white.main,
                    backgroundColor: darkMode ? info.main : dark.main,
                  },
                })}
                onClick={() => {
                  // setIsOpen(true);
                }}
              >
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp; Create Users
              </MDButton>
              <MDButton
                variant="gradient"
                sx={({ palette: { dark, white, info } }) => ({
                  color: white.main,
                  backgroundColor: darkMode ? info.main : dark.main,
                  "&:hover": {
                    color: white.main,
                    backgroundColor: darkMode ? info.main : dark.main,
                  },
                })}
                onClick={() => {
                  // setIsOpen2(true);
                }}
              >
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp; Create subCategory
              </MDButton>
            </MDBox>{" "}
          </Card>
        </MDBox> */}
        <MDBox py={3}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <MDTypography variant="h6" color="white">
                Order &apos;s Table{" "}
              </MDTypography>
              {ecom ? (
                <MDButton
                  variant="gradient"
                  color="dark"
                  sx={({ palette: { dark, white, info } }) => ({
                    color: white.main,
                    backgroundColor: dark.main,
                    "&:hover": {
                      color: white.main,
                      backgroundColor: dark.main,
                    },
                  })}
                  onClick={() => {
                    setCreateOrderModal(true);
                    // setUpdateProductModal(false);
                  }}
                >
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp; Create Order
                </MDButton>
              ) : null}
            </MDBox>
            <MDBox
              // px={3}
              sx={({ palette: { dark, white, info }, breakpoints }) => ({
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
                width: "100%",
                gap: 0.5,
                [breakpoints.up("xs")]: {
                  flexDirection: "column",
                },
                [breakpoints.up("sm")]: {
                  flexDirection: "column",
                },
                [breakpoints.up("md")]: {
                  flexDirection: "column",
                },
                [breakpoints.up("lg")]: {
                  flexDirection: "column",
                },
              })}
            >
              {/* <MDBox
            py={3}
            sx={{
              flexDirection: "column",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 1.5,
              width: "50%",
            }}
          >
            <MDTypography variant="button"> Product Filter</MDTypography>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={isFilterName}
              onChange={(e) => {
                setIsFilterName(e.target.value);
                setPagess(1);
                setFilter(tabsName && tabsName[0]);
                setIsSearch("");
              }}
              sx={({ palette: { dark, white, info } }) => ({
                width: '100%',
                height: "3rem",
                color: darkMode ? white?.main : dark?.main,
                bgcolor: "transparent",
                "&	.MuiSelect-icon": {
                  color: darkMode ? white?.main : dark?.main,
                  display: "block !important",
                  fontSize: "1.5rem !important",
                },
              })}
            >
              <MenuItem value={"name"}>Name</MenuItem>
              <MenuItem value={"productId"}>ProductId</MenuItem>
            </Select>
          </MDBox> */}
              <MDBox
                sx={({ palette: { dark, white, info }, breakpoints }) => ({
                  [breakpoints.up("xs")]: {
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: 1.5,
                    pl: 3,
                  },
                  [breakpoints.up("sm")]: {
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: 1.5,
                    pl: 3,
                  },
                  [breakpoints.up("md")]: {
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: 1.5,
                    pt: 4,
                  },
                  [breakpoints.up("lg")]: {
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: 1.5,
                    pt: 4,
                  },
                })}
              >
                <MDTypography variant="button">Order Filter</MDTypography>

                <MDInput
                  placeholder="UserName, OrderID..."
                  type="text"
                  fullWidth
                  name="sarch here"
                  value={filter?.search}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={({ palette: { dark, white, info } }) => ({
                          backgroundColor: darkMode ? white.main : dark.main,
                          height: "100%",
                          padding: "1rem",
                          borderRadius: "5px",
                        })}
                      >
                        {filterCollapse ? (
                          <KeyboardArrowUpRounded
                            onClick={() => setFilterCollapse(false)}
                            size="20"
                            sx={({ palette: { dark, white, info } }) => ({
                              color: !darkMode ? white.main : dark.main,
                              cursor: "pointer",
                            })}
                          />
                        ) : (
                          <KeyboardArrowDownRounded
                            onClick={() => setFilterCollapse(true)}
                            size="20"
                            sx={({ palette: { dark, white, info } }) => ({
                              color: !darkMode ? white.main : dark.main,
                              cursor: "pointer",
                            })}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setPagess(1);
                    setFilter((prev) => ({
                      ...prev,
                      search: e.target.value,
                    }));
                  }}
                />
              </MDBox>
              <Collapse
                in={filterCollapse}
                timeout="auto"
                unmountOnExit
                sx={{ width: "100%", p: 3 }}
              >
                <MDBox
                  sx={({ palette: { dark, white, info }, breakpoints }) => ({
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 0.5,
                    width: "100%",
                    [breakpoints.up("xs")]: {
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    },
                    [breakpoints.up("sm")]: {
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    },
                    [breakpoints.up("md")]: {
                      flexDirection: "row",
                      flexWrap: "wrap",
                    },
                    [breakpoints.up("lg")]: {
                      flexDirection: "row",
                      flexWrap: "wrap",
                    },
                  })}
                >
                  <MDBox width="23%" display="flex" flexDirection="column">
                    <MDTypography variant="button">Filter By Duration</MDTypography>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={filter?.filter}
                      onChange={(e) => {
                        setPagess(1);
                        setFilter((prev) => ({
                          ...prev,
                          filter: e.target.value,
                        }));
                      }}
                      sx={({ palette: { dark, white, info } }) => ({
                        width: "100%",
                        height: "3rem",
                        color: darkMode ? white?.main : dark?.main,
                        bgcolor: "transparent",
                        "&	.MuiSelect-icon": {
                          color: darkMode ? white?.main : dark?.main,
                          display: "block !important",
                          fontSize: "1.5rem !important",
                        },
                      })}
                    >
                      {dateFilter?.map((ele, i) => (
                        <MenuItem component="option" key={i} value={ele?._id}>
                          {ele?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </MDBox>
                  <MDBox width="23%" display="flex" flexDirection="column">
                    <MDTypography variant="button">Filter By Status</MDTypography>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={filter?.status}
                      onChange={(e) => {
                        setPagess(1);
                        setFilter((prev) => ({
                          ...prev,
                          status: e.target.value,
                        }));
                      }}
                      sx={({ palette: { dark, white, info } }) => ({
                        width: "100%",
                        height: "3rem",
                        color: darkMode ? white?.main : dark?.main,
                        bgcolor: "transparent",
                        "&	.MuiSelect-icon": {
                          color: darkMode ? white?.main : dark?.main,
                          display: "block !important",
                          fontSize: "1.5rem !important",
                        },
                      })}
                    >
                      {!ecom
                        ? filterByStatusService?.map((ele, i) => (
                            <MenuItem key={i} value={ele?._id}>
                              {ele?.name}
                            </MenuItem>
                          ))
                        : filterByStatusEcomm?.map((ele, i) => (
                            <MenuItem key={i} value={ele?._id}>
                              {ele?.name}
                            </MenuItem>
                          ))}
                    </Select>
                  </MDBox>
                  <MDBox width="23%" display="flex" flexDirection="column">
                    <MDTypography variant="button">Sort By Price</MDTypography>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={filter?.price}
                      onChange={(e) => {
                        setPagess(1);
                        setFilter((prev) => ({
                          ...prev,
                          price: e.target.value,
                        }));
                      }}
                      sx={({ palette: { dark, white, info } }) => ({
                        width: "100%",
                        height: "3rem",
                        color: darkMode ? white?.main : dark?.main,
                        bgcolor: "transparent",
                        "&	.MuiSelect-icon": {
                          color: darkMode ? white?.main : dark?.main,
                          display: "block !important",
                          fontSize: "1.5rem !important",
                        },
                      })}
                    >
                      {sortByPrice?.map((ele, i) => (
                        <MenuItem key={i} value={ele?._id}>
                          {ele?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </MDBox>
                  <MDBox width="23%" display="flex" flexDirection="column">
                    <MDTypography variant="button">Filter By Payment Method</MDTypography>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={filter?.paymentMethod}
                      onChange={(e) => {
                        setPagess(1);
                        setFilter((prev) => ({
                          ...prev,
                          paymentMethod: e.target.value,
                        }));
                      }}
                      sx={({ palette: { dark, white, info } }) => ({
                        width: "100%",
                        height: "3rem",
                        color: darkMode ? white?.main : dark?.main,
                        bgcolor: "transparent",
                        "&	.MuiSelect-icon": {
                          color: darkMode ? white?.main : dark?.main,
                          display: "block !important",
                          fontSize: "1.5rem !important",
                        },
                      })}
                    >
                      {filterByPaymentMethod?.map((ele, i) => (
                        <MenuItem key={i} value={ele?._id}>
                          {ele?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </MDBox>
                </MDBox>
              </Collapse>
            </MDBox>
            <MDBox py={3}>
              {Loading ? (
                <SkLoading />
              ) : AllOrders && AllOrders.length > 0 ? (
                <>
                  <DataTable
                    table={{
                      columns: ecom ? columns.allOrdersEcom : columns?.allOrders,
                      rows: rowsData || [],
                    }}
                    isSorted={false}
                    entriesPerPage={false}
                    isPages={AllOrders && AllOrders.length}
                    noEndBorder
                    canSearch={false}
                    showTotalEntries={false}
                    pagination={false}
                    isPagination={false}
                  />
                  <MDBox
                    sx={{
                      mt: 5,
                      // minHeigth: "100vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Stack spacing={2} direction={"row"}>
                      <MDTypography>Page: {pagess}</MDTypography>
                      <Pagination
                        sx={({ palette: { dark, white, info } }) => ({
                          "&.MuiPaginationItem-text": {
                            color: darkMode ? white.main : dark.main,
                          },
                          "&	.MuiPaginationItem-icon": {
                            color: darkMode ? white.main : dark.main,
                          },
                          "&		.MuiPaginationItem-textInfo": {
                            color: darkMode ? white.main : dark.main,
                          },
                        })}
                        color="info"
                        variant="text"
                        count={isPages}
                        page={pagess}
                        onChange={(e, value) => setPagess(value)}
                      />
                    </Stack>
                  </MDBox>
                </>
              ) : (
                <MDBox
                  // key={index}
                  display="flex"
                  justifyContent="center"
                  gap={2}
                  alignItems="center"
                  // width={"100%"}
                >
                  <MDTypography variant="h6">Something went wrong !</MDTypography>
                </MDBox>
              )}
            </MDBox>
          </Card>
        </MDBox>
        <Footer />
      </DashboardLayout>
      <SkModal
        show={viewProductModal}
        unShow={setViewProductModal}
        width={{ sx: "100%", md: "75%", xl: "75%", sm: "100%" }}
        height={"80%"}
        padding={3}
        overflowY={true}
      >
        <SingleOrderDetails
          viewOrderId={viewOrderId}
          setViewProductModal={setViewProductModal}
          isFindStatus={isFindStatus}
          isOrder={isOrderDetails}
          setIsOrder={setIsOrderDetails}
          handleMenuOpen={handleOpenMenu}
          ecom={ecom}
        />
      </SkModal>
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
        {/* {console.log(isOrderDetails, "isOrderDetails")}
        {console.log(
          isOrderDetails?.items && isOrderDetails?.items?.length === 1
            ? isOrderDetails?.items?.at(0)?.status || "N/A"
            : isFindStatus(isOrderDetails) || "N/A",
          "isStatus"
        )} */}

        {ecom ? (
          <>
            {(isOrderDetails?.orderDetails && isOrderDetails?.orderDetails?.status === "ORDERED") ||
            isOrderDetails?.status === "ORDERED" ? (
              <>
                <MenuItem
                  sx={{ border: "1px solid blue", mb: 1 }}
                  onClick={() => {
                    setOpenMenu(false);
                    isStatusUpdateFunction("ACCEPTED", true);
                  }}
                >
                  {/* <MDAvatar size="sm">
                    <CheckCircle />
                  </MDAvatar>{" "} */}
                  Accepted
                </MenuItem>
                <MenuItem
                  sx={{ border: "1px solid blue", mb: 1 }}
                  onClick={() => {
                    setOpenMenu(false);
                    isStatusUpdateFunction("CANCELLED", true);
                  }}
                >
                  {/* <MDAvatar size="sm">
                    <Unpublished sx={{ fontSize: "2rem" }} />
                  </MDAvatar> */}
                  Cancel
                </MenuItem>
              </>
            ) : null}

            {(isOrderDetails?.orderDetails &&
              isOrderDetails?.orderDetails?.status === "ACCEPTED") ||
            isOrderDetails?.status === "ACCEPTED" ? (
              <>
                <MenuItem
                  sx={{ border: "1px solid blue", mb: 1 }}
                  onClick={() => {
                    setOpenMenu(false);
                    isStatusUpdateFunction("SHIPPED", true);
                  }}
                >
                  {/* <MDAvatar size="sm">
                    <CheckCircle />
                  </MDAvatar>{" "} */}
                  Shipped
                </MenuItem>
                <MenuItem
                  sx={{ border: "1px solid blue", mb: 1 }}
                  onClick={() => {
                    setOpenMenu(false);
                    isStatusUpdateFunction("CANCELLED", true);
                  }}
                >
                  {/* <MDAvatar size="sm">
                    <Unpublished sx={{ fontSize: "2rem" }} />
                  </MDAvatar> */}
                  Cancel
                </MenuItem>
              </>
            ) : null}
            {(isOrderDetails?.orderDetails && isOrderDetails?.orderDetails?.status === "SHIPPED") ||
            isOrderDetails?.status === "SHIPPED" ? (
              <>
                <MenuItem
                  sx={{ border: "1px solid blue", mb: 1 }}
                  onClick={() => {
                    setOpenMenu(false);
                    isStatusUpdateFunction("OUT_OF_DELIVERY", true);
                  }}
                >
                  {/* <MDAvatar size="sm">
                    <CheckCircle />
                  </MDAvatar>{" "} */}
                  Out For Delivery
                </MenuItem>
                <MenuItem
                  sx={{ border: "1px solid blue", mb: 1 }}
                  onClick={() => {
                    setOpenMenu(false);
                    isStatusUpdateFunction("CANCELLED", true);
                  }}
                >
                  {/* <MDAvatar size="sm">
                    <Unpublished sx={{ fontSize: "2rem" }} />
                  </MDAvatar> */}
                  Cancel
                </MenuItem>
              </>
            ) : null}
            {(isOrderDetails?.orderDetails &&
              isOrderDetails?.orderDetails?.status === "OUT_OF_DELIVERY") ||
            isOrderDetails?.status === "OUT_OF_DELIVERY" ? (
              <>
                <MenuItem
                  sx={{ border: "1px solid blue", mb: 1 }}
                  onClick={() => {
                    setOpenMenu(false);
                    isStatusUpdateFunction("DELIVERED", true);
                  }}
                >
                  {/* <MDAvatar size="sm">
                    <CheckCircle />
                  </MDAvatar>{" "} */}
                  Delivered
                </MenuItem>
                <MenuItem
                  sx={{ border: "1px solid blue", mb: 1 }}
                  onClick={() => {
                    setOpenMenu(false);
                    isStatusUpdateFunction("CANCELLED", true);
                  }}
                >
                  {/* <MDAvatar size="sm">
                    <Unpublished sx={{ fontSize: "2rem" }} />
                  </MDAvatar> */}
                  Cancel
                </MenuItem>
              </>
            ) : null}
            {(isOrderDetails?.orderDetails &&
              isOrderDetails?.orderDetails?.status === "RETURN_REQUEST") ||
            isOrderDetails?.status === "RETURN_REQUEST" ? (
              <>
                <MenuItem
                  sx={{ border: "1px solid blue", mb: 1 }}
                  onClick={() => {
                    setOpenMenu(false);
                    isStatusUpdateFunction("RETURN_REQUEST_APPROVED");
                  }}
                >
                  {/* <MDAvatar size="sm">
                    <CheckCircle />
                  </MDAvatar>{" "} */}
                  Approve Return Request
                </MenuItem>
                <MenuItem
                  sx={{ border: "1px solid blue", mb: 1 }}
                  onClick={() => {
                    setOpenMenu(false);
                    isStatusUpdateFunction("CANCELLED");
                  }}
                >
                  {/* <MDAvatar size="sm">
                    <Unpublished sx={{ fontSize: "2rem" }} />
                  </MDAvatar> */}
                  Cancel
                </MenuItem>
              </>
            ) : null}
            {(isOrderDetails?.orderDetails &&
              isOrderDetails?.orderDetails?.status === "RETURN_REQUEST_APPROVED") ||
            isOrderDetails?.status === "RETURN_REQUEST_APPROVED" ? (
              <>
                <MenuItem
                  sx={{ border: "1px solid blue", mb: 1 }}
                  onClick={() => {
                    setOpenMenu(false);
                    isStatusUpdateFunction("RETURNED");
                  }}
                >
                  {/* <MDAvatar size="sm">
                    <CheckCircle />
                  </MDAvatar>{" "} */}
                  Returned
                </MenuItem>
              </>
            ) : null}
          </>
        ) : (
          <>
            <MenuItem
              sx={{ border: "1px solid blue", mb: 1 }}
              onClick={() => {
                setOpenMenu(false);
                isStatusUpdateFunction("CANCELLED");
              }}
            >
              {/* <MDAvatar size="sm">
              <CheckCircle />
            </MDAvatar>{" "} */}
              Cancel
            </MenuItem>
          </>
        )}
        {/* {(isOrderDetails?.items && isOrderDetails?.items?.length === 1
          ? isOrderDetails?.items?.at(0)?.status || "N/A"
          : isFindStatus(isOrderDetails) || "N/A") === "ORDERED" && (
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
          )} */}
      </Menu>
    </>
  );
};

export default Orders;
