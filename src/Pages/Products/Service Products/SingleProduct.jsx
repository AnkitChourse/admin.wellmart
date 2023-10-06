import PropTypes from "prop-types";
import React from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Close } from "@mui/icons-material";
import { useMaterialUIController } from "context";
import { Card, Divider, Rating, Switch } from "@mui/material";
import { useEffect } from "react";
import http from "Utils/api";
import SkLoading from "components/SkLoading";
import MDBadge from "components/MDBadge";

import { useDispatch, useSelector } from "react-redux";
import { isgetSingleReview } from "redux/festures/reviewSlice";
import { formattedDateServer } from "Utils/dateFunc";
import { updateReview } from "redux/festures/reviewSlice";
import { handleAlert } from "redux/festures/alertSlice";
import MDButton from "components/MDButton";
import { sanitize } from "dompurify";
import SwiperSlider from "components/SkSlider/Swiper";
import { SwiperSlide } from "swiper/react";

const SingleProduct = ({ single, setViewProductModal }) => {
  const dispatch = useDispatch();
  const admin = localStorage.getItem("admin_id");
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  // const [single, setSingle] = useState([]);
  const [isUpdate, setIsUpdate] = useState(null);
  const [readMore, setReadMore] = useState(false);
  const [isId, setIsId] = useState(false);
  const [Loading, setLoading] = useState(false);
  const { onLoading, singleReview } = useSelector((state) => ({ ...state.isReview }));
  // useEffect(() => {
  //   (async () => {
  //     setLoading(true);
  //     await await http
  //       .get(`/getByIdProduct/${viewProductId}`)
  //       .then((data) => {
  //         // console.log(data);
  //         setLoading(false);
  //         setSingle(data.data.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setLoading(false);
  //       });
  //   })();
  // }, [viewProductId]);
  // useEffect(() => {
  //   if (viewProductId) {
  //     dispatch(isgetSingleReview(`/getReviewByProductId/${viewProductId}`));
  //   }
  // }, [viewProductId]);

  console.log(single, "single");
  return (
    <>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" sx={{ m: 3 }}>
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
            SingleProduct details
          </MDTypography>
        </Card>

        {/* <MDTypography variant="h6">{viewProductId}</MDTypography> */}
        {/* <MDTypography variant="h6">{setViewProductModal}</MDTypography> */}
      </MDBox>
      {Loading ? (
        <SkLoading />
      ) : (
        single && (
          <MDBox
            sx={({ palette: { dark, white, info } }) => ({
              border: 0.5,
              borderColor: darkMode ? white.main : dark.main,
              borderRadius: 3,
              width: "100%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              p: 2,
              flexDirection: "column",
              gap: 2.5,
            })}
          >
            <MDBox
              display="flex"
              justifyContent="flex-start"
              gap={1}
              px={1}
              alignItems="flex-start"
              width={"100%"}
              height={"100%"}
              flexDirection="column"
            >
              {single?.name && (
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  gap={2}
                  alignItems="flex-start"
                  width={"100%"}
                >
                  <MDTypography variant="h6">Product Name :</MDTypography>
                  <MDTypography
                    variant="h6"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      "-webkit-line-clamp": 2,
                      "-webkit-box-orient": "vertical",
                      lineHeight: "30px",
                      maxWidth: "70%",
                    }}
                  >
                    {single?.name || '-'}
                  </MDTypography>
                </MDBox>
              )}
              {single?.subtitle && (
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  gap={2}
                  alignItems="flex-start"
                  width={"100%"}
                >
                  <MDTypography variant="h6">Product SubTitle :</MDTypography>
                  <MDTypography
                    variant="h6"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      "-webkit-line-clamp": 2,
                      "-webkit-box-orient": "vertical",
                      lineHeight: "30px",
                      maxWidth: "70%",
                    }}
                  >
                    {single?.subtitle}
                  </MDTypography>
                </MDBox>
              )}
              {single?.description && (
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  gap={2}
                  alignItems="flex-start"
                  width={"100%"}
                >
                  <MDTypography variant="h6">Product description :</MDTypography>
                  <MDTypography
                    variant="h6"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      "-webkit-line-clamp": 2,
                      "-webkit-box-orient": "vertical",
                      lineHeight: "30px",
                      maxWidth: "50%",
                      justifyContent:"end",
                      display:"flex"
                    }}
                    dangerouslySetInnerHTML={{ __html: sanitize(single?.description) }}
                  />
                </MDBox>
              )}
              {single?.thumbnail && (
                <>
                  <MDBox
                    sx={({ palette: { dark, white, info } }) => ({
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      borderTop: 1,
                      borderTopColor: darkMode ? white.main : info.main,
                      mt: 3,
                    })}image
                  >
                    {" "}
                    <MDBadge
                      badgeContent="Product Image"
                      color="success"
                      variant="gradient"
                      size="lg"
                      sx={{ zIndex: 10, mt: -1.5 }}
                    />   
                  </MDBox>

                  <MDBox
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "15rem",
                      p: 0.5,
                    }}
                  >
                    <img
                      src={`${process.env.REACT_APP_URI}/${single?.thumbnail}`}
                      alt={single?.name}
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                      onError={(e) => {
                        e.onerror = null;
                        e.target.src = require("../../../assets/images/bg-sign-up-cover.jpeg");
                      }}
                    />
                  </MDBox>
                </>
              )}
              {single?.productImages && single?.productImages?.length ? (
                <>
                  <MDBox
                    sx={({ palette: { dark, white, info } }) => ({
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      borderTop: 1,
                      borderTopColor: darkMode ? white.main : info.main,
                      mt: 3,
                    })}
                  >
                    {" "}
                    <MDBadge
                      badgeContent="Product Images"
                      color="success"
                      variant="gradient"
                      size="lg"
                      sx={{ zIndex: 10, mt: -1.5 }}
                    />
                  </MDBox>

                  <MDBox
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "15rem",
                      p: 0.5,
                    }}
                  >
                    <SwiperSlider items={1}>
                      {Loading ? (
                        <SkLoading />
                      ) : (
                        single?.productImages?.map((value, index) => (
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
                                src={`${process.env.REACT_APP_URI}/${value}`}
                                alt="..."
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "fill",
                                  borderRadius: "5px",
                                }}
                                onError={(e) => {
                                  e.onerror = null;
                                  e.target.src = require("../../../assets/images/bg-sign-in-basic.jpeg");
                                }}
                              />
                            </MDBox>
                          </SwiperSlide>
                        ))
                      )}
                    </SwiperSlider>
                    {/* <img
                      src={`${process.env.REACT_APP_URI}/${single?.thumnail}`}
                      alt={single?.name}
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                      onError={(e) => {
                        e.onerror = null;
                        e.target.src = require("../../../assets/images/bg-sign-up-cover.jpeg");
                      }}
                    /> */}
                  </MDBox>
                </>
              ) : null}
              {single?.productBanner && single?.productBanner?.length ? (
                <>
                  <MDBox
                    sx={({ palette: { dark, white, info } }) => ({
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      borderTop: 1,
                      borderTopColor: darkMode ? white.main : info.main,
                      mt: 3,
                    })}
                  >
                    {" "}
                    <MDBadge
                      badgeContent="Product Banners"
                      color="success"
                      variant="gradient"
                      size="lg"
                      sx={{ zIndex: 10, mt: -1.5 }}
                    />
                  </MDBox>

                  <MDBox
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "15rem",
                      p: 0.5,
                    }}
                  >
                    <SwiperSlider items={1} >
                      {Loading ? (
                        <SkLoading />
                      ) : (
                        single?.productBanner?.map((value, index) => (
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
                                src={`${process.env.REACT_APP_URI}/${value}`}
                                alt="..."
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "fill",
                                  borderRadius: "5px",
                                }}
                                onError={(e) => {
                                  e.onerror = null;
                                  e.target.src = require("../../../assets/images/bg-sign-in-basic.jpeg");
                                }}
                              />
                            </MDBox>
                          </SwiperSlide>
                        ))
                      )}
                    </SwiperSlider>
                    {/* <img
                      src={`${process.env.REACT_APP_URI}/${single?.thumnail}`}
                      alt={single?.name}
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                      onError={(e) => {
                        e.onerror = null;
                        e.target.src = require("../../../assets/images/bg-sign-up-cover.jpeg");
                      }}
                    /> */}
                  </MDBox>
                </>
              ) : null}
            </MDBox>
            <Divider flexItem></Divider>
            <MDBox
              display="flex"
              justifyContent="flex-start"
              gap={1}
              px={1}
              alignItems="flex-start"
              width={"100%"}
              flexDirection={"column"}
            >
              {single?.categoryId?.name && (
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  gap={2}
                  alignItems="center"
                  width={"100%"}
                >
                  <MDTypography variant="h6">Category :</MDTypography>
                  <MDTypography variant="h6">{single?.categoryId?.name}</MDTypography>
                </MDBox>
              )}
              {single?.brandId?.name && (
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  gap={2}
                  alignItems="center"
                  width={"100%"}
                >
                  <MDTypography variant="h6">Brand :</MDTypography>
                  <MDTypography variant="h6">{single?.brandId?.name}</MDTypography>
                </MDBox>
              )}
              {single?.cityId?.cityName && (
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  gap={2}
                  alignItems="center"
                  width={"100%"}
                >
                  <MDTypography variant="h6">City :</MDTypography>
                  <MDTypography variant="h6">{single?.cityId?.cityName}</MDTypography>
                </MDBox>
              )}
              {single?.taxId && (
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  gap={2}
                  alignItems="center"
                  width={"100%"}
                >
                  <MDTypography variant="h6">City :</MDTypography>
                  <MDTypography variant="h6">{`${single?.taxId}`}</MDTypography>
                </MDBox>
              )}
              {single?.include && single?.include?.length > 0 && <MDBox
                display="flex"
                justifyContent="space-between"
                gap={2}
                alignItems="center"
                width={"100%"}
              >

                <MDTypography variant="h6">Include :</MDTypography>
                <MDTypography variant="h6">{single?.include?.join(',')}</MDTypography>

                {/* <MDBox
                  // key={i}
                  // width={"100%"}
                  sx={{
                    width: "5rem",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    gap: 1,
                    flexDirection: "column",
                    height: "auto",
                  }}
                >
                  {single?.include &&
                    single?.include?.length > 0 &&
                    single?.include.map((value, i) => (
                      <MDBadge
                        key={i}
                        badgeContent={value}
                        color="success"
                        variant="gradient"
                        size="md"
                      />
                    ))}
                </MDBox> */}
              </MDBox>}
              {single?.exclude && single?.exclude?.length > 0 && <MDBox
                display="flex"
                justifyContent="space-between"
                gap={2}
                alignItems="center"
                width={"100%"}
              >

                <MDTypography variant="h6">Exclude :</MDTypography>
                <MDTypography variant="h6">{single?.exclude?.join(',')}</MDTypography>

                {/* <MDBox
                  // key={i}
                  // width={"100%"}
                  sx={{
                    width: "5rem",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    gap: 1,
                    flexDirection: "column",
                    height: "auto",
                  }}
                >
                  {single?.include &&
                    single?.include?.length > 0 &&
                    single?.include.map((value, i) => (
                      <MDBadge
                        key={i}
                        badgeContent={value}
                        color="success"
                        variant="gradient"
                        size="md"
                      />
                    ))}
                </MDBox> */}
              </MDBox>}
              {single?.directionForUse && single?.directionForUse?.length > 0 &&
              <MDBox
              display="flex"
              justifyContent="space-between"
              gap={2}
              alignItems="flex-start"
              width={"100%"}
            >
              <MDTypography variant="h6">Direction For Use :</MDTypography>
              <MDTypography
                variant="h6"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  "-webkit-line-clamp": 2,
                  "-webkit-box-orient": "vertical",
                  lineHeight: "30px",
                  maxWidth: "70%",
                }}
              >
                {single?.directionForUse || '-'}
              </MDTypography>
            </MDBox>
              }
              {single?.stock?.toString() && (
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  gap={2}
                  alignItems="center"
                  width={"100%"}
                >
                  <MDTypography variant="h6">Stock :</MDTypography>
                  <MDTypography variant="h6">{single?.stock}</MDTypography>
                </MDBox>
              )}
              {single?.sold?.toString() && (
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  gap={2}
                  alignItems="center"
                  width={"100%"}
                >
                  <MDTypography variant="h6">Sold :</MDTypography>
                  <MDTypography variant="h6">{single?.sold}</MDTypography>
                </MDBox>
              )}
              {single?.price && (
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  gap={2}
                  alignItems="center"
                  width={"100%"}
                >
                  <MDTypography variant="h6">Price :</MDTypography>
                  <MDTypography variant="h6">
                    {single?.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </MDTypography>
                </MDBox>
              )}
              {single?.mrp && (
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  gap={2}
                  alignItems="center"
                  width={"100%"}
                >
                  <MDTypography variant="h6">MRP :</MDTypography>
                  <MDTypography variant="h6">
                    {single?.mrp.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </MDTypography>
                </MDBox>
              )}
              {single?.warranty && (
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  gap={2}
                  alignItems="center"
                  width={"100%"}
                >
                  <MDTypography variant="h6">Warranty :</MDTypography>
                  <MDTypography variant="h6">{new Date(single?.warranty)?.toLocaleDateString('en-GB') || '-'} </MDTypography>
                </MDBox>
              )}
              {/* {single?.ofPrice && (
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  gap={2}
                  alignItems="center"
                  width={"100%"}
                >
                  <MDTypography variant="h6">Final Price :</MDTypography>
                  <MDTypography variant="h6">
                    {single?.ofPrice.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </MDTypography>
                </MDBox>
              )}
              {single?.minimumQuantity && (
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  gap={2}
                  alignItems="center"
                  width={"100%"}
                >
                  <MDTypography variant="h6">Minimum Quantity :</MDTypography>
                  <MDTypography variant="h6">{single?.minimumQuantity}</MDTypography>
                </MDBox>
              )} */}

              {/* <MDBox
                display="flex"
                justifyContent="space-between"
                gap={2}
                alignItems="center"
                width={"100%"}
              >
                <MDTypography variant="h6">Refundable :</MDTypography>

                {single?.refundable ? (
                  <MDBadge badgeContent="Yes" color="success" variant="gradient" size="md" />
                ) : (
                  <MDBadge badgeContent="No" color="error" variant="gradient" size="md" />
                )}
              </MDBox>

              <MDBox
                display="flex"
                justifyContent="space-between"
                gap={2}
                alignItems="center"
                width={"100%"}
              >
                <MDTypography variant="h6">Variant :</MDTypography>{" "}
                {single?.variant ? (
                  <MDBadge badgeContent="Yes" color="success" variant="gradient" size="md" />
                ) : (
                  <MDBadge badgeContent="No" color="error" variant="gradient" size="md" />
                )}
              </MDBox> */}

              {/* {single?.quantity && (
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  gap={2}
                  alignItems="center"
                  width={"100%"}
                >
                  <MDTypography variant="h6">Qty :</MDTypography>
                  <MDTypography variant="h6">{single?.quantity}</MDTypography>
                </MDBox>
              )} */}

              {/* <MDBox
                display="flex"
                justifyContent="space-between"
                gap={2}
                alignItems="center"
                width={"100%"}
              >
                <MDTypography variant="h6">Featured :</MDTypography>

                {single?.featured ? (
                  <MDBadge badgeContent="Yes" color="success" variant="gradient" size="md" />
                ) : (
                  <MDBadge badgeContent="No" color="error" variant="gradient" size="md" />
                )}
              </MDBox> */}

              {/* <MDBox
                display="flex"
                justifyContent="space-between"
                gap={2}
                alignItems="center"
                width={"100%"}
              >
                <MDTypography variant="h6">Bestselling :</MDTypography>
          
                {single?.bestselling ? (
                  <MDBadge badgeContent="Yes" color="success" variant="gradient" size="md" />
                ) : (
                  <MDBadge badgeContent="No" color="error" variant="gradient" size="md" />
                )}
              </MDBox> */}

              {/* <MDBox
                display="flex"
                justifyContent="space-between"
                gap={2}
                alignItems="center"
                width={"100%"}
              >
                <MDTypography variant="h6">Trending :</MDTypography>
              
                {single?.trending ? (
                  <MDBadge badgeContent="Yes" color="success" variant="gradient" size="md" />
                ) : (
                  <MDBadge badgeContent="No" color="error" variant="gradient" size="md" />
                )}
              </MDBox> */}

              {/* {single?.gst && (
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  gap={2}
                  alignItems="center"
                  width={"100%"}
                >
                  <MDTypography variant="h6">GST :</MDTypography>
                  <MDTypography variant="h6">{single?.gst}</MDTypography>
                </MDBox>
              )} */}

              {/* <MDBox
                display="flex"
                justifyContent="space-between"
                gap={2}
                alignItems="center"
                width={"100%"}
              >
                <MDTypography variant="h6">COD :</MDTypography>
               
                {single?.cod ? (
                  <MDBadge badgeContent="Yes" color="success" variant="gradient" size="md" />
                ) : (
                  <MDBadge badgeContent="No" color="error" variant="gradient" size="md" />
                )}
              </MDBox> */}
              {single?.reviewCount !== 0 && (
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  gap={2}
                  alignItems="center"
                  width={"100%"}
                >
                  <MDTypography variant="h6">Review :</MDTypography>
                  <MDTypography variant="h6">
                    <Rating
                      sx={{ color: "info" }}
                      name="half-rating-read"
                      defaultValue={single?.reviewCount}
                      precision={0.5}
                      readOnly
                    />
                  </MDTypography>
                </MDBox>
              )}

              {/* {single?.showStock && (
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  gap={2}
                  alignItems="center"
                  width={"100%"}
                >
                  <MDTypography variant="h6">Show Stock :</MDTypography> */}
              {/* <MDTypography variant="h6">{single?.showStock ? "Yes" : "No"}</MDTypography>
              {single?.showStock ? (
                <MDBadge badgeContent="Yes" color="success" variant="gradient" size="md" />
              ) : (
                <MDBadge badgeContent="No" color="error" variant="gradient" size="md" />
              )}
            </MDBox>
              )}

            {single?.hideStock && (
              <MDBox
                display="flex"
                justifyContent="space-between"
                gap={2}
                alignItems="center"
                width={"100%"}
              >
                <MDTypography variant="h6">Hide Stock :</MDTypography>
                {/* <MDTypography variant="h6">{single?.hideStock ? "Yes" : "No"}</MDTypography> */}
              {/* {single?.hideStock ? (
                    <MDBadge badgeContent="Yes" color="success" variant="gradient" size="md" />
                  ) : (
                    <MDBadge badgeContent="No" color="error" variant="gradient" size="md" />
                  )}
                </MDBox> */}
              {/* )} */}
              {/* {single?.visibility && (
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  gap={2}
                  alignItems="center"
                  width={"100%"}
                >
                  <MDTypography variant="h6">Visibility :</MDTypography> */}
              {/* <MDTypography variant="h6">{single?.visibility ? "Yes" : "No"}</MDTypography> */}
              {/* {single?.visibility ? (
                    <MDBadge badgeContent="Yes" color="success" variant="gradient" size="md" />
                  ) : (
                    <MDBadge badgeContent="No" color="error" variant="gradient" size="md" />
                  )}
                </MDBox> */}
              {/* )}  */}
            </MDBox>
          </MDBox >
        )
      )}
      {/* {singleReview && singleReview?.length > 0 && (
        <MDBox
          sx={({ palette: { dark, white, info } }) => ({
            display: "flex",
            border: 0.5,
            borderColor: darkMode ? white.main : dark.main,
            borderRadius: 3,
            flexWrap: "Wrap",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            width: "100%",
            gap: 5.5,
            my: 4,
            py: 5,
            px: 1,
          })}
        >
          {onLoading ? (
            <SkLoading />
          ) : (
            singleReview &&
            singleReview?.length > 0 &&
            singleReview.map((value) => (
              <Card
                key={value?._id}
                sx={{
                  maxWidth: 350,
                }}
              >
                <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
                  <MDBox display="flex" justifyContent="center" gap={2} width={"100%"}>
                    <MDBox
                      variant="gradient"
                      bgColor={"success"}
                      color={"success" === "light" ? "dark" : "white"}
                      coloredShadow={"success"}
                      borderRadius="xl"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="6rem"
                      height="6rem"
                      mt={-3}
                    >
                      <img
                        src={`${process.env.REACT_APP_URI}/${value?.userId?.image}`}
                        onError={(e) => {
                          e.onerror = null;
                          e.target.src = require("../../../assets/images/bg-sign-up-cover.jpeg");
                        }}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </MDBox>
                    <MDBox>
                      <MDTypography variant="h6">{value?.userId?.firstName}</MDTypography>
                      <MDTypography variant="button" fontSize={11}>
                        {value?.userId?.email}
                      </MDTypography>
                      <MDTypography variant="h6" fontWeight="300" fontSize={11}>
                        {value?.updatedAt &&
                          `Last Update :${formattedDateServer(new Date(value?.updatedAt))}`}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  <MDTypography variant="h4">{value?.name}</MDTypography>
                </MDBox >

                <Divider />
                <MDBox pb={2} px={2}>
                  {value?.comment?.length > 50 ? (
                    <>
                      {readMore && value?._id === isId ? (
                        <MDTypography variant="h6">
                          {value?.comment}{" "}
                          <MDButton
                            variant="text"
                            color="info"
                            size="sm"
                            onClick={() => {
                              setReadMore(false);
                              setIsId(value?._id);
                            }}
                          >
                            Read less
                          </MDButton>{" "}
                        </MDTypography>
                      ) : (
                        <MDTypography variant="h6">
                          {value?.comment?.slice(0, 20)} ...{" "}
                          <MDButton
                            variant="text"
                            color="info"
                            size="sm"
                            onClick={() => {
                              setReadMore(true);
                              setIsId(value?._id);
                            }}
                          >
                            Read More
                          </MDButton>
                        </MDTypography>
                      )}
                    </>
                  ) : (
                    <MDTypography variant="h6">{value?.comment}</MDTypography>
                  )}
                  {value?.rating && (
                    <>
                      <MDBadge
                        badgeContent={"  Rating : "}
                        color="success"
                        variant="gradient"
                        size="lg"
                      />
                      <Rating
                        name="half-rating-read"
                        defaultValue={value?.rating}
                        precision={0.5}
                        readOnly
                      />
                    </>
                  )}
                </MDBox>
                <Divider />
                <MDBox
                  pb={2}
                  px={2}
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <MDTypography variant="h6">disable</MDTypography>
                  {value?.disable ? (
                    <MDBadge badgeContent="Yes" color="success" variant="gradient" size="lg" />
                  ) : (
                    <MDBadge badgeContent="No" color="error" variant="gradient" size="lg" />
                  )}
                  <Switch
                    value={value?.disable}
                    checked={value?.disable}
                    color={"info"}
                    onChange={(e) => {
                      dispatch(
                        updateReview({
                          url: `${process.env.REACT_APP_API}/disableReview/${value?._id}/${admin}`,
                        })
                      ).then((data) => {
                        dispatch(
                          handleAlert({
                            isOpen: true,
                            type: `${data?.payload?.success ? "success" : "error"}`,
                            msg: data?.payload?.message,
                          })
                        );
                        if (data?.payload?.success) {
                          dispatch(isgetSingleReview(`/getReviewByProductId/${viewProductId}`));
                        }
                      });
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </MDBox>
              </Card >
            ))
          )}
        </MDBox >
      )}  */}
    </>
  );
};

export default SingleProduct;

SingleProduct.propTypes = {
  //   children: PropTypes.node,
  single: PropTypes.any,
  setViewProductModal: PropTypes.any,
};
