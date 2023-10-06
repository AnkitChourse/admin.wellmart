import * as React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useMaterialUIController } from "context";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const SkDatePicker = ({ initialDate, onChange, required, placeholder, fullWidth, disabled,min }) => {
  const handleDateChange = (date) => {
    if (onChange) {
      onChange(date);
    }
  };

  // const formatDate = (date) => {
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const year = String(date.getFullYear()).substr(2);
  //   console.log(dayjs(date))
  //   return `${day}/${month}/${year}`;
  // };
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const theme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
    overrides: {
      MuiIconButton: {
        root: {
          color: darkMode ? "#ff0000" : "#0000ff", // Customize the color of the icon button
        },
      },
      MuiInputBase: {
        root: {
          backgroundColor: darkMode ? "#333333" : "#ffffff", // Customize the background color of the input field
          color: darkMode ? "#ffffff" : "#000000", // Customize the text color of the input field
        },
      },
      MuiPickersModal: {
        dialog: {
          backgroundColor: darkMode ? "#333333" : "#ffffff", // Customize the background color of the dialog
        },
      },
      MuiPickersYear: {
        yearSelected: {
          color: "#ff00ff", // Customize the color of the selected year
        },
        yearDisabled: {
          color: "rgba(0, 0, 0, 0.38)", // Customize the color of disabled years
        },
        yearButton: {
          color: darkMode ? "#ff00ff" : "#00ff00", // Customize the color of the year buttons
        },
      },
      MuiPickersCalendar: {
        weekdayLabel: {
          color: darkMode ? "#ff00ff" : "#00ff00", // Customize the color of the weekday labels
        },
      },
      MuiPickersDay: {
        daySelected: {
          backgroundColor: "#00ff00", // Customize the background color of the selected day
          color: darkMode ? "#ff0000" : "#0000ff", // Customize the color of the selected day text
        },
        dayDisabled: {
          color: "rgba(0, 0, 0, 0.38)", // Customize the color of disabled days
        },
        dayToday: {
          color: "#ff00ff", // Customize the color of the current day
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          value={initialDate ? dayjs(new Date(initialDate)) : null}
          onChange={handleDateChange}
          min={min}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          fullWidth={fullWidth}
          sx={({ palette: { dark, white, info } }) => ({
            width: "100%",
            p: 0,
            "& .MuiInputBase-root": {
              color: darkMode ? "#fff" : dark.main,
              border: 1,
              borderColor: "white.main",
              height: 40,
            },
          })}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

SkDatePicker.propTypes = {
  initialDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  min: PropTypes.func
};

export default SkDatePicker;
