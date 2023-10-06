import { Card, Divider } from "@mui/material";
import VideoPlayer from "components/ApnaUploader/VideoProvider";
import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SkLoading from "components/SkLoading";
import { useMaterialUIController } from "context";
import React from "react";
import { useSelector } from "react-redux";
import { formattedDateServer } from "Utils/dateFunc";

const SingleTutorial = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  //   const { Loading, singleTutorials } = useSelector((data) => ({ ...data.isBlogs }));
  const { Loading, singleTutorials } = useSelector((data) => ({ ...data?.isTutorials }));
  //   console.log(singleTutorials, "asdgagg");
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
            Tutorial
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
            <VideoPlayer
              value={
                singleTutorials?.videoLink || "https://www.youtube-nocookie.com/embed/ZdwNdlKnWS4"
              }
            />
            <MDTypography variant="h6">
              Video Provider : {singleTutorials?.videoProvider}{" "}
            </MDTypography>
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
                    sx={{
                      overflow: "hidden",
                      whiteSpace: "wrap",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                    }}
                  >
                    {" "}
                    Title : {singleTutorials?.title}{" "}
                  </MDTypography>
                </MDBox>
                <MDBox
                  sx={({ palette: { dark, white, info } }) => ({
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    width: "50%",
                    gap: 1,
                    flexDirection: "column",
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
                    Create At : {formattedDateServer(new Date(singleTutorials?.createdAt))}
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
                    Last Update : {formattedDateServer(new Date(singleTutorials?.updatedAt))}
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
                {/* <MDTypography variant="h6">{singleTutorials?.content} </MDTypography> */}
                <MDTypography
                  // sx={{ maxWidth: "100%" }}
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "wrap",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                  variant="h6"
                  dangerouslySetInnerHTML={{ __html: singleTutorials?.content }}
                />
              </MDBox>
              <Divider width={"100%"} />
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
                {singleTutorials?.showInHome ? (
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
                <MDTypography variant="h6">Disable :</MDTypography>
                {singleTutorials?.disable ? (
                  <MDBadge badgeContent="Yes" color="success" variant="gradient" size="lg" />
                ) : (
                  <MDBadge badgeContent="No" color="error" variant="gradient" size="lg" />
                )}
              </MDBox>
            </MDBox>
            {/* <MDBox
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
                <MDTypography variant="h6">{singleTutorials?.tital} </MDTypography>
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
                <MDTypography variant="h6">Content :</MDTypography>
                <MDTypography variant="h6">{singleTutorials?.content} </MDTypography>
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
                <MDTypography variant="h6">Video Provider :</MDTypography>
              
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
                {singleTutorials?.showInHome ? (
                  <MDBadge badgeContent="Yes" color="success" variant="gradient" size="lg" />
                ) : (
                  <MDBadge badgeContent="No" color="error" variant="gradient" size="lg" />
                )}
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
                <MDTypography variant="h6">Disable :</MDTypography>
                {singleTutorials?.disable ? (
                  <MDBadge badgeContent="Yes" color="success" variant="gradient" size="lg" />
                ) : (
                  <MDBadge badgeContent="No" color="error" variant="gradient" size="lg" />
                )}
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
                <MDTypography variant="h6">Create At :</MDTypography>
                <MDTypography variant="h6">
                  {formattedDateServer(new Date(singleTutorials?.createdAt))}
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
                  {formattedDateServer(new Date(singleTutorials?.updatedAt))}
                </MDTypography>
              </MDBox>
            </MDBox> */}
          </MDBox>
        )}
      </MDBox>
    </>
  );
};

export default SingleTutorial;
