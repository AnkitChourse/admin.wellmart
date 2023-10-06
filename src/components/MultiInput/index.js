import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MDBox from "components/MDBox";
import { ListItemText, MenuItem, Select } from "@mui/material";
import { RemoveCircle, Add } from '@mui/icons-material';
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { useMaterialUIController } from "context";

const MultiInput = ({
    state,
    setState,
    addButtonText,
    addButtonHandler,
    removeButtonHandler,
    previousFilledValidate,
    ...rest
}) => {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    // console.log(category, "category");
    return (
        <MDBox
            lineHeight={1}
            gap={0.5}
            width={"100%"}
            sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
            }}
        >
            {state && state?.length ? state.map((ele, i) => i === 0 ? <MDInput sx={{ width: '95%' }} {...rest} key={i} value={ele} onChange={(e) => {
                const temp = [...state]
                temp[i] = e.target.value
                setState(temp)
            }} /> : <MDBox sx={{ display: 'flex', gap: '2%', alignItems: 'center', width: '100%' }} key={i}>
                <MDInput {...rest} sx={{ width: '95%' }} value={ele} onChange={(e) => {
                    const temp = [...state]
                    temp[i] = e.target.value
                    setState(temp)
                }} />
                <RemoveCircle sx={({ palette: { dark, error, info, white } }) => ({
                    color: !darkMode ? dark.main : white.main, // Customize the text color,
                    cursor: 'pointer'
                })} onClick={() => {
                    const temp = [...state]
                    temp.splice(i, 1)
                    removeButtonHandler(temp)
                }} />
            </MDBox>) : <MDTypography color="error">
                Please Provide Correct Array State
            </MDTypography>}
            <MDButton color="primary" variant="gradient" disabled={!state || !state?.length || state?.includes("")} onClick={() => addButtonHandler([...state, ""])} startIcon={<Add sx={({ palette: { dark, error, info, white } }) => ({
                color: !darkMode ? dark.main : white.main, // Customize the text color
            })} />}>
                {addButtonText}
            </MDButton>
        </MDBox >
    );
};

export default MultiInput;

MultiInput.propTypes = {
    state: PropTypes.array,
    setState: PropTypes.func,
    addButtonText: PropTypes.string,
    addButtonHandler: PropTypes.func,
    removeButtonHandler: PropTypes.func,
    previousFilledValidate: PropTypes.bool,
};
