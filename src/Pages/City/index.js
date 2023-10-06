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
import { handleAlert } from "redux/festures/alertSlice";
import { getAllCity, getAllCityWithoutLoading } from "redux/festures/citySlice";
import Form from "./Form";
import { updateCity } from "redux/festures/citySlice";

const columns = {
  AllCity: [
    { Header: "S.No", accessor: "no" },
    { Header: "City Id", accessor: "cityId" },
    { Header: "City Name", accessor: "cityName" },
    { Header: "Disable", accessor: "disable" },
    { Header: "Action", accessor: "action" },
  ],
};
const City = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const [rowsData, setRowsData] = useState([]);
  const { Loading, city } = useSelector((data) => ({ ...data?.isCity }));
  const [isOpen, setIsOpen] = useState({
    state: false,
    data: null
  });
  // console.log(coupons, "coupons");
  useEffect(() => {
    dispatch(getAllCity(`/getAllCityByAdmin/${admin}`));
  }, []);
  //   console.log(coupons, "coupons");
  useEffect(() => {
    if (city && city.length > 0) {
      const temprows =
        city &&
        city?.at(0) &&
        city?.map((value, index) => ({
          no: (
            <MDTypography sx={{ fontSize: 12, fontWeight: "medium" }} variant="text">
              {index + 1}
            </MDTypography>
          ),
          "cityId": (
            <MDBox
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <MDBox
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 1,
                  flexDirection: "column",
                }}
              >
                {/* <MDTypography
                  display="block"
                  variant="button"
                  fontWeight="medium"
                  ml={1}
                  lineHeight={1}
                >
                  City Id:
                </MDTypography> */}
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
                  {value?.cityId || "N/A"}
                </MDTypography>
              </MDBox>
            </MDBox>
          ),
          cityName: (<MDBox
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <MDBox
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 1,
                flexDirection: "column",
              }}
            >
              {/* <MDTypography
                display="block"
                variant="button"
                fontWeight="medium"
                ml={1}
                lineHeight={1}
              >
                City Name:
              </MDTypography> */}
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
                {value?.cityName || "N/A"}
              </MDTypography>
            </MDBox>
          </MDBox>),
          disable: (
            <Switch
              value={value?.disable}
              checked={value?.disable}
              color={"info"}
              onChange={(e) => {
                // handleSwitchControl(value?._id);
                // setIsSwitch(!isSwitch);
                dispatch(
                  updateCity({
                    url: `/disableCity/${value?._id}/${admin}`,
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
                    dispatch(getAllCityWithoutLoading(`/getAllCityByAdmin/${admin}`));
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
          //         updateCoupons({
          //           url: `${process.env.REACT_APP_API}/ShowInHomeBlog/${value?._id}/${admin}`,
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
          //           dispatch(getAllcoupons(`/getAllBlog?adminId=${admin}`));
          //         }
          //       });
          //     }}
          //     inputProps={{ "aria-label": "controlled" }}
          //   />
          // ),
          action: (
            <>
              <IconButton
                aria-label="action_edit"
                onClick={() => {
                  setIsOpen({
                    state: true,
                    data: value
                  });
                  // console.log(value?._id);
                }}
              >
                <Edit
                  sx={({ palette: { dark, white, info } }) => ({
                    color: darkMode ? info.main : dark.main,
                  })}
                />
              </IconButton>
            </>
          ),
        }));
      setRowsData(temprows);
    } else {
      setRowsData(["", " "]);
    }
  }, [city]);
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
                City&apos;s Table{" "}
              </MDTypography>
              <MDButton
                variant="gradient"
                disabled={Loading}
                color="dark"
                sx={({ palette: { dark, white, info } }) => ({
                  color: white.main,
                  backgroundColor: dark.main,
                  "&:hover": {
                    color: white.main,
                    backgroundColor: dark.main,
                  },
                })}
                onClick={() => {
                  setIsOpen({
                    state: true,
                    data: null
                  });
                }}
              >
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp; Create City
              </MDButton>
            </MDBox>
            <MDBox py={3}>
              {Loading ? (
                <SkLoading />
              ) : city && city.length > 0 ? (
                <DataTable
                  table={{
                    columns: columns?.AllCity,
                    rows: rowsData,
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  isPages={city && city.length}
                  noEndBorder
                  canSearch={false}
                  showTotalEntries={false}
                  pagination={false}
                  isPagination={false}
                />
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
        show={isOpen.state}
        unShow={setIsOpen}
        width={{ sx: "100%", md: "65%", xl: "65%", sm: "100%" }}
        height={"90vh"}
        padding={3}
        overflowY={true}
      >
        <Form isOpen={isOpen} setIsOpen={setIsOpen} />
      </SkModal>
    </>
  );
};

export default City;
