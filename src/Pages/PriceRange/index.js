import { Close, Delete, Edit, Visibility, VisibilityOff, Input } from "@mui/icons-material";
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

import { getAllContect } from "redux/festures/ContectSlice";
import { getAllprice } from "redux/festures/PricerangeSlice";
import { getSingleprice } from "redux/festures/PricerangeSlice";
import { updateprice } from "redux/festures/PricerangeSlice";
import Singleprice from "./Singleprice";
import Form  from "./Form";


const columns = {
  AllTax: [
    { Header: "S.No", accessor: "no" },
    { Header: "min price", accessor: "min price" },
    { Header: "max price", accessor: "max price" },

    { Header: "disable", accessor: "disable" },
    { Header: "view", accessor: "view" },
    { Header: "action", accessor: "action" },
  ],
};
const PriceRange = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const [rowsData, setRowsData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const { Loading, price } = useSelector((state) => ({ ...state?.isPrice }));

  useEffect(() => {
    dispatch(getAllprice(`${process.env.REACT_APP_API}/getAllPriceRange`));
  }, []);

  useEffect(() => {
    if (price && price.length > 0) {
      const temprows =
        price &&
        price?.at(0) &&
        price?.map((value, index) => ({
          no: (
            <MDTypography sx={{ fontSize: 12, fontWeight: "medium" }} variant="text">
              {index + 1}
            </MDTypography>
          ),

          "min price": (
            <MDBox>
              <MDTypography variant="button" fontWeight="medium">
                {SkPrice(value?.min) || 0}
              </MDTypography>
            </MDBox>
          ),
          "max price": (
            <MDBox>
              <MDTypography variant="button" fontWeight="medium">
                {SkPrice(value?.max) || 0}
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
                dispatch(getSingleprice(`/getByPriceRangeId/${value?._id}/${admin}`));
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
            // <Switch
            //   value={value?.disable}
            //   checked={value?.disable}
            //   color={"info"}
            //   onChange={(e) => {

            //     dispatch(
            //       updateBlog({
            //         url: `${process.env.REACT_APP_API}/disableBlog/${value?._id}/${admin}`,
            //       })
            //     ).then((data) => {
            //       dispatch(
            //         handleAlert({
            //           isOpen: true,
            //           type: `${data?.payload?.success ? "success" : "error"}`,
            //           msg: data?.payload?.message,
            //         })
            //       );
            //       if (data?.payload?.success) {
            //         dispatch(getGlobalBlog(`/getAllBlog?adminId=${admin}`));
            //       }
            //     });
            //   }}
            //   inputProps={{ "aria-label": "controlled" }}
            // />
            <Tooltip title={value?.disable ? "move to Active" : "delete"}>
              <IconButton
                aria-label="action_edit"
                // disabled={value?.disable}
                onClick={() => {
                  dispatch(
                    updateprice({
                      url: `${process.env.REACT_APP_API}/disablePriceRange/${value?._id}/${admin}`,
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
                      dispatch(getAllprice(`${process.env.REACT_APP_API}/getAllPriceRange`));
                    }
                  });
                }}
              >
                {value?.disable ? (
                  <Input
                    sx={({ palette: { dark, white, info } }) => ({
                      color: darkMode ? info.main : dark.main,
                    })}
                  />
                ) : (
                  <Delete
                    sx={({ palette: { dark, white, info } }) => ({
                      color: darkMode ? info.main : dark.main,
                    })}
                  />
                )}
              </IconButton>
            </Tooltip>
          ),

          action: (
            <>
              <IconButton
                aria-label="action_edit"
                onClick={() => {
                  setIsOpen(true);
                  setIsOpenUpdate(true);
                  // console.log(value?._id);
                  dispatch(getSingleprice(`/getByPriceRangeId/${value?._id}/${admin}`));
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
  }, [price]);
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
                Price Range Table{" "}
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
                &nbsp; Create Price Range
              </MDButton>
            </MDBox>
            <MDBox py={3}>
              {Loading ? (
                <SkLoading />
              ) : price && price.length > 0 ? (
                <DataTable
                  table={{
                    columns: columns?.AllTax,
                    rows: rowsData,
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  isPages={price && price.length}
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
        <Form
          isOpenUpdate={isOpenUpdate}
          setIsOpenUpdate={setIsOpenUpdate}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
      </SkModal>
      <SkModal
        show={isOpenView}
        unShow={setIsOpenView}
        width={{ sx: "100%", md: "65%", xl: "65%", sm: "100%" }}
        height={"auto"}
        padding={3}
        overflowY={true}
      >
        <Singleprice />
      </SkModal>
    </>
  );
};

export default PriceRange;
