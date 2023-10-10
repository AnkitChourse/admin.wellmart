import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import AlertTost from "components/ShubhamAlert";
import SkHelmet from "components/SkHelmet";
import { handleAlert } from "redux/festures/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import http from "Utils/api";
import Notification from "components/Notification/Notification";
import { getAdminDetails } from "redux/festures/adminSlice";
// import Notification from "components/Notification/Notification";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");
  const isToken = localStorage.getItem("token");
  const adminId = localStorage.getItem("admin_id");
  const { isAdmin } = useSelector((data) => ({ ...data?.admin }));
  const [filterRoutes, setFilterRoutes] = useState([]);
  

  const navigate = useNavigate();
  // Cache for the rtl
  const isDispatch = useDispatch();
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    if (!token) {
      navigate("/authentication/sign-in");
    }
  }, [pathname, token]);



  useEffect(() => {
    if(isAdmin){
      isDispatch(getAdminDetails(`${process.env.REACT_APP_API}/getUserById/${adminId}`));
    }
   }, [])
 
  //  console.log(isAdmin, "Admin");


  



 
  




  // const isSubset = (parentSet, subSet) => {
  //   return subSet.some((x) => parentSet.includes(x));
  // };

  const calculateRoutes = (allRoutes) => {
    let filter = [];
    const Froutes = allRoutes.map((route) => {
      if (isAdmin?.permissions && isAdmin) {
        if (route.collapse) {
          console.log(route.collapse, 'coolea')
          const calculateRoutesData = calculateRoutes(route.collapse);
          if (calculateRoutesData?.find(ele => ele?.key)) {
            filter.push(route);
          }
          return calculateRoutesData
        }
        // if (
        //   route.route &&
        //   isSubset(route?.permissions, isAdmin?.permissions)
        // ) {
          if (route?.type) filter.push(route);
          return (
            <Route
              exact
              path={route.route}
              element={route.component}
              key={route.key}
            />
          );
        // }
        // return null;
      } else {
        if (route.collapse) {
          // console.log(route.collapse, 'coolea')
          const calculateRoutesData = calculateRoutes(route.collapse);
          if (calculateRoutesData?.find(ele => ele?.key)) {
            filter.push(route);
          }
          return calculateRoutesData
        }
        if (route.route) {
          if (route?.type) filter.push(route);
          return (
            <Route
              exact
              path={route.route}
              element={route.component}
              key={route.key}
            />
          );
        }
        return null;
      }
    });
    setFilterRoutes(filter);
    return Froutes;
  };





  

  
  
  

  const getRoutes = useMemo(() => {
    return calculateRoutes(routes, isAdmin);
  }, [routes, isAdmin]);





  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );


  // console.log(isToken,"isToken")
  // console.log(adminId,"adminId")


  useEffect(() => {
    (async () => {
      if (isToken && adminId) {
        try {
          const res = await axios.get(`${process.env.REACT_APP_API}/getUserById/${adminId}`, {
            headers: {
              Authorization: isToken,
            },
          });
          return res.data;

        } catch (error) {
          if (error?.response?.data?.success === false) {
            isDispatch(
              handleAlert({
                isOpen: true,
                type: "error",
                msg: "Session Expired",
              })
            );
            localStorage.removeItem("admin_id");
            localStorage.removeItem("token");
            navigate("/authentication/sign-in");
          }
          // console.log(error, "error");
        }
        // await http
        //   .get(`${process.env.REACT_APP_API}/loged/${adminId}`)

        //   .catch((error) => {
        //     if (error?.response?.data?.success === false) {
        //       isDispatch(
        //         handleAlert({
        //           isOpen: true,
        //           type: "error",
        //           msg: "Session Expired",
        //         })
        //       );
        //       localStorage.removeItem("admin_id");
        //       localStorage.removeItem("token");
        //       navigate("/authentication/sign-in");
        //     }
        //     console.log(error, "error");
        //   });
      }
    })();
  }, [isToken, adminId]);

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <SkHelmet />
      <Notification/>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Admin Wellmart"
            routes={filterRoutes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <AlertTost />
      <Routes>
        {getRoutes || null}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider>
  );
}
