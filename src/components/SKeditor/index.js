import React, { useState, useEffect } from "react";
import { EditorState, convertFromHTML, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useMaterialUIController } from "context";
import MDBox from "components/MDBox";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import axios from "axios";
import { handleAlert } from "redux/festures/alertSlice";
import { skCompany } from "redux/festures/isCompany";
import { useDispatch } from "react-redux";

const Skeditor = ({
  editorState,
  setEditorState,
  placeholder,
  initialContent,
  content,
  isButton,
}) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  useEffect(() => {
    if (initialContent) {
      const blocksFromHTML = convertFromHTML(initialContent);
      const contentState = ContentState?.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      const editorState = EditorState?.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [initialContent]);
  const onChangeEditor = (state) => {
    setEditorState(state);
  };

  const convertContentToHTML = () => {
    const contentState = editorState?.getCurrentContent();
    const html = stateToHTML(contentState);
    return html;
  };

  const htmlContent = convertContentToHTML();

  const handleSubmitForm = async () => {
    const formData = new FormData();
    formData.append(content, convertContentToHTML());

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_APII}/update/company/${admin}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
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
      dispatch(skCompany({ url: `/getCompanyByAdmin/${admin}` }));
      // console.log(response.data, "response");
      // Handle success
    } catch (error) {
      console.log(error, "responseERROR");
      // Handle error
    }
  };
  return (
    <>
      <MDBox
        sx={({ palette: { dark, white, info } }) => ({
          backgroundColor: darkMode ? "#fff" : "#000",
          color: darkMode ? "#000" : "#fff",
          p: 0.5,
          width: "100%",
          minHeight: "70vh",
          // display: "block",
        })}
      >
        <Editor
          editorState={editorState}
          onEditorStateChange={onChangeEditor}
          placeholder={placeholder}
        />

        {/* <div>
        <h3>HTML Output:</h3>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div> */}
      </MDBox>
      {!isButton && (
        <MDBox
          sx={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end", my: 1.5 }}
        >
          <MDButton color={"info"} verdant={"gradient"} onClick={handleSubmitForm}>
            update
          </MDButton>
        </MDBox>
      )}
    </>
  );
};

export default Skeditor;

Skeditor.propTypes = {
  editorState: PropTypes.object,
  setEditorState: PropTypes.func,
  handleSubmitForm: PropTypes.func,
  initialContent: PropTypes.string,
  content: PropTypes.string,
  placeholder: PropTypes.string,
  isButton: PropTypes.bool,
};
