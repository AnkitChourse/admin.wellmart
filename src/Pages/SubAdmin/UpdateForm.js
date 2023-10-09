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
import AstrieskIcon from "components/AstrieskIcon";
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
import ApnaSelect from "components/ApnaSelect/ApnaSelect";
import SimpleSelect from "components/ApnaSelect/SimpleSelect";
import { getCategory } from "redux/festures/categorySlice";
import { getAllProducts } from "redux/festures/productSlice";
import { formattedDateServer } from "Utils/dateFunc";
import { createCoupons } from "redux/festures/couponsSlice";
import { getAllCoupons } from "redux/festures/couponsSlice";
import { updateCoupons } from "redux/festures/couponsSlice";
import SkDatePicker from "components/SkDataPicker";
import axios from "axios";
// import { getAllGlobalUsers } from "redux/festures/userSlice";

import { updateAdmin } from "redux/festures/userSlice";
import { getAllUsers } from "redux/festures/userSlice";

const UpdateForm = ({ setUpdate, update, updateData, userType }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [userData, setUserData] = useState({
    permissions: {
      customer: [],
      subAdmin: [],
    },
    password: "",
  });
  //   console.log(userData?.permissions);
  const [isCouponsIcon, setIsCouponsIcon] = useState("");
  const [isShow, setIsShow] = useState("");
  const [isSelection, setIsSelection] = useState("category");
  const [isCategory, setIsCategory] = useState([]);
  const [isProducts, setIsProducts] = useState([]);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [allowPasswordUpdate, setAllowPasswordUpdate] = useState(false);
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  console.log(updateData);
  const { Loading, singleCoupons } = useSelector((data) => ({ ...data?.isCoupons }));
  const { createUpdateLoading } = useSelector((data) => ({ ...data?.isUsers }));

  useEffect(() => {
    dispatch(getAllUsers(`/getAllSubadmin/${admin}`));
  }, []);

  useEffect(() => {
    if (updateData && update) {
      setUserData((prev) => ({
        ...prev,
        permissions: updateData?.permissions || { customer: [], subAdmin: [] },
      }));
    } else {
      setUserData((prev) => ({
        ...prev,
        password: "",
        permissions: { customer: [], subAdmin: [] },
      }));
    }
  }, [updateData, update]);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // console.log(userData)
//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     // formData.append("image", isCouponsIcon);
//     userData?.permissions && userData?.permissions?.length
//       ? userData?.permissions?.map((ele) => formData?.append("permissions", ele))
//       : null;

//     userData?.password ? formData?.append("password", userData?.password) : null;
//     // console.log(...formData)
//     dispatch(
//       updateAdmin({
//         url: `${process.env.REACT_APP_API}/updateSubAdmin/${updateData?._id}/${admin}`,
//         data: formData,
//       })
//     ).then((data) => {
//       dispatch(
//         handleAlert({
//           isOpen: true,
//           type: `${data?.payload?.success ? "success" : "error"}`,
//           msg: data?.payload?.message,
//         })
//       );
//       if (data?.payload?.success) {
//         setUpdate(false);
//         setIsShow("");
//         setIsProducts([]);
//         setIsCategory([]);
//         setUserData((prev) => ({
//           ...prev,
//           password:"",
//           permissions: {
//             customer: [],
//             subAdmin: [],
//           },
//         }));
//         dispatch(getAllUsers(`/getAllSubadmin/${admin}`));
//       } else {
//         dispatch(
//           handleAlert({
//             isOpen: true,
//             type: "warning",
//             msg: "all fields is required !",
//           })
//         );
//       }
//     });
//   };




const handleFormSubmit = (e) => {
    e.preventDefault();
    // const formData = new FormData();

    // userData?.permissions?.customer?.forEach((ele) =>
    //   formData?.append("permissions", ele)
    // );

    // userData?.password && formData?.append("password", userData?.password);

    dispatch(
      updateAdmin({
        url: `${process.env.REACT_APP_API}/updateSubAdmin/${updateData?._id}/${admin}`,
        data: {
            ...userData,
          },
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
        setUpdate(false);
        setUserData({
          password: "",
          permissions: { customer: [], subAdmin: [] },
        });
        dispatch(getAllUsers(`/getAllSubadmin/${admin}`));
      }
    });
  };

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
            {"Update SubAdmin"}
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
            <MDTypography variant="h6">
              Permissions(customer) <AstrieskIcon />
            </MDTypography>

            <ApnaSelect
              multiple
              // required={true}
              data={[
                { name: "DISABLE", _id: "DISABLE" },
                { name: "UPDATE", _id: "UPDATE" },
                { name: "VIEWS", _id: "VIEWS" },
                { name: "NONE", _id: "NONE" },
              ]}
              state={userData?.permissions?.customer}
              label="Permissions"
              disabled={createUpdateLoading}
              setState={(selectedPermissions) => {
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  permissions: {
                    ...prevUserData.permissions,
                    customer: selectedPermissions,
                  },
                }));
              }}
              name="customer"
              simpleArray={true}

              //   state={userData?.permissions}
              //   label="Permissions"
              //   disabled={createUpdateLoading}
              //   setState={(selectedPermissions) => {
              //     setUserData((prevUserData) => ({
              //       ...prevUserData,
              //       permissions:
              //         selectedPermissions && selectedPermissions?.length
              //           ? selectedPermissions[selectedPermissions?.length - 1] === "ALL" ||
              //             selectedPermissions[selectedPermissions?.length - 1] === "NONE"
              //             ? selectedPermissions[selectedPermissions?.length - 1] === "ALL"
              //               ? ["ALL"]
              //               : ["NONE"]
              //             : selectedPermissions?.includes("ALL")
              //             ? [...selectedPermissions].toSpliced(selectedPermissions?.indexOf("ALL"), 1)
              //             : selectedPermissions?.includes("NONE")
              //             ? selectedPermissions.toSpliced(selectedPermissions?.indexOf("NONE"), 1)
              //             : selectedPermissions
              //           : [],
              //     }));
              //   }}
              //   name="Permissions"
              //   simpleArray={true}
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
            <MDTypography variant="h6">
              Permissions(subAdmin) <AstrieskIcon />
            </MDTypography>
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

            <ApnaSelect
              multiple
              // required={true}
              data={[
                { name: "CREATE", _id: "CREATE" },
                { name: "DISABLE", _id: "DISABLE" },
                { name: "UPDATE", _id: "UPDATE" },
                { name: "VIEWS", _id: "VIEWS" },
                { name: "NONE", _id: "NONE" },
              ]}
              state={userData?.permissions?.subAdmin}
              label="Permissions"
              disabled={createUpdateLoading}
              setState={(selectedPermissions) => {
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  permissions: {
                    ...prevUserData.permissions,
                    subAdmin: selectedPermissions,
                  },
                }));
              }}
              name="subAdmin"
              simpleArray={true}

              //   state={userData?.permissions}
              //   label="Permissions"
              //   disabled={createUpdateLoading}
              //   setState={(selectedPermissions) => {
              //     setUserData((prevUserData) => ({
              //       ...prevUserData,
              //       permissions:
              //         selectedPermissions && selectedPermissions?.length
              //           ? selectedPermissions[selectedPermissions?.length - 1] === "ALL" ||
              //             selectedPermissions[selectedPermissions?.length - 1] === "NONE"
              //             ? selectedPermissions[selectedPermissions?.length - 1] === "ALL"
              //               ? ["ALL"]
              //               : ["NONE"]
              //             : selectedPermissions?.includes("ALL")
              //             ? [...selectedPermissions].toSpliced(selectedPermissions?.indexOf("ALL"), 1)
              //             : selectedPermissions?.includes("NONE")
              //             ? selectedPermissions.toSpliced(selectedPermissions?.indexOf("NONE"), 1)
              //             : selectedPermissions
              //           : [],
              //     }));
              //   }}
              //   name="Permissions"
              //   simpleArray={true}
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
         <MDTypography variant="h6">
              Password <AstrieskIcon />
            </MDTypography>
            <MDInput
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {passwordVisibility ? (
                      <RemoveRedEye
                        sx={{ cursor: "pointer" }}
                        onClick={() => setPasswordVisibility(!passwordVisibility)}
                        color="white"
                      />
                    ) : (
                      <VisibilityOff
                        sx={{ cursor: "pointer" }}
                        onClick={() => setPasswordVisibility(!passwordVisibility)}
                        color="white"
                      />
                    )}
                  </InputAdornment>
                ),
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
            <MDButton
              disabled={
                (!userData?.permissions?.length && !userData?.password) || createUpdateLoading
              }
              color={"info"}
              variant={"gradient"}
              type={"submit"}
            >
              {createUpdateLoading ? (
                <CircularProgress color="primary" size={20} />
              ) : (
                "Update SubAdmin"
              )}
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </>
  );
};

export default UpdateForm;
UpdateForm.propTypes = {
  setUpdate: PropTypes.bool.isRequired,
  update: PropTypes.any,
  updateData: PropTypes.any,
  userType: PropTypes.string,
};
