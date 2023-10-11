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
import AstrieskIcon from "components/AstrieskIcon";
import {
  Card,
  CircularProgress,
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
import ApnaSelect2 from "components/ApnaSelect";
import { getSubGlobalCategory } from "redux/festures/categorySlice";
const Form = ({ isOpenUpdate, setIsOpenUpdate, setIsOpen }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [couponData, setCouponData] = useState({
    link: "",
    // subtitle: "",
    // backgroundColourCode: "",
    // taskColourCode: "",
    // pcategory: "",
  });
  const [isCouponsIcon, setIsCouponsIcon] = useState("");
  const [isShow, setIsShow] = useState("");
  const [Loading, setLoading] = useState(false);
  const [isSelection, setIsSelection] = useState("category");
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const { homeCategory, singlehomeCategory, createUpdateLoading } = useSelector((state) => ({
    ...state.isHomeCategoryCart,
  }));

  const { category, subCategory } = useSelector((state) => ({ ...state.isCategory }));

  useEffect(() => {
    dispatch(getHomeCategoryCart(`${process.env.REACT_APP_APII}/getAllHomeCategoryCart/${admin}`));
    dispatch(getCategory(`${process.env.REACT_APP_APII}/getAllNullPcategory/${admin}`));
  }, []);

  useEffect(() => {
    if (couponData?.pcategory)
      dispatch(
        getSubGlobalCategory(
          `${process.env.REACT_APP_APII}/getCategoryWithPcategory/${couponData?.pcategory}/${admin}`
        )
      );
  }, [couponData?.pcategory]);
  // console.log(singlehomeCategory, "singlehomeCategory");
  useEffect(() => {
    if (singlehomeCategory && isOpenUpdate) {
      setIsShow(singlehomeCategory?.image);
      setCouponData((prev) => ({
        ...prev,
        link: singlehomeCategory?.link,
        // subtitle: singlehomeCategory?.subtitle,
        // backgroundColourCode: singlehomeCategory?.backgroundColourCode,
        // taskColourCode: singlehomeCategory?.taskColourCode,
        // pcategory: singlehomeCategory?.pcategory,
        // category: singlehomeCategory?.category,
      }));
    } else {
      setIsShow("");
      setCouponData((prev) => ({
        ...prev,
        link: "",
        // subtitle: "",
        // backgroundColourCode: "",
        // taskColourCode: "",
        // category: "",
        // pcategory: "",
      }));
    }
  }, [singlehomeCategory, isOpenUpdate]);

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
      setLoading(true);
      const formData = new FormData();
      formData.append("image", isCouponsIcon);
      couponData && Object.entries(couponData).map(([key, value]) => formData.append(key, value));
      dispatch(
        updateSingleCategoryCart({
          url: `${process.env.REACT_APP_API}updatehomeCategoryCart/${singlehomeCategory?._id}`,
          data: formData,
        })
      ).then((data) => {
        setLoading(false);
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
            link: "",
            // subtitle: "",
            // backgroundColourCode: "",
            // taskColourCode: "",
            // category: "",
            // pcategory: "",
          }));
          dispatch(
            getHomeCategoryCart(`${process.env.REACT_APP_API}getAllHomeCategoryCart`)
          );
        } else {
          setLoading(false);
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
      setLoading(true);
      // console.log(...formData);
      dispatch(
        createCategoryCart({
          url: `${process.env.REACT_APP_API}/createhomeCategoryCart`,
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
        setLoading(false);
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
            category: "",
            pcategory: "",
          }));
          dispatch(
            getHomeCategoryCart(`${process.env.REACT_APP_API}/getAllHomeCategoryCart`)
          );
        } else {
          setLoading(false);
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
            {isOpenUpdate ? `Update Home Category Cart's ` : " Create Home Category Cart's"}
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
            <MDTypography variant="h6">
              Link <AstrieskIcon />
            </MDTypography>
            <MDInput
              disabled={createUpdateLoading || Loading}
              required={true}
              type="text"
              placeholder="Link"
              fullWidth
              name="link"
              value={couponData?.link}
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
              Subtitle <AstrieskIcon />
            </MDTypography>
            <MDInput
              disabled={createUpdateLoading || Loading}
              required={true}
              type="text"
              placeholder="Subtitle"
              fullWidth
              name="subtitle"
              value={couponData?.subtitle}
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
              Background Colour Code <AstrieskIcon />{" "}
              <MDTypography variant="body1" component="span" fontSize={10}>
                &nbsp; (Background Color to Similar color than bette&apos;r UI &apos; )
              </MDTypography>
            </MDTypography>

            <MDInput
              disabled={createUpdateLoading || Loading}
              required={true}
              type="color"
              placeholder="Background Colour Code"
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
              Taxt Colour Code <AstrieskIcon />{" "}
              <MDTypography variant="body1" component="span" fontSize={10}>
                &nbsp; (Text Color code to Similar color than bette&apos;r UI ; &apos; )
              </MDTypography>
            </MDTypography>

            <MDInput
              disabled={createUpdateLoading || Loading}
              required={true}
              type="color"
              placeholder="Taxt Colour Code"
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
          >
            <MDTypography variant="h6">
              Select Parent Category&apos;s <AstrieskIcon />
            </MDTypography>
            <ApnaSelect2
              required={true}
              data={category}
              value={couponData?.pcategory}
              origin="Category"
              onChange={handleForm}
              name="pcategory"
              nameKey="name"
              valueKey="_id"
              simpleArray={false}
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
              Select Sub Category&apos;s <AstrieskIcon />
            </MDTypography>
            <ApnaSelect2
              required={true}
              data={subCategory}
              value={couponData?.category}
              origin="Sub Category"
              onChange={handleForm}
              name="category"
              valueKey="_id"
              nameKey="name"
              simpleArray={false}
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
            <MDTypography variant="h6">Image</MDTypography>
            <ImagePicker
              disabled={createUpdateLoading || Loading}
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
            {/* <MDButton color={"info"} verdant={"gradient"} type={"submit"}>
              {isOpenUpdate ? `Update Home Category Cart` : ` Create Home Category Cart`}
            </MDButton> */}
            <MDButton
              disabled={createUpdateLoading || Loading}
              color={"info"}
              verdant={"gradient"}
              type={"submit"}
            >
              {createUpdateLoading || Loading ? (
                <CircularProgress size={20} color="primary" />
              ) : isOpenUpdate ? (
                `Update Home Category Cart`
              ) : (
                ` Create Home Category Cart`
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
};
