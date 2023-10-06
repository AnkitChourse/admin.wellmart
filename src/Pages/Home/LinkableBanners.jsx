import { Close, Delete, Edit, Visibility, VisibilityOff } from "@mui/icons-material";
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
import { handleAlert } from "redux/festures/alertSlice";
import { updateLinkableBanners } from "redux/festures/isLinkableBanners";
import { getSingleLinkableBanners } from "redux/festures/isLinkableBanners";
import { getAllLinkableBanners } from "redux/festures/isLinkableBanners";
import LinkableBannersForm from "./data/LinkableBanners/Form";
import SingleLinkableComponent from "./data/LinkableBanners";
import { getGlobalLinkableBanners } from "redux/festures/isLinkableBanners";

const columns = [
  { Header: "S.No", accessor: "no" },
  { Header: "details", accessor: "details" },
  { Header: "date", accessor: "date" },
  { Header: "showInHome", accessor: "showInHome" },
  // { Header: "disable", accessor: "disable" },
  { Header: "view", accessor: "view" },
  { Header: "action", accessor: "action" },
];
const LinkableBanners = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [rowsData, setRowsData] = useState([]);
  const admin = localStorage.getItem("admin_id");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const dispatch = useDispatch();
  const { Loading, linkableBanners } = useSelector((data) => ({ ...data?.isLinkableBanners }));
  useEffect(() => {
    dispatch(getAllLinkableBanners(`/getAllHomeLinkableBanners`));
  }, []);
  // console.log(linkableBanners, "linkableBanners");
  useEffect(() => {
    if (linkableBanners && linkableBanners.length > 0) {
      const temprows =
        linkableBanners &&
        linkableBanners?.at(0) &&
        linkableBanners?.map((value, index) => ({
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
              <MDBox sx={{ height: 40, width: 40 }}>
                <img
                  src={`${process.env.REACT_APP_URI}/${value?.banner}`}
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
                    maxWidth: "300px",
                    lineHeight: "20px",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Title : {value?.title || "N/A"}
                </MDTypography>

                <MDTypography
                  display="block"
                  variant="button"
                  fontWeight="medium"
                  ml={1}
                  lineHeight={1}
                  fontSize={10}
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
                  Link: {value?.link || "N/A"}
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
                dispatch(getSingleLinkableBanners(`/getHomeLinkableBannersById/${value?._id}`));
              }}
            >
              <Visibility
                sx={({ palette: { dark, white, info } }) => ({
                  color: darkMode ? info.main : dark.main,
                })}
              />
            </IconButton>
          ),
          // disable: (
          //   <Switch
          //     value={value?.disable}
          //     checked={value?.disable}
          //     color={"info"}
          //     onChange={(e) => {
          //       // handleSwitchControl(value?._id);
          //       // setIsSwitch(!isSwitch);
          //       dispatch(
          //         updateBlog({
          //           url: `${process.env.REACT_APP_API}/disableBlog/${value?._id}/${admin}`,
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
          //           dispatch(getHomeLinkableBanners(`/getAllHomeLinkableBanners`));
          //         }
          //       });
          //     }}
          //     inputProps={{ "aria-label": "controlled" }}
          //   />
          // ),
          showInHome: (
            <Switch
              value={value?.showInHome}
              checked={value?.showInHome}
              color={"info"}
              onChange={(e) => {
                // handleSwitchControl(value?._id);
                // setIsSwitch(!isSwitch);
                dispatch(
                  updateLinkableBanners({
                    url: `${process.env.REACT_APP_API}/ShowInHomeLinkableBanner/${value?._id}/${admin}`,
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
                    dispatch(getGlobalLinkableBanners(`/getAllHomeLinkableBanners`));
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
                  dispatch(getSingleLinkableBanners(`/getHomeLinkableBannersById/${value?._id}`));
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
  }, [linkableBanners]);
  return (
    <>
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
              Linkable Banner&apos;s Table{" "}
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
              &nbsp; Create Linkable
            </MDButton>
          </MDBox>
          <MDBox py={3}>
            {Loading ? (
              <SkLoading />
            ) : linkableBanners && linkableBanners.length > 0 ? (
              <DataTable
                table={{
                  columns: columns,
                  rows: rowsData,
                }}
                isSorted={false}
                entriesPerPage={false}
                isPages={linkableBanners && linkableBanners.length}
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
        width={{ sx: "100%", md: "65%", xl: "65%", sm: "100%" }}
        height={"auto"}
        padding={3}
        overflowY={true}
      >
        <LinkableBannersForm
          setIsOpenView={setIsOpen}
          isOpenUpdate={isOpenUpdate}
          setIsOpenUpdate={setIsOpenUpdate}
          isOpenView={isOpenView}
        />
      </SkModal>
      <SkModal
        show={isOpenView}
        unShow={setIsOpenView}
        width={{ sx: "100%", md: "65%", xl: "65%", sm: "100%" }}
        height={"90vh"}
        padding={3}
        overflowY={true}
      >
        <SingleLinkableComponent />
      </SkModal>
    </>
  );
};

export default LinkableBanners;
