import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

const SkAutoCompleteSingle = ({ outputValue, setOutputValue }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    // const values = inputValue.split(",").map((value) => value.trim());
    setOutputValue([...outputValue, inputValue]);
    setInputValue("");
  };

  return (
    <MDBox
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        flexDirection: "column",
        width: "100%",
      }}
    >
      <MDBox
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          gap: 5,
        }}
      >
        <TextField
          placeholder="Add..."
          value={inputValue}
          onChange={handleInputChange}
          variant="outlined"
          sx={{ width: "100%" }}
        />
        <MDButton color={"info"} verdant={"gradient"} onClick={handleButtonClick}>
          Add
        </MDButton>
      </MDBox>
      <MDBox
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          gap: 0.5,
        }}
      >
        {outputValue.map((value, index) => (
          <MDTypography variant="h6" key={index}>
            {value}
          </MDTypography>
        ))}
      </MDBox>
    </MDBox>
  );
};

SkAutoCompleteSingle.propTypes = {
  outputValue: PropTypes.array.isRequired,
  setOutputValue: PropTypes.func.isRequired,
};

export default SkAutoCompleteSingle;
