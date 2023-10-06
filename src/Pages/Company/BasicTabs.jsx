import { AppBar, Box, Card, Grid, Icon, IconButton, Tab, Tabs, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import breakpoints from "assets/theme/base/breakpoints";
import MDBox from "components/MDBox";
import PropTypes from "prop-types";
import {
  AssignmentReturnOutlined,
  Close,
  Edit,
  Gavel,
  Info,
  PhotoCamera,
  Policy,
  SelfImprovementOutlined,
  VerticalAlignBottomOutlined,
} from "@mui/icons-material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { useDispatch, useSelector } from "react-redux";
import SkModal from "components/SkModal";
import { useMaterialUIController } from "context";
import SkLoading from "components/SkLoading";
import MDBadge from "components/MDBadge";
import { SkPrice } from "Utils/dateFunc";
import { formattedDateServer } from "Utils/dateFunc";
import Skeditor from "components/SKeditor";
import { EditorState, convertToRaw, convertFromHTML, ContentState } from "draft-js";
import { skCompany } from "redux/festures/isCompany";
import MDAvatar from "components/MDAvatar";
import ImagePicker from "components/ApnaUploader";
// import { updateCompany } from "redux/festures/isCompany";
import { handleAlert } from "redux/festures/alertSlice";
import axios from "axios";
import MDInput from "components/MDInput";
// import AttributeInput from "components/ApnaSelect/Attribute";
import SkAutoCompleteSingle from "components/ApnaSelect/SkSingleAuto";
// import { isUpdateCompany } from "redux/festures/isCompany";
// import { EditorState,  } from "draft-js";

const BasicTabs = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  // const { Loading, companyData } = useSelector((data) => ({ ...data?.isCompany }));\
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isTermsData, setIsTermsData] = useState(EditorState.createEmpty());
  const [isPolicyData, setPolicyData] = useState(EditorState.createEmpty());
  const [isAboutData, setAboutData] = useState(EditorState.createEmpty());
  const [isReturnData, setIsReturn] = useState(EditorState.createEmpty());
  const [isDescription, setIsDescription] = useState(EditorState.createEmpty());
  const [isSeoDescription, setIsSeoDescription] = useState(EditorState.createEmpty());
  const [isFooterAbout, setIsFooterAbout] = useState(EditorState.createEmpty());
  const [isAddressFooter, setIsAddressFooter] = useState(EditorState.createEmpty());
  const [IsSeo_keyword, isSetSeo_keyword] = useState("");
  const [site_name, isSite_name] = useState("");
  const [footerDescription, setFooterDescription] = useState("");
  const [isGst, setIsGst] = useState("");
  const [bannerImage, setBanerImage] = useState("");
  const [isFavIcon, setIsFavIcon] = useState("");
  const [isFacebook, setIsFacebook] = useState("");
  const [isInsta, setIsInsta] = useState("");
  const [isLinkedin, setIsLinkedin] = useState("");
  const [isTwitter, setIsTwitter] = useState("");
  const [isYoutube, setIsYoutube] = useState("");
  const [isWhatsaap, setIsWhatsapp] = useState("");
  const [isPhone, setIsPhone] = useState("");
  const [isLoaderImage, setIsLoaderImage] = useState("");
  // const [isFooterAbout, setIsFooterAbout] = useState("");
  const [headerLogo, setHeaderLogo] = useState("");
  const [footerLogo, setFooterLogo] = useState("");
  const [isHeaderLink, setIsHeaderLink] = useState([]);
  const [isFooterLink, setIsFooterLink] = useState([]);
  const [file, setFile] = useState("");
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(skCompany({ url: `/company/getCompany` }));
  }, []);
  const { Loading, companyData } = useSelector((data) => ({ ...data?.isCompany }));
  // console.log(companyData)
  const isUpdateCompany = async ({ data, content }) => {
    const formData = new FormData();
    formData.append(content, data);
    // console.log(...formData)
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}company/updateCompany`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(
        handleAlert({
          isOpen: true,
          type: response?.data?.success ? "success" : "error",
          msg: response?.data?.message,
        })
      );
      dispatch(skCompany({ url: `/company/getCompany` }));
      // console.log(response.data, "response");
      // Handle success
    } catch (error) {
      // console.log(error, "responseERROR");
      // Handle error
    }
  };
  useEffect(() => {
    if (companyData) {
      isSetSeo_keyword(companyData?.seo_keyword);
      // setIsSeoDescription(companyData?.seo_description);
      isSite_name(companyData?.site_name);
      setFooterDescription(companyData?.footer_description);
      setIsGst(companyData?.gst);
      setBanerImage(companyData?.banner);
      setIsFavIcon(companyData?.fav_icon);
      setIsFacebook(companyData?.facebook);
      setIsInsta(companyData?.instagram);
      setIsLinkedin(companyData?.linkedin);
      setIsTwitter(companyData?.twitter);
      setIsYoutube(companyData?.youtube);
      setIsWhatsapp(companyData?.whastapp);
      setIsPhone(companyData?.phone);
      setIsLoaderImage(companyData?.email);
      setHeaderLogo(companyData?.header_logo);
      setFooterLogo(companyData?.footer_logo);
      setIsHeaderLink(companyData?.header_link);
      setIsFooterLink(companyData?.footer_link);
    }
  }, [companyData]);
  // console.log(companyData);
  useEffect(() => {
    if (companyData) {
      const termsData = EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(companyData?.term_condition).contentBlocks,
          convertFromHTML(companyData?.term_condition).entityMap
        )
      );
      const policyData = EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(companyData?.privacy_policy).contentBlocks,
          convertFromHTML(companyData?.privacy_policy).entityMap
        )
      );
      const returnData = EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(companyData?.return_policy).contentBlocks,
          convertFromHTML(companyData?.return_policy).entityMap
        )
      );
      setIsTermsData(termsData);
      setPolicyData(policyData);
      setIsReturn(returnData);
    }
  }, [companyData]);
  // console.log(isTermsData, "isTermsData");
  // console.log(isPolicyData, "isPolicyData");
  // console.log(isReturnData, "isReturnData");
  const handleProfilePic = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setBanerImage(e.target.files && e.target.files.length ? e.target.files[0] : "");
  };

  const isCompany = (
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
      {Loading ? (
        <SkLoading />
      ) : (
        <MDBox
          display="flex"
          alignItems="center"
          lineHeight={1}
          sx={({ palette: { dark, white, info }, breakpoints }) => ({
            //   border: 0.5,
            //   borderColor: darkMode ? white.main : dark.main,
            //   borderRadius: 3,

            [breakpoints.up("xs")]: {
              flexDirection: "column",
              px: 1,
              width: "100%",
            },
            [breakpoints.up("sm")]: {
              flexDirection: "column",
              px: 1,
              width: "100%",
            },
            [breakpoints.up("md")]: {
              // flexDirection: "row",
              flexDirection: "column",
              px: 3,
              width: "100%",
            },
            [breakpoints.up("lg")]: {
              // flexDirection: "row",
              flexDirection: "column",
              px: 3,
              width: "100%",
            },

            width: "100%",
            //   height: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 2,
          })}
        >
          {" "}
          {/* <MDBox
              sx={({ palette: { dark, white, info } }) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                // flexDirection: "column",
                width: "100%",
                gap: 1,
                px: 6,
                border: 1,
                borderColor: darkMode ? white.main : dark.main,
                borderRadius: 2,
                py: 2,
              })}
            >
              <MDTypography variant="h6">Website name :</MDTypography>
              <MDTypography variant="h6">{companyData?.site_name}</MDTypography>
               <MDButton color={"info"} verdant={"gradient"}>
                update
              </MDButton> 
            </MDBox> */}
          <MDBox
            sx={({ palette: { dark, white, info }, breakpoints }) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: "100%",
              gap: 1,
              [breakpoints.up("xs")]: {
                px: 1,
                width: "100%",
              },
              [breakpoints.up("sm")]: {
                px: 1,
                width: "100%",
              },
              [breakpoints.up("md")]: {
                px: 6,
                width: "100%",
              },
              [breakpoints.up("lg")]: {
                px: 6,
                width: "100%",
              },
              border: 1,
              borderColor: darkMode ? white.main : dark.main,
              borderRadius: 2,
              py: 2,
            })}
          >
            <MDTypography variant="h6">Website name :</MDTypography>
            <MDTypography variant="h6">{companyData?.site_name}</MDTypography>
            <Box
              sx={({ palette: { dark, white, info }, breakpoints }) => ({
                [breakpoints.up("xs")]: {
                  display: "flex",
                  gap: 2,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "column",
                },
                [breakpoints.up("sm")]: {
                  display: "flex",
                  gap: 2,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "column",
                },
                [breakpoints.up("md")]: {
                  display: "flex",
                  gap: 5,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "row",
                },
                [breakpoints.up("lg")]: {
                  display: "flex",
                  gap: 5,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "row",
                },
              })}
            >
              <MDInput
                type="text"
                placeholder="site name"
                fullWidth
                name="site_name"
                value={site_name}
                onChange={(e) => isSite_name(e.target.value)}
              />
              <MDButton
                color={"info"}
                verdant={"gradient"}
                onClick={() => {
                  isUpdateCompany({
                    data: site_name,
                    content: "site_name",
                  });
                }}
              >
                update
              </MDButton>
            </Box>
          </MDBox>
          <MDBox
            sx={({ palette: { dark, white, info }, breakpoints }) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: "100%",
              gap: 1,
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
              border: 1,
              borderColor: darkMode ? white.main : dark.main,
              borderRadius: 2,
              py: 2,
            })}
          >
            <MDTypography variant="h6">banner :</MDTypography>
            <MDBox
              // sx={{
              //
              //
              // }}
              sx={({ palette: { dark, white, info }, breakpoints }) => ({
                [breakpoints.up("xs")]: {
                  height: 220,
                  width: "100%",
                },
                [breakpoints.up("sm")]: {
                  height: 220,
                  width: "100%",
                },
                [breakpoints.up("md")]: {
                  height: 320,
                  width: "100%",
                },
                [breakpoints.up("lg")]: {
                  height: 320,
                  width: "100%",
                },
              })}
            >
              <img
                src={`${process.env.REACT_APP_URI}/${companyData?.banner}`}
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                onError={(e) => {
                  e.onerror = null;
                  e.target.src = require("../../assets/images/bg-sign-up-cover.jpeg");
                }}
              />
            </MDBox>
            <Box
              // sx={{
              //   display: "flex",
              //   gap: 5,
              //   width: "100%",
              //   justifyContent: "center",
              //   alignItems: "flex-start",
              // }}
              sx={({ palette: { dark, white, info }, breakpoints }) => ({
                [breakpoints.up("xs")]: {
                  display: "flex",
                  gap: 2,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "column",
                },
                [breakpoints.up("sm")]: {
                  display: "flex",
                  gap: 2,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "column",
                },
                [breakpoints.up("md")]: {
                  display: "flex",
                  gap: 5,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "row",
                },
                [breakpoints.up("lg")]: {
                  display: "flex",
                  gap: 5,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "row",
                },
              })}
            >
              {/* <MDAvatar alt="Shraddha Kapoor" src={file} sx={{ width: 48, height: 48, mr: 2 }} /> */}
              <ImagePicker
                name="Banner"
                multiple={false}
                images={bannerImage}
                setImages={setBanerImage}
              />
              <MDButton
                color={"info"}
                verdant={"gradient"}
                onClick={() => {
                  isUpdateCompany({
                    data: bannerImage,
                    content: "banner",
                  });
                }}
              >
                update
              </MDButton>
            </Box>
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
              gap: 3.5,
            })}
          >
            <MDBox
              sx={({ palette: { dark, white, info }, breakpoints }) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
                gap: 1,
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
                border: 1,
                borderColor: darkMode ? white.main : dark.main,
                borderRadius: 2,
                py: 2,
              })}
            >
              <MDTypography variant="h6">Description :</MDTypography>
              {/* <MDTypography
                  variant="h6"
                  dangerouslySetInnerHTML={{ __html: companyData?.description }}
                /> */}
              <Skeditor
                editorState={isDescription}
                setEditorState={setIsDescription}
                placeholder={"Description"}
                initialContent={companyData && companyData?.description}
                content={"description"}
              />
            </MDBox>
            <MDBox
              sx={({ palette: { dark, white, info }, breakpoints }) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
                gap: 1,
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
                border: 1,
                borderColor: darkMode ? white.main : dark.main,
                borderRadius: 2,
                py: 2,
              })}
            >
              <MDTypography variant="h6">SEO Description :</MDTypography>
              <Skeditor
                editorState={isSeoDescription}
                setEditorState={setIsSeoDescription}
                placeholder={"Seo-Description"}
                initialContent={companyData && companyData?.seo_description}
                content={"seo_description"}
              />
            </MDBox>
            <MDBox
              sx={({ palette: { dark, white, info }, breakpoints }) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
                gap: 1,
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
                border: 1,
                borderColor: darkMode ? white.main : dark.main,
                borderRadius: 2,
                py: 2,
              })}
            >
              <MDTypography variant="h6">SEO Keyword :</MDTypography>
              <MDTypography variant="h6">{companyData?.seo_keyword}</MDTypography>
              <Box
                sx={({ palette: { dark, white, info }, breakpoints }) => ({
                  [breakpoints.up("xs")]: {
                    display: "flex",
                    gap: 2,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  },
                  [breakpoints.up("sm")]: {
                    display: "flex",
                    gap: 2,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  },
                  [breakpoints.up("md")]: {
                    display: "flex",
                    gap: 5,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "row",
                  },
                  [breakpoints.up("lg")]: {
                    display: "flex",
                    gap: 5,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "row",
                  },
                })}
              >
                <MDInput
                  type="text"
                  placeholder="SEO keyword"
                  fullWidth
                  name="SEO keyword"
                  value={IsSeo_keyword}
                  onChange={(e) => isSetSeo_keyword(e.target.value)}
                />
                <MDButton
                  color={"info"}
                  verdant={"gradient"}
                  onClick={() => {
                    isUpdateCompany({
                      data: IsSeo_keyword,
                      content: "seo_keyword",
                    });
                  }}
                >
                  update
                </MDButton>
              </Box>
            </MDBox>
            {/* <MDBox  
              sx={({ palette: { dark, white, info }, breakpoints }) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
                gap: 1,
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
                border: 1,
                borderColor: darkMode ? white.main : dark.main,
                borderRadius: 2,
                py: 2,
              })}
            >
              <MDTypography variant="h6">Header Link :</MDTypography>
              <MDBox
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                {companyData?.header_link &&
                  companyData?.header_link.length > 0 &&
                  companyData?.header_link.map((item, index) => (
                    <MDTypography variant="h6" key={index}>
                      {item}
                    </MDTypography>
                  ))}
              </MDBox>

              <Box
                sx={({ palette: { dark, white, info }, breakpoints }) => ({
                  [breakpoints.up("xs")]: {
                    display: "flex",
                    gap: 2,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  },
                  [breakpoints.up("sm")]: {
                    display: "flex",
                    gap: 2,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  },
                  [breakpoints.up("md")]: {
                    display: "flex",
                    gap: 5,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "row",
                  },
                  [breakpoints.up("lg")]: {
                    display: "flex",
                    gap: 5,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "row",
                  },
                })}
              >
                <SkAutoCompleteSingle outputValue={isHeaderLink} setOutputValue={setIsHeaderLink} />
                <MDButton
                  color={"info"}
                  verdant={"gradient"}
                  onClick={() => {
                    const isArray =
                      isHeaderLink && isHeaderLink.length > 0 && isHeaderLink.map((items) => items);
                    isUpdateCompany({
                      data: isArray,
                      content: "header_link",
                    });
                  }}
                >
                  update
                </MDButton>
              </Box>
            </MDBox> */}
            <MDBox
              sx={({ palette: { dark, white, info }, breakpoints }) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
                gap: 1,
                [breakpoints.up("xs")]: {
                  px: 2,
                },
                [breakpoints.up("sm")]: {
                  px: 2,
                },
                [breakpoints.up("md")]: {
                  px: 6,
                },
                [breakpoints.up("lg")]: {
                  px: 6,
                },
                border: 1,
                borderColor: darkMode ? white.main : dark.main,
                borderRadius: 2,
                py: 2,
              })}
            >
              <MDBox>
                <MDTypography variant="h6">Header Logo :</MDTypography>
                <MDBox
                  sx={{
                    height: 180,
                    width: 280,
                    my: 1,
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_URI}/${companyData?.header_logo}`}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                    }}
                    onError={(e) => {
                      e.onerror = null;
                      e.target.src = require("../../assets/images/bg-sign-up-cover.jpeg");
                    }}
                  />
                </MDBox>
              </MDBox>
              <Box
                sx={({ palette: { dark, white, info }, breakpoints }) => ({
                  [breakpoints.up("xs")]: {
                    display: "flex",
                    gap: 2,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  },
                  [breakpoints.up("sm")]: {
                    display: "flex",
                    gap: 2,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  },
                  [breakpoints.up("md")]: {
                    display: "flex",
                    gap: 5,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "row",
                  },
                  [breakpoints.up("lg")]: {
                    display: "flex",
                    gap: 5,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "row",
                  },
                })}
              >
                {/* <MDAvatar alt="Shraddha Kapoor" src={file} sx={{ width: 48, height: 48, mr: 2 }} /> */}
                <ImagePicker
                  name="Banner"
                  multiple={false}
                  images={headerLogo}
                  setImages={setHeaderLogo}
                />
                <MDButton
                  color={"info"}
                  verdant={"gradient"}
                  onClick={() => {
                    isUpdateCompany({
                      data: headerLogo,
                      content: "header_logo",
                    });
                  }}
                >
                  update
                </MDButton>
              </Box>
            </MDBox>
            <MDBox
              sx={({ palette: { dark, white, info }, breakpoints }) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
                gap: 1,
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
                border: 1,
                borderColor: darkMode ? white.main : dark.main,
                borderRadius: 2,
                py: 2,
              })}
            >
              <MDBox>
                <MDTypography variant="h6">Fav Icon :</MDTypography>
                <MDBox
                  sx={{
                    height: 80,
                    width: 80,
                    my: 1,
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_URI}/${companyData?.fav_icon}`}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                    }}
                    onError={(e) => {
                      e.onerror = null;
                      e.target.src = require("../../assets/images/bg-sign-up-cover.jpeg");
                    }}
                  />
                </MDBox>
              </MDBox>
              <Box
                sx={({ palette: { dark, white, info }, breakpoints }) => ({
                  [breakpoints.up("xs")]: {
                    display: "flex",
                    gap: 2,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  },
                  [breakpoints.up("sm")]: {
                    display: "flex",
                    gap: 2,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  },
                  [breakpoints.up("md")]: {
                    display: "flex",
                    gap: 5,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "row",
                  },
                  [breakpoints.up("lg")]: {
                    display: "flex",
                    gap: 5,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "row",
                  },
                })}
              >
                {/* <MDAvatar alt="Shraddha Kapoor" src={file} sx={{ width: 48, height: 48, mr: 2 }} /> */}
                <ImagePicker
                  name="Banner"
                  multiple={false}
                  images={isFavIcon}
                  setImages={setIsFavIcon}
                />
                <MDButton
                  color={"info"}
                  verdant={"gradient"}
                  onClick={() => {
                    isUpdateCompany({
                      data: isFavIcon,
                      content: "fav_icon",
                    });
                  }}
                >
                  update
                </MDButton>
              </Box>
            </MDBox>
            <MDBox
              sx={({ palette: { dark, white, info }, breakpoints }) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
                gap: 1,
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
                border: 1,
                borderColor: darkMode ? white.main : dark.main,
                borderRadius: 2,
                py: 2,
              })}
            >
              <MDBox>
                <MDTypography variant="h6">Loading image :</MDTypography>
                <MDBox
                  sx={{
                    height: 180,
                    width: 180,

                    my: 1,
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_URI}/${companyData?.loader}`}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                    }}
                    onError={(e) => {
                      e.onerror = null;
                      e.target.src = require("../../assets/images/bg-sign-up-cover.jpeg");
                    }}
                  />
                </MDBox>
              </MDBox>
              <Box
                sx={({ palette: { dark, white, info }, breakpoints }) => ({
                  [breakpoints.up("xs")]: {
                    display: "flex",
                    gap: 2,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  },
                  [breakpoints.up("sm")]: {
                    display: "flex",
                    gap: 2,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  },
                  [breakpoints.up("md")]: {
                    display: "flex",
                    gap: 5,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "row",
                  },
                  [breakpoints.up("lg")]: {
                    display: "flex",
                    gap: 5,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "row",
                  },
                })}
              >
                {/* <MDAvatar alt="Shraddha Kapoor" src={file} sx={{ width: 48, height: 48, mr: 2 }} /> */}
                <ImagePicker
                  name="Banner"
                  multiple={false}
                  images={isLoaderImage}
                  setImages={setIsLoaderImage}
                  accept="image/gif, image/jpeg, image/png"
                />
                <MDButton
                  color={"info"}
                  verdant={"gradient"}
                  onClick={() => {
                    isUpdateCompany({
                      data: isLoaderImage,
                      content: "loader",
                    });
                  }}
                >
                  update
                </MDButton>
              </Box>
            </MDBox>

            <MDBox
              sx={({ palette: { dark, white, info }, breakpoints }) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
                gap: 1,
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
                border: 1,
                borderColor: darkMode ? white.main : dark.main,
                borderRadius: 2,
                py: 2,
              })}
            >
              <MDTypography variant="h6">GST number :</MDTypography>
              <MDTypography variant="h6">{companyData?.gst} </MDTypography>
              <Box
                sx={({ palette: { dark, white, info }, breakpoints }) => ({
                  [breakpoints.up("xs")]: {
                    display: "flex",
                    gap: 2,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  },
                  [breakpoints.up("sm")]: {
                    display: "flex",
                    gap: 2,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  },
                  [breakpoints.up("md")]: {
                    display: "flex",
                    gap: 5,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "row",
                  },
                  [breakpoints.up("lg")]: {
                    display: "flex",
                    gap: 5,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "row",
                  },
                })}
              >
                <MDInput
                  type="text"
                  placeholder="gts number"
                  fullWidth
                  name="gts number"
                  value={isGst}
                  onChange={(e) => setIsGst(e.target.value)}
                />
                <MDButton
                  color={"info"}
                  verdant={"gradient"}
                  onClick={() => {
                    isUpdateCompany({
                      data: isGst,
                      content: "gst",
                    });
                  }}
                >
                  update
                </MDButton>
              </Box>
            </MDBox>
          </MDBox>
        </MDBox>
      )}
    </MDBox>
  );
  const isFooter = (
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
      {Loading ? (
        <SkLoading />
      ) : (
        <MDBox
          display="flex"
          alignItems="center"
          lineHeight={1}
          sx={({ palette: { dark, white, info }, breakpoints }) => ({
            //   border: 0.5,
            //   borderColor: darkMode ? white.main : dark.main,
            //   borderRadius: 3,
            [breakpoints.up("xs")]: {
              px: 1,
            },
            [breakpoints.up("sm")]: {
              px: 1,
            },
            [breakpoints.up("md")]: {
              px: 3,
            },
            [breakpoints.up("lg")]: {
              px: 3,
            },
            width: "100%",
            //   height: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 2,
          })}
        >
          {" "}
          <MDBox
            sx={({ palette: { dark, white, info }, breakpoints }) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "column",
              width: "100%",
              gap: 1,
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
              border: 1,
              borderColor: darkMode ? white.main : dark.main,
              borderRadius: 2,
              py: 2,
            })}
          >
            <Box>
              <MDTypography variant="h6">Footer Description :</MDTypography>
              <MDTypography variant="h6">{companyData?.footer_description}</MDTypography>
            </Box>
            <Box
              sx={({ palette: { dark, white, info }, breakpoints }) => ({
                [breakpoints.up("xs")]: {
                  display: "flex",
                  gap: 2,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "column",
                },
                [breakpoints.up("sm")]: {
                  display: "flex",
                  gap: 2,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "column",
                },
                [breakpoints.up("md")]: {
                  display: "flex",
                  gap: 5,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "row",
                },
                [breakpoints.up("lg")]: {
                  display: "flex",
                  gap: 5,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "row",
                },
              })}
            >
              <MDInput
                type="text"
                placeholder="footer Description"
                fullWidth
                name="footer Description"
                value={footerDescription}
                onChange={(e) => setFooterDescription(e.target.value)}
              />

              <MDButton
                color={"info"}
                verdant={"gradient"}
                onClick={() => {
                  isUpdateCompany({
                    data: footerDescription,
                    content: "footer_description",
                  });
                }}
              >
                update
              </MDButton>
            </Box>
          </MDBox>
          {/* <MDBox
            sx={({ palette: { dark, white, info }, breakpoints }) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "column",
              width: "100%",
              gap: 1,
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
              border: 1,
              borderColor: darkMode ? white.main : dark.main,
              borderRadius: 2,
              py: 2,
            })}
          >
            {/* <MDTypography variant="h6">Footer About :</MDTypography> */}
          {/* <Skeditor
              editorState={isFooterAbout}
              setEditorState={setIsFooterAbout}
              placeholder={"footer_about"}
              initialContent={companyData && companyData?.footer_about}
              content={"footer_about"}
            /> 
          </MDBox> */}
          <MDBox
            sx={({ palette: { dark, white, info }, breakpoints }) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "column",
              width: "100%",
              gap: 1,
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
              border: 1,
              borderColor: darkMode ? white.main : dark.main,
              borderRadius: 2,
              py: 2,
            })}
          >
            <MDTypography variant="h6">Footer Address :</MDTypography>
            {/* <MDTypography variant="h6" dangerouslySetInnerHTML={{ __html: companyData?.address }} /> */}
            <Skeditor
              editorState={isAddressFooter}
              setEditorState={setIsAddressFooter}
              placeholder={"address"}
              initialContent={companyData && companyData?.address}
              content={"address"}
            />
          </MDBox>
          {/* <MDBox
            sx={({ palette: { dark, white, info } }) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: "100%",
              gap: 1,
              px: 6,
              border: 1,
              borderColor: darkMode ? white.main : dark.main,
              borderRadius: 2,
              py: 2,
            })}
          >
            <MDTypography variant="h6">Footer Link:</MDTypography>
            <MDBox
              sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              {companyData?.footer_link &&
                companyData?.footer_link.length > 0 &&
                companyData?.footer_link.map((item, index) => (
                  <MDTypography variant="h6" key={index}>
                    {item}{" "}
                  </MDTypography>
                ))}
            </MDBox>
            <Box
              sx={({ palette: { dark, white, info }, breakpoints }) => ({
                [breakpoints.up("xs")]: {
                  display: "flex",
                  gap: 2,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "column",
                },
                [breakpoints.up("sm")]: {
                  display: "flex",
                  gap: 2,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "column",
                },
                [breakpoints.up("md")]: {
                  display: "flex",
                  gap: 5,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "row",
                },
                [breakpoints.up("lg")]: {
                  display: "flex",
                  gap: 5,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "row",
                },
              })}
            >
              <SkAutoCompleteSingle outputValue={isFooterLink} setOutputValue={setIsFooterLink} />
              <MDButton
                color={"info"}
                verdant={"gradient"}
                onClick={() => {
                  const isArray =
                    isFooterLink && isFooterLink.length > 0 && isFooterLink.map((items) => items);
                  isUpdateCompany({
                    data: isArray,
                    content: "footer_link",
                  });
                }}
              >
                update
              </MDButton>
            </Box>
          </MDBox> */}
          <MDBox
            sx={({ palette: { dark, white, info }, breakpoints }) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: "100%",
              gap: 1,
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
              border: 1,
              borderColor: darkMode ? white.main : dark.main,
              borderRadius: 2,
              py: 2,
            })}
          >
            <MDBox>
              <MDTypography variant="h6">Footer Logo :</MDTypography>
              <MDBox
                sx={{
                  height: 180,
                  width: 280,
                  my: 1,
                }}
              >
                <img
                  src={`${process.env.REACT_APP_URI}/${companyData?.footer_logo}`}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  onError={(e) => {
                    e.onerror = null;
                    e.target.src = require("../../assets/images/bg-sign-up-cover.jpeg");
                  }}
                />
              </MDBox>
            </MDBox>
            <Box
              sx={({ palette: { dark, white, info }, breakpoints }) => ({
                [breakpoints.up("xs")]: {
                  display: "flex",
                  gap: 2,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "column",
                },
                [breakpoints.up("sm")]: {
                  display: "flex",
                  gap: 2,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "column",
                },
                [breakpoints.up("md")]: {
                  display: "flex",
                  gap: 5,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "row",
                },
                [breakpoints.up("lg")]: {
                  display: "flex",
                  gap: 5,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "row",
                },
              })}
            >
              {/* <MDAvatar alt="Shraddha Kapoor" src={file} sx={{ width: 48, height: 48, mr: 2 }} /> */}
              <ImagePicker
                name="Banner"
                multiple={false}
                images={footerLogo}
                setImages={setFooterLogo}
              />
              <MDButton
                color={"info"}
                verdant={"gradient"}
                onClick={() => {
                  isUpdateCompany({
                    data: footerLogo,
                    content: "footer_logo",
                  });
                }}
              >
                update
              </MDButton>
            </Box>
          </MDBox>
          <MDBox
            sx={({ palette: { dark, white, info }, breakpoints }) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: "100%",
              gap: 1,
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
              border: 1,
              borderColor: darkMode ? white.main : dark.main,
              borderRadius: 2,
              py: 2,
            })}
          >
            <MDTypography variant="h6">Use Full Links :</MDTypography>
            <MDBox
              sx={({ palette: { dark, white, info }, breakpoints }) => ({
                [breakpoints.up("xs")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 1,
                },
                [breakpoints.up("sm")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 1,
                },
                [breakpoints.up("md")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 6,
                },
                [breakpoints.up("lg")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 6,
                },
              })}
            >
              <MDTypography
                variant="h6"
                sx={{
                  display: "flex",
                  flex: 1,
                }}
              >
                instagram
              </MDTypography>
              <MDTypography
                variant="h6"
                sx={{
                  overflow: "hidden",
                  whiteSpace: "wrap",
                  textOverflow: "ellipsis",
                  maxWidth: "70%",
                }}
              >
                {companyData?.instagram}
              </MDTypography>
            </MDBox>
            <MDBox
              sx={({ palette: { dark, white, info }, breakpoints }) => ({
                [breakpoints.up("xs")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 1,
                },
                [breakpoints.up("sm")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 1,
                },
                [breakpoints.up("md")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 6,
                },
                [breakpoints.up("lg")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 6,
                },
              })}
            >
              <MDTypography
                variant="h6"
                sx={{
                  display: "flex",
                  flex: 1,
                }}
              >
                facebook
              </MDTypography>
              <MDTypography
                variant="h6"
                sx={{
                  overflow: "hidden",
                  whiteSpace: "wrap",
                  textOverflow: "ellipsis",
                  maxWidth: "70%",
                }}
              >
                {companyData?.facebook}
              </MDTypography>
            </MDBox>
            <MDBox
              sx={({ palette: { dark, white, info }, breakpoints }) => ({
                [breakpoints.up("xs")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 1,
                },
                [breakpoints.up("sm")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 1,
                },
                [breakpoints.up("md")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 6,
                },
                [breakpoints.up("lg")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 6,
                },
              })}
            >
              <MDTypography
                variant="h6"
                sx={{
                  display: "flex",
                  flex: 1,
                }}
              >
                linkedin
              </MDTypography>
              <MDTypography
                variant="h6"
                sx={{
                  overflow: "hidden",
                  whiteSpace: "wrap",
                  textOverflow: "ellipsis",
                  maxWidth: "70%",
                }}
              >
                {companyData?.linkedin}
              </MDTypography>
            </MDBox>
            <MDBox
              sx={({ palette: { dark, white, info }, breakpoints }) => ({
                [breakpoints.up("xs")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 1,
                },
                [breakpoints.up("sm")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 1,
                },
                [breakpoints.up("md")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 6,
                },
                [breakpoints.up("lg")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 6,
                },
              })}
            >
              <MDTypography
                variant="h6"
                sx={{
                  display: "flex",
                  flex: 1,
                }}
              >
                twitter
              </MDTypography>
              <MDTypography
                variant="h6"
                sx={{
                  overflow: "hidden",
                  whiteSpace: "wrap",
                  textOverflow: "ellipsis",
                  maxWidth: "70%",
                }}
              >
                {companyData?.twitter}
              </MDTypography>
            </MDBox>
            <MDBox
              sx={({ palette: { dark, white, info }, breakpoints }) => ({
                [breakpoints.up("xs")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 1,
                },
                [breakpoints.up("sm")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 1,
                },
                [breakpoints.up("md")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 6,
                },
                [breakpoints.up("lg")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 6,
                },
              })}
            >
              <MDTypography
                variant="h6"
                sx={{
                  display: "flex",
                  flex: 1,
                }}
              >
                whatsApp
              </MDTypography>
              <MDTypography
                variant="h6"
                sx={{
                  overflow: "hidden",
                  whiteSpace: "wrap",
                  textOverflow: "ellipsis",
                  maxWidth: "70%",
                }}
              >
                {companyData?.whastapp}
              </MDTypography>
            </MDBox>
            <MDBox
              sx={({ palette: { dark, white, info }, breakpoints }) => ({
                [breakpoints.up("xs")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 1,
                },
                [breakpoints.up("sm")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 1,
                },
                [breakpoints.up("md")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 6,
                },
                [breakpoints.up("lg")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 6,
                },
              })}
            >
              <MDTypography
                variant="h6"
                sx={{
                  display: "flex",
                  flex: 1,
                }}
              >
                YouTube
              </MDTypography>
              <MDTypography
                variant="h6"
                sx={{
                  overflow: "hidden",
                  whiteSpace: "wrap",
                  textOverflow: "ellipsis",
                  maxWidth: "70%",
                }}
              >
                {companyData?.youtube}
              </MDTypography>
            </MDBox>
            <MDBox
              sx={({ palette: { dark, white, info }, breakpoints }) => ({
                [breakpoints.up("xs")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 1,
                },
                [breakpoints.up("sm")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 1,
                },
                [breakpoints.up("md")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 6,
                },
                [breakpoints.up("lg")]: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // flexDirection: "column",
                  width: "100%",
                  gap: 1,
                  px: 6,
                },
              })}
            >
              <MDTypography
                variant="h6"
                sx={{
                  display: "flex",
                  flex: 1,
                }}
              >
                Phone
              </MDTypography>
              <MDTypography
                variant="h6"
                sx={{
                  overflow: "hidden",
                  whiteSpace: "wrap",
                  textOverflow: "ellipsis",
                  maxWidth: "70%",
                }}
              >
                {companyData?.phone}
              </MDTypography>
            </MDBox>
            <MDBox
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "100%",
                my: 3,
              }}
            >
              <MDButton
                color={"info"}
                verdant={"gradient"}
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Edit
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      )}
    </MDBox>
  );
  const isTerms = (
    <Skeditor
      editorState={isTermsData}
      setEditorState={setIsTermsData}
      placeholder={"terms and condition"}
      initialContent={companyData && companyData?.term_condition}
      content={"term_condition"}
    />
  );
  const isPolicy = (
    <Skeditor
      editorState={isPolicyData}
      setEditorState={setPolicyData}
      placeholder={"privacy policy"}
      initialContent={companyData && companyData?.privacy_policy}
      content={"privacy_policy"}
    />
  );
  const isReturn = (
    <Skeditor
      editorState={isReturnData}
      setEditorState={setIsReturn}
      placeholder={"return and refund"}
      initialContent={companyData && companyData?.return_policy}
      content={"return_policy"}
    />
  );
  const isAbout = (
    <Skeditor
      editorState={isFooterAbout}
      setEditorState={setIsFooterAbout}
      placeholder={"About Us"}
      initialContent={companyData && companyData?.about_us}
      content={"about_us"}
    />
  );

  // {console.log(companyData,"companyData")}
  const tabsName = [
    {
      name: "Company",
      value: "company",
      url: `/product/productFilter/}`,
      icon: <SelfImprovementOutlined />,
      pagination: true,
      isProp: isCompany,
    },
    {
      name: "Footer",
      value: "footer",
      url: `/product/productFilter/}`,
      icon: <VerticalAlignBottomOutlined />,
      pagination: true,
      isProp: isFooter,
    },
    {
      name: "Term_Condition",
      value: "term_condition",
      url: `/product/productFilter/}`,
      icon: <Gavel />,
      pagination: true,
      isProp: isTerms,
    },
    {
      name: "Privacy_Policy ",
      value: "privacy_policy ",
      icon: <Policy />,
      //   url: `${process.env.REACT_APP_API}/lens/getAllLens`,

      pagination: true,
      isProp: isPolicy,
    },
    {
      name: "About ",
      value: "About ",
      icon: <Info />,
      //   url: `${process.env.REACT_APP_API}/lens/getAllLens`,

      pagination: true,
      isProp: isAbout,
    },
    {
      name: "Return_Policy",
      value: "return_policy",
      icon: <AssignmentReturnOutlined />,
      //   url: `${process.env.REACT_APP_API}/lens/getAllLens`,

      pagination: true,
      isProp: isReturn,
    },
  ];
  const handlePageChange = (event, value) => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  };
  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
       The event listener that's calling the handleTabsOrientation function when resizing the window.
      */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <div>
      <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
        <AppBar position="static">
          <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
            {tabsName.map((items, index) => (
              <Tab key={index} label={items?.name} icon={items?.icon} />
            ))}
          </Tabs>
        </AppBar>
      </Grid>
      {tabsName.map((items, index) => (
        <TabPanel value={tabValue} index={index} key={index}>
          <MDBox sx={{ p: 1, my: 3 }}>
            {Loading ? <SkLoading /> : companyData && items?.isProp}
          </MDBox>
        </TabPanel>
      ))}
      <SkModal
        show={isOpen}
        unShow={setIsOpen}
        width={{ sx: "100%", md: "85%", xl: "85%", sm: "100%" }}
        height={"90vh"}
        padding={3}
        overflowY={true}
      >
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
              update useful links
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
              <Box
                sx={{
                  display: "flex",
                  gap: 5,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <MDInput
                  type="text"
                  placeholder="facebook"
                  fullWidth
                  name="facebook"
                  value={isFacebook}
                  onChange={(e) => setIsFacebook(e.target.value)}
                />

                <MDButton
                  color={"info"}
                  verdant={"gradient"}
                  onClick={() => {
                    isUpdateCompany({
                      data: isFacebook,
                      content: "facebook",
                    });
                  }}
                >
                  update
                </MDButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 5,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <MDInput
                  type="text"
                  placeholder="instagram"
                  fullWidth
                  name="instagram"
                  value={isInsta}
                  onChange={(e) => setIsInsta(e.target.value)}
                />

                <MDButton
                  color={"info"}
                  verdant={"gradient"}
                  onClick={() => {
                    isUpdateCompany({
                      data: isInsta,
                      content: "instagram",
                    });
                  }}
                >
                  update
                </MDButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 5,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <MDInput
                  type="text"
                  placeholder="linkedin"
                  fullWidth
                  name="linkedin"
                  value={isLinkedin}
                  onChange={(e) => setIsLinkedin(e.target.value)}
                />

                <MDButton
                  color={"info"}
                  verdant={"gradient"}
                  onClick={() => {
                    isUpdateCompany({
                      data: isLinkedin,
                      content: "linkedin",
                    });
                  }}
                >
                  update
                </MDButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 5,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <MDInput
                  type="text"
                  placeholder="twitter"
                  fullWidth
                  name="twitter"
                  value={isTwitter}
                  onChange={(e) => setIsTwitter(e.target.value)}
                />

                <MDButton
                  color={"info"}
                  verdant={"gradient"}
                  onClick={() => {
                    isUpdateCompany({
                      data: isTwitter,
                      content: "twitter",
                    });
                  }}
                >
                  update
                </MDButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 5,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <MDInput
                  type="text"
                  placeholder="youtube"
                  fullWidth
                  name="youtube"
                  value={isYoutube}
                  onChange={(e) => setIsYoutube(e.target.value)}
                />

                <MDButton
                  color={"info"}
                  verdant={"gradient"}
                  onClick={() => {
                    isUpdateCompany({
                      data: isYoutube,
                      content: "youtube",
                    });
                  }}
                >
                  update
                </MDButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 5,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <MDInput
                  type="text"
                  placeholder="whastapp"
                  fullWidth
                  name="whastapp"
                  value={isWhatsaap}
                  onChange={(e) => setIsWhatsapp(e.target.value)}
                />

                <MDButton
                  color={"info"}
                  verdant={"gradient"}
                  onClick={() => {
                    isUpdateCompany({
                      data: isWhatsaap,
                      content: "whastapp",
                    });
                  }}
                >
                  update
                </MDButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 5,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <MDInput
                  type="text"
                  placeholder="phone"
                  fullWidth
                  name="phone"
                  value={isPhone}
                  onChange={(e) => setIsPhone(e.target.value)}
                />

                <MDButton
                  color={"info"}
                  verdant={"gradient"}
                  onClick={() => {
                    isUpdateCompany({
                      data: isPhone,
                      content: "phone",
                    });
                  }}
                >
                  update
                </MDButton>
              </Box>
            </MDBox>
          )}
        </MDBox>
      </SkModal>
    </div>
  );
};

export default BasicTabs;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
