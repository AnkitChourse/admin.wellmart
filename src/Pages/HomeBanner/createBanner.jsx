import { Cancel } from "@mui/icons-material";
import { Card, CircularProgress, FormControlLabel, FormGroup, Switch } from "@mui/material";
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
import { createHomeBanner } from "redux/festures/homeBannerSlice";
import { updateHomeBanner } from "redux/festures/homeBannerSlice";
import { getAllHomeBanner,getSingleHomeBanner } from "redux/festures/homeBannerSlice";
import AstrieskIcon from 'components/AstrieskIcon'


const CreateBranner = ({ isOpen, isOpenUpdate, setIsOpenUpdate, setIsOpen }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [isBrandName, setIsBrandName] = useState("");
  const [isBrandImage, setIsBrandImage] = useState("");
  const [isShow, setIsShow] = useState("");
  const [isBrandShowHome, setIsBrandShowHome] = useState(false);
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const { Loading, AllHomeBanner, singleHomeBanner,createHomeLoading } = useSelector((state) => ({
    ...state.isHomeBanner,
  }));
  // console.log(singleHomeBanner, "singleBrands");
  useEffect(() => {
    if (singleHomeBanner && isOpenUpdate) {
      setIsBrandName(singleHomeBanner?.title);
      setIsShow(singleHomeBanner?.banner);
      // setIsBrandShowHome(singleBrands?.showInHome);
    } else {
      setIsBrandName("");
      setIsShow("");
      // setIsBrandShowHome("");
    }
  }, [singleHomeBanner, isOpenUpdate, isOpen]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if ((isBrandImage && isBrandImage !== "") || (isShow && isShow !== "")) {
      if (isOpenUpdate) {
        const formData = new FormData();
        formData.append("title", isBrandName);
        formData.append("banner", isBrandImage);
        // formData.append("showInHome", isBrandShowHome);
        // console.log(...formData, "akldjhksjdhnsdfg");
        dispatch(
          updateHomeBanner({
            url: `${process.env.REACT_APP_APII}/updateHomeBanner/${singleHomeBanner?._id}/${admin}`,
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
          setIsBrandName("");
          setIsBrandImage("");
          // setIsBrandShowHome("");
          dispatch(getAllHomeBanner(`/getAllHomeBanner/${admin}`));
        });
      } else {
        const formData = new FormData();
        formData.append("title", isBrandName);
        formData.append("banner", isBrandImage);
        // formData.append("showInHome", isBrandShowHome);
        // console.log(...formData, "akldjhksjdhnsdfg");
        dispatch(
          createHomeBanner({
            url: `${process.env.REACT_APP_APII}/createHomeBanner/${admin}`,
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
          setIsBrandName("");
          setIsBrandImage("");
          // setIsBrandShowHome("");
          dispatch(getAllHomeBanner(`/getAllHomeBanner/${admin}`));
        });
      }
    } else {
      dispatch(
        handleAlert({
          isOpen: true,
          type: "warning",
          msg: "all filed is required",
        })
      );
    }
  };
  return <>
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
            {isOpenUpdate ? `Update Banner ` : " Create Banner"}
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
            <MDTypography variant="h6">Banner Title <AstrieskIcon/></MDTypography>
            <MDInput
            disabled={createHomeLoading}
              required={true}
              type="text"
              placeholder="Brand Name"
              fullWidth
              name="name"
              value={isBrandName}
              onChange={(e) => setIsBrandName(e.target.value)}
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
              Home Banner Image{" "}
              {/* <MDTypography variant="body1" component="span" fontSize={11}>
                &nbsp; ( image size - 247 × 247 px )
              </MDTypography> */}
            </MDTypography>
            <ImagePicker
              // required={true}
              disabled={createHomeLoading}
              name="Brand Image"
              multiple={false}
              images={isBrandImage}
              setImages={setIsBrandImage}
              //
            />

            {isBrandImage === "" && isShow && (
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
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
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
          {/* <MDBox
            lineHeight={1}
            width={"90%"}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 3,
            }}
          >
            <MDTypography variant="h6">Brand show in home </MDTypography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    value={isBrandShowHome}
                    checked={isBrandShowHome !== undefined ? isBrandShowHome : false}
                    sx={{ color: "info.main" }}
                    onChange={(e) => setIsBrandShowHome(e.target.checked)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="show in home"
              />
            </FormGroup>
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
            <MDButton    disabled={createHomeLoading} color={"info"} verdant={"gradient"} type={"submit"}>
            {createHomeLoading ? (
                <CircularProgress size={20} color="primary" />
              ) : isOpenUpdate ? (
                `Update Banner` 
              ) : (
               `Create Banner` 
              )}
             
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </>
  
};

export default CreateBranner;
CreateBranner.propTypes = {
  isOpenUpdate: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.any,
  setIsOpenUpdate: PropTypes.any,
  isOpen: PropTypes.any,
  //   setIsSwitch: PropTypes.func,
  //   isSwitch: PropTypes.any,
  //   productId: PropTypes.string,
  //   updateProductModal: PropTypes.bool,
  //   setUpdateProductModal: PropTypes.bool,
};
