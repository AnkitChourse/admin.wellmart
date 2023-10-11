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
import { updateTax } from "redux/festures/taxSlice";
import { getSingleTax } from "redux/festures/taxSlice";
import { getAllTax } from "redux/festures/taxSlice";
import axios from "axios";
import { getAllShiping } from "redux/festures/Shipingslice";
import { updateShiping } from "redux/festures/Shipingslice";


const Form = ({ isOpenUpdate, setIsOpenUpdate, setIsOpen }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [ShipingData, setShipingData] = useState({
    charge: "",
  });
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const { Loading, tax, singleShiping, updateLoading } = useSelector((state) => ({
    ...state?.isShiping,
  }));

  useEffect(() => {
    if (singleShiping && isOpenUpdate) {
      setShipingData((prev) => ({
        ...prev,
        charge: singleShiping?.charge,
      }));
    } else {
      setShipingData((prev) => ({
        ...prev,
        charge: "",
      }));
    }
  }, [singleShiping, isOpenUpdate]);
  const handleForm = (e) => {
    const { name, value } = e.target;
    setShipingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isOpenUpdate) {
      dispatch(
        updateShiping({
          url: `${process.env.REACT_APP_API}updateShiping/${singleShiping?._id}/${admin}`,
          data: ShipingData,
        })
      ).then((data) => {
        console.log(data,"data")
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
          setShipingData((prev) => ({
            ...prev,
            charge: singleShiping?.charge,
          }));
          dispatch(getAllShiping(`/getAllShiping/${admin}`));
        }
      });
    } else {
      dispatch(
        handleAlert({
          isOpen: true,
          type: "warning",
          msg: "all fields is required !",
        })
      );
    }
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
            {`Update Shiping`}
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
              {" "}
              Shiping charge <AstrieskIcon />
            </MDTypography>
            <MDInput
              disabled={updateLoading}
              required={true}
              type="number"
              placeholder="Shiping charge"
              fullWidth
              name="charge"
              value={ShipingData?.charge}
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
            <MDButton disabled={updateLoading} color={"info"} verdant={"gradient"} type={"submit"}>
              {updateLoading ? (
                <CircularProgress size={20} color="primary" />
              ) : isOpenUpdate ? (
                `Update Shiping `
              ) : (
                `Create Shiping `
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
