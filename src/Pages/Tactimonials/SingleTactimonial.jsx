import { Card, Chip, Divider, Rating } from "@mui/material";
import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SkLoading from "components/SkLoading";
import { useMaterialUIController } from "context";
import React from "react";
import { useSelector } from "react-redux";
import { formattedDateServer } from "Utils/dateFunc";

const SingleTactimonial = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  //   const { Loading, singleBlogs } = useSelector((data) => ({ ...data.isBlogs }));
  const { Loading, singleBlogs } = useSelector((data) => ({ ...data?.isBlogs }));
    // console.log(singleBlogs, "asdgagg");
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
          Tactimonial
          </MDTypography>
        </Card>
        {Loading ? (
          <SkLoading />
        ) : (
          <MDBox
            display="flex"
            alignItems="center"
            lineHeight={1}
            sx={({ palette: { dark, white, info } }) => ({
              border: 0.5,
              borderColor: darkMode ? white.main : dark.main,
              borderRadius: 3,
              p: 3,
              width: "100%",
              //   height: "70vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 2,
            })}
          >
            <MDBox
              sx={{
                height: 300,
                width: "100%",

                border: 3,
                borderColor: "primary.main",
              }}
            >
              <img
                src={`${process.env.REACT_APP_URI}/${singleBlogs?.image}`}
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
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
                  gap: 1,

                  [breakpoints.up("xs")]: {
                    flexDirection: "column",
                    px: 1,
                  },
                  [breakpoints.up("sm")]: {
                    flexDirection: "column",
                    px: 1,
                  },
                  [breakpoints.up("md")]: {
                    flexDirection: "row",
                    px: 3,
                  },
                  [breakpoints.up("lg")]: {
                    flexDirection: "row",
                    px: 3,
                  },
                })}
              >
                <MDBox
                  sx={({ palette: { dark, white, info }, breakpoints }) => ({
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    width: "50%",
                    gap: 1,
                    flexDirection: "column",
                    [breakpoints.up("xs")]: {
                      width: "100%",
                      justifyContent: "space-between",
                    },
                    [breakpoints.up("sm")]: {
                      width: "100%",
                      justifyContent: "space-between",
                    },
                    [breakpoints.up("md")]: {
                      width: "50%",
                      justifyContent: "flex-start",
                    },
                    [breakpoints.up("lg")]: {
                      width: "50%",
                      justifyContent: "flex-start",
                    },
                  })}
                >
                  <MDTypography
                    variant="h6"
                    sx={{
                      overflow: "hidden",
                      whiteSpace: "wrap",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                    }}
                  >
                    {" "}
                    Name : {singleBlogs?.name}{" "}
                  </MDTypography>
                  <MDTypography
                    variant="h6"
                    sx={{
                      overflow: "hidden",
                      whiteSpace: "wrap",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                    }}
                  >
                    {" "}
                    Description : {singleBlogs?.description}{" "}
                  </MDTypography>
                  <MDTypography
                    variant="h6"
                    sx={{
                      overflow: "hidden",
                      whiteSpace: "wrap",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                      display:"flex",
                      alignItems:"center",
                    }}
                  >
                    {" "}
                    Rating :&nbsp;&nbsp;<Rating name="read-only" value={singleBlogs?.rating || "N/A"} readOnly />
                  </MDTypography>
                </MDBox>
                <MDBox
                  sx={({ palette: { dark, white, info }, breakpoints }) => ({
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    width: "50%",
                    gap: 1,
                    flexDirection: "column",
                    [breakpoints.up("xs")]: {
                      width: "100%",
                      justifyContent: "flex-start",
                    },
                    [breakpoints.up("sm")]: {
                      width: "100%",
                      justifyContent: "flex-start",
                    },
                    [breakpoints.up("md")]: {
                      width: "50%",
                      justifyContent: "flex-end",
                    },
                    [breakpoints.up("lg")]: {
                      width: "50%",
                      justifyContent: "flex-end",
                    },
                  })}
                >
                  <MDTypography
                    variant="h6"
                    sx={({ palette: { dark, white, info }, breakpoints }) => ({
                      display: "flex",
                      alignItems: "flex-end",
                      [breakpoints.up("xs")]: {
                        overflow: "hidden",
                        whiteSpace: "wrap",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                        justifyContent: "flex-start",
                        textAlign: "left",
                        width: "100%",
                      },
                      [breakpoints.up("sm")]: {
                        overflow: "hidden",
                        whiteSpace: "wrap",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                        justifyContent: "flex-start",
                        textAlign: "left",
                        width: "100%",
                      },
                      [breakpoints.up("md")]: {
                        overflow: "hidden",
                        whiteSpace: "wrap",
                        textOverflow: "ellipsis",
                        maxWidth: "70%",
                        justifyContent: "flex-end",
                        textAlign: "right",
                        width: "100%",
                      },
                      [breakpoints.up("lg")]: {
                        overflow: "hidden",
                        whiteSpace: "wrap",
                        textOverflow: "ellipsis",
                        maxWidth: "70%",
                        justifyContent: "flex-end",
                        textAlign: "right",
                        width: "100%",
                      },
                    })}
                  >
                    Create At : {formattedDateServer(new Date(singleBlogs?.createdAt))}
                  </MDTypography>
                  <MDTypography
                    variant="h6"
                    sx={({ palette: { dark, white, info }, breakpoints }) => ({
                      display: "flex",
                      alignItems: "flex-end",
                      [breakpoints.up("xs")]: {
                        overflow: "hidden",
                        whiteSpace: "wrap",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                        justifyContent: "flex-start",
                        textAlign: "left",
                        width: "100%",
                      },
                      [breakpoints.up("sm")]: {
                        overflow: "hidden",
                        whiteSpace: "wrap",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                        justifyContent: "flex-start",
                        textAlign: "left",
                        width: "100%",
                      },
                      [breakpoints.up("md")]: {
                        overflow: "hidden",
                        whiteSpace: "wrap",
                        textOverflow: "ellipsis",
                        maxWidth: "70%",
                        justifyContent: "flex-end",
                        textAlign: "right",
                        width: "100%",
                      },
                      [breakpoints.up("lg")]: {
                        overflow: "hidden",
                        whiteSpace: "wrap",
                        textOverflow: "ellipsis",
                        maxWidth: "70%",
                        justifyContent: "flex-end",
                        textAlign: "right",
                        width: "100%",
                      },
                    })}
                  >
                    Last Update : {formattedDateServer(new Date(singleBlogs?.updatedAt))}
                  </MDTypography>
                </MDBox>
              </MDBox>
              <MDBox
                sx={({ palette: { dark, white, info } }) => ({
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: 1,
                  flexDirection: "column",

                  px: 3,
                })}
              >
                <MDBox
                  sx={({ palette: { dark, white, info } }) => ({
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    borderTop: 1,
                    borderTopColor: darkMode ? white.main : info.main,
                  })}
                >
                  {" "}
                  <MDBadge
                    badgeContent="Content"
                    color="success"
                    variant="gradient"
                    size="lg"
                    sx={{ zIndex: 10, mt: -1.5 }}
                  />
                </MDBox>
                {/* <MDTypography variant="h6">Content :</MDTypography> */}
                {/* <MDTypography variant="h6">{singleBlogs?.content} </MDTypography> */}
                <MDTypography
                  variant="h6"
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "wrap",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                  dangerouslySetInnerHTML={{ __html: singleBlogs?.content }}
                />
              </MDBox>
              <Divider width={"100%"} />
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
                {singleBlogs?.showInHome ? (
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
                {singleBlogs?.disable ? (
                  <MDBadge badgeContent="Yes" color="success" variant="gradient" size="lg" />
                ) : (
                  <MDBadge badgeContent="No" color="error" variant="gradient" size="lg" />
                )}
              </MDBox>
            </MDBox>
          </MDBox>
        )}
      </MDBox>
    </>
  );
};

export default SingleTactimonial;
