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
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  ListItemText,
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
import { getHomeCategoryCart } from "redux/festures/homeCategoryCart";
import { createCategoryCart } from "redux/festures/homeCategoryCart";
import { updateSingleCategoryCart } from "redux/festures/homeCategoryCart";
import { createECategoryCart } from "redux/festures/eHomeCategoryCart";
import { updateSingleECategoryCart } from "redux/festures/eHomeCategoryCart";
import { getEHomeCategoryCart } from "redux/festures/eHomeCategoryCart";
import { createEHomeProduct } from "redux/festures/eHomeProduct";
import { updateSingleEHomeProduct } from "redux/festures/eHomeProduct";
import { getEHomeProduct } from "redux/festures/eHomeProduct";
import { getAllEProduct } from "redux/festures/eHomeProduct";
import InfiniteApnaSelect from "components/ApnaSelect/InfiniteApnaSelect";
import { CircularProgress } from "@mui/material";
import AstrieskIcon from 'components/AstrieskIcon'

const Form = ({ isOpenUpdate, setIsOpenUpdate, setIsOpen }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [isProducts, setIsProducts] = useState([]);
  const [couponData, setCouponData] = useState({
    title: "",
    description: "",
    products: [],
  });
  // console.log(couponData?.backgroundColourCode)
  const [isCouponsIcon, setIsCouponsIcon] = useState("");
  const [isShow, setIsShow] = useState("");

  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const { Loading, HomeProduct, singleHomeProduct, AllProduct, createUpdateLoading } = useSelector(
    (state) => ({
      ...state.isEHomeProduct,
    })
  );
  // console.log(singleHomeProduct?.products);

  useEffect(() => {
    if (singleHomeProduct && isOpenUpdate) {
      const isArray =
        singleHomeProduct?.products &&
        singleHomeProduct?.products.length > 0 &&
        singleHomeProduct?.products.map((items) => items?._id);
      setIsProducts(isArray);
      setIsShow(singleHomeProduct?.image);
      setCouponData((prev) => ({
        ...prev,
        title: singleHomeProduct?.title,
        description: singleHomeProduct?.description,
        // products: couponData?.products,
        products: isArray,
      }));
    } else {
      setIsShow("");
      setCouponData((prev) => ({
        ...prev,
        title: "",
        description: "",
        products: [],
      }));
    }
  }, [singleHomeProduct, isOpenUpdate]);

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
      dispatch(
        updateSingleEHomeProduct({
          url: `${process.env.REACT_APP_APII}/eCommerce/updateHomeProduct/${singleHomeProduct?._id}/${admin}`,
          data: couponData,
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
            description: "",
            products: [],
          }));
          dispatch(
            getEHomeProduct(`${process.env.REACT_APP_APII}/eCommerce/getAllHomeProduct/${admin}`)
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
      dispatch(
        createEHomeProduct({
          url: `${process.env.REACT_APP_APII}/eCommerce/createHomeProduct/${admin}`,
          data: couponData,
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
            description: "",
            products: [],
          }));
          dispatch(
            getEHomeProduct(`${process.env.REACT_APP_APII}/eCommerce/getAllHomeProduct/${admin}`)
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
            {isOpenUpdate ? `Update E-Home Product's ` : " Create E-Home Product's"}
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
            <MDTypography variant="h6">Description <AstrieskIcon/></MDTypography>
            <MDInput
              disabled={createUpdateLoading}
              required={true}
              type="text"
              placeholder="Description"
              fullWidth
              name="description"
              value={couponData?.description}
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
            <MDTypography variant="h6" sx={{ my: 2 }}>
              {" "}
              Select Your Product
            </MDTypography>

            <InfiniteApnaSelect
              multi={true}
              disabled={createUpdateLoading}
              fetchApi={`/eCommerce/filterProductByDate/${admin}`}
              value={couponData?.products}
              name="productId"
              onChange={(e) =>
                setCouponData((prev) => ({
                  ...prev,
                  products: e.target.value,
                }))
              }
              origin="Products"
              valueKey="_id"
              nameKey="title"
              isSimpleArray={false}
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
              {createUpdateLoading ? (
                <CircularProgress size={20} color="primary" />
              ) : isOpenUpdate ? (
                `Update E-Home Product`
              ) : (
                ` Create E-Home Product`
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
