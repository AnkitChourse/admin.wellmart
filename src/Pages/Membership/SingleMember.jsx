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
import {
  getAllmemberships,
  getSingleMembership,
  getDisableMember,
} from "redux/festures/membershipSlice";

const SingleMember = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const { Loading, memberships, singlemembership } = useSelector((data) => ({
    ...data?.isMembership,
  }));
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
            Membership Details
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
                src={`${process.env.REACT_APP_URI}/${singlemembership?.logo}`}
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
                  {singlemembership?.title}{" "}
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
                <MDTypography variant="h6">Features :</MDTypography>
                {singlemembership?.features.map((ele, i) => (
                  <MDBox sx={{display:"flex",flexDirection:"column"}} key={i}>
                  <MDTypography  variant="h6">{ele} </MDTypography>
                  </MDBox>
                ))}
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
                <MDTypography variant="h6">Price :</MDTypography>
                <MDTypography
                  variant="h6"
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "wrap",
                    textOverflow: "ellipsis",
                    maxWidth: "70%",
                  }}
                >
                  {SkPrice(singlemembership?.price)}{" "}
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
                <MDTypography variant="h6">Duration in month :</MDTypography>
                <MDTypography variant="h6">{singlemembership?.durationInMonth} </MDTypography>
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
                <MDTypography variant="h6">Discount Percent :</MDTypography>
                <MDTypography variant="h6">{singlemembership?.discountPercent} </MDTypography>
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
                <MDTypography variant="h6">Coupon Expiry Date :</MDTypography>
                <MDTypography variant="h6">
                  {formattedDateServer(new Date(singleCoupons?.expiryDate)) || "N/A"}{" "}
                </MDTypography>
              </MDBox> */}
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
                <MDTypography variant="h6">Coupon start Date :</MDTypography>
                <MDTypography variant="h6">
                  {formattedDateServer(new Date(singleCoupons?.startDate)) || "N/A"}{" "}
                </MDTypography>
              </MDBox> */}
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
                <MDTypography variant="h6">Coupon Disable:</MDTypography>
                {singleCoupons?.disable ? (
                  <MDBadge badgeContent="Yes" color="success" variant="gradient" size="lg" />
                ) : (
                  <MDBadge badgeContent="No" color="error" variant="gradient" size="lg" />
                )}
              </MDBox> */}
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
                <MDTypography variant="h6">Coupon Max Discount Price :</MDTypography>
                <MDTypography variant="h6">
                  {SkPrice(singleCoupons?.maxDiscountPrice) || "N/A"}{" "}
                </MDTypography>
              </MDBox> */}
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
                <MDTypography variant="h6">Coupon Min Order Price :</MDTypography>
                <MDTypography variant="h6">
                  {SkPrice(singleCoupons?.minOrderPrice) || "N/A"}{" "}
                </MDTypography>
              </MDBox> */}
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
            {/* {singleCoupons?.category && singleCoupons?.category.length > 0 && (
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
                  {singleCoupons?.category &&
                    singleCoupons?.category.length > 0 &&
                    singleCoupons?.category.map((value) => (
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
            )} */}
          </MDBox>
        )}
      </MDBox>
    </>
  );
};

export default SingleMember;
