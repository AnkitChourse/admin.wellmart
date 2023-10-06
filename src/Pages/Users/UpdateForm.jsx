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
import { updateAdmin } from "redux/festures/userSlice";

const UpdateForm = ({ setUpdate, update, updateData, userType }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [userData, setUserData] = useState({
    permissions: [],
    password: ""
  });
  //   console.log(userData?.permissions);
  const [isCouponsIcon, setIsCouponsIcon] = useState("");
  const [isShow, setIsShow] = useState("");
  const [isSelection, setIsSelection] = useState("category");
  const [isCategory, setIsCategory] = useState([]);
  const [isProducts, setIsProducts] = useState([]);
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [allowPasswordUpdate, setAllowPasswordUpdate] = useState(false)
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  // console.log(updateData);
  const { Loading, singleCoupons } = useSelector((data) => ({ ...data?.isCoupons }));
  const { createUpdateLoading } = useSelector((data) => ({ ...data?.isUsers }));

  useEffect(() => {
    dispatch(getAllGlobalUsers(`/getAllUser/${admin}`));
  }, []);

  useEffect(() => {
    if (updateData && update) {
      setIsShow(updateData?.image);
      setUserData((prev) => ({
        ...prev,
        permissions: updateData?.permissions,
      }));
    } else {
      setUserData((prev) => ({
        ...prev,
        permissions: [],
      }));
    }
  }, [updateData, update]);
  const handleForm = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // console.log(userData)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append("image", isCouponsIcon);
    userData?.permissions && userData?.permissions?.length ? userData?.permissions?.map(ele => formData?.append('permissions', ele)) : null

    userData?.password ? formData?.append('password', userData?.password) : null
    // console.log(...formData)
    dispatch(
      updateAdmin({
        url: `${process.env.REACT_APP_APII}/updateUser/${updateData?._id}`,
        data: formData,
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
        setUpdate(false);
        setIsShow("");
        setIsProducts([]);
        setIsCategory([]);
        setUserData((prev) => ({
          ...prev,
          permissions: "",
        }));
        dispatch(getAllGlobalUsers(`/getAllUser/${admin}`));
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
            {userType === "CUSTOMER" ? `Update Customer` : userType === "ADMIN" ? 'Update Admin' : 'Update SubAdmin'}
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
          </MDBox> */}

          {userType === 'SUB_ADMIN' ? <MDBox
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
            >
              <MenuItem disabled={userData?.permissions.some((ele) => ele === "NONE")} value="ALL">
                All
              </MenuItem>
              <MenuItem
                disabled={userData?.permissions.some((ele) => ele === "ALL" || ele === "NONE")}
                value="ORDER"
              >
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
              <MenuItem
                disabled={userData?.permissions.some((ele) => ele === "ALL" || ele === "NONE")}
                value="CITY"
              >
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
              required={!userData?.permissions?.length && !userData?.password}
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
              setState={(selectedPermissions) => {
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  // permissions: selectedPermissions 
                  permissions: selectedPermissions && selectedPermissions?.length ? selectedPermissions[selectedPermissions?.length - 1] === "ALL" || selectedPermissions[selectedPermissions?.length - 1] === "NONE" ? selectedPermissions[selectedPermissions?.length - 1] === "ALL" ? ["ALL"] : ["NONE"] : selectedPermissions?.includes("ALL") ? [...selectedPermissions].toSpliced(selectedPermissions?.indexOf("ALL"), 1) : selectedPermissions?.includes("NONE") ? selectedPermissions.toSpliced(selectedPermissions?.indexOf("NONE"), 1) : selectedPermissions : [],
                }));
              }}
              name="Permissions"
              disabled={createUpdateLoading}
              simpleArray={true}
            />
          </MDBox> : null}
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
              InputProps={{
                endAdornment: <InputAdornment position="end">{
                  passwordVisibility ?
                    <RemoveRedEye sx={{ cursor: 'pointer' }} onClick={() => setPasswordVisibility(!passwordVisibility)} color="white" />
                    : <VisibilityOff sx={{ cursor: 'pointer' }} onClick={() => setPasswordVisibility(!passwordVisibility)} color="white" />
                }</InputAdornment>,
              }}
              required={!userData?.permissions?.length && !userData?.password}
              type={passwordVisibility ? "text" : "password"}
              placeholder="Password"
              fullWidth
              name="password"
              value={userData?.password}
              disabled={createUpdateLoading}
              onChange={handleForm}
            />
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
            <MDTypography variant="h6">Coupon Icon</MDTypography>
            <ImagePicker
              // required={true}
              name="icon"
              multiple={false}
              images={isCouponsIcon}
              setImages={setIsCouponsIcon}
              //
            />

            {isCouponsIcon === "" && isShow && (
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
          </MDBox> */}

          <MDBox
            sx={{
              width: "100%",
              justifyContent: "flex-end",
              textAlign: "center",
              display: "flex",
            }}
          >
            {" "}
            <MDButton disabled={(!userData?.permissions?.length && !userData?.password) || createUpdateLoading} color={"info"} variant={"gradient"} type={"submit"}>
              {createUpdateLoading ? <CircularProgress color="primary" size={20} /> : userType === "CUSTOMER" ? `Update Customer` : userType === "ADMIN" ? 'Update Admin' : 'Update SubAdmin'}
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
  userType: PropTypes.string
};























