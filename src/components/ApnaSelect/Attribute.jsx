import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getIsAttribute } from "redux/festures/AttributeSlice";
import SkLoading from "components/SkLoading";
import MDButton from "components/MDButton";
import { Delete } from "@mui/icons-material";
import { useMaterialUIController } from "context";

const AttributeInput = ({ attributes, setAttributes }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const dispatch = useDispatch();
  const { isAttribute, Loading } = useSelector((state) => state.isAttribute);
  const [selectedAttributes, setSelectedAttributes] = useState([...attributes]);

  useEffect(() => {
    dispatch(getIsAttribute("/getAllAttribute?disable=true"));
  }, []);

  useEffect(() => {
    setSelectedAttributes([...attributes]);
  }, [attributes]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAttributes = [...selectedAttributes];
    updatedAttributes[index] = { ...updatedAttributes[index], [name]: value };
    setSelectedAttributes(updatedAttributes);
    setAttributes(updatedAttributes);
  };

  const handleRemoveAttribute = (index) => {
    const updatedAttributes = [...selectedAttributes];
    updatedAttributes.splice(index, 1);
    setSelectedAttributes(updatedAttributes);
    setAttributes(updatedAttributes);
  };

  const handleAddAttribute = () => {
    const updatedAttributes = [...selectedAttributes, { attributesKey: "", attributesValue: "" }];
    setSelectedAttributes(updatedAttributes);
    setAttributes(updatedAttributes);
  };

  const renderAttributesInputs = () => {
    return (
      selectedAttributes &&
      selectedAttributes.map((attribute, index) => (
        <div
          key={index}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <FormControl style={{ width: "48%" }}>
            <InputLabel id={`attribute-key-label-${index}`}>Attribute Key</InputLabel>
            <Select
              labelId={`attribute-key-label-${index}`}
              id={`attribute-key-select-${index}`}
              name="attributesKey"
              placeholder="attributesKey"
              value={attribute.attributesKey || ""}
              onChange={(e) => handleInputChange(index, e)}
              style={{ height: "3rem" }}
            >
              {Loading ? (
                <SkLoading />
              ) : (
                isAttribute &&
                isAttribute.length > 0 &&
                isAttribute.map((value, index) => (
                  <MenuItem key={index} value={value?.name || "N/A"}>
                    {value?.name || "N/A"}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
          <TextField
            placeholder="Value"
            name="attributesValue"
            value={attribute.attributesValue || ""}
            onChange={(e) => handleInputChange(index, e)}
            style={{ width: "48%" }}
          />
          {index > 0 && (
            <IconButton aria-label="remove " onClick={() => handleRemoveAttribute(index)}>
              <Delete
                sx={({ palette: { dark, white, info } }) => ({
                  color: darkMode ? white?.main : dark.main,
                })}
              />
            </IconButton>
          )}
        </div>
      ))
    );
  };

  const isAddButtonDisabled = selectedAttributes.some(
    (attribute) => !attribute.attributesKey || !attribute.attributesValue
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "10px",
        width: "100%",
      }}
    >
      {renderAttributesInputs()}
      <MDButton
        fullWidth
        color={"info"}
        verdant={"gradient"}
        disabled={isAddButtonDisabled}
        onClick={handleAddAttribute}
      >
        Add
      </MDButton>
    </div>
  );
};

export default AttributeInput;

AttributeInput.propTypes = {
  attributes: PropTypes.array,
  setAttributes: PropTypes.func,
};
