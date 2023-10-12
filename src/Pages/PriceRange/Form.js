import { Cancel } from "@mui/icons-material";
import { Card, FormControlLabel, FormGroup, Switch } from "@mui/material";
import ImagePicker from "components/ApnaUploader";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import SkLoading from "components/SkLoading";
import { useMaterialUIController } from "context";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAlert } from "redux/festures/alertSlice";
import { getBrands } from "redux/festures/brandSlice";

import AstrieskIcon from "components/AstrieskIcon";
import { updateprice } from "redux/festures/PricerangeSlice";
import { createprice } from "redux/festures/PricerangeSlice";
import { getAllprice } from "redux/festures/PricerangeSlice";

const CreateForm = ({ isOpen, isOpenUpdate, setIsOpenUpdate, setIsOpen }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [isMaxPrice, setIsMaxPrice] = useState("");
  const [isMinPrice, setIsMinPrice] = useState("");
  const [isShow, setIsShow] = useState("");
  const [isBrandShowHome, setIsBrandShowHome] = useState(false);
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const { Loading, singleprice } = useSelector((data) => ({ ...data.isPrice }));
//   console.log(singleprice, "singleprice");
  useEffect(() => {
    if (singleprice && isOpenUpdate) {
      setIsMaxPrice(singleprice?.max);
      setIsMinPrice(singleprice?.min);
  
    } else {
      setIsMaxPrice("");
      setIsMinPrice("");
   
    }
  }, [singleprice, isOpenUpdate, isOpen]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("max", isMaxPrice);
    formData.append("min", isMinPrice);


    if (isOpenUpdate) {
      dispatch(
        updateprice({
          url: `${process.env.REACT_APP_API}updatePriceRange/${singleprice?._id}/${admin}`,
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
        setIsOpen(false);
        setIsOpenUpdate(false);
        setIsMaxPrice("");
        setIsMinPrice("");
        dispatch(getAllprice(`${process.env.REACT_APP_API}/getAllPriceRange`));
      });
    } else {
      dispatch(
        createprice({
          url: `${process.env.REACT_APP_API}createPriceRange/${admin}`,
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
        setIsOpen(false);
        setIsOpenUpdate(false);
        setIsMaxPrice("");
        setIsMinPrice("");

        dispatch(getAllprice(`${process.env.REACT_APP_API}/getAllPriceRange`));
      });
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
            {isOpenUpdate ? `Update Price Range ` : " Create Price Range"}
          </MDTypography>
        </Card>
        <MDBox
          lineHeight={1}
          sx={({ palette: { dark, white, info } }) => ({
            border: 0.5,
            justifyContent: "center",
            textAlign: "center",
            flexDirection: "column",
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
            width: "100%",
            p: 3,
            borderColor: darkMode ? white.main : dark.main,
            borderRadius: 3,
          })}
          component="form"
          role="form"
          onSubmit={handleFormSubmit}
        >
          <MDBox
            lineHeight={1}
            width={"100%"}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <MDTypography variant="h6">
              Min price <AstrieskIcon />
            </MDTypography>
            <MDInput
              required={true}
              type="text"
              placeholder="Min price"
              fullWidth
              name="isMinPrice"
              value={isMinPrice}
              onChange={(e) => setIsMinPrice(e.target.value)}
            />
          </MDBox>
          <MDBox
            lineHeight={1}
            width={"100%"}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <MDTypography variant="h6">
              Max price <AstrieskIcon />
            </MDTypography>
            <MDInput
              required={true}
              type="text"
              placeholder="Max price"
              fullWidth
              name="isMaxPrice"
              value={isMaxPrice}
              onChange={(e) => setIsMaxPrice(e.target.value)}
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
        
            <MDButton color={"info"} verdant={"gradient"} type={"submit"}>
              {isOpenUpdate ? `Update price` : ` Create price`}
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </>
  );
};

export default CreateForm;
CreateForm.propTypes = {
  isOpenUpdate: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.any,
  setIsOpenUpdate: PropTypes.any,
  isOpen: PropTypes.any,

};
