/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { forwardRef } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// custom styles for the NotificationItem
import menuItem from "examples/Items/NotificationItem/styles";
import MDAvatar from "components/MDAvatar";
import { Divider } from "@mui/material";
import { formatDate } from "Utils/dateFunc";

const NotificationItem = forwardRef(
  ({ discription, isClick, isDivider, icon,message, title, date, ...rest }, ref) => (
    <>
      <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)} onClick={isClick}>
        <MDBox
          component={Link}
          py={0.5}
          display="flex"
          alignItems="center"
          lineHeight={1}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <MDAvatar src={icon} name={"shubam"} size="sm" />
          <MDTypography
            variant="button"
            fontWeight="regular"
            sx={{ ml: 1, whiteSpace: "pre-line", flex: 1 }}
          >
            {title}
          </MDTypography>
          <MDTypography
            variant="button"
            fontWeight="medium"
            //  sx={{ ml: 1, whiteSpace: "pre-line" }}
            sx={({ breakpoints }) => ({
              [breakpoints.up("xs")]: {
                ml: 1,
                whiteSpace: "pre-line",
                display: "none",
              },
              [breakpoints.up("sm")]: {
                ml: 1,
                whiteSpace: "pre-line",
                display: "none",
              },
              [breakpoints.up("md")]: {
                ml: 1,
                whiteSpace: "pre-line",
                display: "flex",
              },
              [breakpoints.up("lg")]: {
                ml: 1,
                whiteSpace: "pre-line",
                display: "flex",
              },
            })}
          >
            {formatDate(date)}
          </MDTypography>
        </MDBox>
        <MDTypography
          variant="button"
          fontWeight="medium"
          //  sx={{ ml: 1, whiteSpace: "pre-line" }}
          sx={({ breakpoints }) => ({
            [breakpoints.up("xs")]: {
              ml: 1,
              whiteSpace: "pre-line",
              display: "flex",
            },
            [breakpoints.up("sm")]: {
              ml: 1,
              whiteSpace: "pre-line",
              display: "flex",
            },
            [breakpoints.up("md")]: {
              ml: 1,
              whiteSpace: "pre-line",
              display: "none",
            },
            [breakpoints.up("lg")]: {
              ml: 1,
              whiteSpace: "pre-line",
              display: "none",
            },
          })}
        >
          {formatDate(date)}
        </MDTypography>
        <MDTypography
          variant="button"
          fontWeight="medium"
          ml={1}
          lineHeight={1}
          sx={({ breakpoints }) => ({
            [breakpoints.up("xs")]: {
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              "-webkit-line-clamp": 2,
              "-webkit-box-orient": "vertical",
              maxWidth: "280px",
              lineHeight: "20px",
              whiteSpace: "wrap",
            },
            [breakpoints.up("sm")]: {
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              "-webkit-line-clamp": 2,
              "-webkit-box-orient": "vertical",
              maxWidth: "300px",
              lineHeight: "20px",
              whiteSpace: "wrap",
            },
            [breakpoints.up("md")]: {
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              "-webkit-line-clamp": 2,
              "-webkit-box-orient": "vertical",
              maxWidth: "100%",
              lineHeight: "20px",
              whiteSpace: "wrap",
            },
            [breakpoints.up("lg")]: {
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              "-webkit-line-clamp": 2,
              "-webkit-box-orient": "vertical",
              maxWidth: "100%",
              lineHeight: "20px",
              whiteSpace: "wrap",
            },
          })}
        >
          {message}
        </MDTypography>
        {/* {discription && (
      <MDTypography
        variant="h6"
        fontWeight="regular"
        sx={{ ml: 1, fontSize: 12, whiteSpace: "pre-line" }}
      >
        {discription} */}
        {/* </MDTypography>
    )} */}
      </MenuItem>
      <Divider width={"100%"} />
    </>
  )
);

// Typechecking props for the NotificationItem
NotificationItem.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  discription: PropTypes.string,
  date: PropTypes.string,
  isClick: PropTypes.func,
  isDivider: PropTypes.bool,
};

export default NotificationItem;
