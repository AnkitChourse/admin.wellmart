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
  MenuItem,
  Select,
} from "@mui/material";
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
// import { getSingleAttribute } from "redux/festures/AttributeSlice";
import { getSingleTutorialsById } from "redux/festures/isTutorialSlice";
import { updateTutorials } from "redux/festures/isTutorialSlice";
import { getAllTutorials } from "redux/festures/isTutorialSlice";
// import { getSingleAttribute } from "redux/festures/AttributeSlice";
// import { getSingleBlog } from "redux/festures/tutorialslice";
// import { updateBlog } from "redux/festures/tutorialslice";
// import { getAlltutorials } from "redux/festures/tutorialslice";
// import { getAllTutorials } from "redux/festures/isTutorialSlice";
import { formattedDateServer } from "Utils/dateFunc";
import Form from "./Form";
import SingleTutorial from "./SingleTutorial";
import { getGlobalTutorialsById } from "redux/festures/isTutorialSlice";
import MDInput from "components/MDInput";
// import SingleBlog from "./SingleTutorial";
const columns = {
  AllTutorials: [
    { Header: "S.No", accessor: "no" },
    { Header: "details", accessor: "details" },
    { Header: "videoProvider", accessor: "videoProvider" },
    { Header: "date", accessor: "date" },
    { Header: "showInHome", accessor: "showInHome" },
    { Header: "disable", accessor: "disable" },
    { Header: "view", accessor: "view" },
    { Header: "action", accessor: "action" },
  ],
};
const TutorialPage = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const [rowsData, setRowsData] = useState([]);
  const { Loading, tutorials, isPages } = useSelector((data) => ({ ...data?.isTutorials }));
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterName, setIsFilterName] = useState("name");
  const [isSearch, setIsSearch] = useState("");
  const [pagess, setPagess] = useState(1);
  const [isOpenView, setIsOpenView] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  useEffect(() => {
    dispatch(
      getAllTutorials(
        `/getAllTutorial?adminId=${admin}&${isSearch !== "" && isFilterName}=${
          isSearch !== "" && isSearch
        }`
      )
    );
    // dispatch(getBrands(`/getAllBrand?adminId=${admin}`));
  }, [isSearch]);
  //   console.log(tutorials, "tutorials");
  useEffect(() => {
    if (tutorials && tutorials.length > 0) {
      const temprows =
        tutorials &&
        tutorials?.at(0) &&
        tutorials?.map((value, index) => ({
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
                    maxWidth: "250px",
                    lineHeight: "20px",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Title: {value?.tital || "N/A"}
                </MDTypography>
                <MDTypography
                  display="block"
                  variant="button"
                  fontWeight="medium"
                  ml={1}
                  lineHeight={1}
                  fontSize={10}
                >
                  TutorialID: {value?._id || "N/A"}
                </MDTypography>
              </MDBox>
            </MDBox>
          ),
          videoProvider: (
            <MDBox flexDirection="column">
              <MDTypography fontSize={15}>{value?.videoProvider}</MDTypography>
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
                dispatch(getSingleTutorialsById(`/getTutorial/${value?._id}`));
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
                  updateTutorials({
                    url: `${process.env.REACT_APP_API}/disableTutorial/${value?._id}/${admin}`,
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
                    dispatch(getGlobalTutorialsById(`/getAllTutorial?adminId=${admin}`));
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
                  updateTutorials({
                    url: `${process.env.REACT_APP_API}/ShowInHomeTutorial/${value?._id}/${admin}`,
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
                    dispatch(getGlobalTutorialsById(`/getAllTutorial?adminId=${admin}`));
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
                  // console.log(value?._id);
                  dispatch(getSingleTutorialsById(`/getTutorial/${value?._id}`));
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
  }, [tutorials]);
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
                Tutorials&apos;s Table{" "}
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
                &nbsp; Create Tutorials
              </MDButton>
            </MDBox>{" "}
            <MDBox
              px={3}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <MDBox
                py={3}
                sx={{
                  flexDirection: "column",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 1.5,
                }}
              >
                <MDTypography variant="button"> Tutorial Filter</MDTypography>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={isFilterName}
                  onChange={(e) => {
                    setIsFilterName(e.target.value);
                    setPagess(1);
                  }}
                  sx={({ palette: { dark, white, info } }) => ({
                    width: 100,
                    height: "3rem",
                    color: darkMode ? white?.main : dark?.main,
                    bgcolor: "transparent",
                    "&	.MuiSelect-icon": {
                      color: darkMode ? white?.main : dark?.main,
                      display: "block !important",
                      fontSize: "1.5rem !important",
                    },
                  })}
                >
                  <MenuItem value={"name"}>Title</MenuItem>
                </Select>
              </MDBox>
              <MDBox
                pt={4}
                px={1}
                sx={{
                  flexDirection: "column",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 1.5,
                }}
              >
                <MDInput
                  placeholder="search here...... "
                  type="text"
                  fullWidth
                  name="sarch here"
                  value={isSearch}
                  onChange={(e) => setIsSearch(e.target.value)}
                />
              </MDBox>
            </MDBox>
            <MDBox py={3}>
              {Loading ? (
                <SkLoading />
              ) : tutorials && tutorials.length > 0 ? (
                <>
                  <DataTable
                    table={{
                      columns: columns?.AllTutorials,
                      rows: rowsData,
                    }}
                    isSorted={false}
                    entriesPerPage={false}
                    isPages={tutorials && tutorials.length}
                    noEndBorder
                    canSearch={false}
                    showTotalEntries={false}
                    pagination={false}
                    isPagination={false}
                  />
                  <MDBox
                    sx={{
                      mt: 5,
                      // minHeigth: "100vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Stack spacing={2} direction={"row"}>
                      <MDTypography>Page: {pagess}</MDTypography>
                      <Pagination
                        sx={({ palette: { dark, white, info } }) => ({
                          "&.MuiPaginationItem-text": {
                            color: darkMode ? white.main : dark.main,
                          },
                          "&	.MuiPaginationItem-icon": {
                            color: darkMode ? white.main : dark.main,
                          },
                          "&		.MuiPaginationItem-textInfo": {
                            color: darkMode ? white.main : dark.main,
                          },
                        })}
                        color="info"
                        variant="text"
                        count={isPages}
                        page={pagess}
                        onChange={(e, value) => setPagess(value)}
                      />
                    </Stack>
                  </MDBox>
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
        width={{ sx: "100%", md: "75%", xl: "75%", sm: "100%" }}
        height={"90vh"}
        padding={3}
        overflowY={true}
      >
        <Form isOpenUpdate={isOpenUpdate} setIsOpenUpdate={setIsOpenUpdate} setIsOpen={setIsOpen} />
      </SkModal>
      <SkModal
        show={isOpenView}
        unShow={setIsOpenView}
        width={{ sx: "100%", md: "75%", xl: "75%", sm: "100%" }}
        height={"90vh"}
        padding={3}
        overflowY={true}
      >
        <SingleTutorial />
      </SkModal>
    </>
  );
};

export default TutorialPage;
