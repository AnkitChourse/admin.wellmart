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
import { getSingleBrands } from "redux/festures/brandSlice";
import { getBrands } from "redux/festures/brandSlice";
import { formattedDateServer } from "Utils/dateFunc";
import CreateBrand from "./CreateBrand";
import SingleBrand from "./SingleBrand";
import { getGlobalBrands } from "redux/festures/brandSlice";
import SkConfirm from "components/SkComfirm";
const columns = {
  AllBrands: [
    { Header: "S.No", accessor: "no" },
    { Header: "brand details", accessor: "brand details" },
    // { Header: "Brand status", accessor: "Brand status" },
    // { Header: "payment method ", accessor: "payment method" },
    // { Header: "total Brands", accessor: "total Brands" },
    // { Header: "place Brand", accessor: "place Brand" },
    { Header: "date", accessor: "date" },
    // { Header: "showInHome", accessor: "showInHome" },
    { Header: "disable", accessor: "disable" },
    { Header: "view", accessor: "view" },
    { Header: "action", accessor: "action" },
    // { Header: "delete", accessor: "delete" },
  ],
};
const Brands = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const { Loading, brands } = useSelector((data) => ({ ...data.isBrand }));
  const [rowsData, setRowsData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState({ open: false, isId: null });

  useEffect(() => {
    dispatch(getBrands(`${process.env.REACT_APP_API}/getAllBrand`));
  }, []);

  useEffect(() => {
    if (brands && brands.length > 0) {
      const temprows =
        brands &&
        brands?.at(0) &&
        brands?.map((value, index) => ({
          no: (
            <MDTypography sx={{ fontSize: 12, fontWeight: "medium" }} variant="text">
              {index + 1}
            </MDTypography>
          ),
          "brand details": (
            <MDBox
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <MDBox sx={{ height: 40, width: 40 }}>
                <img
                  src={`${process.env.REACT_APP_URI}/${value?.icon}`}
                  alt={"img"}
                  onError={(e) => {
                    (e.onError = null),
                      (e.target.src = require("../../assets/images/bg-profile.jpeg"));
                  }}
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              </MDBox>

              <MDTypography
                display="block"
                variant="button"
                fontWeight="medium"
                ml={1}
                lineHeight={1}
                style={{
                  maxWidth: "250px",
                  lineHeight: "20px",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {value?.name || "N/A"}
              </MDTypography>
            </MDBox>
          ),
          date: (
            <MDBox flexDirection="column">
              <MDTypography fontSize={10}>
                Create: {formattedDateServer(new Date(value?.createdAt))}
              </MDTypography>
              <MDTypography fontSize={10}>
                Last Update: {formattedDateServer(new Date(value?.updatedAt))}
              </MDTypography>
            </MDBox>
          ),
          view: (
            <IconButton
              aria-label="action_edit"
              onClick={() => {
                setIsOpenView(true);
                dispatch(getSingleBrands(value));
              }}
            >
              <Visibility
                sx={({ palette: { dark, white, info } }) => ({
                  color: darkMode ? info.main : dark.main,
                })}
              />
            </IconButton>
          ),
          disable: (
            <Switch
              value={value?.disable}
              checked={value?.disable}
              color={"info"}
              onChange={(e) => {
                // handleSwitchControl(value?._id);
                // setIsSwitch(!isSwitch);
                dispatch(
                  updateBrands({
                    url: `${process.env.REACT_APP_API}/disableBrand/${value?._id}/${admin}`,
                  })
                ).then((data) => {
                  dispatch(
                    handleAlert({
                      isOpen: true,
                      type: `${data?.payload?.success ? "success" : "error"}`,
                      msg: data?.payload?.message,
                    })
                  );
                  if (data?.payload?.success) {
                    dispatch(getBrands(`${process.env.REACT_APP_API}/getAllBrand`));
                  }
                });
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
          ),
          // showInHome: (
          //   <Switch
          //     value={value?.showInHome}
          //     checked={value?.showInHome}
          //     color={"info"}
          //     onChange={(e) => {
          //       // handleSwitchControl(value?._id);
          //       // setIsSwitch(!isSwitch);
          //       dispatch(
          //         updateBrands({
          //           url: `${process.env.REACT_APP_API}/ShowInHomeBrand/${value?._id}/${admin}`,
          //         })
          //       ).then((data) => {
          //         dispatch(
          //           handleAlert({
          //             isOpen: true,
          //             type: `${data?.payload?.success ? "success" : "error"}`,
          //             msg: data?.payload?.message,
          //           })
          //         );
          //         if (data?.payload?.success) {
          //           dispatch(getGlobalBrands(`/getAllBrand?adminId=${admin}`));
          //         }
          //       });
          //     }}
          //     inputProps={{ "aria-label": "controlled" }}
          //   />
          // ),
          action: (
            <IconButton
              aria-label="action_edit"
              onClick={() => {
                setIsOpen(true);
                setIsOpenUpdate(true);
                // console.log(value?._id);
                dispatch(getSingleBrands(value));
              }}
            >
              <Edit
                sx={({ palette: { dark, white, info } }) => ({
                  color: darkMode ? info.main : dark.main,
                })}
              />
            </IconButton>
          ),
          delete: (
            <IconButton
              aria-label="action_edit"
              onClick={() => {
                // setIsOpen(true);
                // setUpdateProductModal(true);
                // console.log(value?._id);
                // dispatch(deleteBrands(`${process.env.REACT_APP_APII}/deleteBrand/${value?._id}/${admin}`))
                // .then((data) => {
                //   dispatch(
                //     handleAlert({
                //       isOpen: true,
                //       type: `${data?.payload?.success ? "success" : "error"}`,
                //       msg: data?.payload?.message,
                //     })
                //   );
                //   if (data?.payload?.success) {
                //     dispatch(getBrands(`/getAllBrandByAdmin/${admin}`));
                //   }
                // });
                setIsOpenDialog((Preview) => ({
                  ...Preview,
                  open: true,
                  isId: value?._id,
                }));
              }}
            >
              <Delete
                sx={({ palette: { dark, white, info } }) => ({
                  color: darkMode ? info.main : dark.main,
                })}
              />
            </IconButton>
          ),
        }));
      setRowsData(temprows);
    } else {
      setRowsData(["", " "]);
    }
  }, [brands]);

  // console.log(brands, "brands");
  //   console.log(rowsData, "rowsData");
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mb={2} />
        {/* <MDBox py={5}>
          <Card id="delete-account">
            <MDBox p={1.5} display="flex" justifyContent="space-between" alignItems="center">
              <MDButton
                variant="gradient"
                sx={({ palette: { dark, white, info } }) => ({
                  color: white.main,
                  backgroundColor: darkMode ? info.main : dark.main,
                  "&:hover": {
                    color: white.main,
                    backgroundColor: darkMode ? info.main : dark.main,
                  },
                })}
                onClick={() => {
                  // setIsOpen(true);
                }}
              >
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp; Create Users
              </MDButton>
             
            </MDBox>{" "}
          </Card>
        </MDBox> */}
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
                Brand &apos;s Table{" "}
              </MDTypography>
              <MDButton
                variant="gradient"
                color="dark"
                disabled={Loading}
                sx={({ palette: { dark, white, info } }) => ({
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
                &nbsp; Create brands
              </MDButton>
            </MDBox>
            <MDBox py={3}>
              {Loading ? (
                <SkLoading />
              ) : brands && brands.length > 0 ? (
                <>
                  <DataTable
                    table={{
                      columns: columns?.AllBrands,
                      rows: rowsData,
                    }}
                    isSorted={false}
                    entriesPerPage={false}
                    isPages={brands && brands.length}
                    noEndBorder
                    canSearch={false}
                    showTotalEntries={false}
                    pagination={false}
                    isPagination={false}
                  />
                  {/* <MDBox
                    sx={{
                      mt: 5,
                      // minHeigth: "100vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Stack spacing={2} direction={"row"}>
                      <MDTypography>Page: {isPages}</MDTypography>
                      <Pagination
                        sx={({ palette: { dark, white, info } }) => ({
                          "&.MuiPaginationItem-text": {
                            color: white.main,
                          },
                          "&	.MuiPaginationItem-icon": {
                            color: white.main,
                          },
                          "&		.MuiPaginationItem-textInfo": {
                            color: white.main,
                          },
                        })}
                        color="info"
                        variant="text"
                        count={page}
                        page={isPages}
                        onChange={(e, value) => setIsPages(value)}
                      />
                    </Stack>
                  </MDBox> */}
                </>
              ) : (
                <MDBox
                  // key={index}
                  display="flex"
                  justifyContent="center"
                  gap={2}
                  alignItems="center"
                  // width={"100%"}
                >
                  <MDTypography variant="h6">Something went wrong !</MDTypography>
                </MDBox>
              )}
            </MDBox>
          </Card>
        </MDBox>
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
        <CreateBrand
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
        height={"auto"}
        padding={3}
        overflowY={true}
      >
        <SingleBrand />
      </SkModal>
      <SkConfirm
        dialogTitle={"Delete"}
        dialogContent={"Are you sure you want to delete this Brand?"}
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
                  deleteBrands(`${process.env.REACT_APP_APII}/deleteBrand/${isOpenDialog?.isId}/${admin}`)
                ).then((data) => {
                  dispatch(
                    handleAlert({
                      isOpen: true,
                      type: `${data?.payload?.success ? "success" : "error"}`,
                      msg: data?.payload?.message,
                    })
                  );
                  if (data?.payload?.success) {
                    dispatch(getBrands(`/getAllBrandByAdmin/${admin}`));
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

export default Brands;