// import MDButton from "components/MDButton";
// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { useMaterialUIController } from "context";
// import { useDispatch, useSelector } from "react-redux";
// import ImagePicker from "components/ApnaUploader";
// import { Cancel } from "@mui/icons-material";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import SkLoading from "components/SkLoading";
// import MDInput from "components/MDInput";
// import {
//   Card,
//   Chip,
//   FormControl,
//   FormControlLabel,
//   FormGroup,
//   FormLabel,
//   MenuItem,
//   OutlinedInput,
//   Radio,
//   RadioGroup,
//   Select,
//   Switch,
// } from "@mui/material";
// import { getAllBlogs } from "redux/festures/blogSlice";
// import { updateBlog } from "redux/festures/blogSlice";
// import { createPostBlogs } from "redux/festures/blogSlice";
// import { handleAlert } from "redux/festures/alertSlice";
// import ApnaSelect from "components/ApnaSelect/ApnaSelect";
// import { getCategory } from "redux/festures/categorySlice";
// import { getAllProducts } from "redux/festures/productSlice";
// import { formattedDateServer } from "Utils/dateFunc";
// import { createCoupons } from "redux/festures/couponsSlice";
// import { getAllCoupons } from "redux/festures/couponsSlice";
// import { updateCoupons } from "redux/festures/couponsSlice";
// import SkDatePicker from "components/SkDataPicker";
// import axios from "axios";
// import { getAllGlobalUsers } from "redux/festures/userSlice";
// import { createAdmin } from "redux/festures/userSlice";
// import { Stack } from "immutable";
// import { updateAdmin } from "redux/festures/userSlice";

// const UpdateForm = ({ setUpdate, update, updateData }) => {
//   const [controller] = useMaterialUIController();
//   const { darkMode } = controller;
//   const [userData, setUserData] = useState({
//     fullName: "",
//     permissions: [""],
//   });
//   console.log(updateData, "permissions");
//   const [isCouponsIcon, setIsCouponsIcon] = useState("");
//   const [isShow, setIsShow] = useState("");
//   const [isSelection, setIsSelection] = useState("category");
//   const [isCategory, setIsCategory] = useState([]);
//   const [isProducts, setIsProducts] = useState([]);
//   const admin = localStorage.getItem("admin_id");
//   const dispatch = useDispatch();

//   const { Loading, singleCoupons } = useSelector((data) => ({ ...data?.isCoupons }));

//   useEffect(() => {
//     dispatch(getAllGlobalUsers(`/getAllUser/${admin}`));
//   }, []);

//   useEffect(() => {
//     if (updateData && update) {
//       const isArray =
//         updateData?.permissions &&
//         updateData?.permissions.length > 0 &&
//         updateData?.permissions.map((items) => items);
//       setIsShow(updateData?.image);
//       setUserData((prev) => ({
//         ...prev,
//         fullName: updateData?.fullName,
//         permissions: isArray,
//       }));
//     } else {
//       setUserData((prev) => ({
//         ...prev,
//         fullName: "",
//         permissions: [""],
//       }));
//     }
//   }, [updateData, update]);
//   const handleForm = (e) => {
//     const { name, value } = e.target;
//     setUserData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("image", isCouponsIcon);
//     userData && Object.entries(userData).map(([key, value]) => formData.append(key, value));
//     console.log(...formData);
//     dispatch(
//       updateAdmin({
//         url: `${process.env.REACT_APP_APII}/updateUser/${updateData?._id}`,
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
//           fullName: "",
//           permissions: [""],
//         }));
//         dispatch(getAllGlobalUsers(`/getAllUser/${admin}`));
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





