import { Card } from "@mui/material";
import { formattedDateServer } from "Utils/dateFunc";
import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SkLoading from "components/SkLoading";
import { useMaterialUIController } from "context";
import React from "react";
import { useSelector } from "react-redux";

const SingleLinkableComponent = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const { Loading, singleLinkableBanners } = useSelector((data) => ({
    ...data?.isLinkableBanners,
  }));
  return (
    <>
      {" "}
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
            Linkable Banner
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
                height: 300,
                width: "80%",
                borderRadius: 3,
                border: 3,
                borderColor: "primary.main",
              }}
            >
              <img
                src={`${process.env.REACT_APP_URI}/${singleLinkableBanners?.banner}`}
                style={{ height: "100%", width: "100%", borderRadius: "5px" }}
                onError={(e) => {
                  e.onerror = null;
                  e.target.src = require("../../../../assets/images/bg-sign-up-cover.jpeg");
                }}
              />
            </MDBox>

            <MDBox
              sx={({ palette: { dark, white, info }, breakpoints }) => ({
                [breakpoints.up("xs")]: {
                  py: 1,
                },
                [breakpoints.up("sm")]: {
                  py: 1,
                },
                [breakpoints.up("md")]: {
                  px: 2,
                },
                [breakpoints.up("lg")]: {
                  px: 2,
                },

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
                sx={({ palette: { dark, white, info } }) => ({
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: 3,
                  px: 6,
                })}
              >
                <MDTypography variant="h6">Title :</MDTypography>
                <MDTypography
                  variant="h6"
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "wrap",
                    // textOverflow: "ellipsis",
                    maxWidth: "70%",
                  }}
                >
                  {singleLinkableBanners?.title}{" "}
                </MDTypography>
              </MDBox>
              {/* <MDBox
          sx={({ palette: { dark, white, info } }) => ({
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            width: "100%",
            gap: 3,
            px: 6,
          })}
        >
          <MDTypography variant="h6">Content :</MDTypography>
          <MDTypography variant="h6">{singleLinkableBanners?.content} </MDTypography>
        </MDBox> */}
              <MDBox
                sx={({ palette: { dark, white, info } }) => ({
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: 3,
                  px: 6,
                })}
              >
                <MDTypography variant="h6">Link :</MDTypography>
                <MDTypography
                  variant="h6"
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "wrap",
                    // textOverflow: "ellipsis",
                    maxWidth: "70%",
                  }}
                >
                  {singleLinkableBanners?.link}{" "}
                </MDTypography>
              </MDBox>
              <MDBox
                sx={({ palette: { dark, white, info } }) => ({
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: 3,
                  px: 6,
                })}
              >
                <MDTypography variant="h6">Show In Home :</MDTypography>
                {singleLinkableBanners?.showInHome ? (
                  <MDBadge badgeContent="Yes" color="success" variant="gradient" size="lg" />
                ) : (
                  <MDBadge badgeContent="No" color="error" variant="gradient" size="lg" />
                )}
              </MDBox>
              {/* <MDBox
                sx={({ palette: { dark, white, info } }) => ({
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: 3,
                  px: 6,
                })}
              >
                <MDTypography variant="h6">Disable :</MDTypography>
                {singleLinkableBanners?.disable ? (
                  <MDBadge badgeContent="Yes" color="success" variant="gradient" size="lg" />
                ) : (
                  <MDBadge badgeContent="No" color="error" variant="gradient" size="lg" />
                )}
              </MDBox> */}
              <MDBox
                sx={({ palette: { dark, white, info } }) => ({
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: 3,
                  px: 6,
                })}
              >
                <MDTypography variant="h6">Create At :</MDTypography>
                <MDTypography variant="h6">
                  {formattedDateServer(new Date(singleLinkableBanners?.createdAt))}
                </MDTypography>
              </MDBox>
              <MDBox
                sx={({ palette: { dark, white, info } }) => ({
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: 3,
                  px: 6,
                })}
              >
                <MDTypography variant="h6">Last Update :</MDTypography>
                <MDTypography variant="h6">
                  {formattedDateServer(new Date(singleLinkableBanners?.updatedAt))}
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        )}
      </MDBox>
    </>
  );
};

export default SingleLinkableComponent;
