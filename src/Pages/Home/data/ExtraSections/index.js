import { Card, Divider } from "@mui/material";
import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SkLoading from "components/SkLoading";
import { useMaterialUIController } from "context";
import React from "react";
import { useSelector } from "react-redux";
import { SkPrice } from "Utils/dateFunc";
import { camelToFlat } from "Utils/dateFunc";
import { formattedDateServer } from "Utils/dateFunc";

const SingleExtraSections = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  //   const { Loading, singleExtraSections } = useSelector((data) => ({ ...data.isBlogs }));
  const { Loading, singleExtraSections } = useSelector((data) => ({ ...data?.isExtraSections }));
  // console.log(singleExtraSections, "asdgagg");
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
            Extra Sections Details
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
                height: 300,
                width: "80%",
                borderRadius: 3,
                border: 3,
                borderColor: "primary.main",
              }}
            >
              <img
                src={`${process.env.REACT_APP_URI}/${singleExtraSections?.banner}`}
                style={{ height: "100%", width: "100%", borderRadius: "5px" }}
                onError={(e) => {
                  e.onerror = null;
                  e.target.src = require("../../../../assets/images/bg-sign-up-cover.jpeg");
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
                  {camelToFlat(singleExtraSections?.name)}{" "}
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
                <MDTypography variant="h6">Content :</MDTypography>
                <MDTypography variant="h6">{singleExtraSections?.content} </MDTypography>
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
                <MDTypography variant="h6">Show In Home :</MDTypography>
                {singleExtraSections?.showInHome ? (
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
                <MDTypography variant="h6">Visibility :</MDTypography>
                {singleExtraSections?.visibility ? (
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
                  {formattedDateServer(new Date(singleExtraSections?.createdAt))}
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
                  {formattedDateServer(new Date(singleExtraSections?.updatedAt))}
                </MDTypography>
              </MDBox>
              {singleExtraSections?.products && singleExtraSections?.products.length > 0 && (
                <MDBox
                  // sx={({ palette: { dark, white, info } }) => ({
                  //   display: "flex",
                  //   flexDirection: "column",
                  //   alignItems: "center",
                  //   justifyContent: "center",
                  //   width: "100%",
                  //   gap: 5,
                  //   px: 6,
                  // })}
                  sx={({ palette: { dark, white, info }, breakpoints }) => ({
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    gap: 5,
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
                  <MDTypography variant="h4">Products :</MDTypography>
                  {/* <MDTypography variant="h6">
                  {formattedDateServer(new Date(singleExtraSections?.updatedAt))}
                </MDTypography> */}
                  <MDBox
                    sx={({ palette: { dark, white, info } }) => ({
                      display: "flex",
                      // flexDirection: "column",
                      flexWrap: "Wrap",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      gap: 3,
                    })}
                  >
                    {singleExtraSections?.products &&
                      singleExtraSections?.products.length > 0 &&
                      singleExtraSections?.products.map((value) => (
                        <Card key={value?._id} sx={{ minWidth: 300, my: 1 }}>
                          <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
                            <MDBox
                              variant="gradient"
                              bgColor={"success"}
                              color={"success" === "light" ? "dark" : "white"}
                              coloredShadow={"success"}
                              borderRadius="xl"
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              width="5rem"
                              height="5rem"
                              mt={-3}
                            >
                              <img
                                src={`${process.env.REACT_APP_URI}/${value?.thumbnail}`}
                                onError={(e) => {
                                  e.onerror = null;
                                  e.target.src = require("../../../../assets/images/bg-sign-up-cover.jpeg");
                                }}
                                style={{ width: "100%", height: "100%" }}
                              />
                            </MDBox>
                            <MDBox textAlign="right" lineHeight={1.25}>
                              <MDTypography variant="button" fontWeight="light" color="text">
                                {value?.quantity && `Qty :${value?.quantity}`}
                              </MDTypography>
                              <MDTypography
                                variant="h4"
                                sx={{
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                  maxWidth: 170,
                                }}
                              >
                                {value?.name}
                              </MDTypography>
                            </MDBox>
                          </MDBox>
                          <Divider />
                          <MDBox pb={2} px={2}>
                            <MDTypography
                              component="p"
                              variant="button"
                              color="text"
                              display="flex"
                            >
                              <MDTypography
                                component="span"
                                variant="button"
                                fontWeight="bold"
                                color={"success"}
                              >
                                {SkPrice(value?.ofPrice)}
                              </MDTypography>
                              &nbsp;
                              <span style={{ textDecoration: "line-through" }}>
                                {SkPrice(value?.unitPrice)}
                              </span>
                            </MDTypography>
                          </MDBox>
                        </Card>
                      ))}
                  </MDBox>
                </MDBox>
              )}
            </MDBox>
          </MDBox>
        )}
      </MDBox>
    </>
  );
};

export default SingleExtraSections;
