import MDButton from "components/MDButton";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useMaterialUIController } from "context";
import { useDispatch, useSelector } from "react-redux";
import ImagePicker from "components/ApnaUploader";
import { Cancel } from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SkLoading from "components/SkLoading";
import MDInput from "components/MDInput";
import { Card } from "@mui/material";
import AstrieskIcon from 'components/AstrieskIcon'

import { handleAlert } from "redux/festures/alertSlice";

import ApnaSelect2 from "components/ApnaSelect";

import { updateHomeVideos } from "redux/festures/isHomeVideos";
import { getAllHomeVideos } from "redux/festures/isHomeVideos";
import { createHomeVideos } from "redux/festures/isHomeVideos";
const HomeVideoForm = ({ isOpen, isOpenUpdate, setIsOpenUpdate, setIsOpen }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [isFormData, setIsFormData] = useState({
    title: "",
    // content: "",
    videoProvider: "",
    videoLink: "",
  });
  const [isShow, setIsShow] = useState("");
  //   const [isBrandShowHome, setIsBrandShowHome] = useState(false);
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  // const { Loading, singleHomeVideos } = useSelector((data) => ({ ...data?.isTutorials }));
  const { Loading, singleHomeVideos } = useSelector((data) => ({ ...data?.isHomeVideos }));
  const handleForm = (e) => {
    const { name, value } = e.target;
    setIsFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // console.log(isFormData, "isFormData");
  // console.log(singleBrands, "singleBrands");
  useEffect(() => {
    if (singleHomeVideos && isOpenUpdate) {
      setIsFormData((prev) => ({
        ...prev,
        title: singleHomeVideos?.title,
        // content: singleHomeVideos?.content,
        videoProvider: singleHomeVideos?.videoProvider,
        videoLink: singleHomeVideos?.videoLink,
      }));
    } else {
      setIsFormData((prev) => ({
        ...prev,
        title: "",
        videoProvider: "",
        videoLink: "",
      }));
    }
  }, [singleHomeVideos, isOpenUpdate, isOpen]);
  // // console.log(singleHomeVideos);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isOpenUpdate) {
      dispatch(
        updateHomeVideos({
          url: `${process.env.REACT_APP_API}/updateHomeVideo/${singleHomeVideos?._id}/${admin}`,
          data: isFormData,
        })
      ).then((data) => {
        dispatch(
          handleAlert({
            isOpen: true,
            type: `${data?.payload?.success ? "success" : "error"}`,
            msg: data?.payload?.message,
          })
        );
        setIsOpen(false);
        setIsOpenUpdate(false);
        setIsFormData((prev) => ({
          ...prev,
          title: "",
          content: "",
          videoProvider: "",
          videoLink: "",
        }));
        dispatch(getAllHomeVideos(`/getAllHomevideo`));
      });
    } else {
      dispatch(
        createHomeVideos({
          url: `${process.env.REACT_APP_API}/createHomeVideo/${admin}`,
          data: isFormData,
        })
      ).then((data) => {
        dispatch(
          handleAlert({
            isOpen: true,
            type: `${data?.payload?.success ? "success" : "error"}`,
            msg: data?.payload?.message,
          })
        );
        setIsOpen(false);
        setIsOpenUpdate(false);
        setIsFormData((prev) => ({
          ...prev,
          title: "",
          content: "",
          videoProvider: "",
          videoLink: "",
        }));
        dispatch(getAllHomeVideos(`/getAllHomevideo`));
      });
    }
  };
  return Loading ? (
    <SkLoading />
  ) : (
    <>
      <MDBox
        display="flex"
        alignItems="center"
        lineHeight={1}
        sx={{
          justifyContent: "center",
          textAlign: "center",
          flexDirection: "column",
          gap: 5,
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
            {isOpenUpdate ? `Update Home Videos ` : " Create Home Videos"}
          </MDTypography>
        </Card>
        <MDBox
          display="flex"
          alignItems="center"
          lineHeight={1}
          //   sx={{
          //
          //   }}
          sx={({ palette: { dark, white, info } }) => ({
            border: 0.5,
            borderColor: darkMode ? white.main : dark.main,
            borderRadius: 3,
            p: 3,
            justifyContent: "center",
            textAlign: "center",
            flexDirection: "column",
            gap: 3,
            width: "100%",
          })}
          component="form"
          role="form"
          onSubmit={handleFormSubmit}
        >
          <MDBox
            lineHeight={1}
            gap={3}
            width={"90%"}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <MDTypography variant="h6">Tutorial Title <AstrieskIcon/></MDTypography>
            <MDInput
              required={true}
              type="text"
              placeholder="Tutorial Title"
              fullWidth
              name="title"
              value={isFormData?.title}
              onChange={handleForm}
            />
          </MDBox>
          {/* <MDBox lineHeight={1} gap={3} width={"90%"}>
            <MDTypography variant="h6">Tutorial Content</MDTypography>
            <MDInput
              type="text"
              placeholder="content"
              fullWidth
              name="content"
              value={isFormData?.content}
              onChange={handleForm}
            />
          </MDBox> */}
          <MDBox
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
            width={"90%"}
          >
            <MDTypography variant="h6" textAlign="left">
              Select Your Video Provider <AstrieskIcon/>&apos;s
            </MDTypography>
            <ApnaSelect2
              data={["YouTube"]}
              category={isFormData?.videoProvider}
              label="videoProvider"
              setCategory={(e) =>
                handleForm({
                  target: {
                    name: "videoProvider",
                    value: e,
                  },
                })
              }
              name="videoProvider"
              simpleArray={true}
              required={true}
            />
          </MDBox>
          <MDBox
            lineHeight={1}
            gap={3}
            width={"90%"}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <MDTypography variant="h6">Tutorial Video Link <AstrieskIcon/></MDTypography>
            <MDInput
              required={true}
              type="text"
              placeholder="Video Link"
              fullWidth
              name="videoLink"
              value={isFormData?.videoLink}
              onChange={handleForm}
            />
          </MDBox>

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
              {isOpenUpdate ? `Update Home Videos` : ` Create Home Videos`}
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </>
  );
};

export default HomeVideoForm;
HomeVideoForm.propTypes = {
  isOpenUpdate: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.any,
  setIsOpenUpdate: PropTypes.any,
  isOpen: PropTypes.any,
};
