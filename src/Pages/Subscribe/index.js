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
import { SkPrice } from "Utils/dateFunc";
import { formattedDateServer } from "Utils/dateFunc";
// import Form from "./Form";
import { getAllSubscribe } from "redux/festures/SubscribeSlice";

// import Form from "./Form";
// import SingleBlog from "./SingleBlog";
const columns = {
  AllTax: [
    { Header: "S.No", accessor: "no" },
    { Header: "email", accessor: "email" },
    // { Header: "action", accessor: "action" },
  ],
};
const Tax = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const [rowsData, setRowsData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const { Loading, Subscribe} = useSelector((state) => ({ ...state?.isSubscribe }));
  
  useEffect(() => {
    dispatch(getAllSubscribe(`/getAllSubscribe`));
  }, []);

//   console.log(Subscribe,"Subscribe")
 
  useEffect(() => {
    if (Subscribe && Subscribe.length > 0) {
      const temprows =
      Subscribe &&
      Subscribe?.at(0) &&
      Subscribe?.map((value, index) => ({
          "no": (
            <MDTypography sx={{ fontSize: 12, fontWeight: "medium" }} variant="text">
              {index + 1}
            </MDTypography>
          ),
          "email": (
            <MDBox flexDirection="column">
              <MDTypography fontSize={12.5}>
                {/* {console.log(value?.taxPercent)} */}
                {value?.email || "N/A"}
              </MDTypography>
            </MDBox>
          ),
          action: (
            <>
              <IconButton
                aria-label="action_edit"
                onClick={() => {
                  setIsOpen(true);
                  setIsOpenUpdate(true);
                  // console.log(value?._id);
                //   dispatch(getSingleTax(`/getTaxById/${value?._id}/${admin}`));
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
  }, [Subscribe]);
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
              Subscribe&apos;s Table{" "}
              </MDTypography>
          
            </MDBox>
            <MDBox py={3}>
              {Loading ? (
                <SkLoading />
              ) : Subscribe && Subscribe.length > 0 ? (
                <DataTable
                  table={{
                    columns: columns?.AllTax,
                    rows: rowsData,
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  isPages={Subscribe && Subscribe.length}
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
        height={"auto"}
        padding={3}
        overflowY={true}
      >
        {/* <Form isOpenUpdate={isOpenUpdate} setIsOpenUpdate={setIsOpenUpdate} setIsOpen={setIsOpen} /> */}
      </SkModal>
      <SkModal
        show={isOpenView}
        unShow={setIsOpenView}
        width={{ sx: "100%", md: "65%", xl: "65%", sm: "100%" }}
        height={"auto"}
        padding={3}
        overflowY={true}
      >
      </SkModal>
    </>
  );
};

export default Tax;
