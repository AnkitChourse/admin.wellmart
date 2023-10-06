import PropTypes from "prop-types";
import { Checkbox, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";
import SkLoading from "components/SkLoading";
import React from "react";
import { useMaterialUIController } from "context";
import { useState } from "react";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const ApnaSelect = ({ state, setState, loading, data, name, Label, nameKey, ...rest }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [is, setIs] = useState([]);
  const handleChangeSlect = (event, setPersonName) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <Select
      {...rest}
      labelId="demo-multiple-checkbox-label"
      id="demo-multiple-checkbox"
      multiple
      style={{ width: "100%", backgroundColor: "transparent", height: "2.5rem" }}
      value={state}
      name={name}
      onChange={(e) => {
        handleChangeSlect(e, setState);
      }}
      sx={{
        "&.MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
          height: "2.5rem",
        },
        "&.MuiSelect-select": {
          height: "2.5rem",
        },
      }}
      input={
        <OutlinedInput
          label={Label}
          name={Label}
          sx={({ palette: { dark, white, info } }) => ({
            "&.MuiInputBase-input": {
              zIndex: "2",
              height: "2.5rem",
              width: "100%",
              padding: 3,
              border: 0.5,
              outline: "none",
              borderColor: "#E8E8E8",
              bgcolor: "transparent",
              color: darkMode ? white.main : dark.main,
            },
            "&.MuiOutlinedInput-notchedOutline": {
              outline: "none",
              border: "none",
              bgcolor: "transparent",
            },
            "&.MuiSelect-icon": {
              zIndex: " 100",
            },
          })}
        />
      }
      renderValue={(selected) =>
        selected
          ?.map((value) => {
            const selectedItem = data?.find((item) => item?._id === value);
            return selectedItem && nameKey ? selectedItem[nameKey] : (selectedItem?.name || "-");
          })
          .join(", ")
      }
      MenuProps={MenuProps}
    >
      {loading ? (
        <SkLoading />
      ) : (
        data &&
        data.length > 0 &&
        data.map((name, index) => (
          <MenuItem key={index} value={name?._id}>
            <Checkbox checked={state?.indexOf(name?._id) > -1} />
            <ListItemText primary={nameKey ? name[nameKey] : name?.name || "-"} />
          </MenuItem>
        ))
      )}
    </Select>
  );
};

export default ApnaSelect;
ApnaSelect.propTypes = {
  state: PropTypes.any,
  setState: PropTypes.any,
  loading: PropTypes.any,
  data: PropTypes.any,
  Label: PropTypes.any,
  name: PropTypes.any,
  nameKey: PropTypes.string
};
