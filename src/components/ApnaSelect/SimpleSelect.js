// import React from "react";
// import PropTypes from "prop-types";
// import "./style.css";

// const SimpleSelect = ({
//   data,
//   category,
//   name,
//   onChange,
//   origin,
//   required,
//   disabled,
// }) => {
//   return (
//     <>
//       <div>
//         <select
//           disabled={disabled}
//           required={required}
//           className="select Category"
//           name={name}
//           onChange={onChange}
//           value={category}
//         >
//           <option value="">{origin}</option>
//           {data.map((elm, i) => {
//             return (
//               <option key={i} value={elm?._id}>
//                 {elm?.name}
//               </option>
//             );
//           })}
//         </select>
//       </div>
//     </>
//   );
// };

// export default SimpleSelect;

// SimpleSelect.propTypes = {
//     data: PropTypes.any,
//     category: PropTypes.any,
//     name: PropTypes.any,
//     onChange: PropTypes.any,
//     origin: PropTypes.any,
//     required: PropTypes.any,
//     disabled: PropTypes.string
//   };






// import React from "react";
// import PropTypes from "prop-types";
// import { Select, MenuItem } from "@mui/material";
// import "./style.css";

// const CombinedSelect = ({
//   data,
//   category,
//   name,
//   onChange,
//   origin,
//   required,
//   disabled,

//   darkMode,
// }) => {
//   return (
//     <>
//       <div>
//         <Select
//           disabled={disabled}
//           labelId="demo-select-small-label"
//           id="demo-select-small"
//           value={category}
//           required={required}
//           onChange={(e) => onChange(e.target.value)}
//           sx={({ palette: { dark, white } }) => ({
//             width: "100%",
//             height: "3rem",
//             color: darkMode ? white?.main : dark?.main,
//             bgcolor: "transparent",
//             "&	.MuiSelect-icon": {
//               color: darkMode ? white?.main : dark?.main,
//               display: "block !important",
//               fontSize: "1.5rem !important",
//             },
//           })}
//         >
//           <MenuItem value="0">{origin}</MenuItem>
//           {data.map((elm, i) => (
//             <MenuItem key={i} value={elm?._id}>
//               {elm?.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </div>
//     </>
//   );
// };

// export default CombinedSelect;

// CombinedSelect.propTypes = {
//   data: PropTypes.array,
//   category: PropTypes.any,
//   name: PropTypes.any,
//   onChange: PropTypes.func,
//   origin: PropTypes.any,
//   required: PropTypes.bool,
//   disabled: PropTypes.bool,
//   isLoading: PropTypes.bool,
//   darkMode: PropTypes.bool,
// };




import React from "react";
import PropTypes from "prop-types";
import { Select, MenuItem } from "@mui/material";
import "./style.css";

const CombinedSelect = ({
  data,
  category,
  name,
  onChange,
  origin,
  required,
  disabled,
  darkMode,
}) => {
  return (
    <>
      <div>
        <Select
          disabled={disabled}
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={category || ""}  // Add a conditional check for category
          required={required}
          onChange={(e) => onChange(e.target.value)}
          sx={({ palette: { dark, white } }) => ({
            width: "100%",
            height: "3rem",
            color: darkMode ? white?.main : dark?.main,
            bgcolor: "transparent",
            "& .MuiSelect-icon": {
              color: darkMode ? white?.main : dark?.main,
              display: "block !important",
              fontSize: "1.5rem !important",
            },
          })}
        >
          <MenuItem value="0">{origin}</MenuItem>
          {data.map((elm, i) => (
            <MenuItem key={i} value={elm?._id}>
              {elm?.name}
            </MenuItem>
          ))}
        </Select>
      </div>
    </>
  );
};

export default CombinedSelect;

CombinedSelect.propTypes = {
  data: PropTypes.array,
  category: PropTypes.any,
  name: PropTypes.any,
  onChange: PropTypes.func,
  origin: PropTypes.any,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  darkMode: PropTypes.bool,
};
