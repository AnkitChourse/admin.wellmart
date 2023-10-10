import MDButton from "components/MDButton";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useMaterialUIController } from "context";
import { useDispatch, useSelector } from "react-redux";
import ImagePicker from "components/ApnaUploader";
import { Cancel, CurrencyRupee, Percent } from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SkLoading from "components/SkLoading";
import MDInput from "components/MDInput";
import {
  Card,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Switch,
} from "@mui/material";
import { getAllBlogs } from "redux/festures/blogSlice";
import { updateBlog } from "redux/festures/blogSlice";
import { createPostBlogs } from "redux/festures/blogSlice";
import { handleAlert } from "redux/festures/alertSlice";
import ApnaSelect from "components/ApnaSelect/ApnaSelect";
import { getCategory } from "redux/festures/categorySlice";
import { formattedDateServer } from "Utils/dateFunc";
import { createCoupons } from "redux/festures/couponsSlice";
import { getAllCoupons } from "redux/festures/couponsSlice";
import { updateCoupons } from "redux/festures/couponsSlice";
import SkDatePicker from "components/SkDataPicker";
import axios from "axios";
import AstrieskIcon from "components/AstrieskIcon";
import { getEcomCategory } from "redux/festures/categorySlice";
const Form = ({ isOpenUpdate, setIsOpenUpdate, setIsOpen, type }) => {
  // console.log(type,"type")
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [couponData, setCouponData] = useState({
    couponName: "",
    couponCode: "",
    // couponPercent: "",
    minimumOrderValue: "",
    maximumDiscount: "",
    couponQuantity: "",
    // backgroundColourCode: "",
    // taskColourCode: "",

    endDate: "",
    discount: "",
    startDate: "",
    // validity: "",
    // categoryId: "",
  });
  // const [isBlogContent, setIsBlogContent] = useState("");
  const [isCouponsIcon, setIsCouponsIcon] = useState("");
  const [isShow, setIsShow] = useState("");
  const [isSelection, setIsSelection] = useState("category");
  const [isCategory, setIsCategory] = useState([]);
  const [isECategory, setIsECategory] = useState([]);
  const [isProducts, setIsProducts] = useState([]);
  //   const [isBrandShowHome, setIsBrandShowHome] = useState(false);
  const adminId = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  // const { Loading, singleBlogs } = useSelector((data) => ({ ...data?.isBlogs }));
  // const { category, EcomCategory } = useSelector((state) => ({
  //   category: state.isCategory.category,
  //   EcomCategory: state.isECategory.EcomCategory,
  // }));
  const { category, EcomCategory } = useSelector((data) => ({ ...data?.isCategory }));

  const { Loading, singleCoupons, createupdateLoading } = useSelector((data) => ({
    ...data?.isCoupons,
  }));
  // const { AllProducts } = useSelector((state) => ({ ...state.isProducts }));
  useEffect(() => {
    dispatch(getCategory(`${process.env.REACT_APP_API}/getAllCategory`));

    // dispatch(getAllProducts(`/getAllProduct`));
  }, []);
  // useEffect(() => {
  //   dispatch(
  //     getEcomCategory(`${process.env.REACT_APP_APII}/eCommerce/getAllCategoryByAdmin/${adminId}`)
  //   );

  // dispatch(getAllProducts(`/getAllProduct`));
  // }, []);
  // console.log(category, AllProducts);
  // console.log(category, "isCategory");
  // console.log(isShow, "isProducts");

  useEffect(() => {
    if (singleCoupons && isOpenUpdate) {
      setIsShow(singleCoupons.images);

      // Check and set products
      // Uncomment and modify according to your data structure
      // const productsArray =
      //   singleCoupons.product &&
      //   singleCoupons.product.length > 0 &&
      //   singleCoupons.product.map((items) => items?._id);
      // setIsProducts(productsArray);
      // setIsSelection("product");

      // Check and set categories
      if (singleCoupons.categoryId && singleCoupons.categoryId.length > 0) {
        const categoriesArray =
          singleCoupons?.categoryId &&
          singleCoupons?.categoryId.length > 0 &&
          singleCoupons?.categoryId.map((items) => items?._id);

        setIsCategory(categoriesArray);
      }

      // Set coupon data
      setCouponData((prev) => ({
        ...prev,
        couponName: singleCoupons.couponName,
        couponCode: singleCoupons.couponCode,
        minimumOrderValue: singleCoupons.minimumOrderValue,
        maximumDiscount: singleCoupons.maximumDiscount,
        couponQuantity: singleCoupons.couponQuantity,
        endDate: formattedDateServer(new Date(singleCoupons.endDate)),
        startDate: formattedDateServer(new Date(singleCoupons.startDate)),
        discount: singleCoupons.discount,
      }));
    } else {
      // Reset state when not updating
      setIsShow("");
      setIsProducts([]);
      setIsCategory([]);

      setCouponData((prev) => ({
        ...prev,
        couponName: "",
        couponCode: "",
        minimumOrderValue: "",
        maximumDiscount: "",
        couponQuantity: "",
        endDate: "",
        discount: "",
        startDate: "",
      }));
    }
  }, [singleCoupons, isOpenUpdate]);

  // useEffect(() => {
  //   // console.log(singleCoupons, "singleCoupons");
  //   if (singleCoupons && isOpenUpdate) {
  //     // setIsBlogTitle(singleCoupons?.title);
  //     setIsShow(singleCoupons?.images);
  //     // if (singleCoupons?.product && singleCoupons?.product.length > 0) {
  //     //   const isArray =
  //     //     singleCoupons?.product &&
  //     //     singleCoupons?.product.length > 0 &&
  //     //     singleCoupons?.product.map((items) => items?._id);
  //     //   // console.log(isArray, "isArray");
  //     //   setIsProducts(isArray);
  //     //   setIsSelection("product");
  //     // }
  //     if (singleCoupons?.categoryId && singleCoupons?.categoryId.length > 0) {
  //       const isArray2 =
  //         singleCoupons?.categoryId &&
  //         singleCoupons?.categoryId.length > 0 &&
  //         singleCoupons?.categoryId.map((items) => items?._id);
  //       // console.log(isArray, "isArray");
  //       setIsCategory(isArray2);
  //       // setIsSelection("category");
  //     }

  //     // if (singleCoupons?.eComCategoryId && singleCoupons?.eComCategoryId.length > 0) {
  //     //   const isArray2 =
  //     //     singleCoupons?.eComCategoryId &&
  //     //     singleCoupons?.eComCategoryId.length > 0 &&
  //     //     singleCoupons?.eComCategoryId.map((items) => items?._id);
  //     //   // console.log(isArray, "isArray");
  //     //   setIsCategory(isArray2);
  //     //   // setIsSelection("category");
  //     // }
  //     // else{
  //     //   const isArray2 =
  //     //   singleCoupons?.eComCategoryId &&
  //     //   singleCoupons?.eComCategoryId.length > 0 &&
  //     //   singleCoupons?.eComCategoryId.map((items) => items?._id);
  //     // // console.log(isArray, "isArray");
  //     // setIseCategory(isArray2);
  //     // setIsSelection("category");
  //     // }

  //     setCouponData((prev) => ({
  //       ...prev,
  //       couponName: singleCoupons?.couponName,
  //       couponCode: singleCoupons?.couponCode,
  //       // couponPercent: singleCoupons?.couponPercent,
  //       minimumOrderValue: singleCoupons?.minimumOrderValue,
  //       maximumDiscount: singleCoupons?.maximumDiscount,
  //       couponQuantity: singleCoupons?.couponQuantity,
  //       // backgroundColourCode: singleCoupons?.backgroundColourCode,
  //       // taskColourCode: singleCoupons?.taskColourCode,
  //       endDate: formattedDateServer(new Date(singleCoupons?.endDate)),
  //       startDate: formattedDateServer(new Date(singleCoupons?.startDate)),
  //       discount: singleCoupons?.discount,
  //       // categoryId: isCategory,
  //       // disable: singleCoupons?.disable,
  //     }));
  //   } else {
  //     setIsShow("");
  //     setIsProducts([]);
  //     setIsCategory([]);
  //     // setIsECategory([]);
  //     setCouponData((prev) => ({
  //       ...prev,
  //       couponName: "",
  //       couponCode: "",
  //       // couponPercent: "",
  //       minimumOrderValue: "",
  //       maximumDiscount: "",
  //       couponQuantity: "",
  //       // backgroundColourCode: "",
  //       // taskColourCode: "",

  //       endDate: "",
  //       discount: "",
  //       startDate: "",
  //       // validity: "",
  //       // categoryId: "",
  //     }));
  //   }
  // }, [singleCoupons, isOpenUpdate]);
  // console.log(singleBlogs);
  const handleForm = (e) => {
    const { name, value } = e.target;
    setCouponData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log({
  //   //   ...couponData,
  //   //   category: isCategory,
  //   //   products: isProducts,
  //   //   icons: isCouponsIcon,
  //   // });
  //   if (isCategory !== "" || isShow !== "") {
  //     if (isOpenUpdate) {
  //       const formData = new FormData();
  //       // if (isSelection === "product")
  //       //   isProducts &&
  //       //     isProducts?.length > 0 &&
  //       //     isProducts.map((x) => formData.append("product", x));
  //       if (type === "CATEGORY") {
  //         isCategory &&
  //           isCategory?.length > 0 &&
  //           isCategory.map((x) => formData.append("categoryId", x));
  //       }
  //       if (type === "ECOM_CATEGORY") {
  //         isCategory &&
  //           isCategory?.length > 0 &&
  //           isCategory.map((x) => formData.append("eComCategoryId", x));
  //       }

  //       formData.append("icon", isCouponsIcon);
  //       // console.log(singleCoupons?._id,"id")

  //       couponData && Object.entries(couponData).map(([key, value]) => formData.append(key, value));
  //       // console.log(...formData,"me")
  //       dispatch(
  //         updateCoupons({
  //           url: `${process.env.REACT_APP_APII}/updateCoupon/${singleCoupons?._id}/${admin}`,
  //           data: formData,
  //         })
  //       ).then((data) => {
  //         console.log(data?.payload);
  //         dispatch(
  //           handleAlert({
  //             isOpen: true,
  //             type: `${data?.payload?.success ? "success" : "error"}`,
  //             msg: data?.payload?.message,
  //           })
  //         );
  //         if (data?.payload?.success) {
  //           setIsOpen(false);
  //           setIsOpenUpdate(false);
  //           setIsShow("");
  //           setIsProducts([]);
  //           setIsCategory([]);
  //           // setIseCategory([]);
  //           setCouponData((prev) => ({
  //             ...prev,
  //             couponName: "",
  //             couponCode: "",
  //             couponPercent: "",
  //             minOrderPrice: "",
  //             maxDiscountPrice: "",
  //             couponQuantity: "",
  //             backgroundColourCode: "",
  //             taskColourCode: "",
  //             // expiryDate: "",
  //             startDate: "",
  //             validity: "",
  //             // categoryId: "",
  //             // disable: false,
  //           }));
  //           dispatch(getAllCoupons(`${process.env.REACT_APP_API}/getAllCouponByAdmin/${admin}`));
  //         }
  //       });
  //     } else {
  //       const formData = new FormData();
  //       // isSelection === "product" &&
  //       //   isProducts &&
  //       //   isProducts?.length > 0 &&
  //       //   isProducts.map((x) => formData.append("product", x));
  //       type === "CATEGORY" &&
  //         isCategory &&
  //         isCategory?.length > 0 &&
  //         isCategory.map((x) => formData.append("categoryId", x));
  //       type === "ECOM_CATEGORY" &&
  //         isCategory &&
  //         isCategory?.length > 0 &&
  //         isCategory.map((x) => formData.append("eComCategoryId", x));

  //       formData.append("icon", isCouponsIcon);
  //       // console.log(...formData)
  //       couponData && Object.entries(couponData).map(([key, value]) => formData.append(key, value));
  //       // console.log(...formData, "me")

  //       dispatch(
  //         createCoupons({
  //           url: `${process.env.REACT_APP_APII}/creatCoupon/${admin}`,
  //           data: formData,
  //         })
  //       ).then((data) => {
  //         console.log(data);
  //         dispatch(
  //           handleAlert({
  //             isOpen: true,
  //             type: `${data?.payload?.success ? "success" : "error"}`,
  //             msg: data?.payload?.message,
  //           })
  //         );
  //         if (data?.payload?.success) {
  //           setIsOpen(false);
  //           setIsOpenUpdate(false);
  //           setIsShow("");
  //           setIsProducts([]);
  //           setIsCategory([]);
  //           // setIseCategory([]);
  //           setCouponData((prev) => ({
  //             ...prev,
  //             couponName: "",
  //             couponCode: "",
  //             couponPercent: "",
  //             minOrderPrice: "",
  //             maxDiscountPrice: "",
  //             couponQuantity: "",
  //             backgroundColourCode: "",
  //             taskColourCode: "",
  //             // expiryDate: "",
  //             startDate: "",
  //             validity: "",
  //             // disable: false,
  //           }));
  //           dispatch(getAllCoupons(`${process.env.REACT_APP_API}/getAllCouponByAdmin/${admin}`));
  //         }
  //       });
  //     }
  //   } else {
  //     dispatch(
  //       handleAlert({
  //         isOpen: true,
  //         type: "warning",
  //         msg: "all fields is required !",
  //       })
  //     );
  //   }
  // };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   if (isCategory !== "" || isShow !== "") {
  //     const formData = new FormData();

  //     const {
  //       couponName,
  //       couponCode,

  //       minimumOrderValue,
  //       maximumDiscount,
  //       couponQuantity,

  //       endDate,
  //       discount,
  //       startDate,
  //     } = couponData;
  //     formData.append("couponName", couponName);
  //     formData.append("couponCode", couponCode);
  //     formData.append("minimumOrderValue", minimumOrderValue);
  //     formData.append("maximumDiscount", maximumDiscount);
  //     formData.append("couponQuantity", couponQuantity);
  //     formData.append("discount", discount);

  //     const formattedStartDate = formattedDateServer(new Date(startDate));
  //     const formattedEndDate = formattedDateServer(new Date(endDate));
  //     formData.append("startDate", formattedStartDate);
  //     formData.append("endDate", formattedEndDate);

  //     formData.append("image", isCouponsIcon);
  //     formData.append("categoryId", couponData?.categoryId);
  //     // formData.append("categoryId", category);
  //     // Object.entries(couponData).forEach(([key, value]) => formData.append(key, value));
  //     const apiUrl = isOpenUpdate
  //       ? `${process.env.REACT_APP_API}updateCoupon/${singleCoupons?._id}/${adminId}`
  //       : `${process.env.REACT_APP_API}creatCoupon/${adminId}`;

  //     dispatch(
  //       isOpenUpdate
  //         ? updateCoupons({ url: apiUrl, data: formData })
  //         : createCoupons({ url: apiUrl, data: formData })
  //     ).then((data) => {
  //       dispatch(
  //         handleAlert({
  //           isOpen: true,
  //           type: `${data?.payload?.success ? "success" : "error"}`,
  //           msg: data?.payload?.message,
  //         })
  //       );

  //       if (data?.payload?.success) {
  //         setIsOpen(false);
  //         setIsOpenUpdate(false);
  //         setIsShow("");
  //         setIsProducts([]);
  //         setIsCategory([]);
  //         // setIsECategory([]);
  //         setCouponData((prev) => ({
  //           ...prev,
  //           couponName: "",
  //           couponCode: "",
  //           // couponPercent: "",
  //           minimumOrderValue: "",
  //           maximumDiscount: "",
  //           couponQuantity: "",
  //           endDate: "",
  //           discount: "",
  //           startDate: "",
  //           // categoryId: "",
  //         }));

  //         dispatch(getAllCoupons(`${process.env.REACT_APP_API}/getAllCoupons`));
  //       }
  //     });
  //   } else {
  //     dispatch(
  //       handleAlert({
  //         isOpen: true,
  //         type: "warning",
  //         msg: "All fields are required!",
  //       })
  //     );
  //   }
  // };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isCategory !== "" || isShow !== "") {
      const formData = new FormData();

      const {
        couponName,
        couponCode,
        minimumOrderValue,
        maximumDiscount,
        couponQuantity,
        endDate,
        discount,
        startDate,
      } = couponData;

      formData.append("couponName", couponName);
      formData.append("couponCode", couponCode);
      formData.append("minimumOrderValue", minimumOrderValue);
      formData.append("maximumDiscount", maximumDiscount);
      formData.append("couponQuantity", couponQuantity);
      formData.append("discount", discount);

      const formattedStartDate = new Date(startDate).toISOString();
      const formattedEndDate = new Date(endDate).toISOString();

      formData.append("startDate", formattedStartDate);
      formData.append("endDate", formattedEndDate);

      formData.append("image", isCouponsIcon);

      // isCategory &&
      // isCategory?.length > 0 &&
      // isCategory.map((x) => formData.append("categoryId", x));


      isCategory &&
  isCategory.length > 0 &&
  isCategory.map((x) => formData.append("categoryId", JSON.stringify(x)));


  
    

      // formData.append("categoryId", category);

      const apiUrl = isOpenUpdate
        ? `${process.env.REACT_APP_API}updateCoupon/${singleCoupons?._id}/${adminId}`
        : `${process.env.REACT_APP_API}creatCoupon/${adminId}`;

      dispatch(
        isOpenUpdate
          ? updateCoupons({ url: apiUrl, data: formData })
          : createCoupons({ url: apiUrl, data: formData })
      ).then((data) => {
        dispatch(
          handleAlert({
            isOpen: true,
            type: `${data?.payload?.success ? "success" : "error"}`,
            msg: data?.payload?.message,
          })
        );

        if (data?.payload?.success) {
          resetFormState();

          dispatch(getAllCoupons(`${process.env.REACT_APP_API}/getAllCoupons`));
        }
      });
    } else {
      dispatch(
        handleAlert({
          isOpen: true,
          type: "warning",
          msg: "All fields are required!",
        })
      );
    }
  };

  const resetFormState = () => {
    setIsOpen(false);
    setIsOpenUpdate(false);
    setIsShow("");
    setIsProducts([]);
    setIsCategory([]);

    setCouponData((prev) => ({
      ...prev,
      couponName: "",
      couponCode: "",
      minimumOrderValue: "",
      maximumDiscount: "",
      couponQuantity: "",
      endDate: "",
      discount: "",
      startDate: "",
      // categoryId: "",
    }));
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
            {isOpenUpdate ? `Update Coupon's ` : " Create Coupon's"}
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
              Coupon Name <AstrieskIcon />
            </MDTypography>
            <MDInput
              disabled={createupdateLoading}
              required={true}
              type="text"
              placeholder="Coupon Name"
              fullWidth
              name="couponName"
              value={couponData?.couponName}
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
            <MDTypography variant="h6">
              Coupon Code <AstrieskIcon />
            </MDTypography>
            <MDInput
              disabled={createupdateLoading}
              required={true}
              type="text"
              placeholder="Coupon Code"
              fullWidth
              name="couponCode"
              value={couponData?.couponCode}
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
            <MDTypography variant="h6">
              Coupon Percent <AstrieskIcon />
            </MDTypography>
            <MDInput
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Percent fontSize="small" color="white" />
                  </InputAdornment>
                ),
              }}
              disabled={createupdateLoading}
              required={true}
              type="number"
              placeholder="Coupon Percent"
              fullWidth
              name="couponPercent"
              value={couponData?.couponPercent}
              onChange={handleForm}
            />
          </MDBox> */}
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
              Coupon Minimum Order Price <AstrieskIcon />
            </MDTypography>
            <MDInput
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CurrencyRupee fontSize="small" color="white" />
                  </InputAdornment>
                ),
              }}
              disabled={createupdateLoading}
              required={true}
              type="number"
              placeholder="Min Order Price"
              fullWidth
              name="minimumOrderValue"
              value={couponData?.minimumOrderValue}
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
            <MDTypography variant="h6">
              Coupon Maximum Discount Price <AstrieskIcon />
            </MDTypography>
            <MDInput
              disabled={createupdateLoading}
              //  bgColorIcon="info"
              //  icon={{
              //    component: <Percent fontSize="inherit" />,
              //    direction: "right",
              //  }}

              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CurrencyRupee fontSize="small" color="white" />
                  </InputAdornment>
                ),
              }}
              required={true}
              type="number"
              placeholder="Max Discount  Price"
              fullWidth
              name="maximumDiscount"
              value={couponData?.maximumDiscount}
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
            <MDTypography variant="h6">
              Coupon Quantity <AstrieskIcon />
            </MDTypography>
            <MDInput
              disabled={createupdateLoading}
              required={true}
              type="number"
              placeholder="Coupons Quantity"
              fullWidth
              name="couponQuantity"
              value={couponData?.couponQuantity}
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
            <MDTypography variant="h6">
              Coupon Discount <AstrieskIcon />
            </MDTypography>
            <MDInput
              disabled={createupdateLoading}
              required={true}
              type="number"
              placeholder="Coupons Quantity"
              fullWidth
              name="discount"
              value={couponData?.discount}
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
            <MDTypography variant="h6">
              Coupon Start Date <AstrieskIcon />
              <MDTypography variant="body1" component="span" fontSize={10}>
                &nbsp; (mm/dd/yyyy)
              </MDTypography>
            </MDTypography>

            <MDInput
              disabled={createupdateLoading}
              value={couponData?.startDate}
              type="date"
              name="startDate"
              onChange={handleForm}
              //  onChange={(e) =>
              //   setCouponData((prev) => ({
              //     ...prev,
              //     startDate: e,
              //   }))
              // }
              required={true}
              placeholder="Select Date"
              fullWidth={true}
            />
            {/* <SkDatePicker
              disabled={createupdateLoading}
              initialDate={couponData?.startDate}
              onDateChange={(e) =>
                setCouponData((prev) => ({
                  ...prev,
                  startDate: e,
                }))
              }
              required={true}
              placeholder="Select Date"
              fullWidth={true}
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
            <MDTypography variant="h6">
              Coupon End Date <AstrieskIcon />
              <MDTypography variant="body1" component="span" fontSize={10}>
                &nbsp; (mm/dd/yyyy)
              </MDTypography>
            </MDTypography>

            <MDInput
              disabled={createupdateLoading}
              value={couponData?.endDate}
              type="date"
              name="endDate"
              onChange={handleForm}
              //  onChange={(e) =>
              //   setCouponData((prev) => ({
              //     ...prev,
              //     startDate: e,
              //   }))
              // }
              required={true}
              placeholder="Select Date"
              fullWidth={true}
            />
            {/* <SkDatePicker
              disabled={createupdateLoading}
              initialDate={couponData?.endDate}
              onDateChange={(e) =>
                setCouponData((prev) => ({
                  ...prev,
                  endDate: e,
                }))
              }
              required={true}
              placeholder="Select Date"
              fullWidth={true}
            /> */}
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
            <MDTypography variant="h6">
              Coupon Validity <AstrieskIcon />
              <MDTypography variant="body1" component="span" fontSize={10}>
                &nbsp; (validity number&apos;s of only day&apos;s in start the coupons )
              </MDTypography>
            </MDTypography>
            <MDInput
              disabled={createupdateLoading}
              required={true}
              type="number"
              placeholder="Coupons Validity in Day's"
              fullWidth
              name="validity"
              value={couponData?.validity}
              onChange={handleForm}
            />
          </MDBox> */}
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
            <MDTypography variant="h6">
              Background Color <AstrieskIcon />
              <MDTypography variant="body1" component="span" fontSize={10}>
                &nbsp; (Background Color to Similar color than bette&apos;r UI ; &apos; )
              </MDTypography>
            </MDTypography>
            <MDInput
              disabled={createupdateLoading}
              required={true}
              type="color"
              placeholder=" Background Color"
              fullWidth
              name="backgroundColourCode"
              value={couponData?.backgroundColourCode}
              onChange={handleForm}
            />
          </MDBox> */}
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
            <MDTypography variant="h6">
              Text Colour Code
              <AstrieskIcon />
              <MDTypography variant="body1" component="span" fontSize={10}>
                &nbsp; (Text Color code to Similar color than bette&apos;r UI ; &apos; )
              </MDTypography>
            </MDTypography>
            <MDInput
              disabled={createupdateLoading}
              required={true}
              type="color"
              placeholder="Text Colour Code"
              fullWidth
              name="taskColourCode"
              value={couponData?.taskColourCode}
              onChange={handleForm}
            />
          </MDBox> */}

          {/* <MDBox
            lineHeight={1}
            gap={3}
               width={"90%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
            }}
          >
            <MDTypography variant="h6">Coupon Expiry Date</MDTypography>
             <MDInput
 required={true}
              inputProps={{
                min: formattedDateServer(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)),
              }}
              type="date"
              placeholder="Coupons expiry Date"
              fullWidth
              name="expiryDate"
              value={couponData?.expiryDate}
              onChange={handleForm}
            />
          </MDBox> */}
          <MDBox
            lineHeight={1}
            gap={3}
            width={"90%"}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              // alignItems: "center",
              justifyContent: "center",
              gap: 3,
            }}
          >
            <MDBox>
              <FormControl>
                <MDTypography variant="h6"> Select Your Category</MDTypography>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  row
                  value={isSelection}
                  onChange={(e) => setIsSelection(e.target.value)}
                >
                  <FormControlLabel
                    value="category"
                    checked
                    control={
                      <Radio
                        sx={{ color: "info.main" }}
                        // disabled={isCategory && isCategory.length > 0}
                      />
                    }
                    label="Category"
                  />
                  {/* <FormControlLabel
                    value="product"
                    control={<Radio sx={{ color: "info.main" }} />}
                    label="Products"
                    disabled={isProducts && isProducts.length > 0}
                  /> */}
                </RadioGroup>
              </FormControl>
            </MDBox>
            {isSelection === "product" && (
              <MDBox
                lineHeight={1}
                width={"100%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDTypography variant="h6" sx={{ my: 2 }}>
                  {" "}
                  Select Your Products <AstrieskIcon />
                </MDTypography>

                <ApnaSelect
                  disabled={createupdateLoading}
                  required={true}
                  data={AllProducts && AllProducts}
                  state={isProducts}
                  label="products"
                  setState={setIsProducts}
                  name="Products"
                  simpleArray={true}
                />
              </MDBox>
            )}

            <MDBox
              lineHeight={1}
              width={"100%"}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <MDTypography variant="h6" sx={{ my: 2 }}>
                {" "}
                Select Your Category <AstrieskIcon />
              </MDTypography>
              {/* {console.log(isCategory, "isCategory")} */}
              <ApnaSelect
                disabled={createupdateLoading}
                required={true}
                data={category}
                state={isCategory}
                label="category"
                setState={setIsCategory}
                name="category"
                simpleArray={true}
              />
            </MDBox>
          </MDBox>
          {/* <MDBox
            display={isOpenUpdate ? "none" : "flex"}
            alignItems="center"
            justifyContent="center"
            lineHeight={1}
            gap={3}
               width={"90%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    value={couponData?.disable}
                    checked={couponData?.disable}
                    color={"info"}
                    onChange={
                      (e) =>
                        setCouponData((prev) => ({
                          ...prev,
                          disable: e.target.checked,
                        }))
                      // setcod(e.target.checked)}}
                    }
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="disable"
              />
            </FormGroup>
          </MDBox> */}
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
              disabled={createupdateLoading}
              color={"info"}
              verdant={"gradient"}
              type={"submit"}
            >
              {createupdateLoading ? (
                <CircularProgress size={20} color="primary" />
              ) : isOpenUpdate ? (
                `Update Coupon `
              ) : (
                `Create Coupon `
              )}
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
  type: PropTypes.any,
};
