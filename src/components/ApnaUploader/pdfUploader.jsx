import PropTypes from "prop-types";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

const HiddenInput = styled("input")({
  display: "none",
});

const FileUploader = ({ selectedFile, setSelectedFile, isPdf }) => {
  //   const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    // onFileUpload(file);
  };

  const handleFileReset = () => {
    setSelectedFile(null);
    // onFileUpload(null);
  };

  return (
    <MDBox
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      {/* <TextField
        placeholder="Selected File"
        value={}
        InputProps={{ readOnly: true }}
        style={{ width: "100%" }}
      /> */}

      <MDBox
        sx={{
          display: "flex",
          width: "100%",
          gap: 3,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <input
          type="file"
          accept=".pdf"
          id="file-input"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
        <label htmlFor="file-input" style={{ width: "100%" }}>
          <MDButton variant="gradient" color="info" component="span" fullWidth>
            {selectedFile ? selectedFile.name : " Choose File "}
          </MDButton>
        </label>
        {selectedFile && (
          <Button variant="contained" color="secondary" onClick={handleFileReset}>
            Clear Selection
          </Button>
        )}
      </MDBox>
    </MDBox>
  );
};

export default FileUploader;

FileUploader.propTypes = {
  selectedFile: PropTypes.any,
  setSelectedFile: PropTypes.any,
  isPdf: PropTypes.any,
};
