import { Card, Divider } from "@mui/material";
import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SkLoading from "components/SkLoading";
import { useMaterialUIController } from "context";
import React from "react";
import { useSelector } from "react-redux";
import { SkPrice } from "Utils/dateFunc";
import { formattedDateServer } from "Utils/dateFunc";

const SingleCoupons = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  //   const { Loading, singleCoupons } = useSelector((data) => ({ ...data.isBlogs }));
  const { Loading, singleCoupons } = useSelector((state) => ({ ...state?.isCoupons }));
  console.log(singleCoupons, "asdgagg");
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
            Coupon Details
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
                src={`${process.env.REACT_APP_URI}/${singleCoupons?.image}`}
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
                <MDTypography variant="h6">Coupon Name :</MDTypography>
                <MDTypography
                  variant="h6"
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "wrap",
                    textOverflow: "ellipsis",
                    maxWidth: "70%",
                  }}
                >
                  {singleCoupons?.couponName}{" "}
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
                <MDTypography variant="h6">Coupon Code :</MDTypography>
                <MDTypography variant="h6">{singleCoupons?.couponCode} </MDTypography>
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
                <MDTypography variant="h6">Coupon Discount :</MDTypography>
                <MDTypography
                  variant="h6"
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "wrap",
                    textOverflow: "ellipsis",
                    maxWidth: "70%",
                  }}
                >
                  {singleCoupons?.discount} %{" "}
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
                <MDTypography variant="h6">Coupon Quantity :</MDTypography>
                <MDTypography variant="h6">{singleCoupons?.couponQuantity} </MDTypography>
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
                <MDTypography variant="h6">Coupon Quantity :</MDTypography>
                <MDTypography variant="h6">{singleCoupons?.couponQuantity} </MDTypography>
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
                <MDTypography variant="h6">Coupon Expiry Date :</MDTypography>
                <MDTypography variant="h6">
                  {formattedDateServer(new Date(singleCoupons?.endDate)) || "N/A"}{" "}
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
                <MDTypography variant="h6">Coupon start Date :</MDTypography>
                <MDTypography variant="h6">
                  {formattedDateServer(new Date(singleCoupons?.startDate)) || "N/A"}{" "}
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
                <MDTypography variant="h6">Coupon Disable:</MDTypography>
                {singleCoupons?.disable ? (
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
                <MDTypography variant="h6">Coupon Maximum Discount :</MDTypography>
                <MDTypography variant="h6">
                  {SkPrice(singleCoupons?.maximumDiscount) || "N/A"}{" "}
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
                <MDTypography variant="h6">Coupon Minimum Order  Price :</MDTypography>
                <MDTypography variant="h6">
                  {SkPrice(singleCoupons?.minimumOrderValue) || "N/A"}{" "}
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
                <MDTypography variant="h6">Coupon Validity:</MDTypography>
                <MDTypography variant="h6">
                  {(singleCoupons?.validity && `${singleCoupons?.validity}Days`) || "N/A"}{" "}
                </MDTypography>
              </MDBox> */}
              {/* {singleCoupons?.backgroundColourCode && (
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
                  <MDTypography variant="h6">Background Colour Code : </MDTypography>
                  <MDTypography
                    variant="h6"
                    sx={{
                      overflow: "hidden",
                      whiteSpace: "wrap",
                      textOverflow: "ellipsis",
                      maxWidth: "70%",
                    }}
                  >
                    <MDBadge
                      badgeContent={singleCoupons?.backgroundColourCode}
                      color={singleCoupons?.backgroundColourCode}
                      variant="gradient"
                      size="lg"
                    />
                  </MDTypography>
                </MDBox>
              )} */}
              {/* {singleCoupons?.taskColourCode && (
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
                  <MDTypography variant="h6">Text Colour Code : </MDTypography>
                  <MDTypography
                    variant="h6"
                    sx={{
                      overflow: "hidden",
                      whiteSpace: "wrap",
                      textOverflow: "ellipsis",
                      maxWidth: "70%",
                    }}
                  >
                    <MDBadge
                      badgeContent={singleCoupons?.taskColourCode}
                      color={singleCoupons?.taskColourCode}
                      variant="gradient"
                      size="lg"
                    />
                  </MDTypography>
                </MDBox>
              )} */}
            </MDBox>
            {/* {singleCoupons?.product && singleCoupons?.product.length > 0 && (
              <>
                <MDTypography variant="h4" sx={{ my: 2 }}>
                  Products:
                </MDTypography>
                <MDBox
                  sx={({ palette: { dark, white, info } }) => ({
                    display: "flex",
                    // flexDirection: "column",
                    flexWrap: "Wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    gap: 5,
                  })}
                >
                  {singleCoupons?.product &&
                    singleCoupons?.product.length > 0 &&
                    singleCoupons?.product.map((value) => (
                      <Card key={value?._id} sx={{ minWidth: 300 }}>
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
                            width="4rem"
                            height="4rem"
                            mt={-3}
                          >
                            <img
                              src={`${process.env.REACT_APP_URI}/${value?.thumbnail}`}
                              onError={(e) => {
                                e.onerror = null;
                                e.target.src = require("../../assets/images/bg-sign-up-cover.jpeg");
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
                                maxWidth: 180,
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
                            alignItems="center"
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
                            &nbsp;{SkPrice(value?.unitPrice)}
                          </MDTypography>
                        </MDBox>
                      </Card>
                    ))}
                </MDBox>
              </>
            )} */}
            {singleCoupons?.categoryId && singleCoupons?.categoryId.length > 0 && (
              <>
                <MDTypography variant="h4" sx={{ my: 2 }}>
                  Category:
                </MDTypography>
                <MDBox
                  sx={({ palette: { dark, white, info } }) => ({
                    display: "flex",
                    // flexDirection: "column",
                    flexWrap: "Wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    gap: 5,
                  })}
                >
                  {singleCoupons?.categoryId &&
                    singleCoupons?.categoryId.length > 0 &&
                    singleCoupons?.categoryId.map((value) => (
                      <Card key={value?._id} sx={{ minWidth: 300 }}>
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
                            width="4rem"
                            height="4rem"
                            mt={-3}
                          >
                            <img
                              src={`${process.env.REACT_APP_URI}/${value?.image}`}
                              onError={(e) => {
                                e.onerror = null;
                                e.target.src = require("../../assets/images/bg-sign-up-cover.jpeg");
                              }}
                              style={{ width: "100%", height: "100%" }}
                            />
                          </MDBox>
                          <MDBox textAlign="right" lineHeight={1.25}>
                            <MDTypography variant="button" fontWeight="light" color="text">
                              {value?.updatedAt &&
                                `Last Update :${formattedDateServer(new Date(value?.updatedAt))}`}
                            </MDTypography>
                            <MDTypography
                              variant="h4"
                              sx={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                maxWidth: 180,
                              }}
                            >
                              {value?.name}
                            </MDTypography>
                          </MDBox>
                        </MDBox>
                        <Divider />
                        <MDBox pb={2} px={2}>
                          <MDTypography variant="h6">Coupon show In home:</MDTypography>
                          {value?.showInHome ? (
                            <MDBadge
                              badgeContent="Yes"
                              color="success"
                              variant="gradient"
                              size="lg"
                            />
                          ) : (
                            <MDBadge badgeContent="No" color="error" variant="gradient" size="lg" />
                          )}
                        </MDBox>
                      </Card>
                    ))}
                </MDBox>
              </>
            )}
          </MDBox>
        )}
      </MDBox>
    </>
  );
};

export default SingleCoupons;
