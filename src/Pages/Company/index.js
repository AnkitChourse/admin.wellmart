import { Close, Edit, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Card,
  FormControlLabel,
  FormGroup,
  Icon,
  Pagination,
  Stack,
  IconButton,
  Switch,
  Tooltip,
} from "@mui/material";
import http from "Utils/api";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import SkLoading from "components/SkLoading";
import SkModal from "components/SkModal";
import { useMaterialUIController } from "context";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "redux/festures/brandSlice";
// import { useDispatch, useSelector } from "react-redux";
import { skCompany } from "redux/festures/isCompany";
import BasicTabs from "./BasicTabs";
// import { getAllCompanyData } from "redux/festures/isCompany";
// import { getAllCompanyData } from "redux/festures/companySlice";

const Company = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mb={2} />
        <MDBox py={3}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <MDTypography variant="h6" color="white">
                Company&apos;s Details{" "}
              </MDTypography>
            </MDBox>
            <MDBox py={3}>
              <BasicTabs />
            </MDBox>
          </Card>
        </MDBox>
        <Footer />
      </DashboardLayout>
      {/* <SkModal
        show={isOpen}
        unShow={setIsOpen}
        width={{ sx: "100%", md: "65%", xl: "65%", sm: "100%" }}
        height={"90vh"}
        padding={3}
        overflowY={true}
      >
        <MDBox
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          position={"relative"}
          height="3rem"
        >
          <IconButton
            aria-label="off"
            onClick={() => {
              setIsOpen(false);
            }}
            sx={({ palette: { dark, white, info } }) => ({
              color: darkMode ? info.main : dark.main,
              position: "absolute",
              top: -4,
              right: -4,
              border: 1,
              borderRadius: 3,
              p: 0.5,
              borderColor: darkMode ? info.main : dark.main,
              zIndex: 10,
            })}
          >
            {" "}
            <Close
              sx={({ palette: { dark, white, info } }) => ({
                color: darkMode ? info.main : dark.main,
              })}
            />{" "}
          </IconButton>
        </MDBox>
        <Form isOpenUpdate={isOpenUpdate} setIsOpenUpdate={setIsOpenUpdate} setIsOpen={setIsOpen} />
      </SkModal>
      <SkModal
        show={isOpenView}
        unShow={setIsOpenView}
        width={{ sx: "100%", md: "65%", xl: "65%", sm: "100%" }}
        height={"90vh"}
        padding={3}
        overflowY={true}
      >
        <MDBox
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          position={"relative"}
          height="3rem"
        >
          <IconButton
            aria-label="off"
            onClick={() => {
              setIsOpenView(false);
            }}
            sx={({ palette: { dark, white, info } }) => ({
              color: darkMode ? info.main : dark.main,
              position: "absolute",
              top: -4,
              right: -4,
              border: 1,
              borderRadius: 3,
              p: 0.5,
              borderColor: darkMode ? info.main : dark.main,
              zIndex: 10,
            })}
          >
            {" "}
            <Close
              sx={({ palette: { dark, white, info } }) => ({
                color: darkMode ? info.main : dark.main,
              })}
            />{" "}
          </IconButton>
        </MDBox>
        <SingleCoupons />
      </SkModal> */}
    </>
  );
};

export default Company;
