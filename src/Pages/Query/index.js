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
import { getSingleQueryById } from "redux/festures/QuerySlice";
import { updateQuerys } from "redux/festures/QuerySlice";
import { getAllQuerys } from "redux/festures/QuerySlice";
import { formattedDateServer } from "Utils/dateFunc";
import Form from "./Form";
import SingleQuery from "./SingleQuery";
import SingleTutorial from "./SingleQuery";
import { getGlobalQueryById } from "redux/festures/QuerySlice";
// import SingleBlog from "./SingleTutorial";
const columns = {
  Allquery: [
    { Header: "S.No", accessor: "no", width: "50px" },
    { Header: "query details", accessor: "query details" },
    // { Header: "videoProvider", accessor: "videoProvider" },
    { Header: "date", accessor: "date" },
    // { Header: "showInHome", accessor: "showInHome" },
    // { Header: "disable", accessor: "disable" },
    { Header: "view", accessor: "view" },
    // { Header: "action", accessor: "action" },
  ],
};
const QueryPages = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const [rowsData, setRowsData] = useState([]);
  const { Loading, query } = useSelector((data) => ({ ...data?.isQuery }));
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  useEffect(() => {
    dispatch(getAllQuerys(`/getAllQuery/${admin}`));
    // dispatch(getBrands(`/getAllBrand?adminId=${admin}`));
  }, []);
  //   console.log(query, "query");
  useEffect(() => {
    if (query && query.length > 0) {
      const temprows =
        query &&
        query?.at(0) &&
        query?.map((value, index) => ({
          no: (
            <MDTypography sx={{ fontSize: 12, fontWeight: "medium" }} variant="text">
              {index + 1}
            </MDTypography>
          ),
          "query details": (
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
                    maxWidth: "350px",
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
                {/* <MDTypography
                  display="block"
                  variant="button"
                  fontWeight="medium"
                  ml={1}
                  lineHeight={1}
                  fontSize={10}
                >
                  QueryID: {value?._id || "N/A"}
                </MDTypography> */}
              </MDBox>
            </MDBox>
          ),
          // videoProvider: (
          //   <MDBox flexDirection="column">
          //     <MDTypography fontSize={15}>{value?.videoProvider}</MDTypography>
          //   </MDBox>
          // ),
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
                dispatch(getSingleQueryById(`/getByQueryId/${value?._id}/${admin}`));
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
                  updateQuerys({
                    url: `${process.env.REACT_APP_API}/disableQuery/${value?._id}`,
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
                    dispatch(getGlobalQueryById(`/getAllQuery/${admin}`));
                  }
                });
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
          ),
          // action: (
          //   <>
          //     <IconButton
          //       aria-label="action_edit"
          //       onClick={() => {
          //         setIsOpen(true);
          //         setIsOpenUpdate(true);
          //         // console.log(value?._id);
          //         dispatch(getSingleQueryById(`/getByQueryId/${value?._id}/${admin}`));
          //       }}
          //     >
          //       <Edit
          //         sx={({ palette: { dark, white, info } }) => ({
          //           color: darkMode ? info.main : dark.main,
          //         })}
          //       />
          //     </IconButton>
          //   </>
          // ),
        }));
      setRowsData(temprows);
    } else {
      setRowsData(["", " "]);
    }
  }, [query]);
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
                Query&apos;s Table{" "}
              </MDTypography>
              {/* <MDButton
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
                &nbsp; Create Query
              </MDButton> */}
            </MDBox>
            <MDBox py={3}>
              {Loading ? (
                <SkLoading />
              ) : query && query.length > 0 ? (
                <DataTable
                  table={{
                    columns: columns?.Allquery,
                    rows: rowsData,
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  isPages={query && query.length}
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
        show={isOpen}
        unShow={setIsOpen}
        width={{ sx: "100%", md: "65%", xl: "65%", sm: "100%" }}
        height={"90vh"}
        padding={3}
        overflowY={true}
      >
        <Form isOpenUpdate={isOpenUpdate} setIsOpenUpdate={setIsOpenUpdate} setIsOpen={setIsOpen} />
      </SkModal>
      <SkModal
        show={isOpenView}
        unShow={setIsOpenView}
        width={{ sx: "100%", md: "65%", xl: "65%", sm: "100%" }}
        height={"auto"}
        padding={3}
        overflowY={true}
      >
        <SingleQuery />
      </SkModal>
    </>
  );
};

export default QueryPages;
