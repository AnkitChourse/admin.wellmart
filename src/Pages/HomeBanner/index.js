import { Close, Delete, Edit, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Card,
  FormControlLabel,
  FormGroup,
  Icon,
  Pagination,
  Stack,
  IconButton,
  Switch,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import MDBadge from "components/MDBadge";
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
import { handleAlert } from "redux/festures/alertSlice";
import { deleteBrands } from "redux/festures/brandSlice";
import { updateBrands } from "redux/festures/brandSlice";
import { getBrands } from "redux/festures/brandSlice";
import { formattedDateServer } from "Utils/dateFunc";
import CreateBranner from "./createBanner";
import SkConfirm from "components/SkComfirm";
import { getAllHomeBanner, getSingleHomeBanner } from "redux/festures/homeBannerSlice";
const columns = {
  AllBrands: [
    // { Header: "S.No", accessor: "no" },
    // { Header: "brand details", accessor: "brand details" },
    // // { Header: "Brand status", accessor: "Brand status" },
    // // { Header: "payment method ", accessor: "payment method" },
    // // { Header: "total Brands", accessor: "total Brands" },
    // // { Header: "place Brand", accessor: "place Brand" },
    // { Header: "date", accessor: "date" },
    // // { Header: "showInHome", accessor: "showInHome" },
    // { Header: "disable", accessor: "disable" },
    // { Header: "view", accessor: "view" },
    // { Header: "action", accessor: "action" },
    // { Header: "delete", accessor: "delete" },
  ],
};
const HomeBanner = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const { Loading, AllHomeBanner, singleHomeBanner } = useSelector((state) => ({
    ...state.isHomeBanner,
  }));
  const [rowsData, setRowsData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState({ open: false, isId: null });
  //   console.log(AllHomeBanner);
  useEffect(() => {
    dispatch(getAllHomeBanner(`/getAllHomeBanner/${admin}`));
  }, []);

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mb={2} />
        <MDBox py={3}>
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
              Home Banner &apos;s{" "}
            </MDTypography>
            {/* <MDButton
              variant="gradient"
              color="dark"
              disabled={Loading}
              sx={({ palette: { dark, white, info ,} }) => ({
                color: white.main,
                backgroundColor: dark.main,
                "&:hover": {
                  color: white.main,
                  backgroundColor: dark.main,
                },
              })}
              onClick={() => {
                setIsOpen(true);
                setIsOpenUpdate(false);
              }}
            >
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
              &nbsp; Create Home Banner
            </MDButton> */}
          </MDBox>

          {/* <SkLoading /> */}
        </MDBox>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {AllHomeBanner?.map((ele, i) => (
            <Box key={i}>
              <Box sx={{ display: "flex", justifyContent: "space-between", my: 4, width: "100%" }}>
                <MDTypography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    width: "75%",
                  }}
                  color="white"
                >
                  {ele?.title}
                </MDTypography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <MDButton
                    variant="gradient"
                    color="dark"
                    sx={({ palette: { dark, white, info, success } }) => ({
                      color: white.main,
                      backgroundColor: white.main,
                      "&:hover": {
                        color: success.main,
                        backgroundColor: success.main,
                      },
                      mx: 2
                    })}
                    onClick={() => {
                      setIsOpen(true);
                      setIsOpenUpdate(true);
                      dispatch(getSingleHomeBanner(ele));
                    }}
                  >
                    <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                    Update
                  </MDButton>
                  {/* <MDButton
                    variant="gradient"
                    color="dark"
                    sx={({ palette: { dark, white, info ,error} }) => ({
                      color: white.main,
                      backgroundColor: white.main,
                      "&:hover": {
                        color: error.main,
                        backgroundColor: error.main,
                      },
                      mx:2
                    })}
                    onClick={() => {
                      setIsOpenDialog((Preview) => ({
                        ...Preview,
                        open: true,
                        isId: ele?._id,
                      }));
                    }}
                  >
                      <Icon sx={{ fontWeight: "bold" }}>delete</Icon>
                    Delete
                  </MDButton> */}
                </Box>
              </Box>
              <Box sx={{ height: "50vh", width: "100%", marginBottom: "5%" }}>
                <img
                  src={`${process.env.REACT_APP_URI}/${ele?.banner}`}
                  alt={"img"}
                  onError={(e) => {
                    (e.onError = null),
                      (e.target.src = require("../../assets/images/bg-profile.jpeg"));
                  }}
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
              <Divider />
            </Box>

          ))}
        </Box>
        <Footer />
      </DashboardLayout>
      <SkModal
        show={isOpen}
        unShow={setIsOpen}
        width={{ sx: "100%", md: "65%", xl: "65%", sm: "100%" }}
        height={"auto"}
        padding={3}
        overflowY={true}
      >
        <CreateBranner
          isOpenUpdate={isOpenUpdate}
          setIsOpenUpdate={setIsOpenUpdate}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
        {/* <SingleProduct viewProductId={viewProductId} setViewProductModal={setViewProductModal} /> */}
      </SkModal>
      <SkModal
        show={isOpenView}
        unShow={setIsOpenView}
        width={{ sx: "100%", md: "65%", xl: "65%", sm: "100%" }}
        height={"90vh"}
        padding={3}
        overflowY={true}
      >
        {/* <SingleBrand /> */}
      </SkModal>
      <SkConfirm
        dialogTitle={"Delete"}
        dialogContent={"Are you sure you want to delete this Banner?"}
        open={isOpenDialog}
        setOpen={setIsOpenDialog}
        dialogAction={
          <MDBox
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 3,

              px: 3,
            }}
          >
            <MDButton
              variant="gradient"
              color="info"
              sx={{ width: "50%" }}
              onClick={() => {
                setIsOpenDialog((Preview) => ({
                  ...Preview,
                  open: false,
                  isId: null,
                }));
              }}
            >
              Cancel
            </MDButton>
            <MDButton
              variant="gradient"
              sx={{ width: "50%" }}
              color="error"
              onClick={() => {
                dispatch(
                  deleteBrands(
                    `${process.env.REACT_APP_APII}/deleteHomeBanner/${isOpenDialog?.isId}/${admin}`
                  )
                ).then((data) => {
                  dispatch(
                    handleAlert({
                      isOpen: true,
                      type: `${data?.payload?.success ? "success" : "error"}`,
                      msg: data?.payload?.message,
                    })
                  );
                  if (data?.payload?.success) {
                    dispatch(getAllHomeBanner(`/getAllHomeBanner/${admin}`));
                  }
                });
                setIsOpenDialog((Preview) => ({
                  ...Preview,
                  open: false,
                  isId: null,
                }));
              }}
            >
              yes
            </MDButton>
          </MDBox>
        }
      />
    </>
  );
};

export default HomeBanner;