//   const handlePermissionSelect = (selectedPermissions) => {
//     if (selectedPermissions.includes("ALL")) {
//       // If "All" is selected, set permissions to all options except "None"
//       selectedPermissions = ["ALL", "ORDER", "CATERGORY", "PRODUCT", "CITY", "COUPON", "MEMBERSHIP", "HOME_BANNER", "HOME CATEGORY", "APP_BANNER"];
//     } else if (selectedPermissions.includes("NONE")) {
//       // If "None" is selected, clear all permissions
//       selectedPermissions = [];
//     } else {
//       // If other options are selected, remove "All" and "None" if present
//       selectedPermissions = selectedPermissions.filter((perm) => perm !== "ALL" && perm !== "NONE");
//     }
//     setUserData((prev) => ({ ...prev, permissions: selectedPermissions }));
//   };




//   return Loading ? (
//     <SkLoading />
//   ) : (
//     <>
//       <MDBox
//         display="flex"
//         alignItems="center"
//         lineHeight={1}
//         sx={{
//           justifyContent: "center",
//           textAlign: "center",
//           flexDirection: "column",
//           gap: 5,
//           width: "100%",
//         }}
//       >
//         <Card
//           style={{
//             width: "100%",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             margin: "0 , 10px",
//           }}
//         >
//           <MDTypography variant="h6" py={0.9}>
//             {update ? `Update Admin's ` : " Create Admin's"}
//           </MDTypography>
//         </Card>
//         <MDBox
//           display="flex"
//           alignItems="center"
//           lineHeight={1}
//           //   sx={{
//           //
//           //   }}
//           sx={({ palette: { dark, white, info } }) => ({
//             border: 0.5,
//             borderColor: darkMode ? white.main : dark.main,
//             borderRadius: 3,
//             p: 3,
//             justifyContent: "center",
//             textAlign: "center",
//             flexDirection: "column",
//             gap: 3,
//             width: "100%",
//           })}
//           component="form"
//           role="form"
//           onSubmit={handleFormSubmit}
//         >
//           <MDBox
//             lineHeight={1}
//             gap={3}
//             width={"90%"}
//             sx={{
//               display: "flex",
//               alignItems: "flex-start",
//               flexDirection: "column",
//             }}
//           >
//             <MDTypography variant="h6">Full Name</MDTypography>
//             <MDInput
//               required={true}
//               type="text"
//               placeholder="Full Name"
//               fullWidth
//               name="fullName"
//               value={userData?.fullName}
//               onChange={handleForm}
//             />
//           </MDBox>

//           <MDBox
//             lineHeight={1}
//             gap={3}
//             width={"90%"}
//             sx={{
//               display: "flex",
//               alignItems: "flex-start",
//               flexDirection: "column",
//             }}
//           >
//             <MDTypography variant="h6">Permissions</MDTypography>
//             {/* <Select
//               sx={{ height: "3rem" }}
//               fullWidth
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               placeholder="Permissions"
//               multiple
//               value={userData?.permissions}
//               //   label="Age"
//               disabled={userData?.userType === "ADMIN"}
//               onChange={(event) =>
//                 setUserData((prev) => ({
//                   ...prev,
//                   permissions: event.target.value,
//                 }))
//               }
//             >
//               <MenuItem disabled={userData?.permissions.some((ele) => ele === "NONE")} value="ALL">
//                 All
//               </MenuItem>
//               <MenuItem
//                 disabled={userData?.permissions.some((ele) => ele === "ALL" || ele === "NONE")}
//                 value="ORDER"
//               >
//                 Order
//               </MenuItem>
//               <MenuItem
//                 disabled={userData?.permissions.some((ele) => ele === "ALL" || ele === "NONE")}
//                 value="CATERGORY"
//               >
//                 Category
//               </MenuItem>
//               <MenuItem
//                 disabled={userData?.permissions.some((ele) => ele === "ALL" || ele === "NONE")}
//                 value="PRODUCT"
//               >
//                 Product
//               </MenuItem>
//               <MenuItem
//                 disabled={userData?.permissions.some((ele) => ele === "ALL" || ele === "NONE")}
//                 value="CITY"
//               >
//                 City
//               </MenuItem>
//               <MenuItem
//                 disabled={userData?.permissions.some((ele) => ele === "ALL" || ele === "NONE")}
//                 value="COUPON"
//               >
//                 Coupon
//               </MenuItem>
//               <MenuItem
//                 disabled={userData?.permissions.some((ele) => ele === "ALL" || ele === "NONE")}
//                 value="MEMBERSHIP"
//               >
//                 Membership
//               </MenuItem>
//               <MenuItem
//                 disabled={userData?.permissions.some((ele) => ele === "ALL" || ele === "NONE")}
//                 value="HOME_BANNER"
//               >
//                 Home Banner
//               </MenuItem>
//               <MenuItem
//                 disabled={userData?.permissions.some((ele) => ele === "ALL" || ele === "NONE")}
//                 value="HOME CATEGORY"
//               >
//                 Home Category
//               </MenuItem>
//               <MenuItem
//                 disabled={userData?.permissions.some((ele) => ele === "ALL" || ele === "NONE")}
//                 value="APP_BANNER"
//               >
//                 App Banner
//               </MenuItem>
//               <MenuItem disabled={userData?.permissions.some((ele) => ele === "ALL")} value="NONE">
//                 None
//               </MenuItem>
//             </Select> */}

