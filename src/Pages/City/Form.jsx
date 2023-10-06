import MDButton from "components/MDButton";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useMaterialUIController } from "context";
import { useDispatch, useSelector } from "react-redux";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SkLoading from "components/SkLoading";
import MDInput from "components/MDInput";
import CircularProgress from '@mui/material/CircularProgress';
import {
  Card,
} from "@mui/material";
import { handleAlert } from "redux/festures/alertSlice";
import { createCity, updateCity, getAllCity } from "redux/festures/citySlice";
import AstrieskIcon from 'components/AstrieskIcon'

const Form = ({ isOpen, setIsOpen }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [data, setData] = useState({
    cityName: "",
    cityId: "",
  });

  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();

  const { createUpdateLoading } = useSelector((data) => ({ ...data?.isCity }));

  useEffect(() => {
    // setIsBlogTitle(singleCoupons?.title);
    if (isOpen?.state) {
      setData({
        cityId: isOpen?.data?.cityId || "",
        cityName: isOpen?.data?.cityName || ""
      })
    }
  }, [isOpen]);
  // console.log(singleBlogs);
  const handleForm = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      isOpen?.data ? updateCity({
        url: `/updateCity/${isOpen?.data?._id}/${admin}`,
        data
      })
        :
        createCity({
          url: `/createCity/${admin}`,
          data
        })
    )
      .then((data) => {
        dispatch(
          handleAlert({
            isOpen: true,
            type: `${data?.payload?.success ? "success" : "error"}`,
            msg: data?.payload?.message,
          })
        );
        if (data?.payload?.success) {
          setIsOpen({
            state: false,
            data: null
          });
          dispatch(getAllCity(`/getAllCityByAdmin/${admin}`));
        }
      })
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
            {isOpen?.data ? `Update City ` : " Create City"}
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
            <MDTypography variant="h6">City Id <AstrieskIcon/></MDTypography>
            <MDInput
              disabled={createUpdateLoading}
              required={true}
              type="text"
              placeholder="City Id"
              fullWidth
              name="cityId"
              value={data?.cityId}
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
            <MDTypography variant="h6">City Name<AstrieskIcon/></MDTypography>
            <MDInput
              disabled={createUpdateLoading}
              required={true}
              type="text"
              placeholder="City Name"
              fullWidth
              name="cityName"
              value={data?.cityName}
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
            <MDButton color={"info"} verdant={"gradient"} type={"submit"}>
              {createUpdateLoading ? <CircularProgress size={20} color="white" /> : isOpen?.data ? `Update City` : ` Create City`}
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </>
  );
};

export default Form;
Form.propTypes = {
  setIsOpen: PropTypes.any,
  isOpen: PropTypes.any
};
