import React, { useEffect, useState } from "react";
import { useMaterialUIController } from "context";
import { useDispatch, useSelector } from "react-redux";
import SkModal from "components/SkModal";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import { Card, IconButton, Switch } from "@mui/material";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import SingleTransactions from "./SingleAttribute";
import TransactionForm from "./Form";
import { getAllTransaction } from "redux/festures/userSlice";
import { Edit, Visibility } from "@mui/icons-material";
import MDBadge from "components/MDBadge";
import SkLoading from "components/SkLoading";
import DataTable from "examples/Tables/DataTable";
import { SkPrice } from "Utils/dateFunc";
import { formattedDateServer } from "Utils/dateFunc";
import { SkDate } from "Utils/dateFunc";
const columns = [
  { Header: "S.No", accessor: "no", textAlign: "left" },
  { Header: "details", accessor: "details", textAlign: "left" },
  { Header: "payment method", accessor: "payment method", textAlign: "left" },
  { Header: "amount", accessor: "amount", textAlign: "left" },
  { Header: "refund amount", accessor: "refund amount", textAlign: "left" },
  { Header: "date", accessor: "date", textAlign: "left" },
  // { Header: "block/unblock", accessor: "block/unblock" },
  // { Header: "view", accessor: "view" },
];

const TransactionSection = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const [isUserDetails, setIsUserDetails] = useState(false);
  const [isUserUpdate, setIsUserUpdate] = useState(false);
  const [viewUserId, setViewUserId] = useState("");
  const [pagess, setPagess] = useState(1);
  const [isSwitch, setIsSwitch] = useState(null);
  const [rowsData, setRowsData] = useState([]);
  const { allTransaction, singleTransaction, Loading } = useSelector((state) => ({
    ...state.isUsers,
  }));
  useEffect(() => {
    dispatch(getAllTransaction(`/getAllTransactions/${admin}`));
  }, []);
  // console.log(allTransaction, "alltransection");
  useEffect(() => {
    if (allTransaction && allTransaction?.length > 0) {
      const temprows =
        allTransaction &&
        allTransaction?.length > 0 &&
        allTransaction?.map((value, index) => ({
          no: (
            <MDTypography sx={{ fontSize: 10, fontWeight: "medium" }} variant="text">
              {index + 1}
            </MDTypography>
          ),
          details: (
            <MDBox
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flexDirection: "column",
                gap: 0.8,
              }}
            >
              <MDTypography sx={{ fontSize: 13, fontWeight: "medium" }} variant="text">
                Bank : {value?.bank || null}
              </MDTypography>
              <MDTypography sx={{ fontSize: 13, fontWeight: "medium" }} variant="text">
                transactionID: {value?.id || "N/A"}
              </MDTypography>
              <MDTypography sx={{ fontSize: 13, fontWeight: "medium" }} variant="text">
                OrderId: {value?.notes?.order_id || "N/A"}
              </MDTypography>
            </MDBox>
          ),
          amount: (
            <MDBadge
              color={"success"}
              variant="gradient"
              size="lg"
              badgeContent={SkPrice(value?.amount) || "N/A"}
              fontSize={13.5}
            ></MDBadge>
          ),
          "refund amount": (
            <MDBadge
              color={"error"}
              variant="gradient"
              size="lg"
              fontSize={13.5}
              badgeContent={SkPrice(value?.amount_refunded) || "N/A"}
            ></MDBadge>
          ),
          "payment method": (
            <MDTypography
              display="block"
              variant="button"
              fontWeight="medium"
              ml={1}
              lineHeight={1}
            >
              {value?.method || "N/A"}
            </MDTypography>
          ),
          date: (
            <MDTypography
              display="block"
              variant="button"
              fontWeight="medium"
              ml={1}
              lineHeight={1}
            >
              {SkDate(new Date(value?.created_at)) || "N/A"}
            </MDTypography>
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
          "block/unblock": (
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
            <IconButton
              aria-label="action_edit"
              //  onClick={}
            >
              <Edit
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
  }, [allTransaction]);
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
                  // setIsOpen2(true);
                }}
              >
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp; Create subCategory
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
            >
              <MDTypography variant="h6" color="white">
                Transaction &apos;s Table{" "}
              </MDTypography>
            </MDBox>
            <MDBox py={3}>
              {Loading ? (
                <SkLoading />
              ) : allTransaction && allTransaction.length > 0 && rowsData && rowsData.length > 0 ? (
                <>
                  <DataTable
                    table={{
                      columns: columns,
                      rows: rowsData,
                    }}
                    isSorted={false}
                    entriesPerPage={false}
                    isPages={allTransaction && allTransaction.length}
                    noEndBorder
                    canSearch={false}
                    showTotalEntries={false}
                    pagination={false}
                    isPagination={false}
                  />
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
        <SingleTransactions viewUserId={viewUserId} setViewProductModal={setIsUserDetails} />
      </SkModal>
      <SkModal
        show={isUserDetails}
        unShow={setIsUserDetails}
        width={{ sx: "100%", md: "30%", xl: "30%", sm: "100%" }}
        height={"80%"}
        padding={3}
        overflowY={true}
      >
        {/* <SingleTransactions viewUserId={viewUserId} setViewProductModal={setIsUserDetails} /> */}
        <TransactionForm />
      </SkModal>
    </>
  );
};

export default TransactionSection;
