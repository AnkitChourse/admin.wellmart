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

import { useEffect, useState } from "react";

// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";

// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "context";
import { useDispatch, useSelector } from "react-redux";
import { getAdminDetails } from "redux/festures/adminSlice";
import { skCompany } from "redux/festures/isCompany";
import { getAllNotification } from "redux/festures/notificationSlice";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const admin = localStorage.getItem("admin_id");
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const location = useLocation();
  const [collapseContoller, setCollapseController] = useState(null)
  const [collapseItems, setCollapseItems] = useState(null)
  const collapseName = location.pathname.replace("/", "");
  const isDispatch = useDispatch();
  useEffect(() => {
    isDispatch(skCompany({ url: "company/getCompany" }));
  }, []);
  const { Loading, companyData } = useSelector((data) => ({ ...data?.isCompany }));

  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }


  console.log(companyData,"companyData")

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(dispatch, window.innerWidth < 1200 ? false : transparentSidenav);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(({ type, name, icon, title, noCollapse, key, route, href, collapse }, i) => {
    let returnValue;

    if (type === "collapse") {
      returnValue = href ? (
        <Link
          href={href}
          key={`${key}${i}`}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavCollapse
            myKey={key}
            color={color}
            name={name}
            icon={icon}
            handleCollapse={setCollapseController}
            collapseContoller={collapseContoller}
            collapseItems={collapseItems}
            setCollapseItems={setCollapseItems}
            active={route === location.pathname}
            noCollapse={noCollapse}
          />
        </Link>
      ) : collapse && collapse?.length ? (
        <SidenavCollapse
          color={color}
          key={`${key}${i}`}
          myKey={key}
          name={name}
          icon={icon}
          collapseItems={collapseItems}
          setCollapseItems={setCollapseItems}
          handleCollapse={setCollapseController}
          collapseContoller={collapseContoller}
          noCollapse={noCollapse}
          collapse={collapse}
        >
          {collapse?.map(({ type, name, icon, title, noCollapse, key, route, href }, i) => href ? (
            <Link
              href={href}
              key={`${key}${i}`}
              target="_blank"
              rel="noreferrer"
              sx={{ textDecoration: "none", pl: 4 }}
            >
              <SidenavCollapse
                color={color}
                name={name}
                myKey={key}
                icon={icon}
                collapseItems={collapseItems}
                setCollapseItems={setCollapseItems}
                handleCollapse={setCollapseController}
                collapseContoller={collapseContoller}
                active={route === location.pathname}
                noCollapse={noCollapse}
              />
            </Link>
          ) : (
            <NavLink to={route} key={`${key}${i}`}>
              <MDBox component="div" sx={{ ml: 1 }}>
                <SidenavCollapse
                  color={color}
                  myKey={key}
                  name={name}
                  icon={icon}
                  collapseItems={collapseItems}
                  setCollapseItems={setCollapseItems}
                  handleCollapse={setCollapseController}
                  collapseContoller={collapseContoller}
                  active={route === location.pathname}
                  noCollapse={noCollapse}
                />
              </MDBox>
            </NavLink>
          ))}
        </SidenavCollapse>
      )
        : (
          <NavLink to={route} key={key}>
            <SidenavCollapse
              color={color}
              myKey={key}
              name={name}
              icon={icon}
              collapseItems={collapseItems}
              setCollapseItems={setCollapseItems}
              handleCollapse={setCollapseController}
              collapseContoller={collapseContoller}
              active={route === location.pathname}
              noCollapse={noCollapse}
            />
          </NavLink>
        );
    } else if (type === "title") {
      returnValue = (
        <MDTypography
          key={`${key}${i}`}
          myKey={key}
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          opacity={0.6}
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {title}
        </MDTypography>
      );
    } else if (type === "divider") {
      returnValue = <Divider myKey={key} key={`${key}${i}`} />;
    }

    return returnValue;
  });

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to="/" display="flex" alignItems="center">
          {companyData && (
            <MDBox
              component="img"
              src={`${process.env.REACT_APP_URI}/${companyData?.header_logo}`}
              alt="Brand"
              width="2rem"
              onError={(e) => {
                e.onError = null;
                e.target.src = require("../../assets/images/bruce-mars.jpg");
              }}
            />
          )}
          <MDBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography component="h6" variant="button" fontWeight="medium" color={textColor}>
              {brandName}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderRoutes}</List>
      <MDBox p={2} mt="auto"></MDBox>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
