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
import { updateCoupons } from "redux/festures/couponsSlice";
import { getSingleCoupons } from "redux/festures/couponsSlice";
import { getAllCoupons } from "redux/festures/couponsSlice";
import { SkPrice } from "Utils/dateFunc";
import { formattedDateServer } from "Utils/dateFunc";
import Form from "./Form";
import SingleMember from "./SingleMember";
import {
  getAllmemberships,
  getSingleMembership,
  getDisableMember,
} from "redux/festures/membershipSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import { getDeletememberships } from "redux/festures/membershipSlice";

// import Form from "./Form";
// import SingleBlog from "./SingleBlog";
const columns = {
  AllMemberships: [
    { Header: "S.No", accessor: "no" },
    { Header: " details", accessor: " details" },
    { Header: "features", accessor: "features" },
    { Header: "price", accessor: "price" },
    {
      Header: "duration in month",
      accessor: "duration in month",
    },
    {
      Header: "Discount Percent",
      accessor: "Discount Percent",
    },
    { Header: "disable", accessor: "disable" },
    { Header: "view", accessor: "view" },
    { Header: "action", accessor: "action" },
    // { Header: "delete", accessor: "delete" },
  ],
};
const Membership = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const [rowsData, setRowsData] = useState([]);
  const { Loading, memberships, singlemembership } = useSelector((data) => ({
    ...data?.isMembership,
  }));
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  // console.log(memberships)

  useEffect(() => {
    dispatch(getAllmemberships(`${process.env.REACT_APP_APII}/getAllMembershipByAdmin/${admin}`));
  }, []);

  useEffect(() => {
    if (memberships && memberships?.length > 0) {
      const temprows =
        memberships &&
        memberships?.at(0) &&
        memberships?.map((value, index) => ({
          "no": (
            <MDTypography key={index} sx={{ fontSize: 12, fontWeight: "medium" }} variant="text">
              {index + 1}
            </MDTypography>
          ),
          " details": (
            <MDBox
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <MDBox sx={{ height: 40, width: 40 }}>
                <img
                  src={`${process.env.REACT_APP_URI}/${value?.logo}`}
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
                  gap: 1,
                  flexDirection: "column",
                }}
              >
                <MDTypography
                  display="block"
                  variant="button"
                  fontWeight="medium"
                  ml={1}
                  lineHeight={1}
                >
                  Name:
                </MDTypography>
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
                  {value?.title || "N/A"}
                </MDTypography>
              </MDBox>
            </MDBox>
          ),
          "features": (
            <MDBox
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 1,
                flexDirection: "column",
              }}
            >
              {value?.features.map((ele, i) => (
                <MDTypography
                  key={i}
                  display="block"
                  variant="button"
                  fontWeight="medium"
                  // ml={1}
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
                  {ele || "N/A"}
                </MDTypography>
              ))}
            </MDBox>
          ),
          "price": (
            <MDBox flexDirection="column">
              <MDTypography fontSize={12.5}>{SkPrice(value?.price)}</MDTypography>
              {/* <MDTypography fontSize={12.5}>Qty : {value?.couponQuantity || "N/A"}</MDTypography> */}
            </MDBox>
          ),
          "duration in month": (
            <MDBox flexDirection="column">
              {/* <MDTypography fontSize={12.5}>max discount :</MDTypography> */}
              <MDTypography fontSize={12.5}>{value?.durationInMonth || "N/A"}</MDTypography>
            </MDBox>
          ),
          "Discount Percent": (
            <MDBox flexDirection="column">
              <MDTypography fontSize={12.5}>{value?.discountPercent}%</MDTypography>
              {/* <MDTypography fontSize={12.5}>Qty : {value?.couponQuantity || "N/A"}</MDTypography> */}
            </MDBox>
          ),
          "view": (
            <IconButton
              aria-label="action_edit"
              onClick={() => {
                setIsOpenView(true);
                dispatch(getSingleMembership(value));
              }}
            >
              <Visibility
                sx={({ palette: { dark, white, info } }) => ({
                  color: darkMode ? info.main : dark.main,
                })}
              />
            </IconButton>
          ),
          "disable": (
            <Switch
              value={value?.disable}
              checked={value?.disable}
              color={"info"}
              onChange={(e) => {
                //   handleSwitchControl(value?._id);
                //   setIsSwitch(!isSwitch);
                dispatch(
                  getDisableMember({
                    url: `${process.env.REACT_APP_APII}/disableMembership/${value?._id}/${admin}`,
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
                    dispatch(
                      getAllmemberships(
                        `${process.env.REACT_APP_APII}/getAllMembershipByAdmin/${admin}`
                      )
                    );
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
          "action": (
            <>
              <IconButton
                aria-label="action_edit"
                onClick={() => {
                  setIsOpen(true);
                  setIsOpenUpdate(true);
                  // console.log(value?._id);
                  dispatch(getSingleMembership(value));
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
          // url: `${process.env.REACT_APP_APII}/deleteMembership/${value?._id}/${admin}`
          "delete": (
            <>
              <IconButton
                aria-label="delete"
                onClick={(e) => {
                  //   handleSwitchControl(value?._id);
                  //   setIsSwitch(!isSwitch);
                  dispatch(
                    getDeletememberships(
                      `${process.env.REACT_APP_APII}/deleteMembership/${value?._id}/${admin}`,
                    )
                  ).then((data) => {
                    dispatch(
                      handleAlert({
                        isOpen: true,
                        type: `${data?.payload?.success ? "success" : "error"}`,
                        msg: data?.payload?.message,
                      })
                    );
                    if (data?.payload?.success) {
                      dispatch(
                        getAllmemberships(
                          `${process.env.REACT_APP_APII}/getAllMembershipByAdmin/${admin}`
                        )
                      );
                    }
                  });
                }}
              >
                <DeleteIcon
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
  }, [memberships]);
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
                Membership&apos;s Table{" "}
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
                &nbsp; Create Membership
              </MDButton>
            </MDBox>
            <MDBox py={3}>
              {Loading ? (
                <SkLoading />
              ) : memberships && memberships?.length > 0 ? (
                <DataTable
                  table={{
                    columns: columns?.AllMemberships,
                    rows: rowsData,
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  isPages={memberships && memberships?.length}
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
        <SingleMember />
      </SkModal>
    </>
  );
};

export default Membership;
