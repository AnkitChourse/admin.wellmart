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
} from "@mui/material";
import { formattedDateServer } from "Utils/dateFunc";
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import HomeVideoForm from "./data/HomeVideos/Form";
import SingleHome from "./data/HomeVideos/SingleHome";
import { handleAlert } from "redux/festures/alertSlice";
import { getAllHomeVideos } from "redux/festures/isHomeVideos";
import { getSingleHomeVideos } from "redux/festures/isHomeVideos";
import { updateHomeVideos } from "redux/festures/isHomeVideos";
import { getGlobalHomeVideos } from "redux/festures/isHomeVideos";

// import { getHomehomeVideos } from "redux/festures/homeSlice";

const columns = [
  { Header: "S.No", accessor: "no" },
  { Header: "details", accessor: "details" },
  { Header: "date", accessor: "date" },
  { Header: "showInHome", accessor: "showInHome" },
  { Header: "disable", accessor: "disable" },
  { Header: "view", accessor: "view" },
  { Header: "action", accessor: "action" },
];
const HomeVideos = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [rowsData, setRowsData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const { Loading, homeVideos } = useSelector((data) => ({ ...data?.isHomeVideos }));
  useEffect(() => {
    dispatch(getAllHomeVideos(`/getAllHomevideo`));
  }, []);
  // console.log(homeVideos, "homeVideos");
  useEffect(() => {
    if (homeVideos && homeVideos.length > 0) {
      const temprows =
        homeVideos &&
        homeVideos?.at(0) &&
        homeVideos?.map((value, index) => ({
          no: (
            <MDTypography sx={{ fontSize: 12, fontWeight: "medium" }} variant="text">
              {index + 1}
            </MDTypography>
          ),
          details: (
            <MDBox
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 0.5,
              }}
            >
              {/* <MDBox sx={{ height: 40, width: 40 }}>
                <img
                  src={`${process.env.REACT_APP_URI}/${value?.image}`}
                  alt={"img"}
                  onError={(e) => {
                    (e.onError = null),
                      (e.target.src = require("../../assets/images/bg-profile.jpeg"));
                  }}
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              </MDBox> */}
              <MDBox
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 0.5,
                  flexDirection: "column",
                }}
              >
                <MDTypography
                  display="block"
                  variant="button"
                  fontWeight="medium"
                  ml={1}
                  lineHeight={1}
                  style={{
                    maxWidth: "300px",
                    lineHeight: "20px",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {value?.title || "N/A"}
                </MDTypography>
              </MDBox>
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
                dispatch(getSingleHomeVideos(`/getHomeVideobyid/${value?._id}`));
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
                  updateHomeVideos({
                    url: `${process.env.REACT_APP_API}/disablehomeVideo/${value?._id}/${admin}`,
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
                    dispatch(getGlobalHomeVideos(`/getAllHomevideo`));
                  }
                });
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
          ),
          showInHome: (
            <Switch
              value={value?.showInHome}
              checked={value?.showInHome}
              color={"info"}
              onChange={(e) => {
                // handleSwitchControl(value?._id);
                // setIsSwitch(!isSwitch);
                dispatch(
                  updateHomeVideos({
                    url: `${process.env.REACT_APP_API}/ShowInHomeVideo/${value?._id}/${admin}`,
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
                    dispatch(getGlobalHomeVideos(`/getAllHomevideo`));
                  }
                });
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
          ),
          action: (
            <>
              <IconButton
                aria-label="action_edit"
                onClick={() => {
                  setIsOpen(true);
                  setIsOpenUpdate(true);
                  //   // console.log(value?._id);
                  dispatch(getSingleHomeVideos(`/getHomeVideobyid/${value?._id}`));
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
  }, [homeVideos]);
  return (
    <>
      {" "}
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
              Home Video&apos;s Table
            </MDTypography>
            <MDButton
              variant="gradient"
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
                setIsOpen(true);
                setIsOpenUpdate(false);
              }}
            >
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
              &nbsp; Create Home
            </MDButton>
          </MDBox>
          <MDBox py={3}>
            {Loading ? (
              <SkLoading />
            ) : homeVideos && homeVideos.length > 0 ? (
              <DataTable
                table={{
                  columns: columns,
                  rows: rowsData,
                }}
                isSorted={false}
                entriesPerPage={false}
                isPages={homeVideos && homeVideos.length}
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
      <SkModal
        show={isOpen}
        unShow={setIsOpen}
        width={{ sx: "100%", md: "55%", xl: "55%", sm: "100%" }}
        height={"88%"}
        padding={3}
        overflowY={true}
      >
        <HomeVideoForm
          setIsOpen={setIsOpen}
          setIsOpenUpdate={setIsOpenUpdate}
          isOpenUpdate={isOpenUpdate}
          isOpen={isOpen}
        />
      </SkModal>
      <SkModal
        show={isOpenView}
        unShow={setIsOpenView}
        width={{ sx: "100%", md: "55%", xl: "55%", sm: "100%" }}
        height={"88%"}
        padding={3}
        overflowY={true}
      >
        <SingleHome />
      </SkModal>
    </>
  );
};

export default HomeVideos;
