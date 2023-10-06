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
  Select,
  MenuItem,
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
import { getSingleAttribute } from "redux/festures/AttributeSlice";
import { getSingleBlog } from "redux/festures/blogSlice";
import { updateBlog } from "redux/festures/blogSlice";
import { getAllBlogs } from "redux/festures/blogSlice";
import { formattedDateServer } from "Utils/dateFunc";
import Form from "./Form";
import SingleBlog from "./SingleBlog";
import { getGlobalBlog } from "redux/festures/blogSlice";
import MDInput from "components/MDInput";
const columns = {
  AllBlogs: [
    { Header: "S.No", accessor: "no" },
    { Header: "blog details", accessor: "blog details" },
    { Header: "date", accessor: "date" },
    { Header: "showInHome", accessor: "showInHome" },
    { Header: "disable", accessor: "disable" },
    { Header: "view", accessor: "view" },
    { Header: "action", accessor: "action" },
  ],
};
const BlogPage = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const [rowsData, setRowsData] = useState([]);
  const { Loading, blogs, isPages } = useSelector((data) => ({ ...data?.isBlogs }));
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isSearch, setIsSearch] = useState("");
  const [isFilterName, setIsFilterName] = useState("name");
  const [pagess, setPagess] = useState(1);
  useEffect(() => {
    dispatch(
      getAllBlogs(
        `/getAllBlog?adminId=${admin}${
          isSearch !== "" ? `&${isFilterName}=${encodeURIComponent(isSearch.trim())}` : ""
        }&page=${isPages}`
      )
    );
  }, [isSearch, pagess, isFilterName]);
  //   console.log(blogs, "blogs");
  useEffect(() => {
    if (blogs && blogs.length > 0) {
      const temprows =
        blogs &&
        blogs?.at(0) &&
        blogs?.map((value, index) => ({
          no: (
            <MDTypography sx={{ fontSize: 12, fontWeight: "medium" }} variant="text">
              {index + 1}
            </MDTypography>
          ),
          "blog details": (
            <MDBox
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 0.5,
              }}
            >
              <MDBox sx={{ height: 40, width: 40 }}>
                <img
                  src={`${process.env.REACT_APP_URI}/${value?.image}`}
                  alt={"img"}
                  onError={(e) => {
                    (e.onError = null),
                      (e.target.src = require("../../assets/images/bg-profile.jpeg"));
                  }}
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              </MDBox>
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
                  Title: {value?.title || "N/A"}
                </MDTypography>
                <MDTypography
                  display="block"
                  variant="button"
                  fontWeight="medium"
                  ml={1}
                  lineHeight={1}
                  fontSize={10}
                >
                  BlogID: {value?._id || "N/A"}
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
                dispatch(getSingleBlog(`/getBlogById/${value?._id}`));
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
                  updateBlog({
                    url: `${process.env.REACT_APP_API}/disableBlog/${value?._id}/${admin}`,
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
                    dispatch(getGlobalBlog(`/getAllBlog?adminId=${admin}`));
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
                  updateBlog({
                    url: `${process.env.REACT_APP_API}/ShowInHomeBlog/${value?._id}/${admin}`,
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
                    dispatch(getGlobalBlog(`/getAllBlog?adminId=${admin}`));
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
                  dispatch(getSingleBlog(`/getBlogById/${value?._id}`));
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
  }, [blogs]);
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
                Blog&apos;s Table{" "}
              </MDTypography>
              <MDButton
              disabled={Loading}
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
                &nbsp; Create Blog
              </MDButton>
            </MDBox>
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
                <MDTypography variant="button"> Blog Filter</MDTypography>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={isFilterName}
                  onChange={(e) => {
                    setIsFilterName(e.target.value);
                    setPagess(1);
                    setIsSearch("");
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
                  <MenuItem value={"name"}>Name</MenuItem>
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
              ) : blogs && blogs.length > 0 ? (
                <>
                  <DataTable
                    table={{
                      columns: columns?.AllBlogs,
                      rows: rowsData,
                    }}
                    isSorted={false}
                    entriesPerPage={false}
                    isPages={blogs && blogs.length}
                    noEndBorder
                    canSearch={false}
                    showTotalEntries={false}
                    pagination={false}
                    isPagination={false}
                  />{" "}
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
        height={"90vh"}
        padding={3}
        overflowY={true}
      >
        <SingleBlog />
      </SkModal>
    </>
  );
};

export default BlogPage;