//             <ApnaSelect
//               multiple
//               // required={true}
//               data={[
//                 { name: "ALL", _id: "ALL" },
//                 { name: "ORDER", _id: "ORDER" },
//                 { name: "CATERGORY", _id: "CATERGORY" },
//                 { name: "PRODUCT", _id: "PRODUCT" },
//                 { name: "CITY", _id: "CITY" },
//                 { name: "COUPON", _id: "COUPON" },
//                 { name: "MEMBERSHIP", _id: "MEMBERSHIP" },
//                 { name: "HOME_BANNER", _id: "HOME_BANNER" },
//                 { name: "HOME CATEGORY", _id: "HOME CATEGORY" },
//                 { name: "APP_BANNER", _id: "APP_BANNER" },
//                 { name: "NONE", _id: "NONE" },
//               ]}
//               state={userData?.permissions}
//               label="Permissions"
//               // setState={(selectedPermissions) => {
//               //   setUserData((prev) => ({ ...prev, permissions: selectedPermissions }));
//               // }}
//               setState={handlePermissionSelect}
//               name="Permissions"
//               simpleArray={true}
//             />
//             {console.log(userData?.permissions)}
//           </MDBox>
//           <MDBox
//             lineHeight={1}
//             gap={3}
//             width={"90%"}
//             sx={{
//               display: "flex",
//               alignItems: "flex-start",
//               flexDirection: "column",
//             }}
//           >
//             <MDTypography variant="h6">Coupon Icon</MDTypography>
//             <ImagePicker
//               // required={true}
//               name="icon"
//               multiple={false}
//               images={isCouponsIcon}
//               setImages={setIsCouponsIcon}
//               //
//             />

//             {isCouponsIcon === "" && isShow && (
//               <div style={{ display: "flex", alignItems: "flex-start" }}>
//                 <span
//                   style={{
//                     display: "inline-block",
//                     width: "50px",
//                     height: "50px",
//                     margin: "0 0.5rem",
//                   }}
//                 >
//                   <img
//                     className="Image"
//                     style={{ width: "100%", height: "100%" }}
//                     src={`${process.env.REACT_APP_URI}/${isShow}`}
//                   />
//                 </span>
//                 <span
//                   className="cross"
//                   style={{
//                     cursor: "pointer",
//                   }}
//                   onClick={() => {
//                     setIsShow(null);
//                   }}
//                 >
//                   <Cancel
//                     sx={({ palette: { dark, white, info } }) => ({
//                       color: darkMode ? white?.main : dark.main,
//                     })}
//                   />
//                 </span>
//               </div>
//             )}
//           </MDBox>

//           <MDBox
//             sx={{
//               width: "100%",
//               justifyContent: "flex-end",
//               textAlign: "center",
//               display: "flex",
//             }}
//           >
//             {" "}
//             <MDButton color={"info"} verdant={"gradient"} type={"submit"}>
//               {update ? `Update Admin` : ` Create Admin`}
//             </MDButton>
//           </MDBox>
//         </MDBox>
//       </MDBox>
//     </>
//   );
// };

// export default UpdateForm;
// UpdateForm.propTypes = {
//   setUpdate: PropTypes.bool.isRequired,
//   update: PropTypes.any,
//   updateData: PropTypes.any,
// };
