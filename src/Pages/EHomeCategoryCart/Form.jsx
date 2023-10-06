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
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
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
import { getAllProducts } from "redux/festures/productSlice";
import { formattedDateServer } from "Utils/dateFunc";
import { createCoupons } from "redux/festures/couponsSlice";
import { getAllCoupons } from "redux/festures/couponsSlice";
import { updateCoupons } from "redux/festures/couponsSlice";
import SkDatePicker from "components/SkDataPicker";
import axios from "axios";
import { getHomeCategoryCart } from "redux/festures/homeCategoryCart";
import { createCategoryCart } from "redux/festures/homeCategoryCart";
import { updateSingleCategoryCart } from "redux/festures/homeCategoryCart";
import { createECategoryCart } from "redux/festures/eHomeCategoryCart";
import { updateSingleECategoryCart } from "redux/festures/eHomeCategoryCart";
import { getEHomeCategoryCart } from "redux/festures/eHomeCategoryCart";
import { CircularProgress } from "@mui/material";
import AstrieskIcon from 'components/AstrieskIcon'
import ApnaSelect2 from "components/ApnaSelect";
import { getSubGlobalCategory } from "redux/festures/categorySlice";

const Form = ({ isOpenUpdate, setIsOpenUpdate, setIsOpen }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [couponData, setCouponData] = useState({
    title: "",
    subtitle: "",
    backgroundColourCode: "",
    taskColourCode: "",
    category:"",
    pcategory:"",
  });
  // console.log(couponData?.backgroundColourCode)
  const [isCouponsIcon, setIsCouponsIcon] = useState("");
  const [isShow, setIsShow] = useState("");
  const [isSelection, setIsSelection] = useState("category");
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const { Loading, EHomeCategory, singleEHomeCategory, createUpdateLoading } = useSelector(
    (state) => ({
      ...state.isEHomeCategoryCart,
    })
  );


  const { category, subCategory } = useSelector((state) => ({ ...state.isCategory }));


  useEffect(() => {
    dispatch(getHomeCategoryCart(`${process.env.REACT_APP_APII}/getAllHomeCategoryCart/${admin}`));
    dispatch(getCategory(`${process.env.REACT_APP_APII}/eCommerce/getAllNullPcategory/${admin}` ));
  }, []);



  useEffect(() => {
    if (couponData?.pcategory) dispatch(getSubGlobalCategory( `/eCommerce/getCategoryWithPcategory/${couponData?.pcategory}/${admin}`))
  }, [couponData?.pcategory])

  useEffect(() => {
    if (singleEHomeCategory && isOpenUpdate) {
      setIsShow(singleEHomeCategory?.image);
      setCouponData((prev) => ({
        ...prev,
        title: singleEHomeCategory?.title,
        subtitle: singleEHomeCategory?.subtitle,
        backgroundColourCode: singleEHomeCategory?.backgroundColourCode,
        taskColourCode: singleEHomeCategory?.taskColourCode,
        pcategory:singleEHomeCategory?.pcategory,
        category:singleEHomeCategory?.category,
      }));
    } else {
      setIsShow("");
      setCouponData((prev) => ({
        ...prev,
        title: "",
        subtitle: "",
        backgroundColourCode: "",
        taskColourCode: "",
        category:"",
        pcategory:"",
      }));
    }
  }, [singleEHomeCategory, isOpenUpdate]);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setCouponData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isOpenUpdate) {
      const formData = new FormData();
      formData.append("image", isCouponsIcon);
      couponData && Object.entries(couponData).map(([key, value]) => formData.append(key, value));
      dispatch(
        updateSingleECategoryCart({
          url: `${process.env.REACT_APP_APII}/eCommerce/updateHomeCategoryCart/${singleEHomeCategory?._id}/${admin}`,
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
          setIsOpen(false);
          setIsOpenUpdate(false);
          setIsShow("");
          setCouponData((prev) => ({
            ...prev,
            title: "",
            subtitle: "",
            backgroundColourCode: "",
            taskColourCode: "",
            category:"",
            pcategory:"",
          }));
          dispatch(
            getEHomeCategoryCart(
              `${process.env.REACT_APP_APII}/eCommerce/getAllHomeCategoryCart/${admin}`
            )
          );
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
      const formData = new FormData();

      formData.append("image", isCouponsIcon);

      couponData && Object.entries(couponData).map(([key, value]) => formData.append(key, value));

      // console.log(formData);
      dispatch(
        createECategoryCart({
          url: `${process.env.REACT_APP_APII}/eCommerce/createHomeCategoryCart/${admin}`,
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
          setIsOpen(false);
          setIsOpenUpdate(false);
          setIsShow("");
          setCouponData((prev) => ({
            ...prev,
            title: "",
            subtitle: "",
            backgroundColourCode: "",
            taskColourCode: "",
            category:"",
            pcategory:"",
          }));
          dispatch(
            getEHomeCategoryCart(
              `${process.env.REACT_APP_APII}/eCommerce/getAllHomeCategoryCart/${admin}`
            )
          );
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
  return  <>
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
            {isOpenUpdate ? `Update E-Home Category Cart's ` : " Create E-Home Category Cart's"}
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
            <MDTypography variant="h6">Title <AstrieskIcon/></MDTypography>
            <MDInput
              disabled={createUpdateLoading}
              required={true}
              type="text"
              placeholder="Title"
              fullWidth
              name="title"
              value={couponData?.title}
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
            <MDTypography variant="h6">Subtitle <AstrieskIcon/></MDTypography>
            <MDInput
              disabled={createUpdateLoading}
              required={true}
              type="text"
              placeholder="Subtitle"
              fullWidth
              name="subtitle"
              value={couponData?.subtitle}
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
            <MDTypography variant="h6">Background Colour Code <AstrieskIcon/> <MDTypography variant="body1" component="span" fontSize={10}>
                &nbsp; (Background Color to Similar color than bette&apos;r UI ; &apos; )
              </MDTypography></MDTypography>
            
            <MDInput
              disabled={createUpdateLoading}
              required={true}
              type="color"
              placeholder="Background Colour Code"
              fullWidth
              name="backgroundColourCode"
              value={couponData?.backgroundColourCode}
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
            <MDTypography variant="h6">Text Colour Code <AstrieskIcon/>  <MDTypography variant="body1" component="span" fontSize={10}>
                &nbsp; (Text Color code to Similar color than bette&apos;r UI ; &apos; )
              </MDTypography></MDTypography>
           
            <MDInput
              disabled={createUpdateLoading}
              required={true}
              type="color"
              placeholder="Text Colour Code"
              fullWidth
              name="taskColourCode"
              value={couponData?.taskColourCode}
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
                <MDTypography variant="h6">Select Parent Category&apos;s <AstrieskIcon /></MDTypography>
                <ApnaSelect2
                  required={true}
                  data={category}
                  value={couponData?.pcategory}
                  origin="Category"
                  onChange={
                    handleForm
                  }
                  name="pcategory"
                  nameKey="name"
                  valueKey="_id"
                  simpleArray={false}
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
                <MDTypography variant="h6">Select Sub Category&apos;s <AstrieskIcon /></MDTypography>
                <ApnaSelect2
                  required={true}
                  data={subCategory}
                  value={couponData?.category}
                  origin="Sub Category"
                  onChange={
                    handleForm
                  }
                  name="category"
                  valueKey="_id"
                  nameKey="name"
                  simpleArray={false}
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
            <MDTypography variant="h6">Image</MDTypography>
            <ImagePicker
              disabled={createUpdateLoading}
              // required={true}
              name="image"
              multiple={false}
              images={isCouponsIcon}
              setImages={setIsCouponsIcon}
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
              disabled={createUpdateLoading}
              color={"info"}
              verdant={"gradient"}
              type={"submit"}
            >
              {createUpdateLoading ? (
                <CircularProgress size={20} color="primary" />
              ) : isOpenUpdate ? (
                `Update E-Home Category Cart`
              ) : (
                ` Create E-Home Category Cart`
              )}
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </>
  
};

export default Form;
Form.propTypes = {
  isOpenUpdate: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.any,
  setIsOpenUpdate: PropTypes.any,
};
