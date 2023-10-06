import {
  Close,
  ContentPasteSearchOutlined,
  Edit,
  Troubleshoot,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Card,
  FormControlLabel,
  FormGroup,
  Icon,
  Pagination,
  Stack,
  IconButton,
  Switch,
} from "@mui/material";
import ImagePicker from "components/ApnaUploader";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import SkLoading from "components/SkLoading";
import SkModal from "components/SkModal";
import SwiperSlider from "components/SkSlider/Swiper";
import { useMaterialUIController } from "context";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAlert } from "redux/festures/alertSlice";
import { updateIsHome } from "redux/festures/homeSlice";
import { getIsHomesData } from "redux/festures/homeSlice";
import { SwiperSlide } from "swiper/react";
import ExtraSection from "./ExtraSection";
import HomeVideos from "./HomeVideos";
import AstrieskIcon from 'components/AstrieskIcon'
import LinkableBanners from "./LinkableBanners";

const HomePage = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const { homeData, singleHome, Loading } = useSelector((data) => ({ ...data.isHomes }));
  useEffect(() => {
    dispatch(getIsHomesData(`/getAllHomeBanner`));
  }, []);
  const homeBannerOne =
    homeData && homeData?.length > 0 && homeData?.filter((value) => value?.title === "banner1");
  const homeBannerTwo =
    homeData && homeData?.length > 0 && homeData?.filter((value) => value?.title === "banner2");
  const homeBannerThree =
    homeData && homeData?.length > 0 && homeData?.filter((value) => value?.title === "banner3");
  const [isBnanner1, setIsBnanner1] = useState(false);
  const [isBnanner2, setIsBnanner2] = useState(false);
  const [isBnanner3, setIsBnanner3] = useState(false);
  const [isBanner1Image, setIsBanner1Image] = useState([]);
  const [bannerOneIndex, setBannerOneIndex] = useState(0);
  // console.log(homeBannerOne, "homeBannerOne");
  // console.log(homeBannerTwo, "homeBannerTwo");
  // console.log(homeBannerThree, "homeBannerThree");
  const [activeSlideId, setActiveSlideId] = useState("");
  const handleSlideChange = (swiper) => {
    setBannerOneIndex(swiper.activeIndex);
    const activeSlide = document.querySelector(".swiper-slide-active");
    const activeSlideId = activeSlide.getAttribute("data-_id");
    setActiveSlideId(activeSlideId);
  };
  // console.log(activeSlideId, "activeSlideId");

  const handelSubmitBanners = (e) => {
    e.preventDefault();

    const isArray = homeBannerOne[bannerOneIndex];
    // console.log(isArray, "isBanner1Image");

    const formData = new FormData();
    formData.append("title", "banner1");
    formData.append("banner", isBanner1Image);
    // console.log(...formData, "formData");
    dispatch(
      updateIsHome({
        url: `${process.env.REACT_APP_API}/updateHomeBanner/${isArray?._id}/${admin}`,
        data: formData,
      })
    ).then((data) => {
      // console.log(data);
      dispatch(
        handleAlert({
          isOpen: true,
          type: `${data?.payload?.success ? "success" : "error"}`,
          msg: data?.payload?.message,
        })
      );
      setIsBanner1Image("");
      setIsBnanner1(false);
      if (data?.payload.success) {
        dispatch(getIsHomesData(`/getAllHomeBanner`));
      }
    });
  };
  const handleSubmitBannerTwo = (e) => {
    e.preventDefault();
    const isArray = homeBannerTwo && homeBannerTwo[0];
    const formData = new FormData();
    formData.append("title", "banner2");
    formData.append("banner", isBanner1Image);
    // console.log(...formData, "formData");
    dispatch(
      updateIsHome({
        url: `${process.env.REACT_APP_API}/updateHomeBanner/${isArray?._id}/${admin}`,
        data: formData,
      })
    ).then((data) => {
      // console.log(data);
      dispatch(
        handleAlert({
          isOpen: true,
          type: `${data?.payload?.success ? "success" : "error"}`,
          msg: data?.payload?.message,
        })
      );
      setIsBanner1Image("");
      setIsBnanner2(false);
      if (data?.payload.success) {
        dispatch(getIsHomesData(`/getAllHomeBanner`));
      }
    });
  };
  const handleSubmitBannerThree = (e) => {
    e.preventDefault();
    const isArray = homeBannerThree && homeBannerThree[0];
    const formData = new FormData();
    formData.append("title", "banner3");
    formData.append("banner", isBanner1Image);
    // console.log(...formData, "formData");
    dispatch(
      updateIsHome({
        url: `${process.env.REACT_APP_API}/updateHomeBanner/${isArray?._id}/${admin}`,
        data: formData,
      })
    ).then((data) => {
      // console.log(data);
      dispatch(
        handleAlert({
          isOpen: true,
          type: `${data?.payload?.success ? "success" : "error"}`,
          msg: data?.payload?.message,
        })
      );
      setIsBanner1Image("");
      setIsBnanner3(false);
      if (data?.payload.success) {
        dispatch(getIsHomesData(`/getAllHomeBanner`));
      }
    });
  };
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mb={2} />
        <MDBox py={3}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                Home Banner&apos;s
              </MDTypography>
            </MDBox>
            <MDBox py={3} px={1}>
              <MDBox
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  px: 2,
                  my: 1.5,
                }}
              >
                <MDTypography variant="h6" color="white">
                  Home Banner1
                </MDTypography>
                <MDButton
                  variant="gradient"
                  sx={({ palette: { dark, white, info } }) => ({
                    color: white.main,
                    backgroundColor: darkMode ? info.main : dark.main,
                    "&:hover": {
                      color: white.main,
                      backgroundColor: darkMode ? info.main : dark.main,
                    },
                  })}
                  onClick={() => {
                    setIsBnanner1(true);
                  }}
                >
                  Update banner&apos;s {`(${bannerOneIndex + 1})`}
                </MDButton>
              </MDBox>
              {homeData && homeData.length > 0 && (
                <SwiperSlider items={1} onSlideChange={handleSlideChange}>
                  {Loading ? (
                    <SkLoading />
                  ) : (
                    homeBannerOne &&
                    homeBannerOne.length > 0 &&
                    homeBannerOne.map((value, index) => (
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
              )}
            </MDBox>
            <MDBox py={3} px={1}>
              <MDBox
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  px: 2,
                  my: 1.5,
                }}
              >
                <MDTypography variant="h6" color="white">
                  Home Banner2
                </MDTypography>
                <MDButton
                  variant="gradient"
                  sx={({ palette: { dark, white, info } }) => ({
                    color: white.main,
                    backgroundColor: darkMode ? info.main : dark.main,
                    "&:hover": {
                      color: white.main,
                      backgroundColor: darkMode ? info.main : dark.main,
                    },
                  })}
                  onClick={() => {
                    setIsBnanner2(true);
                  }}
                >
                  Update banner&apos;s
                </MDButton>
              </MDBox>
              {homeData &&
                homeData.length > 0 &&
                (Loading ? (
                  <SkLoading />
                ) : (
                  homeBannerTwo &&
                  homeBannerTwo.length > 0 &&
                  homeBannerTwo.slice(0, 1).map((value) => (
                    // <div key={value?._id} style={{ height: "20rem", width: "100%" }}>
                    <MDBox // sx={{ height: "20rem", width: "100%" }}
                      key={value?._id}
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
                  ))
                ))}
            </MDBox>
            <MDBox py={3} px={1}>
              <MDBox
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  px: 2,
                  my: 1.5,
                }}
              >
                <MDTypography variant="h6" color="white">
                  Home Banner3
                </MDTypography>
                <MDButton
                  variant="gradient"
                  sx={({ palette: { dark, white, info } }) => ({
                    color: white.main,
                    backgroundColor: darkMode ? info.main : dark.main,
                    "&:hover": {
                      color: white.main,
                      backgroundColor: darkMode ? info.main : dark.main,
                    },
                  })}
                  onClick={() => {
                    setIsBnanner3(true);
                  }}
                >
                  Update banner&apos;s
                </MDButton>
              </MDBox>
              {homeData &&
                homeData.length > 0 &&
                (Loading ? (
                  <SkLoading />
                ) : (
                  homeBannerThree &&
                  homeBannerThree.length > 0 &&
                  homeBannerThree.slice(0, 1).map((value) => (
                    // <div key={value?._id} style={{ height: "20rem", width: "100%" }}>
                    <MDBox // sx={{ height: "20rem", width: "100%" }}
                      key={value?._id}
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
                  ))
                ))}
            </MDBox>
          </Card>
        </MDBox>
        {/* .............................EXTRASECTION.............................. */}

        <ExtraSection />

        {/* .............................LinkableBanners.............................. */}

        <LinkableBanners />

        {/* .............................HomeVideos.............................. */}

        <HomeVideos />

        <Footer />
      </DashboardLayout>
      {/* banner one modal................................>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <SkModal
        show={isBnanner1}
        unShow={setIsBnanner1}
        width={{ sx: "100%", md: "55%", xl: "55%", sm: "100%" }}
        height={"auto"}
        padding={3}
        overflowY={true}
      >
        <MDBox
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
          component="form"
          role="form"
          onSubmit={handelSubmitBanners}
        >
          {Loading ? (
            <SkLoading />
          ) : (
            <MDBox
              sx={{
                width: "90%",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                flexDirection: "column",
                gap: 3,
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
                  upload Banner {`(${bannerOneIndex + 1})`}
                </MDTypography>
              </Card>
              <MDTypography variant="h6">
                image size <AstrieskIcon/>
                <MDTypography variant="body1" component="span" fontSize={11}>
                  &nbsp; ( 1526 X 603 px )
                </MDTypography>
              </MDTypography>
              <ImagePicker
                required={true}
                name="banner1"
                multiple={false}
                images={isBanner1Image}
                setImages={setIsBanner1Image}

                // isImageURLs={isData?.thumbnail}
              />
              <MDBox
                sx={{
                  width: "100%",
                  justifyContent: "flex-end",
                  textAlign: "center",
                  display: "flex",
                }}
              >
                {" "}
                <MDButton color={"info"} verdant={"gradient"} type={"submit"}>
                  Upload Banner
                </MDButton>
              </MDBox>
            </MDBox>
          )}
        </MDBox>
      </SkModal>
      {/* banner second modal................................>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <SkModal
        show={isBnanner2}
        unShow={setIsBnanner2}
        width={{ sx: "100%", md: "55%", xl: "55%", sm: "100%" }}
        height={"auto"}
        padding={3}
        overflowY={true}
      >
        <MDBox
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
          component="form"
          role="form"
          onSubmit={handleSubmitBannerTwo}
        >
          {Loading ? (
            <SkLoading />
          ) : (
            <MDBox
              sx={{
                width: "90%",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                flexDirection: "column",
                gap: 3,
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
                  upload Banner
                </MDTypography>
              </Card>
              <MDTypography variant="h6">
                image size <AstrieskIcon/>
                <MDTypography variant="body1" component="span" fontSize={11}>
                  &nbsp; ( 1349 × 400 px )
                </MDTypography>
              </MDTypography>
              <ImagePicker
                required={true}
                name="banner1"
                multiple={false}
                images={isBanner1Image}
                setImages={setIsBanner1Image}

                // isImageURLs={isData?.thumbnail}
              />
              <MDBox
                sx={{
                  width: "100%",
                  justifyContent: "flex-end",
                  textAlign: "center",
                  display: "flex",
                }}
              >
                {" "}
                <MDButton color={"info"} verdant={"gradient"} type={"submit"}>
                  Upload Banner
                </MDButton>
              </MDBox>
            </MDBox>
          )}
        </MDBox>
      </SkModal>
      {/* banner thired modal................................>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <SkModal
        show={isBnanner3}
        unShow={setIsBnanner3}
        width={{ sx: "100%", md: "55%", xl: "55%", sm: "100%" }}
        height={"auto"}
        padding={3}
        overflowY={true}
      >
        <MDBox
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
          component="form"
          role="form"
          onSubmit={handleSubmitBannerThree}
        >
          {Loading ? (
            <SkLoading />
          ) : (
            <MDBox
              sx={{
                width: "90%",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                flexDirection: "column",
                gap: 3,
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
                  upload Banner
                </MDTypography>
              </Card>
              <MDTypography variant="h6">
                image size <AstrieskIcon/>
                <MDTypography variant="body1" component="span" fontSize={11}>
                  &nbsp; ( 1349 × 400 px)
                </MDTypography>
              </MDTypography>
              <ImagePicker
                required={true}
                name="banner1"
                multiple={false}
                images={isBanner1Image}
                setImages={setIsBanner1Image}

                // isImageURLs={isData?.thumbnail}
              />
              <MDBox
                sx={{
                  width: "100%",
                  justifyContent: "flex-end",
                  textAlign: "center",
                  display: "flex",
                }}
              >
                {" "}
                <MDButton color={"info"} verdant={"gradient"} type={"submit"}>
                  Upload Banner
                </MDButton>
              </MDBox>
            </MDBox>
          )}
        </MDBox>
      </SkModal>
    </>
  );
};

export default HomePage;
