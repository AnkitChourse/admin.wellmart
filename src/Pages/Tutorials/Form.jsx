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
import { getAllBlogs } from "redux/festures/blogSlice";
import { updateBlog } from "redux/festures/blogSlice";
import { createPostBlogs } from "redux/festures/blogSlice";
import { handleAlert } from "redux/festures/alertSlice";
import { getAllTutorials } from "redux/festures/isTutorialSlice";
import ApnaSelect2 from "components/ApnaSelect";
import { updateTutorials } from "redux/festures/isTutorialSlice";
import { createTutorials } from "redux/festures/isTutorialSlice";
import Skeditor from "components/SKeditor";
import { EditorState, convertToRaw, convertFromHTML } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import AstrieskIcon from 'components/AstrieskIcon'

const Form = ({ isOpenUpdate, setIsOpenUpdate, setIsOpen }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [isTutorialContent, setIsTutorialContent] = useState(EditorState.createEmpty());
  const [isFormData, setIsFormData] = useState({
    tital: "",
    content: "",
    videoProvider: "",
    videoLink: "",
  });
  const [isShow, setIsShow] = useState("");
  //   const [isBrandShowHome, setIsBrandShowHome] = useState(false);
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const { Loading, singleTutorials } = useSelector((data) => ({ ...data?.isTutorials }));
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
    if (singleTutorials && isOpenUpdate) {
      setIsFormData((prev) => ({
        ...prev,
        tital: singleTutorials?.tital,
        // content: singleTutorials?.content,
        videoProvider: singleTutorials?.videoProvider,
        videoLink: singleTutorials?.videoLink,
      }));
    }
  }, [singleTutorials, isOpenUpdate]);
  // // console.log(singleTutorials);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const convertContentToHTML = () => {
      const contentState = isTutorialContent?.getCurrentContent();
      const html = stateToHTML(contentState);
      return html;
    };
    if (isOpenUpdate) {
      dispatch(
        updateTutorials({
          url: `${process.env.REACT_APP_API}/updateTutorial/${singleTutorials?._id}/${admin}`,
          data: {
            tital: isFormData?.tital,
            content: convertContentToHTML(),
            videoProvider: isFormData?.videoProvider,
            videoLink: isFormData?.videoLink,
          },
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
          tital: "",
          content: "",
          videoProvider: "",
          videoLink: "",
        }));
        dispatch(getAllTutorials(`/getAllTutorial?adminId=${admin}`));
      });
    } else {
      dispatch(
        createTutorials({
          url: `${process.env.REACT_APP_API}/createTutorial/${admin}`,
          data: {
            tital: isFormData?.tital,
            content: convertContentToHTML(),
            videoProvider: isFormData?.videoProvider,
            videoLink: isFormData?.videoLink,
          },
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
          tital: "",
          content: "",
          videoProvider: "",
          videoLink: "",
        }));
        dispatch(getAllTutorials(`/getAllTutorial?adminId=${admin}`));
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
            {isOpenUpdate ? `Update Tutorial ` : " Create Tutorial"}
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
              name="tital"
              value={isFormData?.tital}
              onChange={handleForm}
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
            <MDTypography variant="h6">
              Tutorial Content{" "} <AstrieskIcon/>
              <MDTypography variant="body1" component="span" fontSize={11}>
                &nbsp; ( type only English language )
              </MDTypography>
            </MDTypography>
            {/* <MDInput
              type="text"
              placeholder="content"
              fullWidth
              name="content"
              value={isFormData?.content}
              onChange={handleForm}
            /> */}
            <Skeditor
              required={true}
              editorState={isTutorialContent}
              setEditorState={setIsTutorialContent}
              placeholder={"Tutorial Content"}
              initialContent={singleTutorials && isOpenUpdate && singleTutorials?.content}
              isButton={true}
              // content={"Blog Content"}
            />
          </MDBox>
          <MDBox
            width={"90%"}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <MDTypography variant="h6">Select Your Video Provider&apos;s <AstrieskIcon/></MDTypography>
            <ApnaSelect2
              required={true}
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
              {isOpenUpdate ? `Update Tutorial` : ` Create Tutorial`}
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </>
  );
};

export default Form;
Form.propTypes = {
  isOpenUpdate: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.any,
  setIsOpenUpdate: PropTypes.any,
};
