import { Card, Divider } from "@mui/material";
import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SkLoading from "components/SkLoading";
import SwiperSlider from "components/SkSlider/Swiper";
import { useMaterialUIController } from "context";
import React from "react";
import { useSelector } from "react-redux";
import { SwiperSlide } from "swiper/react";
import { SkPrice } from "Utils/dateFunc";
import { formattedDateServer } from "Utils/dateFunc";

const Details = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const { Loading, HomeProduct, singleHomeProduct } = useSelector((state) => ({
    ...state.isHomeProduct,
  }));
//   console.log(singleHomeProduct, "singleHomeProduct");

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
            Home Product Details
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
              p: 2,
              width: "100%",
              //   height: "70vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 2,
            })}
          >
            {/* <MDBox
              sx={{
                height: 200,
                width: 200,
                borderRadius: "50%",
                border: 3,
                borderColor: "primary.main",
              }}
            >
              <img
                src={`${process.env.REACT_APP_URI}/${singleHomeProduct?.image}`}
                style={{ height: "100%", width: "100%", borderRadius: "50%", objectFit: "cover" }}
                onError={(e) => {
                  e.onerror = null;
                  e.target.src = require("../../assets/images/bg-sign-up-cover.jpeg");
                }}
              />
            </MDBox> */}
            <MDBox
              sx={({ palette: { dark, white, info } }) => ({
                // border: 0.5,
                // borderColor: darkMode ? white.main : dark.main,
                // borderRadius: 3,

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
                <MDTypography variant="h6">Title :</MDTypography>
                <MDTypography
                  variant="h6"
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "wrap",
                    textOverflow: "ellipsis",
                    maxWidth: "70%",
                  }}
                >
                  {singleHomeProduct?.title}{" "}
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
                <MDTypography variant="h6">Description :</MDTypography>
                <MDTypography
                  variant="h6"
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "wrap",
                    textOverflow: "ellipsis",
                    width: "50%",
                    justifyContent: "end",
                    display: "flex",
                    
                  }}
                  // style={{
                  //   maxWidth: "250px",
                  //   lineHeight: "20px",
                  //   display: "-webkit-box",
                  //   WebkitBoxOrient: "vertical",
                  //   WebkitLineClamp: 2,
                  //   overflow: "hidden",
                  //   textOverflow: "ellipsis",
                  // }}
                >
                  {singleHomeProduct?.description}
                </MDTypography>
              </MDBox>

              {singleHomeProduct?.products.map((ele, i) => (
                <>
                <hr style={{width:"100%"}}/>
                <MDTypography variant="h6"> Product {i+1} </MDTypography>

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
                    <MDTypography variant="h6"> Product Title :</MDTypography>
                    <MDTypography
                      variant="h6"
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "wrap",
                        textOverflow: "ellipsis",
                        maxWidth: "50%",
                        justifyContent: "end",
                        display: "flex",
                      }}
                      // style={{
                      //   maxWidth: "400px",
                      //   lineHeight: "20px",
                      //   display: "-webkit-box",
                      //   WebkitBoxOrient: "vertical",
                      //   WebkitLineClamp: 2,
                      //   overflow: "hidden",
                      //   textOverflow: "ellipsis",

                      // }}
                    >
                      {ele?.title || "-"}
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
                    <MDTypography variant="h6"> Products Description :</MDTypography>
                    <MDTypography
                      variant="h6"
                      style={{
                        overflow: "hidden",
                        whiteSpace: "wrap",
                        textOverflow: "ellipsis",
                        width: "50%",
                        justifyContent: "end",
                        display: "flex",
                      }}

                      // style={{
                      //   maxWidth: "400px",
                      //   lineHeight: "20px",
                      //   display: "-webkit-box",
                      //   WebkitBoxOrient: "vertical",
                      //   WebkitLineClamp: 2,
                      //   overflow: "hidden",
                      //   textOverflow: "ellipsis",
                      // }}

                      dangerouslySetInnerHTML={{ __html: ele?.description }}
                    />
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
                    <MDTypography variant="h6"> Products Subtitle :</MDTypography>
                    <MDTypography variant="h6"  
                        style={{
                          overflow: "hidden",
                          whiteSpace: "wrap",
                          textOverflow: "ellipsis",
                          width: "50%",
                          justifyContent: "end",
                          display: "flex",
                        }}
                    // style={{
                    //     maxWidth: "400px",
                    //     lineHeight: "20px",
                    //     display: "-webkit-box",
                    //     WebkitBoxOrient: "vertical",
                    //     WebkitLineClamp: 2,
                    //     overflow: "hidden",
                    //     textOverflow: "ellipsis",
                    //   }}
                      >{ele?.subtitle || "-"}</MDTypography>
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
                    <MDTypography variant="h6"> Products Price :</MDTypography>
                    <MDTypography variant="h6" 
                    //  style={{
                    //     maxWidth: "400px",
                    //     lineHeight: "20px",
                    //     display: "-webkit-box",
                    //     WebkitBoxOrient: "vertical",
                    //     WebkitLineClamp: 2,
                    //     overflow: "hidden",
                    //     textOverflow: "ellipsis",
                    //   }}
                      >{ele?.price || "-"}</MDTypography>
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
                    <MDTypography variant="h6"> Products MRP :</MDTypography>
                    <MDTypography variant="h6"  style={{
                        maxWidth: "400px",
                        lineHeight: "20px",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      >{ele?.mrp || "-"}</MDTypography>
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
                    <MDTypography variant="h6"> Products Exclude :</MDTypography>
                    <MDBox width= "50%">
                    {ele?.exclude.map((value,i)=>
                    <MDTypography variant="h6" key={i}  
                    style={{
                      overflow: "hidden",
                      whiteSpace: "wrap",
                      textOverflow: "ellipsis",
                      justifyContent: "end",
                      display: "flex",

                      // width: "50%",
                    }}
                    // style={{
                    //   maxWidth: "400px",
                    //   lineHeight: "20px",
                    //   display: "-webkit-box",
                    //   WebkitBoxOrient: "vertical",
                    //   WebkitLineClamp: 2,
                    //   overflow: "hidden",
                    //   textOverflow: "ellipsis",
                    // }}
                    >{value|| "-"},</MDTypography>
                    )}

                    </MDBox>
                   
                    
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
                    <MDTypography variant="h6"> Products Include :</MDTypography>
                    <MDBox width= "50%">
                    {ele?.include.map((value,i)=>
                    <MDTypography variant="h6" key={i}  
                    style={{
                      overflow: "hidden",
                      whiteSpace: "wrap",
                      textOverflow: "ellipsis",
                      justifyContent: "end",
                      display: "flex",
                      // width: "50%",
                    }}
                    // style={{
                    //   maxWidth: "400px",
                    //   lineHeight: "20px",
                    //   display: "-webkit-box",
                    //   WebkitBoxOrient: "vertical",
                    //   WebkitLineClamp: 2,
                    //   overflow: "hidden",
                    //   textOverflow: "ellipsis",
                    // }}
                    >{value|| "-"},</MDTypography>
                    )}
                      </MDBox>
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
                     

                    <MDTypography variant="h6"> Products Review Rating :</MDTypography>
                    <MDTypography variant="h6"  
                    style={{
                        maxWidth: "400px",
                        lineHeight: "20px",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      >{ele?.reviewRating || "0"}</MDTypography>
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
                    <MDTypography variant="h6"> Products Tax Id :</MDTypography>
                    <MDTypography variant="h6"  style={{
                         maxWidth: "400px",
                        lineHeight: "20px",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>{ele?.taxId || "0"}</MDTypography>
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
                    <MDTypography variant="h6"> Products Time :</MDTypography>
                    <MDTypography variant="h6"  style={{
                         maxWidth: "400px",
                        lineHeight: "20px",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>{ele?.time || "0"}</MDTypography>
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
                    <MDTypography variant="h6"> Products warranty :</MDTypography>
                    <MDTypography variant="h6"  style={{
                        maxWidth: "400px",
                        lineHeight: "20px",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                      {formattedDateServer(new Date(ele?.warranty))}
                    </MDTypography>
                  </MDBox>

                
                  {ele?.images && ele?.images.length > 0 && (
                  <>
                    <MDTypography variant="h6"> Products Image </MDTypography>
                    <SwiperSlider items={1}>
                      {Loading ? (
                        <SkLoading />
                      ) : (
                        ele?.images &&
                        ele?.images.length > 0 &&
                        ele?.images.map((value, index) => (
                          <SwiperSlide key={index}>
                            <MDBox // sx={{ height: "20rem", width: "100%" }}
                              sx={({ breakpoints }) => ({
                                [breakpoints.up("xs")]: {
                                  height: "10rem",
                                  width: "100%",
                                },
                                [breakpoints.up("sm")]: {
                                  height: "10rem",
                                  width: "100%",
                                },
                                [breakpoints.up("md")]: {
                                  height: "20rem",
                                  width: "100%",
                                },
                                [breakpoints.up("lg")]: {
                                  height: "20rem",
                                  width: "100%",
                                },
                              })}
                            >
                              <img
                                src={`${process.env.REACT_APP_URI}/${value?.banner}`}
                                alt="..."
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  borderRadius: "5px",
                                }}
                                onError={(e) => {
                                  e.onerror = null;
                                  e.target.src = require("../../assets/images/bg-sign-in-basic.jpeg");
                                }}
                              />
                            </MDBox>
                          </SwiperSlide>
                        ))
                      )}
                    </SwiperSlider>
                  </>
                  )}


                  {ele?.additional && ele?.additional.length > 0 && (
                    
                    <>
                    <MDTypography variant="h6"> Products Additional Image </MDTypography>
                    <SwiperSlider items={1}>
                      {Loading ? (
                        <SkLoading />
                      ) : (
                        ele?.additional &&
                        ele?.additional.length > 0 &&
                        ele?.additional.map((value, index) => (
                          <SwiperSlide key={index}>
                            <MDBox // sx={{ height: "20rem", width: "100%" }}
                              sx={({ breakpoints }) => ({
                                [breakpoints.up("xs")]: {
                                  height: "10rem",
                                  width: "100%",
                                },
                                [breakpoints.up("sm")]: {
                                  height: "10rem",
                                  width: "100%",
                                },
                                [breakpoints.up("md")]: {
                                  height: "20rem",
                                  width: "100%",
                                },
                                [breakpoints.up("lg")]: {
                                  height: "20rem",
                                  width: "100%",
                                },
                              })}
                            >
                              <img
                                src={`${process.env.REACT_APP_URI}/${value?.url}`}
                                alt="..."
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  borderRadius: "5px",
                                }}
                                onError={(e) => {
                                  e.onerror = null;
                                  e.target.src = require("../../assets/images/bg-sign-in-basic.jpeg");
                                }}
                              />
                            </MDBox>
                          </SwiperSlide>
                        ))
                      )}
                    </SwiperSlider>
                    </>
                  )}
{ele?.thumnail> 0 ?<>
  <MDTypography variant="h6"> Products Thumnail Image </MDTypography>

<MDBox
  sx={{
    height: 300,
    width: "80%",
    //   borderRadius: "50%",
    //   border: 3,
    //   borderColor: "primary.main",
  }}
>
  <img
    src={`${process.env.REACT_APP_URI}/${ele?.thumnail}`}
    style={{
      height: "100%",
      width: "100%",
      borderRadius: "12px",
      objectFit: "cover",
    }}
    onError={(e) => {
      e.onerror = null;
      e.target.src = require("../../assets/images/bg-sign-up-cover.jpeg");
    }}
  />
</MDBox>
</>:null
}
                 
                </>
              ))}
            </MDBox>
          </MDBox>
        )}
      </MDBox>
    </>
  );
};

export default Details;
