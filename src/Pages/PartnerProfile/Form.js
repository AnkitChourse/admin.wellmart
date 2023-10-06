import MDButton from "components/MDButton";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useMaterialUIController } from "context";
import { useDispatch, useSelector } from "react-redux";
import ImagePicker from "components/ApnaUploader";
import { Cancel } from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SkLoading from "components/SkLoading";
import MDInput from "components/MDInput";
import {
  Card,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Switch,
} from "@mui/material";
import { getAllBlogs } from "redux/festures/blogSlice";
import { updateBlog } from "redux/festures/blogSlice";
import { createPostBlogs } from "redux/festures/blogSlice";
import { handleAlert } from "redux/festures/alertSlice";
import ApnaSelect from "components/ApnaSelect/ApnaSelect";
import { getCategory } from "redux/festures/categorySlice";
import { getAllProducts } from "redux/festures/productSlice";
import { formattedDateServer } from "Utils/dateFunc";
import { createCoupons } from "redux/festures/couponsSlice";
import { getAllCoupons } from "redux/festures/couponsSlice";
import { updateCoupons } from "redux/festures/couponsSlice";
import SkDatePicker from "components/SkDataPicker";
import axios from "axios";
import { getAllGlobalUsers } from "redux/festures/userSlice";
import { createAdmin } from "redux/festures/userSlice";
import { Stack } from "immutable";
import http from "Utils/api2";
import { getAllUsers } from "redux/festures/userSlice";

