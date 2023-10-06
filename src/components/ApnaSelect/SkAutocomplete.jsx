import PropTypes from "prop-types";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function SkAutocomplete({ setState, state, data, Label }) {
  const [value, setValue] = React.useState([]);
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      value={value}
      onChange={(event, newValue) => {
        setValue([...newValue.filter((option) => option)]);
        setState([...newValue.map((item) => item?._id)]);
      }}
      options={data}
      disableCloseOnSelect
      getOptionLabel={(option) => option?.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option?.name}
        </li>
      )}
      style={{ width: "100%" }}
      renderInput={(params) => <TextField {...params} label={Label} placeholder={Label} />}
    />
  );
}

SkAutocomplete.defaultProps = {
  state: "",
  data: [],
};
SkAutocomplete.propTypes = {
  state: PropTypes.any,
  setState: PropTypes.any,
  data: PropTypes.any,
  Label: PropTypes.string,
};
