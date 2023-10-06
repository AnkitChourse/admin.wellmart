import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useMaterialUIController } from "context";
import MDBox from "components/MDBox";
import { Card } from "@mui/material";
import MDTypography from "components/MDTypography";
import SkLoading from "components/SkLoading";
import MDBadge from "components/MDBadge";
import { formattedDateServer } from "Utils/dateFunc";
const SingleBrand = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const { Loading, singleBrands } = useSelector((data) => ({ ...data.isBrand }));
  // console.log(singleBrands, "singleBrands");
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
            Brand
          </MDTypography>
        </Card>
        {Loading ? (
          <SkLoading />
        ) : (
          <MDBox
            display="flex"
            alignItems="center"
            lineHeight={1}
            sx={({ palette: { dark, white, info }, breakpoints }) => ({
              border: 0.5,
              borderColor: darkMode ? white.main : dark.main,
              borderRadius: 3,
              width: "100%",
              //   height: "70vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 2,
              [breakpoints.up("xs")]: {
                py: 3,
              },
              [breakpoints.up("sm")]: {
                py: 3,
              },
              [breakpoints.up("md")]: {
                p: 3,
              },
              [breakpoints.up("lg")]: {
                p: 3,
              },
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
                src={`${process.env.REACT_APP_URI}/${singleBrands?.icon}`}
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
                px: 2,
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
                <MDTypography variant="h6">Name :</MDTypography>
                <MDTypography
                  variant="h6"
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    maxWidth: "70%",
                  }}
                >
                  {singleBrands?.name}{" "}
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
                <MDTypography variant="h6">Show In Home :</MDTypography>
                {singleBrands?.showInHome ? (
                  <MDBadge badgeContent="Yes" color="success" variant="gradient" size="lg" />
                ) : (
                  <MDBadge badgeContent="No" color="error" variant="gradient" size="lg" />
                )}
              </MDBox> */}
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
                <MDTypography variant="h6">Disable :</MDTypography>
                {singleBrands?.disable ? (
                  <MDBadge badgeContent="Yes" color="success" variant="gradient" size="lg" />
                ) : (
                  <MDBadge badgeContent="No" color="error" variant="gradient" size="lg" />
                )}
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
                <MDTypography variant="h6">Create At :</MDTypography>
                <MDTypography variant="h6">
                  {formattedDateServer(new Date(singleBrands?.createdAt))}
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
                <MDTypography variant="h6">Last Update :</MDTypography>
                <MDTypography variant="h6">
                  {formattedDateServer(new Date(singleBrands?.updatedAt))}
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        )}
      </MDBox>
    </>
  );
};

export default SingleBrand;
SingleBrand.propTypes = {
  //   isOpenUpdate: PropTypes.bool.isRequired,
  //   setIsOpen: PropTypes.any,
  //   setIsOpenUpdate: PropTypes.any,
  //   setIsSwitch: PropTypes.func,
  //   isSwitch: PropTypes.any,
  //   productId: PropTypes.string,
  //   updateProductModal: PropTypes.bool,
  //   setUpdateProductModal: PropTypes.bool,
};
