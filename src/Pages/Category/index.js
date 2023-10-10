import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardMedia,
  FormControlLabel,
  FormGroup,
  Grid,
  Icon,
  Switch,
  Tab,
  Typography,
  IconButton,
  Avatar,
  Stack,
  Button,
  OutlinedInput,
  ListItemText,
  MenuItem,
  Checkbox,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { useMaterialUIController } from "context";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import Header from "layouts/profile/components/Header";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "redux/festures/categorySlice";
import MDAvatar from "components/MDAvatar";
import { getSubCategory } from "redux/festures/categorySlice";
import SkLoading from "components/SkLoading";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Cancel,
  Close,
  Delete,
  Edit,
  ExpandMore,
  Input,
  PhotoCamera,
  Visibility,
  WifiTetheringTwoTone,
} from "@mui/icons-material";
import SkModal from "components/SkModal";
import MDInput from "components/MDInput";
import { creatCategoryData } from "redux/festures/categorySlice";
import { deleteCategory } from "redux/festures/categorySlice";
import { handleAlert } from "redux/festures/alertSlice";
import { updateCategory } from "redux/festures/categorySlice";
import ImagePicker from "components/ApnaUploader";
import { getGlobalCategory } from "redux/festures/categorySlice";
import { getSubGlobalCategory } from "redux/festures/categorySlice";
import SkConfirm from "components/SkComfirm";
import ApnaSelect from "components/ApnaSelect/ApnaSelect";
import { getAllCity } from "redux/festures/citySlice";
import { useLocation } from "react-router-dom";
import ApnaSelect2 from "components/ApnaSelect";
import { unlinkImage } from "redux/festures/categorySlice";
import AstrieskIcon from "components/AstrieskIcon";
import MDBadge from "components/MDBadge";

