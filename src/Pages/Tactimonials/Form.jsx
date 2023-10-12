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
import { Card, Rating } from "@mui/material";
import { getAllBlogs } from "redux/festures/blogSlice";
import { updateBlog } from "redux/festures/blogSlice";
import { createPostBlogs } from "redux/festures/blogSlice";
import { handleAlert } from "redux/festures/alertSlice";
import Skeditor from "components/SKeditor";
import { EditorState, convertToRaw, convertFromHTML, ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import AstrieskIcon from "components/AstrieskIcon";

const Form = ({ isOpenUpdate, setIsOpenUpdate, setIsOpen }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [isBlogTitle, setIsBlogTitle] = useState("");
  const [isBlogSubTitle, setIsBlogSubTitle] = useState("");
  const [isBlogRating, setIsBlogRating] = useState(2);
  // const [isBlogContent, setIsBlogContent] = useState("");
  const [isBlogImage, setIsBlogImage] = useState("");
  const [isShow, setIsShow] = useState("");
  //   const [isBrandShowHome, setIsBrandShowHome] = useState(false);
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const { Loading, singleBlogs } = useSelector((data) => ({ ...data?.isBlogs }));

  const [isBlogContent, setIsBlogContent] = useState(EditorState.createEmpty());
  // console.log(singleBlogs, "singleBlogs");
  useEffect(() => {
    if (singleBlogs && isOpenUpdate) {
      setIsBlogTitle(singleBlogs?.name);
      // setIsBlogSubTitle(singleBlogs?.description);
      setIsBlogRating(singleBlogs?.rating);
      setIsShow(singleBlogs?.image);
      const termsData = EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(singleBlogs?.description).contentBlocks,
          convertFromHTML(singleBlogs?.description).entityMap
        )
      );
      setIsBlogContent(termsData);
    }
  }, [singleBlogs, isOpenUpdate]);
  // console.log(singleBlogs);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if ((isBlogImage && isBlogImage !== "") || (isShow && isShow !== "")) {
      const convertContentToHTML = () => {
        const contentState = isBlogContent?.getCurrentContent();
        const html = stateToHTML(contentState);
        return html;
      };
      if (isOpenUpdate) {
        const formData = new FormData();
        formData.append("name", isBlogTitle);
        // formData.append("description", isBlogSubTitle);
        formData.append("rating", isBlogRating);
        formData.append("description", convertContentToHTML());
        formData.append("image", isBlogImage);
        // console.log(...formData, "akldjhksjdhnsdfg");
        dispatch(
          updateBlog({
            url: `${process.env.REACT_APP_API}/updateTactimonial/${singleBlogs?._id}/${admin}`,
            data: formData,
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
          setIsBlogImage("");
          setIsBlogContent("");
          setIsBlogImage("");
          dispatch(getAllBlogs(`/getAllTactimonial`));
        });
      } else {
        const formData = new FormData();
        formData.append("name", isBlogTitle);
        formData.append("rating", isBlogRating);
        formData.append("description", convertContentToHTML());
        formData.append("image", isBlogImage);
        //   formData.append("showInHome", isBrandShowHome);
        // console.log(...formData, "akldjhksjdhnsdfg");
        dispatch(
          createPostBlogs({
            url: `${process.env.REACT_APP_API}/createTactimonial/${admin}`,
            data: formData,
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
          setIsBlogImage("");
          setIsBlogContent("");
          setIsBlogImage("");
          dispatch(getAllBlogs(`/getAllTactimonial`));
        });
      }
    } else {
      dispatch(
        handleAlert({
          isOpen: true,
          type: "warning",
          msg: "plz fill all input",
        })
      );
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
            {isOpenUpdate ? `Update Tactimonial ` : " Create Tactimonial"}
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
            <MDTypography variant="h6">
              Name <AstrieskIcon />
            </MDTypography>
            <MDInput
              required={true}
              type="text"
              placeholder="name"
              fullWidth
              name="name"
              value={isBlogTitle}
              onChange={(e) => setIsBlogTitle(e.target.value)}
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
              Rating <AstrieskIcon />
            </MDTypography>
            <Rating
              name="simple-controlled"
              value={isBlogRating}
              // name="rating"
              onChange={(e) => setIsBlogRating(e.target.value)}
            />
            {/* <MDInput
              required={true}
              type="text"
              placeholder="Rating"
              fullWidth
              name="rating"
              value={isBlogRating}
              onChange={(e) => setIsBlogRating(e.target.value)}
            /> */}
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
              Description <AstrieskIcon />
              <MDTypography variant="body1" component="span" fontSize={11}>
                &nbsp; ( type only English language )
              </MDTypography>
            </MDTypography>
            {/* <MDInput
              type="text"
              placeholder="content"
              fullWidth
              name="content"
              value={isBlogContent}
              onChange={(e) => setIsBlogContent(e.target.value)}
            /> */}

            <Skeditor
              editorState={isBlogContent}
              setEditorState={setIsBlogContent}
              placeholder={"Description "}
              initialContent={singleBlogs && isOpenUpdate && singleBlogs?.discription}
              isButton={true}
              // content={"Blog Content"}
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
            <MDTypography variant="h6">
              Tactimonial Image{" "}
              <MDTypography variant="body1" component="span" fontSize={11}>
                &nbsp; ( image size - 240 × 240 px )
              </MDTypography>
            </MDTypography>
            <ImagePicker
              // required={true}
              name="image"
              multiple={false}
              images={isBlogImage}
              setImages={setIsBlogImage}
              //
            />

            {isBlogImage && isBlogImage.length
              ? null
              : isShow && (
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
                        src={`${process.env.REACT_APP_URI}/${isShow}`}
                      />
                    </span>
                    <span
                      className="cross"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setIsShow(null);
                      }}
                    >
                      <Cancel
                        sx={({ palette: { dark, white, info } }) => ({
                          color: darkMode ? white?.main : dark.main,
                        })}
                      />
                    </span>
                  </div>
                )}
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
              {isOpenUpdate ? `Update Tactimonial` : ` Create Tactimonial`}
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
