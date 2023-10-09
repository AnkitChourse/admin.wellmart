import {
  Close,
  Edit,
  NotificationAdd,
  People,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
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
} from "@mui/material";
import AstrieskIcon from "components/AstrieskIcon";
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
import { handleAlert } from "redux/festures/alertSlice";
import { updateUser } from "redux/festures/userSlice";
import { getAllUsers } from "redux/festures/userSlice";

// import { getAllGlobalUsers } from "redux/festures/userSlice";
import MDInput from "components/MDInput";
import { getSingleUser } from "redux/festures/userSlice";
import { createNotification } from "redux/festures/userSlice";
//   import Form from "./Form";
import UpdateForm from "./UpdateForm";
import { useLocation } from "react-router-dom";
import Createform from "./Createform";
import SingleUserDetails from "Pages/Users/SingleUserDetails";
const columns = {
  sub: [
    { Header: "S.No", accessor: "no" },
    { Header: "user details", accessor: "user details", width: "20%" },
    { Header: "mobile/email", accessor: "mobile/email", width: "20%" },
    // { Header: "MemberShips", accessor: "MemberShips", width: "20%" },
    // { Header: "payment method ", accessor: "payment method" },
    // { Header: "total orders", accessor: "total orders" },
    // { Header: "User Type", accessor: "User Type" },
    // { Header: "Permission", accessor: "Permission" },

    { Header: "block/unblock", accessor: "block/unblock" },
    // { Header: "send Notification", accessor: "send Notification" },
    { Header: "view", accessor: "view", textAlign: "center" },
    { Header: "action", accessor: "action" },
  ],
};
const SubAdmin = () => {
  const { pathname } = useLocation();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [isOpen, setIsOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updateData, setUpdateData] = useState("");
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const [rowsData, setRowsData] = useState([]);
  const [isUserDetails, setIsUserDetails] = useState(false);
  const [isUserUpdate, setIsUserUpdate] = useState(false);
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const [isSingleUser, setIsSingleUser] = useState(false);
  const [viewUserId, setViewUserId] = useState("");
  // console.log(isSingleUser, "viewUserId");
  const [isSearch, setIsSearch] = useState("");
  const [isFilterName, setIsFilterName] = useState("search");
  const [pagess, setPagess] = useState(1);
  const [isSwitch, setIsSwitch] = useState(null);
  const [userType, setUserType] = useState(null);
  const { AllUsers, Loading, isPages, singleUsers } = useSelector((state) => ({
    ...state.isUsers,
  }));
  // console.log(AllUsers, isPages, "Allusers");
  // console.log(rowsData, "rowsData");
  // console.log(singleUsers, "singleUsers");
  //   useEffect(() => {
  //     // if (pathname === "/users/admins") setUserType("ADMIN");
  //     if (pathname === "/users/subadmins") setUserType("SUB_ADMIN");
  //     else setUserType("CUSTOMER");

  //     setPagess(1);
  //   }, [pathname]);

  // const handleSwitchUpdate = (items) => {
  //   dispatch(
  //     updateUser({ url: `${process.env.REACT_APP_API}/disableUser/${items}/${admin}` })
  //   ).then((data) => {
  //     // console.log(data, "data");
  //     dispatch(
  //       handleAlert({
  //         isOpen: true,
  //         type: `${data?.payload?.success ? "success" : "error"}`,
  //         msg: data?.payload?.message,
  //       })
  //     );
  //     if (data?.payload?.success) {
  //       dispatch(
  //         getAllGlobalUsers(
  //           `/getAllUser/${admin}?page=${pagess}${
  //             isSearch !== "" ? `&${isFilterName}=${isSearch}` : ""
  //           }&userType=${userType}`
  //         )
  //       ).then((data) => {
  //         // console.log("hwl", data);
  //         if (data?.payload?.data && data?.payload?.data?.length > 0) {
  //           const temprows =
  //             data?.payload?.data &&
  //             data?.payload?.data?.length > 0 &&
  //             data?.payload?.data?.map((value, index) => ({
  //               no: (
  //                 <MDTypography sx={{ fontSize: 12, fontWeight: "medium" }} variant="text">
  //                   {index + 1}
  //                 </MDTypography>
  //               ),
  //               "user details": (
  //                 <MDBox
  //                   sx={{
  //                     display: "flex",
  //                     flexDirection: "row",
  //                     alignItems: "flex-start",
  //                     justifyContent: "flex-start",
  //                     gap: 1,
  //                   }}
  //                 >
  //                   <MDBox sx={{ height: 40, width: 40 }}>
  //                     {/* {console.log(value)} */}
  //                     <img
  //                       src={`${process.env.REACT_APP_URI}/${value?.image}`}
  //                       alt={"img"}
  //                       onError={(e) => {
  //                         (e.onError = null),
  //                           (e.target.src = require("../../assets/images/bg-profile.jpeg"));
  //                       }}
  //                       style={{ width: "100%", height: "100%", borderRadius: "50%" }}
  //                     />
  //                   </MDBox>
  //                   <MDBox
  //                     sx={{
  //                       display: "flex",
  //                       flexDirection: "row",
  //                       alignItems: "flex-start",
  //                       justifyContent: "flex-start",
  //                       flexDirection: "column",
  //                     }}
  //                   >
  //                     <MDTypography
  //                       sx={{ fontSize: 12, fontWeight: "medium" }}
  //                       variant="text"
  //                       style={{
  //                         maxWidth: "350px",
  //                         lineHeight: "20px",
  //                         display: "-webkit-box",
  //                         WebkitBoxOrient: "vertical",
  //                         WebkitLineClamp: 2,
  //                         overflow: "hidden",
  //                         textOverflow: "ellipsis",
  //                       }}
  //                     >
  //                       Name: {value?.fullName || null}
  //                     </MDTypography>
  //                     <MDTypography sx={{ fontSize: 12, fontWeight: "medium" }} variant="text">
  //                       UserId: {value?._id || "N/A"}
  //                     </MDTypography>
  //                   </MDBox>
  //                 </MDBox>
  //               ),
  //               "User Type": (
  //                 <MDBadge
  //                   badgeContent={value?.userType || "N/A"}
  //                   color={
  //                     (value?.userType === "CUSTOMER" && "primary") ||
  //                     (value?.userType === "ADMIN" && "info") ||
  //                     (value?.userType === "SUB_ADMIN" && "warning") ||
  //                     (value?.userType === "SUB_ADMIN" && "warning") ||
  //                     (value?.userType === "PARTNER" && "primary")
  //                   }
  //                   variant="gradient"
  //                   size="lg"
  //                 />
  //               ),
  //               Permission: (
  //                 <MDBadge
  //                   badgeContent={value?.permissions || "N/A"}
  //                   color={
  //                     (value?.role === "USER" && "primary") || (value?.role === "ADMIN" && "info")
  //                   }
  //                   variant="gradient"
  //                   size="lg"
  //                 />
  //               ),
  //               "mobile/email": (
  //                 <>
  //                   {value?.email && (
  //                     <MDTypography
  //                       display="block"
  //                       variant="button"
  //                       fontWeight="medium"
  //                       ml={1}
  //                       lineHeight={1}
  //                     >
  //                       Email: {value?.email}
  //                     </MDTypography>
  //                   )}

  //                   {value?.phoneNumber && (
  //                     <MDTypography
  //                       display="block"
  //                       variant="button"
  //                       fontWeight="medium"
  //                       ml={1}
  //                       lineHeight={1}
  //                     >
  //                       Mobile No : {value?.phoneNumber}{" "}
  //                     </MDTypography>
  //                   )}
  //                 </>
  //               ),
  //               MemberShips: (
  //                 <>
  //                   <MDTypography
  //                     display="block"
  //                     variant="button"
  //                     fontWeight="medium"
  //                     ml={1}
  //                     lineHeight={1}
  //                   >
  //                     {value?.membership?.features.length > 0 ? (
  //                       <>Features: {value?.membership?.features}</>
  //                     ) : (
  //                       "-"
  //                     )}
  //                   </MDTypography>

  //                   <MDTypography
  //                     display="block"
  //                     variant="button"
  //                     fontWeight="medium"
  //                     ml={1}
  //                     lineHeight={1}
  //                   >
  //                     {value?.membership?.membershipId ? (
  //                       <>MemberShip Id : {value?.membership?.membershipId}</>
  //                     ) : (
  //                       "-"
  //                     )}
  //                   </MDTypography>
  //                 </>
  //               ),
  //               id: (
  //                 <MDTypography
  //                   display="block"
  //                   variant="button"
  //                   fontWeight="medium"
  //                   ml={1}
  //                   lineHeight={1}
  //                 >
  //                   {value?._id || "N/A"}
  //                 </MDTypography>
  //               ),
  //               view: (
  //                 <>
  //                   {/* <IconButton
  //                     aria-label="msg send"
  //                     onClick={() => {
  //                       setIsNotificationOn(true);
  //                       setIsSingleUser(true);
  //                       dispatch(getSingleUser(`getUserById/${value?._id}`));
  //                     }}
  //                   >
  //                     <NotificationAdd
  //                       sx={({ palette: { dark, white, info } }) => ({
  //                         color: darkMode ? info.main : dark.main,
  //                       })}
  //                     />
  //                   </IconButton> */}
  //                   <IconButton
  //                     aria-label="action_edit"
  //                     onClick={() => {
  //                       setIsUserDetails(true);
  //                       setViewUserId(value);
  //                     }}
  //                   >
  //                     <Visibility
  //                       sx={({ palette: { dark, white, info } }) => ({
  //                         color: darkMode ? info.main : dark.main,
  //                       })}
  //                     />
  //                   </IconButton>
  //                 </>
  //               ),
  //               "block/unblock": (
  //                 <Switch
  //                   value={value?.disable}
  //                   checked={value?.disable}
  //                   color={"info"}
  //                   onChange={(e) => {
  //                     handleSwitchUpdate(value?._id);
  //                     setIsSwitch(!isSwitch);
  //                   }}
  //                   inputProps={{ "aria-label": "controlled" }}
  //                 />
  //               ),

  //               "send Notification": (
  //                 <>
  //                   <IconButton
  //                     aria-label="msg send"
  //                     onClick={() => {
  //                       setIsNotificationOn(true);
  //                       setIsSingleUser(true);
  //                       dispatch(getSingleUser(`getUserById/${value?._id}`));
  //                     }}
  //                   >
  //                     <NotificationAdd
  //                       sx={({ palette: { dark, white, info } }) => ({
  //                         color: darkMode ? info.main : dark.main,
  //                       })}
  //                     />
  //                   </IconButton>
  //                 </>
  //               ),
  //               action: (
  //                 <IconButton
  //                   aria-label="action_edit"
  //                   onClick={() => {
  //                     setUpdate(true);
  //                     setUpdateData(value);
  //                   }}
  //                 >
  //                   <Edit
  //                     sx={({ palette: { dark, white, info } }) => ({
  //                       color: darkMode ? info.main : dark.main,
  //                     })}
  //                   />
  //                 </IconButton>
  //               ),
  //             }));
  //           setRowsData(temprows);
  //         } else {
  //           setRowsData([]);
  //         }
  //       });
  //     }
  //   });
  // };

  // useEffect(() => {
  //   dispatch(getAllUsers(`/getAllSubadmin/${admin}?page=${pagess}&${isFilterName}=${isSearch}`));
  // }, [isSearch, isSwitch, pagess, AllUsers]);
  useEffect(() => {
    dispatch(getAllUsers(`/getAllSubadmin/${admin}`)).then((data) => {
      // console.log("hwl", data);
      if (data?.payload?.data && data?.payload?.data?.length > 0) {
        const temprows =
          data?.payload?.data &&
          data?.payload?.data?.length > 0 &&
          data?.payload?.data?.map((value, index) => ({
            no: (
              <MDTypography sx={{ fontSize: 12, fontWeight: "medium" }} variant="text">
                {index + 1}
                {/* {console.log(value, "value")} */}
              </MDTypography>
            ),
            "user details": (
              <MDBox
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  gap: 1,
                }}
              >
                <MDBox sx={{ height: 40, width: 40 }}>
                  {/* {console.log(value,"dfghjkdfgh")} */}
                  <img
                    src={`${process.env.REACT_APP_URI}/${value?.image}`}
                    alt={"img"}
                    onError={(e) => {
                      (e.onError = null),
                        (e.target.src = require("../../assets/images/bg-profile.jpeg"));
                    }}
                    style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                  />
                </MDBox>
                <MDBox
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <MDTypography
                    sx={{ fontSize: 12, fontWeight: "medium" }}
                    variant="text"
                    style={{
                      maxWidth: "350px",
                      lineHeight: "20px",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Name: {value?.fullName || null}
                  </MDTypography>
                  <MDTypography sx={{ fontSize: 12, fontWeight: "medium" }} variant="text">
                    UserId: {value?._id || "N/A"}
                  </MDTypography>
                </MDBox>
              </MDBox>
            ),

            "User Type": (
              <MDBadge
                badgeContent={value?.userType || "N/A"}
                color={
                  (value?.userType?.at(0) === "USER" && "primary") ||
                  (value?.userType?.at(0) === "ADMIN" && "info") ||
                  (value?.userType?.at(0) === "SUB_ADMIN" && "warning") ||
                  (value?.userType?.at(0) === "SUB_ADMIN" && "warning") ||
                  (value?.userType?.at(0) === "PARTNER" && "primary")
                }
                variant="gradient"
                size="lg"
              />
            ),
            Permission: (
              <MDBadge
                badgeContent={value?.permissions || "N/A"}
                color={(value?.role === "USER" && "primary") || (value?.role === "ADMIN" && "info")}
                variant="gradient"
                size="lg"
              />
            ),
            "mobile/email": (
              <>
                {value?.email && (
                  <MDTypography
                    display="block"
                    variant="button"
                    fontWeight="medium"
                    fontSize={12}
                    ml={1}
                    lineHeight={2}
                  >
                    Email: {value?.email}
                  </MDTypography>
                )}

                {value?.phoneNumber && (
                  <MDTypography
                    display="block"
                    variant="button"
                    fontWeight="medium"
                    ml={1}
                    fontSize={12}
                    lineHeight={1}
                  >
                    Mobile No : {value?.phoneNumber}{" "}
                  </MDTypography>
                )}
              </>
            ),
            MemberShips: (
              <>
                <MDTypography
                  display="block"
                  variant="button"
                  fontWeight="medium"
                  ml={1}
                  lineHeight={1}
                >
                  {value?.membership?.features.length > 0 ? (
                    <>Features: {value?.membership?.features}</>
                  ) : (
                    "-"
                  )}
                </MDTypography>

                <MDTypography
                  display="block"
                  variant="button"
                  fontWeight="medium"
                  ml={1}
                  lineHeight={1}
                >
                  {value?.membership?.membershipId ? (
                    <>MemberShip Id : {value?.membership?.membershipId}</>
                  ) : (
                    "-"
                  )}
                </MDTypography>
              </>
            ),
            id: (
              <MDTypography
                display="block"
                variant="button"
                fontWeight="medium"
                ml={1}
                lineHeight={1}
              >
                {value?._id || "N/A"}
              </MDTypography>
            ),

            view: (
              <>
                {/* <IconButton
                      aria-label="msg send"
                      onClick={() => {
                        setIsNotificationOn(true);
                        setIsSingleUser(true);
                        dispatch(getSingleUser(`getUserById/${value?._id}`));
                      }}
                    >
                      <NotificationAdd
                        sx={({ palette: { dark, white, info } }) => ({
                          color: darkMode ? info.main : dark.main,
                        })}
                      />
                    </IconButton> */}
                <IconButton
                  aria-label="action_edit"
                  onClick={() => {
                    setIsUserDetails(true);
                    setViewUserId(value);
                  }}
                >
                  <Visibility
                    sx={({ palette: { dark, white, info } }) => ({
                      color: darkMode ? info.main : dark.main,
                    })}
                  />
                </IconButton>
              </>
            ),
            "block/unblock": (


                
              <Switch
                value={value?.disable}
                checked={value?.disable}
                color={"info"}
             

                onChange={(e) => {
                  // handleSwitchControl(value?._id);
                  // setIsSwitch(!isSwitch);
                  setIsSwitch(!isSwitch);
                  dispatch(
                    updateUser({
                      url: `${process.env.REACT_APP_API}disableUser/${value?._id}/${admin}`,
                    })
                  ).then((data) => {
                    dispatch(
                      handleAlert({
                        isOpen: true,
                        type: `${data?.payload?.success ? "success" : "error"}`,
                        msg: data?.payload?.message,
                      })
                    );
                    if (data?.payload?.success) {
                        dispatch(getAllUsers(`/getAllSubadmin/${admin}`))
                    }
                  });
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
            ),

            "send Notification": (
              <>
                <IconButton
                  aria-label="msg send"
                  onClick={() => {
                    setIsNotificationOn(true);
                    setIsSingleUser(true);
                    dispatch(getSingleUser(`getUserById/${value?._id}`));
                  }}
                >
                  <NotificationAdd
                    sx={({ palette: { dark, white, info } }) => ({
                      color: darkMode ? info.main : dark.main,
                    })}
                  />
                </IconButton>
              </>
            ),

            action: (
              <IconButton
                aria-label="action_edit"
                onClick={() => {
                  setUpdate(true);
                  setUpdateData(value);
                }}
              >
                <Edit
                  sx={({ palette: { dark, white, info } }) => ({
                    color: darkMode ? info.main : dark.main,
                  })}
                />
              </IconButton>
            ),
          }));
        // console.log(userType,"userType");
        // console.log(temprows);
        setRowsData(temprows);
      } else {
        setRowsData([]);
      }
    });
    // }
  }, [pagess, isSearch, userType, isFilterName, update, isOpen]);

  const [isFormData, setIsFormData] = useState({
    message: "",
    title: "",
  });
  const handleForm = (e) => {
    const { name, value } = e.target;
    setIsFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isSingleUser) {
      dispatch(
        createNotification({
          url: `${process.env.REACT_APP_API}/sendNotificationToSingleUser`,
          data: isFormData,
        })
      ).then((data) => {
        dispatch(
          handleAlert({
            isOpen: true,
            type: `${data?.payload?.success ? "success" : "error"}`,
            msg: data?.payload?.message,
          })
        );
        setIsSingleUser(false);
        setIsNotificationOn(false);
        setIsFormData((prev) => ({
          ...prev,
          message: "",
          title: "",
        }));
      });
    } else {
      dispatch(
        createNotification({
          url: `${process.env.REACT_APP_API}/sendNotificationToAllUser`,
          data: isFormData,
        })
      ).then((data) => {
        dispatch(
          handleAlert({
            isOpen: true,
            type: `${data?.payload?.success ? "success" : "error"}`,
            msg: data?.payload?.message,
          })
        );
        setIsSingleUser(false);
        setIsNotificationOn(false);
        setIsFormData((prev) => ({
          ...prev,
          message: "",
          title: "",
        }));
      });
    }
  };
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mb={2} />
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
                User &apos;s Table{" "}
              </MDTypography>
              {/* {userType === "ADMIN" || userType === "SUB_ADMIN" ? ( */}
              <MDBox sx={{ display: "flex", gap: "2%" }}>
                <MDButton
                  variant="gradient"
                  color="dark"
                  disabled={Loading}
                  sx={({ palette: { dark, white, info } }) => ({
                    color: white.main,
                    backgroundColor: dark.main,
                    "&:hover": {
                      color: white.main,
                      backgroundColor: dark.main,
                    },
                  })}
                  onClick={() => {
                    // setIsNotificationOn(true);
                    setIsOpen(true);
                    setIsSingleUser(false);
                  }}
                >
                  <People />
                  &nbsp; Create Admin And SubAdmin
                </MDButton>
              </MDBox>
              {/* ) : (
                <MDButton
                  variant="gradient"
                  color="dark"
                  disabled={Loading}
                  sx={({ palette: { dark, white, info } }) => ({
                    color: white.main,
                    backgroundColor: dark.main,
                    "&:hover": {
                      color: white.main,
                      backgroundColor: dark.main,
                    },
                  })}
                  onClick={() => {
                    setIsNotificationOn(true);
                    // setIsOpen(true);
                    // setIsSingleUser(false);
                  }}
                >
                  <NotificationAdd />
                  &nbsp; Send to all User Notification
                </MDButton>
              )} */}
            </MDBox>
            {/* <MDBox
              px={3}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <MDBox
                py={3}
                sx={{
                  flexDirection: "column",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 1.5,
                }}
              >
                <MDTypography variant="button">Filters</MDTypography>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={isFilterName}
                  disabled={Loading}
                  onChange={(e) => {
                    setIsFilterName(e.target.value);
                    setPagess(1);
                    if (e.target.value === "disable") setIsSearch(0);
                    else setIsSearch("");
                  }}
                  sx={({ palette: { dark, white, info } }) => ({
                    width: 100,
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
                  <MenuItem checked value={"search"}>
                    Search
                  </MenuItem>
                  <MenuItem value={"disable"}>Visibility</MenuItem>
                </Select>
              </MDBox>
              <MDBox
                pt={4}
                px={1}
                sx={{
                  flexDirection: "column",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 1.5,
                }}
              >
                {isFilterName === "search" ? (
                  <MDInput
                    disabled={Loading}
                    placeholder="search here...... "
                    type={
                      (isFilterName === "name" && "text") ||
                      (isFilterName === "mobile" && "number") ||
                      (isFilterName === "email" && "email")
                    }
                    fullWidth
                    name="sarch here"
                    value={isSearch}
                    onChange={(e) => setIsSearch(e.target.value)}
                  />
                ) : (
                  <Select
                    disabled={Loading}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={isSearch}
                    onChange={(e) => {
                      setPagess(1);
                      setIsSearch(e.target.value);
                    }}
                    fullWidth
                    sx={({ palette: { dark, white, info } }) => ({
                      width: "10rem",
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
                    <MenuItem checked value={0}>
                      Choose Visibility
                    </MenuItem>
                    <MenuItem checked value={false}>
                      Enabled User
                    </MenuItem>
                    <MenuItem value={true}>Disabled User</MenuItem>
                  </Select>
                )}
              </MDBox>
            </MDBox> */}
            <MDBox py={3}>
              {Loading ? (
                <SkLoading />
              ) : AllUsers && AllUsers.length > 0 ? (
                <>
                  <DataTable
                    table={{
                      columns: columns?.sub,

                      rows: rowsData,
                    }}
                    isSorted={false}
                    entriesPerPage={false}
                    isPages={AllUsers && AllUsers.length}
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
        show={isOpen}
        unShow={setIsOpen}
        width={{ sx: "100%", md: "65%", xl: "65%", sm: "100%" }}
        height={"90vh"}
        padding={3}
        overflowY={true}
      >
        <Createform setIsOpen={setIsOpen} userType={userType} />
      </SkModal>
      <SkModal
        show={update}
        unShow={setUpdate}
        width={{ sx: "100%", md: "65%", xl: "65%", sm: "100%" }}
        maxHeight="90vh"
        padding={3}
        overflowY={true}
      >
        <UpdateForm
          setUpdate={setUpdate}
          update={update}
          updateData={updateData}
          userType={userType}
        />
      </SkModal>
      <SkModal
        show={isUserDetails}
        unShow={setIsUserDetails}
        width={{ sx: "100%", md: "30%", xl: "30%", sm: "100%" }}
        height={"auto"}
        padding={3}
        overflowY={true}
      >
        <SingleUserDetails
          viewUserId={viewUserId}
          setViewProductModal={setIsUserDetails}
          isUserDetails={isUserDetails}
        />
      </SkModal>
      <SkModal
        show={isNotificationOn}
        unShow={setIsNotificationOn}
        width={{ sx: "100%", md: "30%", xl: "30%", sm: "100%" }}
        height={"80%"}
        padding={3}
        overflowY={true}
      >
        <MDBox
          display="flex"
          alignItems="center"
          lineHeight={1}
          sx={{
            justifyContent: "center",
            textAlign: "center",
            flexDirection: "column",
            gap: 5,
            width: "100%",
          }}
        >
          <Card
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 , 10px",
            }}
          >
            <MDTypography variant="h6" py={0.9}>
              {isSingleUser
                ? `${singleUsers?.fullName} Send Notification`
                : "Send to all User Notification"}
            </MDTypography>
          </Card>
        </MDBox>
        <MDBox
          display="flex"
          alignItems="center"
          lineHeight={1}
          //   sx={{
          //
          //   }}
          sx={({ palette: { dark, white, info } }) => ({
            border: 0.5,
            borderColor: darkMode ? white.main : dark.main,
            borderRadius: 3,
            p: 3,
            justifyContent: "center",
            textAlign: "center",
            flexDirection: "column",
            gap: 3,
            width: "100%",
            my: 2,
          })}
          component="form"
          role="form"
          onSubmit={handleFormSubmit}
        >
          <MDBox
            lineHeight={1}
            gap={1}
            width={"90%"}
            justifyContent="flex-start"
            alignItems="flex-start"
            display="flex"
            flexDirection="column"
          >
            <MDTypography variant="h6">
              Notification Title <AstrieskIcon />
            </MDTypography>
            <MDInput
              required={true}
              type="text"
              placeholder="Notification Title"
              fullWidth
              name="title"
              value={isFormData?.title}
              onChange={handleForm}
            />
          </MDBox>

          <MDBox
            lineHeight={1}
            gap={1}
            width={"90%"}
            justifyContent="flex-start"
            alignItems="flex-start"
            display="flex"
            flexDirection="column"
          >
            <MDTypography variant="h6">
              Notification message <AstrieskIcon />
            </MDTypography>
            <MDInput
              required={true}
              type="text"
              placeholder="Notification message"
              fullWidth
              name="message"
              value={isFormData?.message}
              onChange={handleForm}
              multiline
              rows={5}
            />
          </MDBox>

          <MDBox
            sx={{
              width: "100%",
              justifyContent: "flex-end",
              textAlign: "center",
              display: "flex",
            }}
          >
            {" "}
            <MDButton color={"info"} verdant={"gradient"} type={"submit"}>
              {isSingleUser
                ? `${singleUsers?.fullName} Send Notification`
                : "Send to all User Notification"}
            </MDButton>
          </MDBox>
        </MDBox>
      </SkModal>
    </>
  );
};

export default SubAdmin;
