import React, { useEffect, useState } from "react";
import SingleAttribute from "./SingleAttribute";
import AttributeForm from "./Form";
import { useMaterialUIController } from "context";
import { useDispatch, useSelector } from "react-redux";
import SkModal from "components/SkModal";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import { Card, Icon, IconButton, Switch } from "@mui/material";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import { getAttribute } from "redux/festures/AttributeSlice";
import { Edit, Visibility } from "@mui/icons-material";
import MDBadge from "components/MDBadge";
import SkLoading from "components/SkLoading";
import DataTable from "examples/Tables/DataTable";
import { formattedDateServer } from "Utils/dateFunc";
import { updateAttribute } from "redux/festures/AttributeSlice";
import { getGlobalAttribute } from "redux/festures/AttributeSlice";
import MDButton from "components/MDButton";
import { handleAlert } from "redux/festures/alertSlice";
import { getSingleAttribute } from "redux/festures/AttributeSlice";
const columns = [
  { Header: "S.No", accessor: "no" },
  { Header: "name", accessor: "name" },
  { Header: "date", accessor: "date" },
  { Header: "disable", accessor: "disable" },
  // { Header: "view", accessor: "view" },
  { Header: "action", accessor: "action" },
];

const AttributeSection = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const [rowsData, setRowsData] = useState([]);
  const [isUserDetails, setIsUserDetails] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [viewUserId, setViewUserId] = useState("");
  const [pagess, setPagess] = useState(1);
  const [isSwitch, setIsSwitch] = useState(null);

  const { attribute, Loading } = useSelector((state) => ({
    ...state.isAttribute,
  }));
  useEffect(() => {
    dispatch(getAttribute(`/getAllAttribute`));
  }, []);
  const handleSwitchUpdate = (items) => {
    dispatch(
      updateAttribute({ url: `${process.env.REACT_APP_API}/disableAttribute/${items}/${admin}` })
    ).then((data) => {
      // console.log(data, "data");
      dispatch(
        handleAlert({
          isOpen: true,
          type: `${data?.payload?.success ? "success" : "error"}`,
          msg: data?.payload?.message,
        })
      );
      if (data?.payload?.success) {
        dispatch(getGlobalAttribute(`/getAllAttribute`));
      }
    });
  };
  useEffect(() => {
    // dispatch(getGlobalAttribute(`/getAllAttribute`)).then((data) => {
    // console.log("hwl", data);
    if (attribute && attribute?.length > 0) {
      const temprows =
        attribute &&
        attribute?.length > 0 &&
        attribute?.map((value, index) => ({
          no: (
            <MDTypography sx={{ fontSize: 12, fontWeight: "medium" }} variant="text">
              {index + 1}
            </MDTypography>
          ),
          name: (
            <MDBox
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: 1,
              }}
            >
              <MDTypography
                sx={{ fontSize: 15, fontWeight: "medium" }}
                variant="text"
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  "-webkit-line-clamp": 2,
                  "-webkit-box-orient": "vertical",
                  maxWidth: "300px",
                  lineHeight: "20px",
                }}
              >
                {value?.name || "N/A"}
              </MDTypography>
            </MDBox>
          ),
          date: (
            <MDBox flexDirection="column">
              <MDTypography fontSize={12}>
                Create: {formattedDateServer(new Date(value?.createdAt))}
              </MDTypography>
              <MDTypography fontSize={12}>
                Last Update: {formattedDateServer(new Date(value?.updatedAt))}
              </MDTypography>
            </MDBox>
          ),
          view: (
            <IconButton
              aria-label="action_edit"
              onClick={() => {
                setIsUserDetails(true);
                setViewUserId(value?._id);
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
                handleSwitchUpdate(value?._id);
                setIsSwitch(!isSwitch);
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
                  dispatch(getSingleAttribute(`/getAttributeById/${value?._id}`));
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
  }, [isSwitch, attribute]);
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
                Attribute &apos;s Table{" "}
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
                &nbsp; Create Attribute
              </MDButton>
            </MDBox>
            <MDBox py={3}>
              {Loading ? (
                <SkLoading />
              ) : attribute && attribute.length > 0 && rowsData && rowsData.length > 0 ? (
                <>
                  <DataTable
                    table={{
                      columns: columns,
                      rows: rowsData,
                    }}
                    isSorted={false}
                    entriesPerPage={false}
                    isPages={attribute && attribute.length}
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
                      <MDTypography>Page: {pagess}</MDTypography>
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
                        count={isPages}
                        page={pagess}
                        onChange={(e, value) => setPagess(value)}
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
        show={isUserDetails}
        unShow={setIsUserDetails}
        width={{ sx: "100%", md: "30%", xl: "30%", sm: "100%" }}
        height={"80%"}
        padding={3}
        overflowY={true}
      >
        <SingleAttribute viewUserId={viewUserId} setViewProductModal={setIsUserDetails} />
      </SkModal>
      <SkModal
        show={isOpen}
        unShow={setIsOpen}
        width={{ sx: "100%", md: "30%", xl: "30%", sm: "100%" }}
        height={"55%"}
        padding={3}
        overflowY={true}
      >
        <AttributeForm
          isOpenUpdate={isOpenUpdate}
          setIsOpen={setIsOpen}
          setIsOpenUpdate={setIsOpenUpdate}
        />
      </SkModal>
    </>
  );
};

export default AttributeSection;
