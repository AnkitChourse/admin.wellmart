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

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Custom styles for the SidenavCollapse
import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
} from "examples/Sidenav/styles/sidenavCollapse";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import { useLocation, useNavigate } from "react-router-dom";
import { Collapse } from "@mui/material";
import { useEffect } from "react";

function SidenavCollapse({ color, icon, name, children, active, noCollapse, collapseContoller, handleCollapse, collapse, myKey, ...rest }) {
  const [controller] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (collapse && collapse?.length) {
      const path = collapse?.find(e => e?.route === pathname)
      if (path) handleCollapse(myKey)
      // else if (!collapseContoller) handleCollapse(null)
    }
  }, [])

  return (
    <>
      <ListItem component="li" onClick={() => {
        if (collapse && collapse?.length) {
          if (collapseContoller === myKey) handleCollapse(null)
          else {
            handleCollapse(myKey)
            navigate(collapse?.at(0)?.route)
          }
        } else handleCollapse(myKey)
      }}>
        <MDBox
          {...rest}
          sx={(theme) =>
            collapseItem(theme, {
              active,
              transparentSidenav,
              whiteSidenav,
              darkMode,
              sidenavColor,
            })
          }
        >
          <ListItemIcon
            sx={(theme) =>
              collapseIconBox(theme, { transparentSidenav, whiteSidenav, darkMode, active })
            }
          >
            {typeof icon === "string" ? (
              <Icon sx={(theme) => collapseIcon(theme, { active })}>{icon}</Icon>
            ) : (
              icon
            )}
          </ListItemIcon>

          <ListItemText
            primary={name}
            sx={(theme) =>
              collapseText(theme, {
                miniSidenav,
                transparentSidenav,
                whiteSidenav,
                active,
              })
            }
          />

          {collapse && collapse?.length ? collapseContoller === myKey ? <ExpandLess /> : <ExpandMore /> : null}
        </MDBox>
      </ListItem>
      {
        children && (
          <Collapse in={collapseContoller === myKey} unmountOnExit>
            {children}
          </Collapse>
        )
      }
    </>
  );
}

// Setting default values for the props of SidenavCollapse
SidenavCollapse.defaultProps = {
  color: "info",
  active: false,
  noCollapse: false,
  children: false,
  collapse: []
};

// Typechecking props for the SidenavCollapse
SidenavCollapse.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  active: PropTypes.bool,
  noCollapse: PropTypes.bool,
  handleCollapse: PropTypes.func,
  collapseContoller: PropTypes.string,
  collapse: PropTypes.array,
  myKey: PropTypes.string
};

export default SidenavCollapse;
