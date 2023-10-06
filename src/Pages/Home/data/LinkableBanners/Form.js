import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Divider } from "@mui/material";
import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SkLoading from "components/SkLoading";
import { useMaterialUIController } from "context";
import { useDispatch, useSelector } from "react-redux";
import { SkPrice } from "Utils/dateFunc";
import { camelToFlat } from "Utils/dateFunc";
import { formattedDateServer } from "Utils/dateFunc";
import ApnaSelect2 from "components/ApnaSelect";
import { getAllProducts } from "redux/festures/productSlice";
import ApnaSelect from "components/ApnaSelect/ApnaSelect";
import ImagePicker from "components/ApnaUploader";
import AstrieskIcon from 'components/AstrieskIcon'

import MDButton from "components/MDButton";
import { handleAlert } from "redux/festures/alertSlice";
import { updateExtraSections } from "redux/festures/isExtraSectionSlice";
import { getAllExtraSections } from "redux/festures/isExtraSectionSlice";
import { updateLinkableBanners } from "redux/festures/isLinkableBanners";
import MDInput from "components/MDInput";
import { getAllLinkableBanners } from "redux/festures/isLinkableBanners";
import { createLinkableBanners } from "redux/festures/isLinkableBanners";

const LinkableBannersForm = ({ isOpenView, setIsOpenView, isOpenUpdate, setIsOpenUpdate }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [isProducts, setIsProducts] = useState([]);
  const [isBanner, setIsBanner] = useState("");
  const dispatch = useDispatch();
  const admin = localStorage.getItem("admin_id");
  //   const { Loading, singleLinkableBanners } = useSelector((data) => ({ ...data.isBlogs }));
  const { Loading, singleLinkableBanners } = useSelector((data) => ({
    ...data?.isLinkableBanners,
  }));
  const [title, setTitle] = useState("");
  const [banner, setBanner] = useState("");
  const [link, setLink] = useState("");

  // console.log(singleLinkableBanners, "singleLinkableBanners");

  useEffect(() => {
    if (singleLinkableBanners && isOpenUpdate) {
      setTitle(singleLinkableBanners?.title);
      setLink(singleLinkableBanners?.link);
    } else {
      setTitle("");
      setLink("");
    }
  }, [singleLinkableBanners, isOpenUpdate, isOpenView]);
  const handleUpdateExtraSections = (e) => {
    e.preventDefault();
    if (isOpenUpdate) {
      const formData = new FormData();

      formData.append("banner", banner);
      formData.append("link", link);
      formData.append("title", title);
      dispatch(
        updateLinkableBanners({
          url: `${process.env.REACT_APP_API}/updateHomeLinkableBanners/${singleLinkableBanners?._id}/${admin}`,
          data: formData,
        })
      ).then((data) => {
        // console.log(data);
        dispatch(
          handleAlert({
            isOpen: true,
            type: data?.payload?.success ? "success" : "error",
            msg: data?.payload?.message,
          })
        );
        dispatch(getAllLinkableBanners(`/getAllHomeLinkableBanners`));
        setTitle("");
        setLink("");
        setBanner("");
        setIsOpenView(false);
        setIsOpenUpdate(false);
      });
    } else {
      const formData = new FormData();

      formData.append("banner", banner);
      formData.append("link", link);
      formData.append("title", title);
      dispatch(
        createLinkableBanners({
          url: `${process.env.REACT_APP_API}/createHomeLinkableBanners/${admin}`,
          data: formData,
        })
      ).then((data) => {
        // console.log(data);
        dispatch(
          handleAlert({
            isOpen: true,
            type: data?.payload?.success ? "success" : "error",
            msg: data?.payload?.message,
          })
        );
        dispatch(getAllLinkableBanners(`/getAllHomeLinkableBanners`));
        setTitle("");
        setLink("");
        setBanner("");
        setIsOpenView(false);
        setIsOpenUpdate(false);
      });
    }
  };
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
            {isOpenUpdate ? "  Update Linkable Banner" : "  Create Linkable Banner"}
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
            component="form"
            role="form"
            onSubmit={handleUpdateExtraSections}
          >
            <MDBox
              lineHeight={1}
              width={"90%"}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <MDTypography variant="h6">banner Title <AstrieskIcon/></MDTypography>
              <MDInput
                required={true}
                type="text"
                placeholder="banner Title"
                fullWidth
                name="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </MDBox>
            <MDBox
              lineHeight={1}
              width={"90%"}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <MDTypography variant="h6">Banner Link <AstrieskIcon/></MDTypography>
              <MDInput
                required={true}
                type="text"
                placeholder="Video Link"
                fullWidth
                name="videoLink"
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                }}
              />
            </MDBox>
            <MDBox
              lineHeight={1}
              width={"90%"}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <MDTypography variant="h6">
                Banner image
                <MDTypography variant="body1" component="span" fontSize={11}>
                  &nbsp; ( image size - 240 × 192 px )
                </MDTypography>
              </MDTypography>
              <ImagePicker
                // required={true}
                name="thumbnail"
                multiple={false}
                images={banner}
                setImages={setBanner}
                // isImageURLs={isData?.thumbnail}
              />
              {banner === "" && singleLinkableBanners?.banner && (
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <span
                    style={{
                      display: "inline-block",
                      width: "50px",
                      height: "50px",
                      margin: "0 0.5rem",
                    }}
                  >
                    <img
                      className="Image"
                      style={{ width: "100%", height: "100%" }}
                      src={`${process.env.REACT_APP_URI}/${singleLinkableBanners?.banner}`}
                    />
                  </span>
                  {/* <span
                  className="cross"
                  style={{
                    cursor: "pointer",
                  }}
                  // onClick={() => {
                  //   set((prev) => ({
                  //     ...prev,
                  //     thumbnail: null,
                  //   }));
                  // }}
                >
                  <Cancel
                    sx={({ palette: { dark, white, info } }) => ({
                      color: darkMode ? white?.main : dark.main,
                    })}
                  />
                </span> */}
                </div>
              )}
            </MDBox>
            {/* {console.log(isData?.thumbnail, "isThumbnil")} */}

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
                {isOpenUpdate ? "  Update Linkable Banner" : "  Create Linkable Banner"}
              </MDButton>
            </MDBox>
          </MDBox>
        )}
      </MDBox>
    </>
  );
};

export default LinkableBannersForm;
LinkableBannersForm.propTypes = {
  setIsOpenView: PropTypes.any,
  isOpenUpdate: PropTypes.any,
  isOpenView: PropTypes.any,
  setIsOpenUpdate: PropTypes.any,
};
