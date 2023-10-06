import MDBox from "components/MDBox";
import React, { useState, useEffect, useCallback } from "react";
import InfiniteApnaSelect from "components/ApnaSelect/InfiniteApnaSelect";
import { Card, CircularProgress, IconButton, Switch } from "@mui/material";
import MDTypography from "components/MDTypography";
import SkLoading from "components/SkLoading";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import { Add, ArrowBack, LocationOn, MyLocation, Remove, RestartAlt } from "@mui/icons-material";
import { useMaterialUIController } from "context";
import { handleAlert } from "redux/festures/alertSlice";
import http from "Utils/api2";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import HomeDecor from "assets/images/home-decor-1.jpg";
import { SkPrice } from "Utils/dateFunc";
import MDInput from "components/MDInput";
import { getAllCoupons } from "redux/festures/couponsSlice";
import ApnaSelect2 from "components/ApnaSelect";
import { getAllCity } from "redux/festures/citySlice";
import Map from "examples/Map";
import AstrieskIcon from "components/AstrieskIcon";
import InfiniteApnaSelect2 from "components/ApnaSelect/InfiniteApnaSelect2";

const CreateServiceOrder = ({ createOrderModal, setCreateOrderModal }) => {
  const [coords, setCoords] = useState({
    lat: 0,
    lng: 0,
  });
  const [bounds, setBounds] = useState({
    lat: 0,
    lng: 0,
  });
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [upperLoader, setUpperLoader] = useState(false);
  const [createOrderLoader, setCreateOrderLoader] = useState(false);
  const [manualAddressManupulation, setManualAddressManupulation] = useState(false);
  const [loader, setLoader] = useState(false);
  const [transformation, setTransformation] = useState("0%");
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [billData, setBillData] = useState(null);
  const { city } = useSelector((data) => ({ ...data?.isCity }));
  const { coupons } = useSelector((data) => ({ ...data?.isCoupons }));
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState(null);
  const [couponLoader, setCouponLoader] = useState(false);
  const [addressDetails, setAddressDetails] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    address: "",
    apartment: "",
    landmark: "",
    area: "",
    pincode: "",
    city: "",
  });

  const [form1, setForm1] = useState({
    customerId: admin,
    productId: [],
  });

  const [form2, setForm2] = useState({
    fullName: "",
    customerId: "",
    cityId: "",
  });

  useEffect(() => {
    setForm2((prev) => ({
      ...prev,
      fullName: `${addressDetails?.firstName || ""} ${addressDetails?.lastName || ""}`,
    }));
  }, [addressDetails?.firstName, addressDetails?.lastName]);

  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    dispatch(getAllCoupons(`${process.env.REACT_APP_APII}/getAllCouponByAdmin/${admin}`));
    dispatch(getAllCity(`/getAllCityByAdmin/${admin}`));
  }, []);

  useEffect(() => {
    if (addressDetails?.pincode?.length === 6) {
      axios
        .get(`https://api.postalpincode.in/pincode/${addressDetails?.pincode}`)
        .then((response) => {
          // console.log(response)
          if (response?.data?.at(0)?.Status === "Success") {
            setAddressDetails((prev) => ({
              ...prev,
              area: response?.data?.at(0)?.PostOffice?.at(0)?.Name,
              city: response?.data?.at(0)?.PostOffice?.at(0)?.District,
              state: response?.data?.at(0)?.PostOffice?.at(0)?.State,
            }));
          } else {
            dispatch(
              handleAlert({
                isOpen: true,
                type: "error",
                msg: response?.data?.at(0)?.Message,
              })
            );
            setAddressDetails((prev) => ({
              ...prev,
              area: "",
              city: "",
              state: "",
            }));
          }
        });
    } else {
      setAddressDetails((prev) => ({
        ...prev,
        area: "",
        city: "",
        state: "",
      }));
    }
  }, [addressDetails?.pincode]);

  const userFromPhoneNumber = (e) => {
    e.preventDefault();
    setUpperLoader(true);
    http
      .get(`/getUserByPhoneNumber/${admin}?phoneNumber=${phoneNumber}`)
      .then((response) => {
        setUpperLoader(false);
        if (response?.data?.data) {
          setForm2({
            customerId: response?.data?._id,
            cityId: "",
          });
          setTransformation("-60%");
        }
      })
      .catch((error) => {
        setUpperLoader(false);
        dispatch(
          handleAlert({
            isOpen: true,
            type: "error",
            msg: error?.response?.data?.message,
          })
        );
      });
  };

  const deleteCart = () => {
    http
      .delete(`/deleteCustomerCart/${admin}`)
      .then(() => {
        setForm1({
          customerId: admin,
          productId: [],
        });
        setData(null);
        setBillData(null);
        setTransformation("0%");
      })
      .catch((error) => {
        dispatch(
          handleAlert({
            isOpen: true,
            type: "error",
            msg: error?.response?.data?.message,
          })
        );
      });
  };

  useEffect(() => {
    setForm1({
      customerId: admin,
      productId: [],
    });
    setData(null);
    setBillData(null);
  }, [createOrderModal]);

  const createCart = () => {
    http.post(`/createCartByAdmin`, form1).then(() => {
      http
        .get(`/getAllCartBycustomerId/${admin}`)
        .then((response) => {
          setData(response?.data?.data?.cartData);
          setBillData(response?.data?.data?.billDetail);
          setTransformation(`-20%`);
        })
        .catch((error) => {
          dispatch(
            handleAlert({
              isOpen: true,
              type: "error",
              msg: error?.response?.data?.message,
            })
          );
        });
    });
  };

  const increaseQuantity = (id) => {
    http.put(`/quantityUpdate/${id}`).then(() => {
      http
        .get(`/getAllCartBycustomerId/${admin}`)
        .then((response) => {
          setData(response?.data?.data?.cartData);
          setBillData(response?.data?.data?.billDetail);
          // setTransformation(`-${100 / 3}%`)
        })
        .catch((error) => {
          dispatch(
            handleAlert({
              isOpen: true,
              type: "error",
              msg: error?.response?.data?.message,
            })
          );
        });
    });
  };

  const decreaseQuantity = (id) => {
    http.put(`/removeQuantity/${id}`).then(() => {
      http
        .get(`/getAllCartBycustomerId/${admin}`)
        .then((response) => {
          setData(response?.data?.data?.cartData);
          setBillData(response?.data?.data?.billDetail);
          // setTransformation(`-${100 / 3}%`)
        })
        .catch((error) => {
          dispatch(
            handleAlert({
              isOpen: true,
              type: "error",
              msg: error?.response?.data?.message,
            })
          );
        });
    });
  };

  useEffect(() => {
    if (selectedCoupon) {
      setCouponLoader(true);
      http
        .get(
          `/getAllCartBycustomerId/${admin}${selectedCoupon ? `?couponCode=${selectedCoupon}` : ""}`
        )
        .then((response) => {
          setData(response?.data?.data?.cartData);
          setBillData(response?.data?.data?.billDetail);
          setCouponMessage(response?.data?.isMessage);
          setCouponLoader(false);
        })
        .catch((error) => {
          dispatch(
            handleAlert({
              isOpen: true,
              type: "error",
              msg: error?.response?.data?.message,
            })
          );
          setCouponMessage(response?.data?.isMessage);
          setCouponLoader(true);
        });
    }
  }, [selectedCoupon]);

  const handleFormAddress = (e) => {
    const { name, value } = e.target;
    if (name === "pincode" || name === "mobile") {
      setAddressDetails((prev) => ({
        ...prev,
        [name]: isNaN(parseInt(value[value.length - 1]))
          ? value.length === 1
            ? ""
            : value.slice(0, value.length - 1)
          : value,
      }));
    } else {
      setAddressDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFormOrder = (e) => {
    const { name, value } = e.target;
    setForm2((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createOrder = (e) => {
    e.preventDefault();
    setCreateOrderLoader(true);

    http
      .post(`/createOrderByAdmin/${admin}`, {
        ...billData,
        ...addressDetails,
        ...form2,
        phoneNumber,
        latitude: bounds?.lat || 0,
        longitude: bounds?.lng || 0,
      })
      .then((response) => {
        dispatch(
          handleAlert({
            isOpen: true,
            type: "success",
            msg: response?.data?.message,
          })
        );
        setForm2({
          fullName: "",
          customerId: "",
          cityId: "",
        });
        setAddressDetails({
          firstName: "",
          lastName: "",
          mobile: "",
          address: "",
          apartment: "",
          landmark: "",
          area: "",
          pincode: "",
          city: "",
          latitude: "",
          longitude: "",
        });
        setPhoneNumber("");
        setSelectedCoupon("");
        deleteCart();
        setData(null);
        setTransformation("0%");
        setCreateOrderLoader(false);
        setCreateOrderModal(false);
      })
      .catch((error) => {
        dispatch(
          handleAlert({
            isOpen: true,
            type: "error",
            msg: error?.response?.data?.message,
          })
        );
        setCreateOrderLoader(false);
      });
  };

  return (
    <MDBox sx={{ width: "100%", height: "100%", overflowX: "hidden", overflowY: "auto" }}>
      {transformation !== "0%" ? (
        <ArrowBack
          onClick={() => {
            if (transformation === `-20%`) deleteCart();
            else if (transformation === `-40%`) {
              setTransformation(`-20%`);
              setPhoneNumber("");
            } else if (transformation === `-60%`) {
              setTransformation(`-40%`);
              setCouponMessage(null);
              setAddressDetails({
                address: "",
                apartment: "",
                landmark: "",
                area: "",
                pincode: "",
                city: "",
                latitude: "",
                longitude: "",
              });
            } else {
              setTransformation(`-60%`);
              setSelectedCoupon(null);
              setForm2({
                fullName: "",
                customerId: "",
                cityId: "",
              });
            }
          }}
          sx={({ palette: { dark, white, info } }) => ({
            color: darkMode ? white.main : dark.main,
            cursor: "pointer",
          })}
        />
      ) : null}
      <MDBox
        display="flex"
        alignItems="center"
        gap="2rem"
        sx={{
          width: "500%",
          transform: `translateX(${transformation})`,
          transition: "transform 1s ease-in-out",
        }}
      >
        <MDBox
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          sx={{ width: "100%" }}
          gap="2rem"
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
              Choose Product For Order
            </MDTypography>
          </Card>
          <MDBox height="30%" width="100%">
            <InfiniteApnaSelect2
              multi={true}
              disabled={loader}
              fetchApi={`/filterProductByDate/${admin}`}
              value={form1?.productId}
              name="productId"
              onChange={(e) =>
                setForm1((prev) => ({
                  ...prev,
                  productId: e.target.value,
                }))
              }
              origin="Products"
              valueKey="_id"
              nameKey="title"
              isSimpleArray={false}
              placeholder={"search here"}
            />
          </MDBox>
          <MDBox alignItems="flex-end">
            <MDButton
              disabled={loader || !form1?.productId?.length}
              variant="contained"
              color="info"
              onClick={createCart}
            >
              {loader ? <CircularProgress color="primary" size={20} sx={{ mx: 1 }} /> : "Proceed"}
            </MDButton>
          </MDBox>
        </MDBox>
        <MDBox sx={{ width: "100%" }}>
          {transformation === "-20%" ? (
            <>
              <MDBox
                display="flex"
                flexWrap="wrap"
                alignItems="center"
                sx={{ width: "100%" }}
                color="white"
                gap="0.8rem"
              >
                {data && data?.length ? (
                  data?.map((ele, i) => (
                    <MDBox
                      key={i}
                      display="flex"
                      alignItems="center"
                      sx={({ palette: { dark, white, info, primary } }) => ({
                        width: "45%",
                        height: "20vh",
                        border: `1px solid ${darkMode ? info.main : primary.main} `,
                        borderRadius: "10px",
                        p: 1,
                        gap: "1rem",
                      })}
                      color="white"
                    >
                      <MDBox width="40%" height="100%">
                        <img
                          src={`${process.env.REACT_APP_URI} /${ele?.productId?.thumnail}`}
                          style={{ height: "100%", width: "100%" }}
                          alt="profile-image"
                          onError={(e) => {
                            e.target.src = require("assets/images/bg-sign-in-basic.jpeg");
                          }}
                        />
                      </MDBox>
                      <MDBox
                        display="flex"
                        flexDirection="column"
                        alignItems="end"
                        gap="0.5rem"
                        sx={{ width: "55%", height: "100%" }}
                        color="white"
                      >
                        <MDTypography
                          sx={{
                            maxWidth: "100%",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          variant="h6"
                        >
                          {ele?.productId?.title}
                        </MDTypography>
                        <MDTypography>{SkPrice(ele?.productId?.price)}</MDTypography>
                        <MDBox display="flex" alignItems="center">
                          <IconButton
                            onClick={() => decreaseQuantity(ele?._id)}
                            sx={({ palette: { dark, white, info, primary } }) => ({
                              "&:hover": {
                                backgroundColor: darkMode ? info.main : primary.main,
                              },
                              borderRadius: "10px 0 0 10px",
                              border: `1px solid ${primary}`,
                              width: "2rem",
                              minWidth: "auto",
                              backgroundColor: darkMode ? white.main : primary.main,
                              padding: "0.5rem",
                              height: "2rem",
                            })}
                          >
                            <Remove size={5} />
                          </IconButton>
                          <MDTypography
                            textAlign="center"
                            sx={{ padding: "0.1rem", width: "1rem" }}
                          >
                            {ele?.quantity}
                          </MDTypography>
                          <IconButton
                            onClick={() => increaseQuantity(ele?._id)}
                            sx={({ palette: { dark, white, info, primary } }) => ({
                              "&:hover": {
                                backgroundColor: darkMode ? info.main : primary.main,
                              },
                              borderRadius: "0 10px 10px 0px",
                              border: `1px solid ${primary}`,
                              width: "2rem",
                              minWidth: "auto",
                              height: "2rem",
                              backgroundColor: darkMode ? white.main : primary.main,
                              padding: "0.5rem",
                            })}
                          >
                            <Add sixe={5} />
                          </IconButton>
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  ))
                ) : (
                  <MDTypography>Sorry Something Went Wrong</MDTypography>
                )}
              </MDBox>
              {data && data?.length ? (
                <MDBox
                  display="flex"
                  width="100%"
                  justifyContent="center"
                  sx={{ my: 1 }}
                  alignItems="flex-end"
                >
                  <MDButton
                    variant="contained"
                    color="info"
                    onClick={() => setTransformation("-40%")}
                  >
                    Proceed
                  </MDButton>
                </MDBox>
              ) : null}
            </>
          ) : null}
        </MDBox>
        <MDBox
          component="form"
          role="form"
          onSubmit={userFromPhoneNumber}
          display="flex"
          flexDirection="column"
          gap="1rem"
          alignItems="center"
          sx={{ width: "100%" }}
          color="white"
        >
          {transformation === "-40%" ? (
            <>
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
                  Enter Customer Phone Number <AstrieskIcon />
                </MDTypography>
              </Card>
              <MDInput
                required={true}
                type="text"
                placeholder="PhoneNo"
                inputProps={{
                  minLength: 10,
                  maxLength: 10,
                }}
                fullWidth
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => {
                  const { value } = e.target;
                  setPhoneNumber(
                    isNaN(parseInt(value[value.length - 1]))
                      ? value.length === 1
                        ? ""
                        : value.slice(0, value.length - 1)
                      : value
                  );
                }}
              />
              <MDBox alignItems="flex-end">
                <MDButton type={"submit"} variant="contained" color="info">
                  {upperLoader ? (
                    <CircularProgress color="primary" size={20} sx={{ mx: 1 }} />
                  ) : (
                    "Proceed"
                  )}
                </MDButton>
              </MDBox>
            </>
          ) : null}
        </MDBox>
        <MDBox
          component="form"
          role="form"
          onSubmit={(e) => {
            e.preventDefault();
            setTransformation("-80%");
          }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ width: "100%" }}
          color="white"
        >
          {transformation === "-60%" ? (
            <>
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
                  Address Details
                </MDTypography>
              </Card>
              <MDBox
                lineHeight={1}
                gap={3}
                width={"100%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDTypography variant="h6">
                  First Name <AstrieskIcon />
                </MDTypography>
                <MDInput
                  required={true}
                  type="text"
                  placeholder="First Name"
                  fullWidth
                  name="firstName"
                  value={addressDetails?.firstName}
                  onChange={handleFormAddress}
                />
              </MDBox>
              <MDBox
                lineHeight={1}
                gap={3}
                width={"100%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDTypography variant="h6">
                  Last Name <AstrieskIcon />
                </MDTypography>
                <MDInput
                  required={true}
                  type="text"
                  placeholder="Last Name"
                  fullWidth
                  name="lastName"
                  value={addressDetails?.lastName}
                  onChange={handleFormAddress}
                />
              </MDBox>
              <MDBox
                lineHeight={1}
                gap={3}
                width={"100%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDTypography variant="h6">
                  Contact Number <AstrieskIcon />
                </MDTypography>
                <MDInput
                  required={true}
                  type="text"
                  inputProps={{
                    maxLength: 10,
                    minLength: 10,
                  }}
                  placeholder="Contact Number"
                  fullWidth
                  name="mobile"
                  value={addressDetails?.mobile}
                  onChange={handleFormAddress}
                />
              </MDBox>
              <MDBox
                lineHeight={1}
                gap={3}
                width={"100%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDTypography variant="h6">
                  Address <AstrieskIcon />
                </MDTypography>
                <MDInput
                  required={true}
                  type="textarea"
                  placeholder="Enter Address"
                  fullWidth
                  name="address"
                  value={addressDetails?.address}
                  onChange={handleFormAddress}
                />
              </MDBox>
              <MDBox
                lineHeight={1}
                gap={3}
                width={"100%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDTypography variant="h6">
                  Apartment <AstrieskIcon />
                </MDTypography>
                <MDInput
                  required={true}
                  type="text"
                  placeholder="Enter Appartment/House"
                  fullWidth
                  name="apartment"
                  value={addressDetails?.apartment}
                  onChange={handleFormAddress}
                />
              </MDBox>
              <MDBox
                lineHeight={1}
                gap={3}
                width={"100%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDTypography variant="h6">
                  Landmark <AstrieskIcon />
                </MDTypography>
                <MDInput
                  required={true}
                  type="text"
                  placeholder="Enter Landmark"
                  fullWidth
                  name="landmark"
                  value={addressDetails?.landmark}
                  onChange={handleFormAddress}
                />
              </MDBox>
              <MDBox
                lineHeight={1}
                gap={3}
                width={"100%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDTypography variant="h6">
                  Pincode <AstrieskIcon />
                </MDTypography>
                <MDInput
                  required={true}
                  type="text"
                  inputProps={{
                    minLength: 6,
                    maxLength: 6,
                  }}
                  placeholder="Enter Pincode"
                  fullWidth
                  name="pincode"
                  value={addressDetails?.pincode}
                  onChange={handleFormAddress}
                />
              </MDBox>
              <MDBox
                lineHeight={1}
                gap={3}
                width={"100%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDTypography variant="h6">Manually Enter Below Values</MDTypography>
                <Switch
                  value={manualAddressManupulation}
                  checked={manualAddressManupulation}
                  color={"info"}
                  onChange={(e) => {
                    setManualAddressManupulation(!manualAddressManupulation);
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </MDBox>
              <MDBox
                lineHeight={1}
                gap={3}
                width={"100%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDTypography variant="h6">
                  Area <AstrieskIcon />
                </MDTypography>
                <MDInput
                  disabled={!manualAddressManupulation}
                  required={true}
                  type="text"
                  placeholder="Area"
                  fullWidth
                  name="area"
                  value={addressDetails?.area}
                  onChange={handleFormAddress}
                />
              </MDBox>
              <MDBox
                lineHeight={1}
                gap={3}
                width={"100%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDTypography variant="h6">
                  City <AstrieskIcon />{" "}
                </MDTypography>
                <MDInput
                  disabled={true}
                  required={true}
                  type="text"
                  placeholder="Enter City"
                  fullWidth
                  name="city"
                  value={addressDetails?.city}
                  onChange={handleFormAddress}
                />
              </MDBox>
              <MDBox
                lineHeight={1}
                gap={3}
                width={"100%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDTypography variant="h6">
                  State <AstrieskIcon />
                </MDTypography>
                <MDInput
                  disabled={true}
                  required={true}
                  type="text"
                  placeholder="Enter State"
                  fullWidth
                  name="city"
                  value={addressDetails?.state}
                  onChange={handleFormAddress}
                />
              </MDBox>
              <MDBox
                lineHeight={1}
                position="relative"
                gap={3}
                width={"100%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDTypography variant="h6">Select Location</MDTypography>
                <Map coords={coords} setCoords={setCoords} bounds={bounds} setBounds={setBounds} />
              </MDBox>
              <MDBox alignItems="flex-end">
                <MDButton type={"submit"} variant="contained" color="info">
                  {createOrderLoader ? (
                    <CircularProgress color="primary" size={20} sx={{ mx: 1 }} />
                  ) : (
                    "Proceed"
                  )}
                </MDButton>
              </MDBox>
            </>
          ) : null}
        </MDBox>
        <MDBox
          component="form"
          role="form"
          onSubmit={createOrder}
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ width: "100%" }}
          color="white"
        >
          {transformation === "-80%" ? (
            <>
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
                  Order Form
                </MDTypography>
              </Card>
              {form2?.fullName ? (
                <MDBox
                  lineHeight={1}
                  gap={3}
                  width={"100%"}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <MDTypography variant="h6">
                    Full Name <AstrieskIcon />
                  </MDTypography>
                  <MDInput
                    required={true}
                    type="text"
                    placeholder="Full Name"
                    fullWidth
                    name="fullName"
                    value={form2?.fullName}
                    onChange={handleFormOrder}
                  />
                </MDBox>
              ) : null}
              <MDBox
                lineHeight={1}
                gap={3}
                width={"100%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDTypography variant="h6">Select City</MDTypography>
                <ApnaSelect2
                  data={city}
                  value={form2?.cityId}
                  origin="City"
                  onChange={handleFormOrder}
                  name="cityId"
                  valueKey="_id"
                  nameKey="cityName"
                  simpleArray={false}
                />
              </MDBox>
              <MDBox
                lineHeight={1}
                gap={3}
                width={"100%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDBox width="100%" display="flex" justifyContent="space-between">
                  <MDTypography variant="h6">Select Coupon</MDTypography>
                  {selectedCoupon ? (
                    <IconButton
                      onClick={() => {
                        setSelectedCoupon(null);
                        setCouponMessage(null);
                      }}
                      sx={({ palette: { dark, white, info, primary } }) => ({
                        "&:hover": {
                          backgroundColor: darkMode ? white.main : primary.main,
                        },
                        backgroundColor: darkMode ? info.main : primary.main,
                        padding: "0.5rem",
                      })}
                    >
                      <RestartAlt size={20} />
                    </IconButton>
                  ) : null}
                </MDBox>
                <ApnaSelect2
                  data={coupons}
                  value={selectedCoupon}
                  origin="Coupon"
                  onChange={(e) => setSelectedCoupon(e.target.value)}
                  name="couponid"
                  valueKey="couponCode"
                  nameKey="couponName"
                  simpleArray={false}
                />
                {couponMessage ? (
                  <MDTypography
                    sx={{ fontSize: "0.8rem", m: 0, p: 0 }}
                    color="error"
                    variant="body"
                  >
                    {couponMessage}
                  </MDTypography>
                ) : null}
              </MDBox>
              <MDBox alignItems="flex-end">
                <MDButton type={"submit"} variant="contained" color="info">
                  {createOrderLoader ? (
                    <CircularProgress color="primary" size={20} sx={{ mx: 1 }} />
                  ) : (
                    "Proceed"
                  )}
                </MDButton>
              </MDBox>
            </>
          ) : null}
        </MDBox>
      </MDBox>
    </MDBox>
  );
};

export default CreateServiceOrder;

CreateServiceOrder.propTypes = {
  createOrderModal: PropTypes.any,
  setCreateOrderModal: PropTypes.any,
};