const disableFilter = [
  {
    _id: "",
    name: "All",
  },
  {
    _id: true,
    name: "Disable",
  },
  {
    _id: false,
    name: "Enable",
  },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const Category = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const admin = localStorage.getItem("admin_id");
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { Loading, category, subCategory, IsLoading, subCategoryData, createUpdateLoading } =
    useSelector((state) => ({
      ...state.isCategory,
    }));
  const { city } = useSelector((data) => ({ ...data?.isCity }));
  const [ecom, setEcom] = useState(false);

  // console.log(category, "category");

  const [rowsData, setRowsData] = useState([]);
  const [rowssubData, setRowssubData] = useState([]);
  const [isId, setIsId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenUpdate2, setIsOpenUpdate2] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [isSwitch, setIsSwitch] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState({ open: false, isId: null });
  const [filter, setFilter] = useState(0);
  // console.log(viewData);
  // console.log(filter, "filter");
  // useEffect(() => {
  //   dispatch(
  //     getGlobalCategory(
  //       ecom
  //         ? `/eCommerce/getAllNullPcategory/${admin}?disable=${
  //             filter === false ? false : filter || ""
  //           }`
  //         : `/getAllNullPcategory/${admin}?disable=${filter === false ? false : filter || ""}`
  //     )
  //   );
  // }, [filter]);

  // useEffect(() => {
  //   if (pathname === "/category/ecom-category") {
  //     setEcom(true);
  //   } else setEcom(false);
  // }, [pathname]);

  useEffect(() => {
    if (!isOpenView) {
      setViewData(false);
    }
  }, [isOpenView]);

  // useEffect(() => {
  //   dispatch(
  //     getCategory(
  //       ecom ? `/eCommerce/getAllNullPcategory/${admin}` : `/getAllNullPcategory/${admin}`
  //     )
  //   );
  //   dispatch(getAllCity(`/getAllCityByAdmin/${admin}`));
  //   // dispatch(getCategory(`/`));
  // }, [ecom]);

  // useEffect(() => {
  //   if (isId) {
  //     dispatch(
  //       getSubGlobalCategory(
  //         ecom
  //           ? `/eCommerce/getCategoryWithPcategory/${isId}/${admin}`
  //           : `/getCategoryWithPcategory/${isId}/${admin}`
  //       )
  //     ).then((data) => {

  //       if (data.payload.success) {
  //         const temprows =
  //           data.payload?.data &&
  //           data.payload?.data?.at(0) &&
  //           data.payload?.data?.map((value, index) => ({
  //             no: (
  //               <MDTypography sx={{ fontSize: 12, fontWeight: "medium" }} variant="text">
  //                 {index + 1}
  //               </MDTypography>
  //             ),
  //             name: (
  //               <MDTypography
  //                 display="block"
  //                 variant="button"
  //                 fontWeight="medium"
  //                 ml={1}
  //                 lineHeight={1}
  //                 // wordBreak=" break-all"
  //                 style={{
  //                   maxWidth: "250px",
  //                   lineHeight: "20px",
  //                   display: "-webkit-box",
  //                   WebkitBoxOrient: "vertical",
  //                   WebkitLineClamp: 2,
  //                   overflow: "hidden",
  //                   textOverflow: "ellipsis",
  //                 }}
  //               >
  //                 {value?.name}
  //               </MDTypography>
  //             ),
  //             image: (
  //               <MDBox sx={{ height: 40, width: 40 }}>
  //                 <img
  //                   src={`${process.env.REACT_APP_URI}/${value?.icon}`}
  //                   alt={"img"}
  //                   onError={(e) => {
  //                     (e.onError = null),
  //                       (e.target.src = require("../../assets/images/bg-profile.jpeg"));
  //                   }}
  //                   style={{ width: "100%", height: "100%", borderRadius: "50%" }}
  //                 />
  //               </MDBox>
  //             ),
  //             view: (
  //               <IconButton
  //                 aria-label="action_edit"
  //                 onClick={() => {
  //                   setViewData(value);
  //                   setIsOpenView(true);
  //                 }}
  //               >
  //                 <Visibility
  //                   sx={({ palette: { dark, white, info } }) => ({
  //                     color: darkMode ? info.main : dark.main,
  //                   })}
  //                 />
  //               </IconButton>
  //             ),

  //             // disable: (
  //             //   <Switch
  //             //     value={value?.disable}
  //             //     checked={value?.disable}
  //             //     color={"info"}
  //             //     onChange={(e) => handleChangeSwitch(value?._id)}
  //             //     // onChange={() => log("showInHome")console.}
  //             //     inputProps={{ "aria-label": "controlled" }}
  //             //   />
  //             // ),

  //             delete: (
  //               <Tooltip title={value?.disable ? "move to Active" : "delete"}>
  //                 <IconButton
  //                   aria-label="action_edit"
  //                   // disabled={value?.disable}
  //                   onClick={() => {
  //                     handleBinSwitch(value?._id);
  //                   }}
  //                 >
  //                   {value?.disable ? (
  //                     <Input
  //                       sx={({ palette: { dark, white, info } }) => ({
  //                         color: darkMode ? info.main : dark.main,
  //                       })}
  //                     />
  //                   ) : (
  //                     <Delete
  //                       sx={({ palette: { dark, white, info } }) => ({
  //                         color: darkMode ? info.main : dark.main,
  //                       })}
  //                     />
  //                   )}
  //                 </IconButton>
  //               </Tooltip>
  //             ),
  //             action: (
  //               <MDBox
  //                 sx={{
  //                   display: "flex",
  //                   justifyContent: "center",
  //                   flexDirection: { sx: "column", xs: "column", md: "row", xl: "row" },
  //                   alignItems: "center",
  //                   gap: 2,
  //                 }}
  //               >
  //                 <IconButton
  //                   aria-label="action-edit"
  //                   onClick={() => handleUpdateSubCategory(value)}
  //                 >
  //                   <Edit
  //                     sx={({ palette: { dark, white, info } }) => ({
  //                       color: darkMode ? white.main : info.main,
  //                     })}
  //                   />
  //                 </IconButton>
  //                 {/* <IconButton
  //                 aria-label="action-delete"
  //                 onClick={() => {
  //                   setIsOpenDialog((Preview) => ({
  //                     ...Preview,
  //                     open: true,
  //                     isId: value?._id,
  //                   }));
  //                   // dispatch(
  //                   //   deleteCategory({
  //                   //     url: `${process.env.REACT_APP_API}/deleteCategory/${value?._id}/${admin}`,
  //                   //   })
  //                   // ).then((data) => {
  //                   //   // console.log(data, "data");
  //                   //   if (data.payload.success) {
  //                   //     dispatch(
  //                   //       handleAlert({
  //                   //         isOpen: true,
  //                   //         type: `${data.payload.success ? "success" : "error"}`,
  //                   //         msg: data.payload.message,
  //                   //       })
  //                   //     );
  //                   //     // dispatch(getSubGlobalCategory(`/ByPCategoryId/${value?._id}`));
  //                   //     setIsId(value?._id);
  //                 }}
  //               >
  //                 <Delete
  //                   sx={({ palette: { dark, white, info } }) => ({
  //                     color: darkMode ? white.main : info.main,
  //                   })}
  //                 />
  //               </IconButton> */}
  //               </MDBox>
  //             ),
  //           }));
  //         setRowsData(temprows);
  //       } else {
  //         setRowsData([]);
  //       }
  //     });
  //   }
  // }, [isId, category]);

  useEffect(() => {
    dispatch(getCategory(`${process.env.REACT_APP_API}/WithPcategory/${admin}`));
  }, []);


  console.log(category,"category")

  useEffect(() => {
    if (category && category?.length > 0) {
      const temprows =
        category &&
        category?.at(0)?.subCategory &&
        category?.at(0)?.subCategory?.map((value, index) => ({
        
          no: (
            <MDTypography sx={{ fontSize: 12, fontWeight: "medium" }} variant="text">
              {index + 1}
            </MDTypography>
          ),
          name: (
            <MDTypography
              display="block"
              variant="button"
              fontWeight="medium"
              ml={1}
              lineHeight={1}
              // wordBreak=" break-all"
              style={{
                maxWidth: "250px",
                lineHeight: "20px",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {value?.name}
              {console.log(value?.name,"value?.name")}
            </MDTypography>
          ),
          image: (
            <MDBox sx={{ height: 40, width: 40 }}>
              <img
                src={`${process.env.REACT_APP_URI}/${value?.icon}`}
                alt={"img"}
                onError={(e) => {
                  (e.onError = null),
                    (e.target.src = require("../../assets/images/bg-profile.jpeg"));
                }}
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              />
            </MDBox>
          ),
          view: (
            <IconButton
              aria-label="action_edit"
              onClick={() => {
                setViewData(value);
                setIsOpenView(true);
              }}
            >
              <Visibility
                sx={({ palette: { dark, white, info } }) => ({
                  color: darkMode ? info.main : dark.main,
                })}
              />
            </IconButton>
          ),

          // disable: (
          //   <Switch
          //     value={value?.disable}
          //     checked={value?.disable}
          //     color={"info"}
          //     onChange={(e) => handleChangeSwitch(value?._id)}
          //     // onChange={() => log("showInHome")console.}
          //     inputProps={{ "aria-label": "controlled" }}
          //   />
          // ),

          delete: (
            <Tooltip title={value?.disable ? "move to Active" : "delete"}>
              <IconButton
                aria-label="action_edit"
                // disabled={value?.disable}
                onClick={() => {
                  handleBinSwitch(value?._id);
                }}
              >
                {value?.disable ? (
                  <Input
                    sx={({ palette: { dark, white, info } }) => ({
                      color: darkMode ? info.main : dark.main,
                    })}
                  />
                ) : (
                  <Delete
                    sx={({ palette: { dark, white, info } }) => ({
                      color: darkMode ? info.main : dark.main,
                    })}
                  />
                )}
              </IconButton>
            </Tooltip>
          ),
          action: (
            <MDBox
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: { sx: "column", xs: "column", md: "row", xl: "row" },
                alignItems: "center",
                gap: 2,
              }}
            >
              <IconButton aria-label="action-edit" onClick={() => handleUpdateSubCategory(value)}>
                <Edit
                  sx={({ palette: { dark, white, info } }) => ({
                    color: darkMode ? white.main : info.main,
                  })}
                />
              </IconButton>
              {/* <IconButton
              aria-label="action-delete"
              onClick={() => {
                setIsOpenDialog((Preview) => ({
                  ...Preview,
                  open: true,
                  isId: value?._id,
                }));
                // dispatch(
                //   deleteCategory({
                //     url: `${process.env.REACT_APP_API}/deleteCategory/${value?._id}/${admin}`,
                //   })
                // ).then((data) => {
                //   // console.log(data, "data");
                //   if (data.payload.success) {
                //     dispatch(
                //       handleAlert({
                //         isOpen: true,
                //         type: `${data.payload.success ? "success" : "error"}`,
                //         msg: data.payload.message,
                //       })
                //     );
                //     // dispatch(getSubGlobalCategory(`/getAllCategoryByPCategoryId/${value?._id}`));
                //     setIsId(value?._id);
              }}
            >
              <Delete
                sx={({ palette: { dark, white, info } }) => ({
                  color: darkMode ? white.main : info.main,
                })}
              />
            </IconButton> */}
            </MDBox>
          ),
        }));
      setRowsData(temprows);
    } else {
      setRowsData([]);
    }
  }, [category]);

  console.log(category?.at(0)?.subCategory,"category?.subCategory")

  useEffect(() => {
    if (category && category?.length > 0) {
      const temprows =
      category?.at(0)?.subCategory &&
      category?.at(0)?.subCategory &&
      category?.at(0)?.subCategory.map((value, index) => ({
          no: (
            <MDTypography sx={{ fontSize: 12, fontWeight: "medium" }} variant="text">
              {index + 1}
            </MDTypography>
          ),
          name: (
            <MDTypography
              display="block"
              variant="button"
              fontWeight="medium"
              ml={1}
              lineHeight={1}
              // wordBreak=" break-all"
              style={{
                maxWidth: "250px",
                lineHeight: "20px",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {value?.name}
            </MDTypography>
          ),
          image: (
            <MDBox sx={{ height: 40, width: 40 }}>
              <img
                src={`${process.env.REACT_APP_URI}/${value?.icon}`}
                alt={"img"}
                onError={(e) => {
                  (e.onError = null),
                    (e.target.src = require("../../assets/images/bg-profile.jpeg"));
                }}
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              />
            </MDBox>
          ),
          view: (
            <IconButton
              aria-label="action_edit"
              onClick={() => {
                setViewData(value);
                setIsOpenView(true);
              }}
            >
              <Visibility
                sx={({ palette: { dark, white, info } }) => ({
                  color: darkMode ? info.main : dark.main,
                })}
              />
            </IconButton>
          ),

          // disable: (
          //   <Switch
          //     value={value?.disable}
          //     checked={value?.disable}
          //     color={"info"}
          //     onChange={(e) => handleChangeSwitch(value?._id)}
          //     // onChange={() => log("showInHome")console.}
          //     inputProps={{ "aria-label": "controlled" }}
          //   />
          // ),

          delete: (
            <Tooltip title={value?.disable ? "move to Active" : "delete"}>
              <IconButton
                aria-label="action_edit"
                // disabled={value?.disable}
                onClick={() => {
                  handleBinSwitch(value?._id);
                }}
              >
                {value?.disable ? (
                  <Input
                    sx={({ palette: { dark, white, info } }) => ({
                      color: darkMode ? info.main : dark.main,
                    })}
                  />
                ) : (
                  <Delete
                    sx={({ palette: { dark, white, info } }) => ({
                      color: darkMode ? info.main : dark.main,
                    })}
                  />
                )}
              </IconButton>
            </Tooltip>
          ),
          action: (
            <MDBox
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: { sx: "column", xs: "column", md: "row", xl: "row" },
                alignItems: "center",
                gap: 2,
              }}
            >
              <IconButton aria-label="action-edit" onClick={() => handleUpdateSubCategory(value)}>
                <Edit
                  sx={({ palette: { dark, white, info } }) => ({
                    color: darkMode ? white.main : info.main,
                  })}
                />
              </IconButton>
              {/* <IconButton
              aria-label="action-delete"
              onClick={() => {
                setIsOpenDialog((Preview) => ({
                  ...Preview,
                  open: true,
                  isId: value?._id,
                }));
                // dispatch(
                //   deleteCategory({
                //     url: `${process.env.REACT_APP_API}/deleteCategory/${value?._id}/${admin}`,
                //   })
                // ).then((data) => {
                //   // console.log(data, "data");
                //   if (data.payload.success) {
                //     dispatch(
                //       handleAlert({
                //         isOpen: true,
                //         type: `${data.payload.success ? "success" : "error"}`,
                //         msg: data.payload.message,
                //       })
                //     );
                //     // dispatch(getSubGlobalCategory(`/ByPCategoryId/${value?._id}`));
                //     setIsId(value?._id);
              }}
            >
              <Delete
                sx={({ palette: { dark, white, info } }) => ({
                  color: darkMode ? white.main : info.main,
                })}
              />
            </IconButton> */}
            </MDBox>
          ),
        }));
        setRowssubData(temprows);
    } else {
      setRowssubData([]);
    }
  }, [category?.at(0)?.subCategory]);

  // useEffect(() => {
  //   console.log(category?.subCategory,"category?.subCategory")
  //   const temprows =
  //   category?.subCategory &&
  //   category?.subCategory &&
  //   category?.subCategory.map((value, index) => ({
  //       name: (
  //         <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
  //           {value?.name}
  //         </MDTypography>
  //       ),
  //       image: (
  //         <MDAvatar
  //           src={`${process.env.REACT_APP_URI}/${value?.image}`}
  //           name={value?.name}
  //           size="sm"
  //           variant="rounded"
  //         />
  //       ),
  //       action: (
  //         <Switch
  //           checked={value?.showInHome}
  //           onChange={() => console.log("showInHome")}
  //           inputProps={{ "aria-label": "controlled" }}
  //         />
  //       ),
  //     }));
  //   console.log(temprows, "temprdjfhjdfjdhfdws");
  //   setRowsData(temprows);
  // }, [ category?.subCategory]);
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const pColumns = [
    { Header: "S.No", accessor: "no" },
    { Header: "Image", accessor: "image", width: "200px" },
    { Header: "Name", accessor: "name", width: "200px" },
    { Header: "View", accessor: "view", width: "200px" },
    // { Header: "Disable", accessor: "disable", width: "200px" },
    { Header: "delete", accessor: "delete", width: "200px" },
    { Header: "action", accessor: "action", width: "200px" },
  ];

 

  const [file, setFile] = useState();
  const [profile, setProfile] = useState({
    categoryName: "",
    uploadPic: "",
    bannerImage: "",
    bannerVideo: "",
    cityId: [],
    categoryId: "",
    category__Id: "",
    isShow: "",
    serverBannerImage: null,
  });
  // console.log(profile);
  useEffect(() => {
    if (!isOpen && !isOpen2 && !isOpenUpdate && !isOpenUpdate2)
      setProfile({
        categoryName: "",
        uploadPic: "",
        bannerImage: "",
        bannerVideo: "",
        cityId: [],
        categoryId: "",
        category__Id: "",
        isShow: "",
        serverBannerImage: null,
      });
  }, [isOpen, isOpen2, isOpenUpdate, isOpenUpdate2]);

  const handleuploadPic = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setProfile((prev) => ({
      ...prev,
      uploadPic: e.target.files && e.target.files.length ? e.target.files[0] : "",
    }));
  };
  // console.log(profile);
  const handleSubmitCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", profile.categoryName);
    formData.append("icon", profile.uploadPic);
    if (profile?.bannerImage && profile?.bannerImage?.length)
      profile?.bannerImage?.map((e) => formData.append("banner", e));
    if (profile?.bannerVideo) formData.append("banner", profile?.bannerVideo);

    // if (profile?.cityId && profile?.cityId?.length) profile?.cityId?.map(ele => formData?.append('cityId', ele))
    // console.log(...formData, 'jgjgjgjj');
    // if (profile?.uploadPic && profile?.uploadPic !== "") {
    dispatch(
      creatCategoryData({
        url: `${process.env.REACT_APP_API}createCategory/${admin}`,
        reqBody: formData,
      })
    ).then((data) => {
      dispatch(
        handleAlert({
          isOpen: true,
          type: `${data?.payload?.success ? "success" : "error"}`,
          msg: data?.payload?.message,
        })
      );
      dispatch(getCategory(`${process.env.REACT_APP_API}/WithPcategory/${admin}`));
      if (data?.payload?.success) {
        setProfile({
          categoryName: "",
          uploadPic: "",
          bannerImage: "",
          bannerVideo: "",
          cityId: [],
          categoryId: "",
          category__Id: "",
          isShow: "",
          serverBannerImage: null,
        });
        setFile();
        
        dispatch(
          getGlobalCategory( `/getAllCategoryWithPcategory/${admin}`
            // ecom
            //   ? `/eCommerce/getAllNullPcategory/${admin}?disable=${
            //       filter === false ? false : filter || ""
            //     }`
            //   : `${process.env.REACT_APP_API}getAllCategory?disable=${filter === false ? false : filter || ""}`
          )
        );
        setIsOpen(false);
        setIsOpen2(false);
        setIsOpenUpdate(false);
        setIsOpenUpdate2(false);
      }
    });
    // } else {
    //   dispatch(
    //     handleAlert({
    //       isOpen: true,
    //       type: "warning",
    //       msg: "all filed is required",
    //     })
    //   );
    // }
  };
  const handleSubmitSubCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", profile.categoryName);
    formData.append("icon", profile.uploadPic);
    formData.append("pCategory", profile.categoryId);

    if (profile?.bannerImage && profile?.bannerImage?.length)
      profile?.bannerImage?.map((e) => formData.append("banner", e));
    if (profile?.bannerVideo) formData.append("banner", profile.bannerVideo);

    // if (profile?.cityId && profile?.cityId?.length) profile?.cityId?.map(ele => formData?.append('cityId', ele))
    // console.log(profile?.uploadPic);
    // if (profile?.uploadPic && profile?.uploadPic !== "") {
    dispatch(
      creatCategoryData({
        url: ecom ? `/eCommerce/createCategoryss/${admin}` : `/createCategory/${admin}`,
        reqBody: formData,
      })
    ).then((data) => {
      dispatch(
        handleAlert({
          isOpen: true,
          type: `${data?.payload?.success ? "success" : "error"}`,
          msg: data?.payload?.message,
        })
      );
      dispatch(getCategory(`${process.env.REACT_APP_API}/WithPcategory/${admin}`));
      if (data?.payload?.success) {
        setProfile({
          categoryName: "",
          uploadPic: "",
          bannerImage: "",
          bannerVideo: "",
          cityId: [],
          categoryId: "",
          category__Id: "",
          isShow: "",
          serverBannerImage: null,
        });
        setFile();
        dispatch(
          getGlobalCategory( `/getAllCategoryWithPcategory/${admin}`
            // ecom
            //   ? `/eCommerce/getAllNullPcategory/${admin}?disable=${
            //       filter === false ? false : filter || ""
            //     }`
            //   : `${process.env.REACT_APP_API}getAllCategory?disable=${filter === false ? false : filter || ""}`
          )
        );
        setIsOpen(false);
        setIsOpen2(false);
        setIsOpenUpdate(false);
        setIsOpenUpdate2(false);
      }
    });
    // } else {
    //   dispatch(
    //     handleAlert({
    //       isOpen: true,
    //       type: "warning",
    //       msg: "all filed is required",
    //     })
    //   );
    // }
  };
  const handleSubmitUpdateCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", profile.categoryName);

    if (profile?.uploadPic) formData.append("icon", profile.uploadPic);
    if (profile?.bannerImage && profile?.bannerImage?.length)
      profile?.bannerImage?.map((e) => formData.append("banner", e));
    // if (profile?.bannerVideo) formData.append("banner", profile.bannerVideo);

    // if (profile?.cityId && profile?.cityId?.length) profile?.cityId?.map(ele => formData?.append('cityId', ele))
    // console.log(...formData);
    // if (
    //   (profile?.uploadPic && profile?.uploadPic !== null) ||
    //   (profile?.isShow && profile?.isShow !== null)
    // ) {
    dispatch(
      updateCategory({
        url: `${process.env.REACT_APP_API}updateCategory/${profile?.categoryId}/${admin}`,
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
      dispatch(getCategory(`${process.env.REACT_APP_API}/WithPcategory/${admin}`));
      if (data?.payload?.success) {
        setProfile({
          categoryName: "",
          uploadPic: "",
          bannerImage: "",
          bannerVideo: "",
          cityId: [],
          categoryId: "",
          category__Id: "",
          isShow: "",
          serverBannerImage: null,
        });
        setFile();
        dispatch(
          getGlobalCategory( `/getAllCategoryWithPcategory/${admin}`
            // ecom
            //   ? `/eCommerce/getAllNullPcategory/${admin}?disable=${
            //       filter === false ? false : filter || ""
            //     }`
            //   : `/getAllNullPcategory/${admin}?disable=${filter === false ? false : filter || ""}`
          )
        );
        setIsOpen(false);
        setIsOpen2(false);
        setIsOpenUpdate(false);
        setIsOpenUpdate2(false);
      }
    });
    // } else {
    //   dispatch(
    //     handleAlert({
    //       isOpen: true,
    //       type: "warning",
    //       msg: "all filed is required",
    //     })
    //   );
    // }
  };
  const handleSubmitUpdateSubCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", profile.categoryName);
    if (profile?.uploadPic) formData.append("icon", profile.uploadPic);
    formData.append("pCategory", profile.categoryId);

    if (profile?.bannerImage && profile?.bannerImage?.length)
      profile?.bannerImage?.map((e) => formData.append("banner", e));
    // if (profile?.bannerVideo) formData.append("banner", profile.bannerVideo);

    // if (profile?.cityId && profile?.cityId?.length) profile?.cityId?.map(ele => formData?.append('cityId', ele))
    // console.log(...formData);
    // if (
    //   (profile?.uploadPic && profile?.uploadPic !== "") ||
    //   (profile?.isShow && profile?.isShow !== "")
    // ) {
    dispatch(
      updateCategory({
        url: ecom
          ? `/eCommerce/updateCategory/${profile?.category__Id}/${admin}`
          : `/updateCategory/${profile?.category__Id}/${admin}`,
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
        setProfile({
          categoryName: "",
          uploadPic: "",
          bannerImage: "",
          bannerVideo: "",
          cityId: [],
          categoryId: "",
          category__Id: "",
          isShow: "",
          serverBannerImage: null,
        });
        setFile();
        dispatch(
          getGlobalCategory( `/getAllCategoryWithPcategory/${admin}`
            // ecom
            //   ? `/eCommerce/getAllNullPcategory/${admin}?disable=${
            //       filter === false ? false : filter || ""
            //     }`
            //   : `/getAllNullPcategory/${admin}?disable=${filter === false ? false : filter || ""}`
          )
        );
        setIsOpen(false);
        setIsOpen2(false);
        setIsOpenUpdate(false);
        setIsOpenUpdate2(false);
      }
    });
    // } else {
    //   dispatch(
    //     handleAlert({
    //       isOpen: true,
    //       type: "warning",
    //       msg: "all filed is required",
    //     })
    //   );
    // }
  };

  const handleChangeSelect = (event, setPersonName) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleUpdateSubCategory = (value) => {
    // dispatch(getSubGlobalCategory(`/ByPCategoryId/${value}`)).then((data) =>
    //   console.log(data)
    // );
    setIsOpenUpdate2(true);
    setProfile({
      categoryName: value?.name || "",
      uploadPic: "",
      bannerImage: "",
      bannerVideo: "",
      cityId:
        city && city?.length && value?.cityId?.length
          ? city?.filter((ele) => value?.cityId?.includes(ele?._id))
          : [],
      categoryId: value?.pCategory?._id || "",
      category__Id: value?._id || "",
      isShow: value?.icon || "",
      serverBannerImage: value?.banner?.length
        ? value?.banner?.filter((ele) => ele?.type === "IMAGE")
        : null,
    });
    // setFile(img);
  };
  const handleUpdateCategory = (value) => {
    // dispatch(getSubGlobalCategory(`/getAllCategoryByPCategoryId/${value}`)).then((data) =>
    //   console.log(data)
    // );

    setIsOpenUpdate(true);
    setProfile({
      categoryName: value?.name || "",
      uploadPic: "",
      bannerImage: "",
      bannerVideo: "",
      cityId: value?.cityId?.length ? value?.cityId?.map((ele) => ele?._id) : [],
      categoryId: value?._id || "",
      category__Id: "",
      isShow: value?.icon || "",
      serverBannerImage: value?.banner?.length
        ? value?.banner?.filter((ele) => ele?.type === "IMAGE")
        : null,
    });
    // setFile(img);
  };
  const handleChangeSwitch = (value) => {
    dispatch(
      updateCategory({
        url: ecom
          ? `${process.env.REACT_APP_APII}/eCommerce/disableCategory/${value}/${admin}`
          : `${process.env.REACT_APP_APII}/disableCategory/${value}/${admin}`,
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
        dispatch(
          getGlobalCategory( `/getAllCategoryWithPcategory/${admin}`
            // ecom
            //   ? `/eCommerce/getAllNullPcategory/${admin}?disable=${
            //       filter === false ? false : filter || ""
            //     }`
            //   : `/getAllNullPcategory/${admin}?disable=${filter === false ? false : filter || ""}`
          )
        );
      }
    });
  };
  const handleBinSwitch = (value) => {
    dispatch(
      updateCategory({
        url:`${process.env.REACT_APP_API}disableCategory/${value}/${admin}`,
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
        dispatch(
          getGlobalCategory(`/getAllCategoryWithPcategory/${admin}`
            // ecom
            //   ? `/eCommerce/getAllNullPcategory/${admin}?disable=false`
            //   : `/getAllNullPcategory/${admin}?disable=false`
          )
        );
      }
    });
  };
  // console.log(profile, city)
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mb={2} />
        <MDBox py={3}>
          <Card id="delete-account">
            <MDBox
              p={1.5}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                flexDirection: { xs: "column", sm: "column", md: "row", xl: "row" },
                gap: 2,
              }}
            >
              <MDButton
                variant="gradient"
                disabled={Loading}
                sx={({ palette: { dark, white, info } }) => ({
                  color: white.main,
                  backgroundColor: darkMode ? info.main : dark.main,
                  "&:hover": {
                    color: white.main,
                    backgroundColor: darkMode ? info.main : dark.main,
                  },
                })}
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp; Create Category
              </MDButton>
              {/* <MDButton
                disabled={Loading}
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
                  setIsOpen2(true);
                }}
              >
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp; Create subCategory
              </MDButton> */}
            </MDBox>{" "}
          </Card>
        </MDBox>
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
            >
              <MDTypography variant="h6" color="white">
                Category Table{" "}
              </MDTypography>
            </MDBox>

            <MDBox py={3} display="flex" justifyContent="flex-end">
              <MDBox width="23%" display="flex" flexDirection="column" padding="2%">
                <MDTypography variant="button">Filter By Visibility</MDTypography>
                <Select
                  disabled={Loading}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
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
                  {disableFilter?.map((ele, i) => (
                    <MenuItem component="option" key={i} value={ele?._id}>
                      {ele?.name}
                    </MenuItem>
                  ))}
                </Select>
              </MDBox>
            </MDBox>

            <MDBox pt={3} width={"100%"}>
              {Loading ? (
                <SkLoading />
              ) : (
                category &&
                category?.at(0) &&
                category.map((value, index) => (
                  <Accordion
                    key={index}
                    expanded={expanded === `panel${index}`}
                    onChange={handleChange(`panel${index}`)}
                    onClick={() => {
                      setIsId(value?._id);
                    }}
                    py={1.5}
                    px={3}
                    sx={{
                      "&.MuiPaper-root": {
                        backgroundColor: "transparent.main",
                      },
                    }}
                    style={{
                      "&.MuiPaper-root": {
                        backgroundColor: "transparent",
                        width: "100% !important",
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMore
                          sx={({ palette: { dark, white, info } }) => ({
                            color: darkMode ? white.main : info.main,
                            textAlign: "left",
                            mr: 2,
                          })}
                        />
                      }
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row-reverse",
                        width: "100%",
                      }}
                    >
                      <MDBox
                        id="shubham"
                        sx={({ breakpoints }) => ({
                          display: "flex",
                          alignItems: "space-between",
                          justifyContent: "space-between",
                          // gap: 1,
                          flexGrow: 1,
                          width: "100%",
                          // flexDirection: { sx: "column", sm: "column", md: "row", xl: "row" },

                          [breakpoints.up("xs")]: {
                            flexDirection: "column",

                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            // gap: 1,
                          },
                          [breakpoints.up("md")]: {
                            flexDirection: "row",

                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            // gap: 1,
                          },
                        })}
                      >
                        <MDBox
                          display="flex"
                          alignItems="center"
                          lineHeight={1}
                          sx={{ mr: 1, width: "30%" }}
                        >
                          <MDBox sx={{ height: 40, width: 40 }}>
                            <img
                              src={`${process.env.REACT_APP_URI}/${value?.icon}`}
                              alt={"img"}
                              onError={(e) => {
                                (e.onError = null),
                                  (e.target.src = require("../../assets/images/bg-profile.jpeg"));
                              }}
                              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                            />
                          </MDBox>
                          <MDTypography
                            display="block"
                            variant="button"
                            fontWeight="medium"
                            ml={1}
                            lineHeight={1}
                            style={{
                              maxWidth: "250px",
                              lineHeight: "20px",
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 2,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {value?.name}
                          </MDTypography>
                        </MDBox>
                        <MDBox
                          display="flex"
                          alignItems="center"
                          lineHeight={1}
                          zIndex={10}
                          sx={{ width: "20%" }}
                        >
                          <MDTypography
                            display="block"
                            variant="button"
                            fontWeight="medium"
                            ml={1}
                            lineHeight={1}
                          >
                            View
                          </MDTypography>
                          <IconButton
                            aria-label="action_edit"
                            onClick={(e) => {
                              e.stopPropagation();
                              setViewData(value);
                              setIsOpenView(true);
                            }}
                          >
                            <Visibility
                              sx={({ palette: { dark, white, info } }) => ({
                                color: darkMode ? info.main : dark.main,
                              })}
                            />
                          </IconButton>
                        </MDBox>
                        {/* <MDBox
                          display="flex"
                          alignItems="center"
                          lineHeight={1}
                          zIndex={10}
                          sx={{ width: "20%" }}
                        >
                          <MDTypography
                            display="block"
                            variant="button"
                            fontWeight="medium"
                            ml={1}
                            lineHeight={1}
                          >
                            Disable
                          </MDTypography>
                          <Switch
                            value={value?.disable}
                            checked={value?.disable}
                            color={"info"}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleChangeSwitch(value?._id);
                            }}
                            // onChange={(e) => {
                            //   e.preventDefault()
                            // }}
                            // onChange={() => log("showInHome")console.}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        </MDBox> */}
                        <MDBox
                          display="flex"
                          alignItems="center"
                          lineHeight={1}
                          zIndex={10}
                          sx={{ width: "20%" }}
                        >
                          <Tooltip title={value?.disable ? "move to Active" : "delete"}>
                            <IconButton
                              aria-label="action_edit"
                              // disabled={value?.disable}
                              onClick={() => {
                                handleBinSwitch(value?._id);
                              }}
                            >
                              {value?.disable ? (
                                <Input
                                  sx={({ palette: { dark, white, info } }) => ({
                                    color: darkMode ? info.main : dark.main,
                                  })}
                                />
                              ) : (
                                <Delete
                                  sx={({ palette: { dark, white, info } }) => ({
                                    color: darkMode ? info.main : dark.main,
                                  })}
                                />
                              )}
                            </IconButton>
                          </Tooltip>
                        </MDBox>
                        <MDBox
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            // flexDirection: { sx: "column", xs: "column", md: "row", xl: "row" },
                            alignItems: "center",
                            gap: 2,
                            width: "20%",
                          }}
                        >
                          <MDTypography
                            display="block"
                            variant="button"
                            fontWeight="medium"
                            ml={1}
                            lineHeight={1}
                          >
                            Edit
                          </MDTypography>
                          <IconButton
                            aria-label="action-edit"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpdateCategory(value);
                            }}
                          >
                            <Edit
                              sx={({ palette: { dark, white, info } }) => ({
                                color: darkMode ? white.main : info.main,
                              })}
                            />
                          </IconButton>
                          {/* <IconButton
                            aria-label="action-delete"
                            onClick={() => {
                              setIsOpenDialog((Preview) => ({
                                ...Preview,
                                open: true,
                                isId: value?._id,
                              }));
                              // dispatch(
                              //   deleteCategory({
                              //     url: `${process.env.REACT_APP_API}/deleteCategory/${value?._id}/${admin}`,
                              //   })
                              // ).then((data) => {
                              //   // console.log(data, "data");
                              //   if (data.payload.success) {
                              //     dispatch(
                              //       handleAlert({
                              //         isOpen: true,
                              //         type: `${data.payload.success ? "success" : "error"}`,
                              //         msg: data.payload.message,
                              //       })
                              //     );
                              //     dispatch(getGlobalCategory(`/getAllNullParantCategory`));
                              //   }
                              // });
                            }}
                          >
                            <Delete
                              sx={({ palette: { dark, white, info } }) => ({
                                color: darkMode ? white.main : info.main,
                              })}
                            />
                          </IconButton> */}
                        </MDBox>
                      </MDBox>
                    </AccordionSummary>
                    <AccordionDetails>
                      {IsLoading ? (
                        <SkLoading />
                      ) : expanded === `panel${index}` && category.at(0)?.subCategory && category.at(0)?.subCategory ? (
                        <MDBox sx={{ textAlign: "center" }}>
                          <MDTypography variant="button" fontWeight="medium" color="info">
                            SubCategory details
                          </MDTypography>
                       {   console.log(rowsData,"rowsData")}
                          <DataTable
                            table={{
                              columns: pColumns,
                              rows: rowssubData || [],
                            }}
                            isSorted={false}
                            entriesPerPage={false}
                            showTotalEntries={false}
                            noEndBorder
                          />
                        </MDBox>
                      ) : (
                        <MDTypography
                          display="block"
                          variant="button"
                          fontWeight="medium"
                          ml={1}
                          lineHeight={1}
                        >
                          there are no subCategory
                        </MDTypography>
                      )}
                    </AccordionDetails>
                  </Accordion>
                ))
              )}
            </MDBox>
          </Card>
        </MDBox>
        <Footer />
      </DashboardLayout>
      <SkModal
        show={isOpenView}
        unShow={setIsOpenView}
        width={{ sx: "100%", md: "50%", xl: "50%", sm: "100%" }}
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
            gap: 2,
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
              Category Details
            </MDTypography>
          </Card>
          <MDBox
            display="flex"
            alignItems="center"
            lineHeight={1}
            sx={({ palette: { dark, white, info } }) => ({
              border: 0.5,
              borderColor: darkMode ? white.main : dark.main,
              borderRadius: 3,
              p: 2,
              width: "100%",
              //   height: "70vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 2,
            })}
          >
            <MDBox
              sx={{
                height: 200,
                width: 200,
                borderRadius: "50%",
                border: 3,
                borderColor: "primary.main",
              }}
            >
              <img
                src={`${process.env.REACT_APP_URI}/${viewData?.icon}`}
                style={{ height: "100%", width: "100%", borderRadius: "50%", objectFit: "cover" }}
                onError={(e) => {
                  e.onerror = null;
                  e.target.src = require("../../assets/images/bg-sign-up-cover.jpeg");
                }}
              />
            </MDBox>
            <MDBox
              sx={({ palette: { dark, white, info } }) => ({
                // border: 0.5,
                // borderColor: darkMode ? white.main : dark.main,
                // borderRadius: 3,

                width: "100%",
                height: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 1.5,
              })}
            >
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
                <MDTypography variant="h6">Category Name :</MDTypography>
                <MDTypography
                  variant="h6"
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "wrap",
                    textOverflow: "ellipsis",
                    maxWidth: "70%",
                  }}
                >
                  {viewData?.name || "-"}{" "}
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
                <MDTypography variant="h6">Show in Home :</MDTypography>
                <MDTypography
                  variant="h6"
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "wrap",
                    textOverflow: "ellipsis",
                    maxWidth: "70%",
                  }}
                >
                    {viewData?.showInHome ? (
                  <MDBadge badgeContent="Yes" color="success" variant="gradient" size="lg" />
                ) : (
                  <MDBadge badgeContent="No" color="error" variant="gradient" size="lg" />
                )}
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
                <MDTypography variant="h6">Cities :</MDTypography>
                {viewData?.cityId && viewData?.cityId?.length ? (
                  <MDTypography
                    variant="h6"
                    sx={{
                      overflow: "hidden",
                      whiteSpace: "wrap",
                      textOverflow: "ellipsis",
                      maxWidth: "70%",
                    }}
                  >
                    {viewData?.cityId?.map((e) => e.cityName)?.join(",") || "-"}
                  </MDTypography>
                ) : (
                  "-"
                )}
              </MDBox> */}
            </MDBox>
            {viewData?.banner && viewData?.banner?.length
              ? viewData?.banner?.map((ele, i) => (
                  <MDBox
                    key={i}
                    sx={{
                      height: "40vh",
                      width: "100%",
                    }}
                  >
                    {ele?.type === "IMAGE" ? (
                      <>
                        <MDTypography variant="h6">Category Banner :</MDTypography>
                        <img
                          src={`${process.env.REACT_APP_URI}/${ele?.url}`}
                          style={{ height: "90%", width: "100%", objectFit: "cover" }}
                          onError={(e) => {
                            e.onerror = null;
                            e.target.src = require("../../assets/images/bg-sign-up-cover.jpeg");
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <MDTypography variant="h6">Category Video</MDTypography>
                        <video width="320" height="240" controls>
                          <source
                            src={`${process.env.REACT_APP_URI}/${ele?.url}`}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      </>
                    )}
                  </MDBox>
                ))
              : null}
          </MDBox>
        </MDBox>
      </SkModal>
      <SkModal
        show={isOpen}
        unShow={setIsOpen}
        width={{ sx: "100%", md: "50%", xl: "50%", sm: "100%" }}
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
            gap: 2,
            width: "100%",
          }}
          component="form"
          role="form"
          onSubmit={handleSubmitCategory}
        >
          <MDTypography
            display="block"
            variant="h6"
            fontWeight="medium"
            sx={{ color: "white.main", fontSize: 30 }}
            ml={1}
            lineHeight={1}
          >
            Create Category
          </MDTypography>
          <MDBox
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            lineHeight={1}
            gap={3}
            width={"75%"}
          >
            <MDTypography variant="h6">
              Category Name <AstrieskIcon />
            </MDTypography>
            <MDInput
              disabled={createUpdateLoading}
              required={true}
              placeholder="category name"
              type="text"
              fullWidth
              pl={3}
              value={profile.categoryName}
              onChange={(e) => {
                setProfile((prev) => ({
                  ...prev,
                  categoryName: e.target.value,
                }));
              }}
            />
          </MDBox>
          {/* <MDBox
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            lineHeight={1}
            gap={3}
            width={"75%"}
          >
            <MDTypography variant="h6">Choose City</MDTypography>
            <ApnaSelect
              disabled={createUpdateLoading}
              required={true}
              data={city || []}
              state={profile.cityId}
              label="City"
              setState={(e) => setProfile(prev => ({
                ...prev,
                cityId: e
              }))}
              name="cityName"
              nameKey="cityName"
              simpleArray={true}
            />
          </MDBox> */}
          <MDBox
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            lineHeight={1}
            gap={3}
            width={"75%"}
          >
            <MDTypography variant="h6">
              Category Image <AstrieskIcon />
              <MDTypography variant="body1" component="span" fontSize={11}>
                &nbsp; ( image size - 178 × 178 px )
              </MDTypography>
            </MDTypography>
            <ImagePicker
              disabled={createUpdateLoading}
              required={true}
              name="Image"
              multiple={false}
              images={profile?.uploadPic}
              setImages={(e) => {
                setProfile((prev) => ({
                  ...prev,
                  uploadPic: e,
                }));
              }}
              //
            />
          </MDBox>
          {/* <MDBox
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            lineHeight={1}
            gap={3}
            width={"75%"}
          >
            <MDTypography variant="h6">
              Category Banner Image{" "}
              <MDTypography variant="body1" component="span" fontSize={11}>
                &nbsp; ( image size - 178 × 178 px )
              </MDTypography>
            </MDTypography>
            <ImagePicker
              disabled={createUpdateLoading}
              required={!profile?.bannerVideo}
              name="bannerImage"
              multiple={true}
              images={profile?.bannerImage}
              setImages={(e) => {
                setProfile((prev) => ({
                  ...prev,
                  bannerImage: e,
                }));
              }}
              //
            />
          </MDBox> */}
          {/* <MDBox
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            lineHeight={1}
            gap={3}
            width={"75%"}
          >
            <MDTypography variant="h6">
              Category Banner Video{" "}
              <MDTypography variant="body1" component="span" fontSize={11}>
                &nbsp; ( image size - 178 × 178 px )
              </MDTypography>
            </MDTypography>
            <div style={{ width: "100%" }}>
              <input
                disabled={createUpdateLoading}
                type="file"
                id={"videopicker1"}
                name="bannerVideo"
                required={!profile?.bannerImage}
                className="custom-file-input"
                accept="video/*"
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  bannerVideo: e?.target?.files?.length ? e?.target?.files[0] : ""
                }))}
                style={{ width: "100%" }}
              />
              {profile?.bannerVideo ? <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <span
                    style={{
                      display: "inline-block",
                      margin: "0 0.5rem",
                      color: 'white'
                    }}
                  >
                    {profile?.bannerVideo?.name}
                  </span>
                  <span
                    className="cross"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setProfile(prev => ({
                        ...prev,
                        bannerVideo: ""
                      }))
                      document.getElementById("videopicker1").value = "";
                    }}
                  >
                    <Cancel
                      sx={({ palette: { dark, white, info } }) => ({
                        color: darkMode ? white?.main : dark.main,
                      })}
                    />
                  </span>
                </div>
              </div> : null}
            </div>
          </MDBox> */}
          <MDBox
            sx={{ width: "100%", justifyContent: "flex-end", textAlign: "center", display: "flex" }}
          >
            {" "}
            <MDButton color={"info"} verdant={"gradient"} type={"submit"}>
              {createUpdateLoading ? (
                <CircularProgress color="primary" size={20} />
              ) : (
                `Create Category`
              )}
            </MDButton>
          </MDBox>
        </MDBox>
      </SkModal>
      <SkModal
        show={isOpen2}
        unShow={setIsOpen2}
        width={{ sx: "100%", md: "50%", xl: "50%", sm: "100%" }}
        height={"80%"}
        overflowY={true}
        padding={3}
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
          component="form"
          role="form"
          onSubmit={handleSubmitSubCategory}
        >
          <MDTypography
            display="block"
            variant="h6"
            fontWeight="medium"
            sx={{ color: "white.main", fontSize: 30 }}
            ml={1}
            lineHeight={1}
          >
            Create Sub Category
          </MDTypography>
          <MDBox
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            lineHeight={1}
            gap={3}
            width={"75%"}
          >
            <MDTypography variant="h6">
              Select Parent Category <AstrieskIcon />
            </MDTypography>
            <ApnaSelect2
              required={true}
              disabled={createUpdateLoading}
              data={category}
              origin="Category"
              value={profile?.categoryId}
              name="categoryId"
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  categoryId: e.target.value,
                }))
              }
              nameKey="name"
              valueKey="_id"
            />
            {/* <MDInput
              disabled={createUpdateLoading}
              required={true}
              fullWidth
              autoComplete="off"
              variant="outlined"
              placeholder="select Category"
              defaultValue="select category"
              value={profile?.categoryId}

              select
              sx={({ palette: { dark, white, info } }) => ({
                "& .MuiInputBase-root": {
                  height: 45,
                  border: "none",
                  outline: "none",
                  // borderColor: "GrayText",
                  // color: darkMode ? white.main : info.main,
                  // backgroundColor: !darkMode ? white.main : "GrayText",
                },

                // "& .MuiOutlinedInput-notchedOutline": {
                //   outline: "none",
                //   border: "none",
                // },
              })}
              InputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
              }}
            >
              {Loading ? (
                <SkLoading />
              ) : (
                category &&
                category.length > 0 &&
                category.map((option, index) => (
                  <MenuItem key={index} value={option?._id}>
                    {option?.name}
                  </MenuItem>
                ))
              )}
            </MDInput> */}
          </MDBox>
          <MDBox
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            lineHeight={1}
            gap={3}
            width={"75%"}
          >
            <MDTypography variant="h6">
              Category Name <AstrieskIcon />
            </MDTypography>
            <MDInput
              disabled={createUpdateLoading}
              required={true}
              type="text"
              placeholder="category name"
              fullWidth
              pl={3}
              value={profile.categoryName}
              onChange={(e) => {
                setProfile((prev) => ({
                  ...prev,
                  categoryName: e.target.value,
                }));
              }}
            />
          </MDBox>
          {/* <MDBox
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            lineHeight={1}
            gap={3}
            width={"75%"}
          >
            <MDTypography variant="h6">Choose City</MDTypography>
            <ApnaSelect
              disabled={createUpdateLoading}
              required={true}
              data={city || []}
              state={profile.cityId}
              label="City"
              setState={(e) => setProfile(prev => ({
                ...prev,
                cityId: e
              }))}
              name="cityId"
              nameKey="cityName"
              simpleArray={true}
            />
          </MDBox> */}
          <MDBox
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            lineHeight={1}
            gap={3}
            width={"75%"}
          >
            <MDTypography variant="h6">
              Category Image <AstrieskIcon />
              <MDTypography variant="body1" component="span" fontSize={11}>
                &nbsp; ( image size - 178 × 178 px )
              </MDTypography>
            </MDTypography>
            <ImagePicker
              disabled={createUpdateLoading}
              required={true}
              name="Image"
              multiple={false}
              images={profile?.uploadPic}
              setImages={(e) => {
                setProfile((prev) => ({
                  ...prev,
                  uploadPic: e,
                }));
              }}
              //
            />
          </MDBox>
          {/* <MDBox
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            lineHeight={1}
            gap={3}
            width={"75%"}
          >
            <MDTypography variant="h6">
              Category Banner Image{" "}
              <MDTypography variant="body1" component="span" fontSize={11}>
                &nbsp; ( image size - 178 × 178 px )
              </MDTypography>
            </MDTypography>
            <ImagePicker
              disabled={createUpdateLoading}
              required={!profile?.bannerVideo}
              name="bannerImage"
              multiple={true}
              images={profile?.bannerImage}
              setImages={(e) => {
                setProfile((prev) => ({
                  ...prev,
                  bannerImage: e,
                }));
              }}
              //
            />
          </MDBox> */}
          {/* <MDBox
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            lineHeight={1}
            gap={3}
            width={"75%"}
          >
            <MDTypography variant="h6">
              Category Banner Video{" "}
              <MDTypography variant="body1" component="span" fontSize={11}>
                &nbsp; ( image size - 178 × 178 px )
              </MDTypography>
            </MDTypography>
            <div style={{ width: "100%" }}>
              <input
                disabled={createUpdateLoading}
                type="file"
                id={"videopicker2"}
                name="bannerVideo"
                required={!profile?.bannerImage}
                className="custom-file-input"
                accept="video/*"
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  bannerVideo: e?.target?.files?.length ? e?.target?.files[0] : ""
                }))}
                style={{ width: "100%" }}
              />
              {profile?.bannerVideo ? <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <span
                    style={{
                      display: "inline-block",
                      margin: "0 0.5rem",
                      color: 'white'
                    }}
                  >
                    {profile?.bannerVideo?.name}
                  </span>
                  <span
                    className="cross"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setProfile(prev => ({
                        ...prev,
                        bannerVideo: ""
                      }))
                      document.getElementById("videopicker2").value = "";
                    }}
                  >
                    <Cancel
                      sx={({ palette: { dark, white, info } }) => ({
                        color: darkMode ? white?.main : dark.main,
                      })}
                    />
                  </span>
                </div>
              </div> : null}
            </div>
          </MDBox> */}
          <MDBox
            sx={{ width: "100%", justifyContent: "flex-end", textAlign: "center", display: "flex" }}
          >
            {" "}
            <MDButton color={"info"} verdant={"gradient"} type={"submit"}>
              {createUpdateLoading ? (
                <CircularProgress color="primary" size={20} />
              ) : (
                `Create Sub Category`
              )}
            </MDButton>
          </MDBox>
        </MDBox>
      </SkModal>
      <SkModal
        show={isOpenUpdate}
        unShow={setIsOpenUpdate}
        width={{ sx: "100%", md: "50%", xl: "50%", sm: "100%" }}
        height={"80%"}
        padding={3}
        overflowY={true}
      >
        <MDBox
          display="flex"
          alignItems="center"
          lineHeight={1}
          sx={({ palette: { dark, white, info } }) => ({
            justifyContent: "center",
            textAlign: "center",
            flexDirection: "column",
            gap: 3,
            width: "100%",
          })}
          component="form"
          role="form"
          onSubmit={handleSubmitUpdateCategory}
        >
          <MDTypography
            display="block"
            variant="h6"
            fontWeight="medium"
            sx={{ color: "white.main", fontSize: 30 }}
            ml={1}
            lineHeight={1}
          >
            Update Category
          </MDTypography>
          <MDBox
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            lineHeight={1}
            gap={2}
            width={"75%"}
          >
            <MDTypography variant="h6">
              Category Name <AstrieskIcon />
            </MDTypography>
            <MDInput
              disabled={createUpdateLoading}
              required={true}
              type="text"
              placeholder="category name"
              fullWidth
              pl={3}
              value={profile.categoryName}
              onChange={(e) => {
                setProfile((prev) => ({
                  ...prev,
                  categoryName: e.target.value,
                }));
              }}
            />
          </MDBox>
          {/* <MDBox
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            lineHeight={1}
            gap={3}
            width={"75%"}
          >
            <MDTypography variant="h6">Choose City</MDTypography>
            <ApnaSelect
              disabled={createUpdateLoading}
              required={true}
              data={city || []}
              state={profile.cityId}
              label="City"
              setState={(e) => setProfile(prev => ({
                ...prev,
                cityId: e
              }))}
              name="cityId"
              nameKey="cityName"
              simpleArray={true}
            />
          </MDBox> */}
          <MDBox
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            lineHeight={1}
            gap={3}
            width={"75%"}
          >
            <MDTypography variant="h6">
              Category Image{" "}
              <MDTypography variant="body1" component="span" fontSize={11}>
                &nbsp; ( image size - 178 × 178 px )
              </MDTypography>
            </MDTypography>
            <ImagePicker
              disabled={createUpdateLoading}
              // required={true}
              name="Image"
              multiple={false}
              images={profile?.uploadPic}
              setImages={(e) => {
                setProfile((prev) => ({
                  ...prev,
                  uploadPic: e,
                }));
              }}
              //
            />
            {profile?.uploadPic === "" && profile?.isShow && (
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
                    src={`${process.env.REACT_APP_URI}/${profile?.isShow}`}
                  />
                </span>
                {/* <span
                  className="cross"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    setProfile((prev) => ({
                      ...prev,
                      uploadPic: "",
                    }));
                  }}
                >
                  <Cancel
                    sx={({ palette: { dark, white, info } }) => ({
                      color: darkMode ? white?.main : dark.main,
                    })}
                  />
                </span> */}
              </div>
            )}
          </MDBox>
          {/* <MDBox
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            lineHeight={1}
            gap={3}
            width={"75%"}
          >
            <MDTypography variant="h6">
              Category Banner Image{" "}
              <MDTypography variant="body1" component="span" fontSize={11}>
                &nbsp; ( image size - 178 × 178 px )
              </MDTypography>
            </MDTypography>
            <ImagePicker
              disabled={createUpdateLoading}
              // required={true}
              name="bannerImage"
              multiple={true}
              images={profile?.bannerImage}
              setImages={(e) => {
                setProfile((prev) => ({
                  ...prev,
                  bannerImage: e,
                }));
              }}
            />
            {profile?.serverBannerImage && profile?.serverBannerImage?.length ? (
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                {" "}
                {profile?.serverBannerImage?.map((ele, i) => (
                  <span style={{ display: "flex", alignItems: "flex-start" }} key={i}>
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
                        src={`${process.env.REACT_APP_URI}/${ele?.url}`}
                      />
                    </span>
                    <span
                      className="cross"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        dispatch(
                          unlinkImage({
                            url: ecom
                              ? `/eCommerce/unLinks/${profile?.categoryId}/${admin}`
                              : `/unLinks/${profile?.categoryId}/${admin}`,
                            data: { imageIndex: i + 1 },
                            notFormData: true,
                          })
                        ).then((data) => {
                          if (data?.payload?.success) {
                            const temp = [...profile?.serverBannerImage];
                            temp.splice(i, 1);
                            setProfile((prev) => ({
                              ...prev,
                              serverBannerImage: temp,
                            }));
                            dispatch(
                              handleAlert({
                                isOpen: true,
                                type: `${data.payload.success ? "success" : "error"}`,
                                msg: data.payload.message,
                              })
                            );
                          }
                        });
                      }}
                    >
                      <Cancel
                        sx={({ palette: { dark, white, info } }) => ({
                          color: darkMode ? white?.main : dark.main,
                        })}
                      />
                    </span>
                  </span>
                ))}
              </div>
            ) : null}
          </MDBox> */}
          {/* <MDBox
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            lineHeight={1}
            gap={3}
            width={"75%"}
          >
            <MDTypography variant="h6">
              Category Banner Video{" "}
              <MDTypography variant="body1" component="span" fontSize={11}>
                &nbsp; ( image size - 178 × 178 px )
              </MDTypography>
            </MDTypography>
            <div style={{ width: "100%" }}>
              <input
                disabled={createUpdateLoading}
                type="file"
                id={"videopicker3"}
                name="bannerVideo"
                // required={!profile?.bannerImage}
                className="custom-file-input"
                accept="video/*"
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  bannerVideo: e?.target?.files?.length ? e?.target?.files[0] : ""
                }))}
                style={{ width: "100%" }}
              />
              {profile?.bannerVideo ? <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <span
                    style={{
                      display: "inline-block",
                      margin: "0 0.5rem",
                      color: 'white'
                    }}
                  >
                    {profile?.bannerVideo?.name}
                  </span>
                  <span
                    className="cross"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setProfile(prev => ({
                        ...prev,
                        bannerVideo: ""
                      }))
                      document.getElementById("videopicker3").value = "";
                    }}
                  >
                    <Cancel
                      sx={({ palette: { dark, white, info } }) => ({
                        color: darkMode ? white?.main : dark.main,
                      })}
                    />
                  </span>
                </div>
              </div> : null}
            </div>
          </MDBox> */}
          <MDBox
            sx={{ width: "75%", justifyContent: "flex-end", textAlign: "center", display: "flex" }}
          >
            {" "}
            <MDButton color={"info"} verdant={"gradient"} type={"submit"}>
              {createUpdateLoading ? (
                <CircularProgress color="primary" size={20} />
              ) : (
                `Update Category`
              )}
            </MDButton>
          </MDBox>
        </MDBox>
      </SkModal>
      <SkModal
        show={isOpenUpdate2}
        unShow={setIsOpenUpdate2}
        width={{ sx: "100%", md: "50%", xl: "50%", sm: "100%" }}
        height={"80%"}
        overflowY={true}
        padding={3}
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
          component="form"
          role="form"
          onSubmit={handleSubmitUpdateSubCategory}
        >
          <MDTypography
            display="block"
            variant="h6"
            fontWeight="medium"
            sx={{ color: "white.main", fontSize: 30 }}
            ml={1}
            lineHeight={1}
          >
            Update Sub Category
          </MDTypography>
          <MDBox
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            lineHeight={1}
            justifyContent="flex-start"
            gap={3}
            width={"75%"}
          >
            <MDTypography variant="h6">Select Parent Category</MDTypography>
            {/* <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={categoryId}
                onChange={(e) => {
                  handleChangeSelect(e, setCategoryId);
                }}
                input={
                  <OutlinedInput
                    label="Other skill "
                    sx={{
                      "& .MuiInputBase-input": {
                        zIndex: "2",
                        height: 40,
                        padding: "0.5rem",
                        border: "none",
                        outline: "none",
                        borderColor: "GrayText",
                        bgcolor: "#E8E8E8",
                        color: "primary.main",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        outline: "none",
                        border: "none",
                        bgcolor: "#E8E8E8",
                      },
                      "& .MuiSelect-icon": {
                        zIndex: " 2",
                      },
                    }}
                  />
                }
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {Loading ? (
                  <SkLoading />
                ) : (
                  category &&
                  category.length > 0 &&
                  category.map((name, index) => (
                    <MenuItem key={index} value={name?._id}>
                      <Checkbox checked={categoryId.indexOf(name?._id) > -1} />
                      <ListItemText primary={name?.name} />
                    </MenuItem>
                  ))
                )}
              </Select> */}
            {/* <MDInput
              disabled={createUpdateLoading}
              required={true}
              placeholder="select Category"
              defaultValue="select category"
              value={profile?.categoryId}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  categoryId: e.target.value,
                }))
              }
              select
              style={{ width: "100%" }}
              sx={({ palette: { dark, white, info } }) => ({
                "& .MuiInputBase-root": {
                  height: 45,
                  width: "100%",
                  border: "none",
                  outline: "none",
                  // borderColor: "GrayText",
                  // color: darkMode ? white.main : info.main,
                  // backgroundColor: !darkMode ? white.main : "GrayText",
                },

                // "& .MuiOutlinedInput-notchedOutline": {
                //   outline: "none",
                //   border: "none",
                // },
              })}
              InputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
              }}
            >
              {Loading ? (
                <SkLoading />
              ) : (
                category &&
                category.length > 0 &&
                category.map((option, index) => (
                  <MenuItem key={index} value={option?._id}>
                    {option?.name}
                  </MenuItem>
                ))
              )}
            </MDInput> */}
            <ApnaSelect2
              disabled={createUpdateLoading}
              data={category}
              origin="Category"
              value={profile?.categoryId}
              name="categoryId"
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  categoryId: e.target.value,
                }))
              }
              nameKey="name"
              valueKey="_id"
            />
          </MDBox>
          <MDBox
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            justifyContent="flex-start"
            lineHeight={1}
            gap={3}
            width={"75%"}
          >
            <MDTypography variant="h6">
              Category Name
              <AstrieskIcon />
            </MDTypography>
            <MDInput
              disabled={createUpdateLoading}
              required={true}
              type="text"
              placeholder="category name"
              fullWidth
              pl={3}
              value={profile.categoryName}
              onChange={(e) => {
                setProfile((prev) => ({
                  ...prev,
                  categoryName: e.target.value,
                }));
              }}
            />
          </MDBox>
          {/* <MDBox
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            lineHeight={1}
            gap={3}
            width={"75%"}
          >
            <MDTypography variant="h6">Choose City</MDTypography>
            <ApnaSelect
              disabled={createUpdateLoading}
              required={true}
              data={city || []}
              state={profile.cityId}
              label="City"
              setState={(e) => setProfile(prev => ({
                ...prev,
                cityId: e
              }))}
              name="cityId"
              nameKey="cityName"
              simpleArray={true}
            />
          </MDBox> */}
          <MDBox
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            lineHeight={1}
            gap={3}
            width={"75%"}
          >
            <MDTypography variant="h6">
              Category Image{" "}
              <MDTypography variant="body1" component="span" fontSize={11}>
                &nbsp; ( image size - 178 × 178 px )
              </MDTypography>
            </MDTypography>
            <ImagePicker
              disabled={createUpdateLoading}
              // required={true}
              name="Image"
              multiple={false}
              images={profile?.uploadPic}
              setImages={(e) => {
                setProfile((prev) => ({
                  ...prev,
                  uploadPic: e,
                }));
              }}
              //
            />
            {profile?.uploadPic === "" && profile?.isShow && (
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
                    src={`${process.env.REACT_APP_URI}/${profile?.isShow}`}
                  />
                </span>
                {/* <span
                  className="cross"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    setProfile((prev) => ({
                      ...prev,
                      uploadPic: "",
                    }));
                  }}
                >
                  <Cancel
                    sx={({ palette: { dark, white, info } }) => ({
                      color: darkMode ? white?.main : dark.main,
                    })}
                  />
                </span> */}
              </div>
            )}
          </MDBox>
          <MDBox
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            lineHeight={1}
            gap={3}
            width={"75%"}
          >
            <MDTypography variant="h6">
              Category Banner Image{" "}
              <MDTypography variant="body1" component="span" fontSize={11}>
                &nbsp; ( image size - 178 × 178 px )
              </MDTypography>
            </MDTypography>
            <ImagePicker
              disabled={createUpdateLoading}
              // required={true}
              name="bannerImage"
              multiple={true}
              images={profile?.bannerImage}
              setImages={(e) => {
                setProfile((prev) => ({
                  ...prev,
                  bannerImage: e,
                }));
              }}
              //
            />
            {profile?.serverBannerImage && profile?.serverBannerImage?.length ? (
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                {profile?.serverBannerImage?.map((ele, i) => (
                  <span style={{ display: "flex", alignItems: "flex-start" }} key={i}>
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
                        src={`${process.env.REACT_APP_URI}/${ele?.url}`}
                      />
                    </span>
                    <span
                      className="cross"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        dispatch(
                          unlinkImage({
                            url: ecom
                              ? `/eCommerce/unLinks/${profile?.categoryId}/${admin}`
                              : `/unLinks/${profile?.categoryId}/${admin}`,
                            data: { imageIndex: i + 1 },
                            notFormData: true,
                          })
                        ).then((data) => {
                          if (data?.payload?.success) {
                            const temp = [...profile?.serverBannerImage];
                            temp.splice(i, 1);
                            setProfile((prev) => ({
                              ...prev,
                              serverBannerImage: temp,
                            }));
                            dispatch(
                              handleAlert({
                                isOpen: true,
                                type: `${data.payload.success ? "success" : "error"}`,
                                msg: data.payload.message,
                              })
                            );
                          }
                        });
                      }}
                    >
                      <Cancel
                        sx={({ palette: { dark, white, info } }) => ({
                          color: darkMode ? white?.main : dark.main,
                        })}
                      />
                    </span>
                  </span>
                ))}
              </div>
            ) : null}
          </MDBox>
          {/* <MDBox
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            lineHeight={1}
            gap={3}
            width={"75%"}
          >
            <MDTypography variant="h6">
              Category Banner Video{" "}
              <MDTypography variant="body1" component="span" fontSize={11}>
                &nbsp; ( image size - 178 × 178 px )
              </MDTypography>
            </MDTypography>
            <div style={{ width: "100%" }}>
              <input
                disabled={createUpdateLoading}
                type="file"
                id={"videopicker4"}
                name="bannerVideo"
                // required={!profile?.bannerImage}
                className="custom-file-input"
                accept="video/*"
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  bannerVideo: e?.target?.files?.length ? e?.target?.files[0] : ""
                }))}
                style={{ width: "100%" }}
              />
              {profile?.bannerVideo ? <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <span
                    style={{
                      display: "inline-block",
                      margin: "0 0.5rem",
                      color: 'white'
                    }}
                  >
                    {profile?.bannerVideo?.name}
                  </span>
                  <span
                    className="cross"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setProfile(prev => ({
                        ...prev,
                        bannerVideo: ""
                      }))
                      document.getElementById("videopicker4").value = "";
                    }}
                  >
                    <Cancel
                      sx={({ palette: { dark, white, info } }) => ({
                        color: darkMode ? white?.main : dark.main,
                      })}
                    />
                  </span>
                </div>
              </div> : null}
            </div>
          </MDBox> */}
          <MDBox
            sx={{ width: "75%", justifyContent: "flex-end", textAlign: "center", display: "flex" }}
          >
            {" "}
            <MDButton color={"info"} verdant={"gradient"} type={"submit"}>
              {createUpdateLoading ? (
                <CircularProgress color="primary" size={20} />
              ) : (
                `Update Sub Category`
              )}
            </MDButton>
          </MDBox>
        </MDBox>
      </SkModal>
      <SkConfirm
        dialogTitle={"Delete"}
        dialogContent={"Are you sure you want to delete this category?"}
        open={isOpenDialog}
        setOpen={setIsOpenDialog}
        dialogAction={
          <MDBox
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 3,

              px: 3,
            }}
          >
            <MDButton
              variant="gradient"
              color="info"
              sx={{ width: "50%" }}
              onClick={() => {
                setIsOpenDialog((Preview) => ({
                  ...Preview,
                  open: false,
                  isId: null,
                }));
              }}
            >
              Cancel
            </MDButton>
            <MDButton
              variant="gradient"
              sx={{ width: "50%" }}
              color="error"
              onClick={() => {
                dispatch(
                  deleteCategory({
                    url: `${process.env.REACT_APP_API}/deleteCategory/${isOpenDialog?.isId}/${admin}`,
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
                    dispatch(getGlobalCategory(`/getAllNullParantCategory`));
                    dispatch(
                      getSubGlobalCategory(`/getAllCategoryWithPcategory/${admin}`)
                    );
                    setIsOpenDialog((Preview) => ({
                      ...Preview,
                      open: false,
                    }));
                  }
                  setIsId(isOpenDialog?.isId);
                });
              }}
            >
              yes
            </MDButton>
          </MDBox>
        }
      />
    </>
  );
};

export default Category;
