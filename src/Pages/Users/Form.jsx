import MDButton from "components/MDButton";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useMaterialUIController } from "context";
import { useDispatch, useSelector } from "react-redux";
import ImagePicker from "components/ApnaUploader";
import { Cancel, RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SkLoading from "components/SkLoading";
import MDInput from "components/MDInput";
import AstrieskIcon from 'components/AstrieskIcon'
import {
  Card,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputAdornment,
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
// import ApnaSelect from "components/ApnaSelect/ApnaSelect";
// import ApnaSelect2 from "components/ApnaSelect";
import { getCategory } from "redux/festures/categorySlice";
import { getAllProducts } from "redux/festures/productSlice";
import { formattedDateServer } from "Utils/dateFunc";
import { createCoupons } from "redux/festures/couponsSlice";
import { getAllCoupons } from "redux/festures/couponsSlice";
import { updateCoupons } from "redux/festures/couponsSlice";
import SkDatePicker from "components/SkDataPicker";
import axios from "axios";
// import { getAllGlobalUsers } from "redux/festures/userSlice";
import { createAdmin } from "redux/festures/userSlice";
import { Stack } from "immutable";

const Form = ({ isOpenUpdate, setIsOpenUpdate, setIsOpen, userType }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    // userType: [],
    // permissions: [],
  });
  // console.log(userData?.permissions);
  const [isCouponsIcon, setIsCouponsIcon] = useState("");
  const [isShow, setIsShow] = useState("");
  const [isSelection, setIsSelection] = useState("category");
  const [isCategory, setIsCategory] = useState([]);
  const [isProducts, setIsProducts] = useState([]);
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const { category } = useSelector((state) => ({
    ...state.isCategory,
  }));
  const { Loading, singleCoupons } = useSelector((data) => ({ ...data?.isCoupons }));
  const { createUpdateLoading } = useSelector((data) => ({ ...data?.isUsers }));
  const { AllProducts } = useSelector((state) => ({ ...state.isProducts }));
  // useEffect(() => {
  //   dispatch(getAllGlobalUsers(`/getAllUser/${admin}`));
  // }, []);

  // const allPermissions = [
  //   {
  //     _id:"ALL"
  //     name: "ALL"
  //   }
  // ]
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
  const handleForm = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isOpenUpdate) {
      dispatch(
        updateCoupons({
          url: `${process.env.REACT_APP_APII}/updateCoupon/${singleCoupons?._id}/${admin}`,
          data: userData,
        })
      ).then((data) => {
        // console.log(data?.payload);
        dispatch(
          handleAlert({
            isOpen: true,
            type: `${data?.payload?.success ? "success" : "error"}`,
            msg: data?.payload?.message,
          })
        );
        if (data?.payload?.success) {
          setIsOpen(false);
          // setIsOpenUpdate(false);
          setIsShow("");
          setIsProducts([]);
          setIsCategory([]);
          setUserData((prev) => ({
            ...prev,
            fullName: "",
            email: "",
            phoneNumber: "",
            password: "",
            userType: "",
            permissions: "",
          }));
          // dispatch(getAllGlobalUsers(`/getAllUser/${admin}`));
        } else {
          dispatch(
            handleAlert({
              isOpen: true,
              type: "warning",
              msg: "all fields is required !",
            })
          );
        }
      });
    } else {
      dispatch(
        createAdmin({
          url: `${process.env.REACT_APP_API}/createSubadmin/${admin}`,
          data: {
            ...userData,
            userType
          },
        })
      ).then((data) => {
        // console.log(data);
        dispatch(
          handleAlert({
            isOpen: true,
            type: `${data?.payload?.success ? "success" : "error"}`,
            msg: data?.payload?.message,
          })
        );
        if (data?.payload?.success) {
          setIsOpen(false);
          // setIsOpenUpdate(false);
          setUserData((prev) => ({
            ...prev,
            fullName: "",
            email: "",
            phoneNumber: "",
            password: "",
            userType: "",
            permissions: "",
          }));
          // dispatch(getAllGlobalUsers(`/getAllUser/${admin}`));
        } else {
          dispatch(
            handleAlert({
              isOpen: true,
              type: "warning",
              msg: "all fields is required !",
            })
          );
        }
      });
    }
  };
  // const handleChange = (event) => {
  //   setUserData((prev) => ({
  //     ...prev,
  //     userType: event.target.value,
  //   }));
  // };
  return Loading ? (
    <SkLoading />
  ) : (
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
            <MDTypography variant="h6">Full Name <AstrieskIcon/></MDTypography>
            <MDInput
              required={true}
              type="text"
              placeholder="Full Name"
              fullWidth
              name="fullName"
              disabled={createUpdateLoading}
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
            <MDTypography variant="h6">Email <AstrieskIcon/></MDTypography>
            <MDInput
              required={true}
              type="email"
              placeholder="Email"
              fullWidth
              name="email"
             
              disabled={createUpdateLoading}
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
            <MDTypography variant="h6">Mobile <AstrieskIcon/></MDTypography>
            <MDInput
              required={true}
              type="text"
              maxLength="10"
              minLength="10"
              onInput={(e) => {
                e.target.value = e.target.value
                  .replace(/[^0-9]/g, "")
                  .slice(0, 10);
              }}
              placeholder="Mobile No."
              fullWidth
              name="phoneNumber"
              disabled={createUpdateLoading}
              value={userData?.phoneNumber}
              onChange={handleForm}
            />
          </MDBox>
          {isOpenUpdate ? (
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
              <MDTypography variant="h6">User Type</MDTypography>
              {/* <ApnaSelect
                data={[
                  { name: "ADMIN", _id: "ADMIN" },
                  { name: "SUB ADMIN", _id: "SUB_ADMIN" },
                  // { name: "SUPER ADMIN", _id: "SUPER_ADMIN" },
                ]}
                value={userData?.userType?.at(0) || ""}
                origin="User Type"
                label="userType"
                setState={(selectedPermissions) =>
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    userType: selectedPermissions,
                  }))
                }
                name="userType"
                simpleArray={true}
              /> */}
            </MDBox>
          ) : null}
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
            {/* <MDTypography variant="h6">Permissions <AstrieskIcon/></MDTypography> */}
            {/* <Select
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
              <MenuItem disabled={userData?.permissions.some((ele) => ele === "ALL" ||  ele === "NONE")} value="ORDER">
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
            </Select> */}

            {/* <ApnaSelect
              multiple
              // required={true}
              data={[
                { name: "ALL", _id: "ALL" },
                { name: "USERS", _id: "USERS" },
                { name: "ORDER", _id: "ORDER" },
                { name: "CATERGORY", _id: "CATERGORY" },
                { name: "PRODUCT", _id: "PRODUCT" },
                { name: "TAX", _id: "TAX" },
                { name: "BRAND", _id: "BRAND" },
                { name: "CITY", _id: "CITY" },
                { name: "COUPON", _id: "COUPON" },
                { name: "MEMBERSHIP", _id: "MEMBERSHIP" },
                { name: "HOME BANNER", _id: "HOME_BANNER" },
                { name: "HOME CATEGORY", _id: "HOME_CATEGORY" },
                { name: "HOME PRODUCT", _id: "HOME_PRODUCT" },
                { name: "APP BANNER", _id: "APP_BANNER" },
                { name: "COMPANY", _id: "COMMPANY" },
                { name: "NONE", _id: "NONE" },
              ]}
              state={userData?.permissions}
              label="Permissions"
              disabled={createUpdateLoading}
              setState={(selectedPermissions) => {
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  permissions: selectedPermissions && selectedPermissions?.length ? selectedPermissions[selectedPermissions?.length - 1] === "ALL" || selectedPermissions[selectedPermissions?.length - 1] === "NONE" ? selectedPermissions[selectedPermissions?.length - 1] === "ALL" ? ["ALL"] : ["NONE"] : selectedPermissions?.includes("ALL") ? [...selectedPermissions].toSpliced(selectedPermissions?.indexOf("ALL"), 1) : selectedPermissions?.includes("NONE") ? selectedPermissions.toSpliced(selectedPermissions?.indexOf("NONE"), 1) : selectedPermissions : [],
                }));
              }}
              name="Permissions"
              simpleArray={true}
            /> */}
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
            <MDTypography variant="h6">Password <AstrieskIcon/></MDTypography>
            <MDInput
              InputProps={{
                endAdornment: <InputAdornment position="end">{
                  passwordVisibility ?
                    <RemoveRedEye sx={{ cursor: 'pointer' }} onClick={() => setPasswordVisibility(!passwordVisibility)} color="white" />
                    : <VisibilityOff sx={{ cursor: 'pointer' }} onClick={() => setPasswordVisibility(!passwordVisibility)} color="white" />
                }</InputAdornment>,
              }}
              required={true}
              type={passwordVisibility ? "text" : "password"}
              placeholder="Password"
              fullWidth
              disabled={createUpdateLoading}
              name="password"
              value={userData?.password}
              onChange={handleForm}
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
            <MDButton disabled={createUpdateLoading}
              color={"info"} verdant={"gradient"} type={"submit"}>
              {createUpdateLoading ? <CircularProgress size={20} color="primary" /> : userType === "ADMIN" ? isOpenUpdate ? `Update Admin` : ` Create Admin` : isOpenUpdate ? `Update Sub Admin` : ` Create Sub Admin`}
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
  userType: PropTypes.any,
};
