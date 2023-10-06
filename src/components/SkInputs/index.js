import React, { useState } from "react";
import PropTypes from "prop-types";

import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";

const MultiValueInput = ({ selectedValues, setSelectedValues }) => {
  const [inputValue, setInputValue] = useState("");
  // const [selectedValues, setSelectedValues] = useState([]);
  const [dirty, setDirty] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value ?? "");
    setDirty(event.target.value?.length > 0);
  };

  const handleValueChange = (_, values) => {
    setSelectedValues(values);
  };

  const handleCreateOption = (newOption) => {
    if (!selectedValues.includes(newOption)) {
      setSelectedValues([...selectedValues, newOption]);
    }
  };

  const handleClear = () => {
    if (setInputValue) {
      setInputValue("");
    }
    if (setSelectedValues) {
      setSelectedValues([]);
    }
    if (setDirty) {
      setDirty(false);
    }
  };

  return (
    <Autocomplete
      multiple
      value={selectedValues}
      onChange={handleValueChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      options={selectedValues || []}
      freeSolo
      style={{ width: "100%" }}
      getOptionLabel={(option) => option}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip key={index} label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Select values"
          placeholder="Type and press Enter"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {params.InputProps.endAdornment}
                {dirty && <span className="MuiAutocomplete-clearIndicator" onClick={handleClear} />}
              </>
            ),
          }}
        />
      )}
      createOption={handleCreateOption}
      renderOption={(props, option) => (
        <li {...props}>
          <span>{option}</span>
        </li>
      )}
    />
  );
};

export default MultiValueInput;
MultiValueInput.propTypes = {
  selectedValues: PropTypes.any,
  setSelectedValues: PropTypes.any,
};
