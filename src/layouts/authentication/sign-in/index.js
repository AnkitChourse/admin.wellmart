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

import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { adminLoginApi } from "redux/festures/adminSlice";
import { CircularProgress, InputAdornment } from "@mui/material";
import { RemoveRedEye, VisibilityOff } from "@mui/icons-material";




  

function Basic() {
    // const { FcmToken } = useSelector((state) => ({...state.isAlert}));

  const [rememberMe, setRememberMe] = useState(false);
  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
    // FcmToken: FcmToken
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin, Loading } = useSelector((state) => ({ ...state.admin }));
  // console.log(admin);
  // const handleForm = (e) => {
  //   const { name, value } = e.target;
  //   setSignData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleAdminLogin = (e) => {
    e.preventDefault();
    // console.log(adminData, "vlaue");
    dispatch(adminLoginApi({ url: "/admin/login", data: adminData, navigate, dispatch }));
  };
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Admin Wellmate 
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleAdminLogin}>
            <MDBox mb={2}>
              <MDInput
                disabled={Loading}
                required
                type="email"
                // label="Email"
                fullWidth
                value={adminData?.email}
                onChange={(e) => setAdminData((prev) => ({ ...prev, email: e.target.value }))}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                InputProps={{
                  endAdornment: <InputAdornment position="end">{
                    passwordVisibility ?
                      <RemoveRedEye sx={{ cursor: 'pointer' }} onClick={() => setPasswordVisibility(!passwordVisibility)} color="white" />
                      : <VisibilityOff sx={{ cursor: 'pointer' }} onClick={() => setPasswordVisibility(!passwordVisibility)} color="white" />
                  }</InputAdornment>,
                }}
                required
                disabled={Loading}
                type={passwordVisibility ? "text" : "password"}
                // label="Password"
                fullWidth
                value={adminData?.password}
                onChange={(e) => setAdminData((prev) => ({ ...prev, password: e.target.value }))}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton disabled={Loading} variant="gradient" color="info" fullWidth type="submit">
                {Loading ? <CircularProgress size={20} color="primary" /> : 'sign in'}
              </MDButton>
            </MDBox>
            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