const Form = ({
  isOpenUpdate,
  setIsOpenUpdate,
  setIsOpen,
  data,
  id,
  setViewUserId,
  isRefresh,
  setIsRefresh,
  isReloadedData,
}) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [userData, setUserData] = useState({
    status: 0,
    selfieStatus: 0,
  });
  const [updateLoading, setUpdateLoading] = useState(false);

  // console.log(userData?.permissions);
  // const [isCouponsIcon, setIsCouponsIcon] = useState("");
  // const [isShow, setIsShow] = useState("");
  // const [isSelection, setIsSelection] = useState("category");
  // const [isCategory, setIsCategory] = useState([]);
  // const [isProducts, setIsProducts] = useState([]);
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();

  // const [isSearch, setIsSearch] = useState("");
  // const [isFilterName, setIsFilterName] = useState("search");
  // const [pagess, setPagess] = useState(1);

  // const { category } = useSelector((state) => ({
  //     ...state.isCategory,
  // }));
  // const { Loading, singleCoupons } = useSelector((data) => ({ ...data?.isCoupons }));
  // const { AllProducts } = useSelector((state) => ({ ...state.isProducts }));
  // useEffect(() => {
  //     dispatch(getAllGlobalUsers(`/getAllUser/${admin}`));
  // }, []);

  //   useEffect(() => {
  //     if (singleCoupons && isOpenUpdate) {
  //       setCouponData((prev) => ({
  //         ...prev,
  //         fullName: "",
  //         email: "",
  //         phoneNumber: "",
  //         password: "",
  //         userType: "",
  // permissions:"",
  //       }));
  //     } else {
  //       setUserData((prev) => ({
  //         ...prev,
  //         fullName: "",
  //         email: "",
  //         phoneNumber: "",
  //         password: "",
  //         userType: "",
  // permissions:"",
  //       }));
  //     }
  //   }, [singleCoupons, isOpenUpdate]);
  // const handleForm = (e) => {
  //     const { name, value } = e.target;
  //     setUserData((prev) => ({
  //         ...prev,
  //         [name]: value,
  //     }));
  // };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    http
      .put(`/updateDocumentStatus/${id}/${admin}`, { [data]: userData[data] })
      .then((data) => {
        // setIsRefresh("isRefresh");
        http
          .get(`/getBypartnerProfileId/${id}/${admin}`)
          .then((response) => {
            // console.log(response,"response")
            setUpdateLoading(false);

            setViewUserId(response?.data?.data);
            dispatch(
              handleAlert({
                isOpen: true,
                type: "success",
                msg: data?.data?.message,
              })
            );
            setIsOpen(false);
            setUserData({
              status: "",
              selfieStatus: "",
            });

            //     dispatch(getAllGlobalUsers(`/getAllpartnerProfile/${admin}/?page=${pagess}${isSearch !== "" ? `&${isFilterName}=${isSearch}` : ""
            // }`))
          })

          .catch((error) => {
            console.log(error);
            setUpdateLoading(false);
            dispatch(
              handleAlert({
                isOpen: true,
                type: "success",
                msg: error?.response?.data?.message,
              })
            );
          });

        // setIsRefresh(!isRefresh);
        isReloadedData();
        // setIsOpenUpdate(false);
        // setIsShow("");
        // setIsProducts([]);
        // setIsCategory([]);
        // dispatch(getAllGlobalUsers(`/getAllUser/${admin}`));
      })
      .catch((error) => {
        setUpdateLoading(false);
        // console.log(error)
        dispatch(
          handleAlert({
            isOpen: true,
            type: "error",
            msg: error?.response?.data?.message,
          })
        );
      });

    // if (isOpenUpdate) {
    //     dispatch(
    //         updateCoupons({
    //             url: `${process.env.REACT_APP_APII}/updateCoupon/${singleCoupons?._id}/${admin}`,
    //             data: userData,
    //         })
    //     ).then((data) => {
    //         console.log(data?.payload);
    //         dispatch(
    //             handleAlert({
    //                 isOpen: true,
    //                 type: `${data?.payload?.success ? "success" : "error"}`,
    //                 msg: data?.payload?.message,
    //             })
    //         );
    //         if (data?.payload?.success) {
    //             setIsOpen(false);
    //             // setIsOpenUpdate(false);
    //             setIsShow("");
    //             setIsProducts([]);
    //             setIsCategory([]);
    //             setUserData((prev) => ({
    //                 ...prev,
    //                 fullName: "",
    //                 email: "",
    //                 phoneNumber: "",
    //                 password: "",
    //                 userType: "",
    //                 permissions: "",
    //             }));
    //             dispatch(getAllGlobalUsers(`/getAllUser/${admin}`));
    //         } else {
    //             dispatch(
    //                 handleAlert({
    //                     isOpen: true,
    //                     type: "warning",
    //                     msg: "all fields is required !",
    //                 })
    //             );
    //         }
    //     });
    // } else {
    //     dispatch(
    //         createAdmin({
    //             url: `${process.env.REACT_APP_APII}/craeteAdminAndSubAdmin`,
    //             data: userData,
    //         })
    //     ).then((data) => {
    //         console.log(data);
    //         dispatch(
    //             handleAlert({
    //                 isOpen: true,
    //                 type: `${data?.payload?.success ? "success" : "error"}`,
    //                 msg: data?.payload?.message,
    //             })
    //         );
    //         if (data?.payload?.success) {
    //             setIsOpen(false);
    //             // setIsOpenUpdate(false);
    //             setUserData((prev) => ({
    //                 ...prev,
    //                 fullName: "",
    //                 email: "",
    //                 phoneNumber: "",
    //                 password: "",
    //                 userType: "",
    //                 permissions: "",
    //             }));
    //             dispatch(getAllGlobalUsers(`/getAllUser/${admin}`));
    //         } else {
    //             dispatch(
    //                 handleAlert({
    //                     isOpen: true,
    //                     type: "warning",
    //                     msg: "all fields is required !",
    //                 })
    //             );
    //         }
    //     });
    // }
  };
  // const handleChange = (event) => {
  //   setUserData((prev) => ({
  //     ...prev,
  //     userType: event.target.value,
  //   }));
  // };
  return (
    <>
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
            {isOpenUpdate ? `Update Coupon's ` : " Create Admin's"}
          </MDTypography>
        </Card>
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
          })}
          component="form"
          role="form"
          onSubmit={handleFormSubmit}
        >
          <MDBox
            lineHeight={1}
            gap={3}
            width={"90%"}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <MDTypography variant="h6">Status</MDTypography>
            <Select
              disabled={updateLoading}
              sx={{ height: "3rem" }}
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              placeholder="Choose Status"
              value={userData[data]}
              //   label="Age"
              onChange={(event) =>
                setUserData((prev) => ({
                  ...prev,
                  [data]: event.target.value,
                }))
              }
            >
              <MenuItem defaultChecked value={0}>
                Choose Status
              </MenuItem>
              <MenuItem defaultChecked value="APPROVED">
                APPROVED
              </MenuItem>
              <MenuItem value="REJECTED">REJECTED</MenuItem>
              {/* <MenuItem value="SUPER_ADMIN">Super Admin</MenuItem> */}
            </Select>
          </MDBox>
          {/* <MDBox
                        lineHeight={1}
                        gap={3}
                        width={"90%"}
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            flexDirection: "column",
                        }}
                    >
                        <MDTypography variant="h6">Full Name</MDTypography>
                        <MDInput
                            required={true}
                            type="text"
                            placeholder="Full Name"
                            fullWidth
                            name="fullName"
                            value={userData?.fullName}
                            onChange={handleForm}
                        />
                    </MDBox>
                    <MDBox
                        lineHeight={1}
                        gap={3}
                        width={"90%"}
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            flexDirection: "column",
                        }}
                    >
                        <MDTypography variant="h6">Email</MDTypography>
                        <MDInput
                            required={true}
                            type="email"
                            placeholder="Email"
                            fullWidth
                            name="email"
                            value={userData?.email}
                            onChange={handleForm}
                        />
                    </MDBox>
                    <MDBox
                        lineHeight={1}
                        gap={3}
                        width={"90%"}
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            flexDirection: "column",
                        }}
                    >
                        <MDTypography variant="h6">Mobile</MDTypography>
                        <MDInput
                            required={true}
                            type="number"
                            placeholder="Mobile No."
                            fullWidth
                            name="phoneNumber"
                            value={userData?.phoneNumber}
                            onChange={handleForm}
                        />
                    </MDBox>
                   
                    <MDBox
                        lineHeight={1}
                        gap={3}
                        width={"90%"}
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            flexDirection: "column",
                        }}
                    >
                        <MDTypography variant="h6">Permissions</MDTypography>
                        <Select
                            sx={{ height: "3rem" }}
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            placeholder="Permissions"
                            multiple
                            value={userData?.permissions}
                            //   label="Age"
                            disabled={userData?.userType === "ADMIN"}
                            onChange={(event) =>
                                setUserData((prev) => ({
                                    ...prev,
                                    permissions: event.target.value,
                                }))
                            }
                        // input={<OutlinedInput label="Multiple Select" />}
                        // renderValue={(selected) => (
                        //   <Stack gap={1} direction="row" flexWrap="wrap">
                        //     {selected.map((value) => (
                        //       <Chip key={value} label={value} />
                        //     ))}
                        //   </Stack>
                        // )}
                        >
                            <MenuItem disabled={userData?.permissions.some((ele) => ele === "NONE")} value="ALL">All</MenuItem>
                            <MenuItem disabled={userData?.permissions.some((ele) => ele === "ALL" || ele === "NONE")} value="ORDER">
                                Order
                            </MenuItem>
                            <MenuItem
                                disabled={userData?.permissions.some((ele) => ele === "ALL" || ele === "NONE")}
                                value="CATERGORY"
                            >
                                Category
                            </MenuItem>
                            <MenuItem
                                disabled={userData?.permissions.some((ele) => ele === "ALL" || ele === "NONE")}
                                value="PRODUCT"
                            >
                                Product
                            </MenuItem>
                            <MenuItem disabled={userData?.permissions.some((ele) => ele === "ALL" || ele === "NONE")} value="CITY">
                                City
                            </MenuItem>
                            <MenuItem
                                disabled={userData?.permissions.some((ele) => ele === "ALL" || ele === "NONE")}
                                value="COUPON"
                            >
                                Coupon
                            </MenuItem>
                            <MenuItem
                                disabled={userData?.permissions.some((ele) => ele === "ALL" || ele === "NONE")}
                                value="MEMBERSHIP"
                            >
                                Membership
                            </MenuItem>
                            <MenuItem
                                disabled={userData?.permissions.some((ele) => ele === "ALL" || ele === "NONE")}
                                value="HOME_BANNER"
                            >
                                Home Banner
                            </MenuItem>
                            <MenuItem
                                disabled={userData?.permissions.some((ele) => ele === "ALL" || ele === "NONE")}
                                value="HOME CATEGORY"
                            >
                                Home Category
                            </MenuItem>
                            <MenuItem
                                disabled={userData?.permissions.some((ele) => ele === "ALL" || ele === "NONE")}
                                value="APP_BANNER"
                            >
                                App Banner
                            </MenuItem>
                            <MenuItem disabled={userData?.permissions.some((ele) => ele === "ALL")} value="NONE">
                                None
                            </MenuItem>
                        </Select>
                    </MDBox>
                    <MDBox
                        lineHeight={1}
                        gap={3}
                        width={"90%"}
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            flexDirection: "column",
                        }}
                    >
                        <MDTypography variant="h6">Password</MDTypography>
                        <MDInput
                            required={true}
                            type="number"
                            placeholder="Password"
                            fullWidth
                            name="password"
                            value={userData?.password}
                            onChange={handleForm}
                        />
                    </MDBox>*/}
          <MDBox
            sx={{
              width: "100%",
              justifyContent: "flex-end",
              textAlign: "center",
              display: "flex",
            }}
          >
            {" "}
            <MDButton
              disabled={updateLoading || (!userData?.selfieStatus && !userData?.status)}
              color={"info"}
              verdant={"gradient"}
              type={"submit"}
            >
              Update Status
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </>
  );
};

export default Form;
Form.propTypes = {
  isOpenUpdate: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.any,
  setIsOpenUpdate: PropTypes.any,
  data: PropTypes.any,
  id: PropTypes.any,
  setViewUserId: PropTypes.any,
  isRefresh: PropTypes.any,
  setIsRefresh: PropTypes.any,
  isReloadedData: PropTypes.func,
};
