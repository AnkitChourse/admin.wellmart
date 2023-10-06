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
import { camelToFlat } from "Utils/dateFunc";
import { formattedDateServer } from "Utils/dateFunc";
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAlert } from "redux/festures/alertSlice";

import SingleExtraSections from "./data/ExtraSections";
import ExtraSectionForm from "./data/ExtraSections/Form";
import { getAllExtraSections } from "redux/festures/isExtraSectionSlice";
import { getSingleExtraSections } from "redux/festures/isExtraSectionSlice";
import { updateExtraSections } from "redux/festures/isExtraSectionSlice";
import { getGlobalExtraSections } from "redux/festures/isExtraSectionSlice";

const columns = [
  { Header: "S.No", accessor: "no" },
  { Header: "details", accessor: "details" },
  { Header: "products", accessor: "products" },
  //   { Header: "date", accessor: "date" },
  { Header: "showInHome", accessor: "showInHome" },
  { Header: "disable", accessor: "disable" },
  { Header: "view", accessor: "view" },
  { Header: "action", accessor: "action" },
];
const ExtraSection = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [rowsData, setRowsData] = useState([]);
  const [isOpenView, setIsOpenView] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSet, setIsSet] = useState(null);
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const { Loading, extraSections } = useSelector((data) => ({ ...data?.isExtraSections }));

  useEffect(() => {
    dispatch(getAllExtraSections(`/getAllHomeExtraSection`));
  }, []);
  // console.log(extraSections, "extraSections");
  useEffect(() => {
    if (extraSections && extraSections.length > 0) {
      const temprows =
        extraSections &&
        extraSections?.at(0) &&
        extraSections?.map((value, index) => ({
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
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <MDBox sx={{ height: 40, width: 40 }}>
                <img
                  src={`${process.env.REACT_APP_URI}/${value?.banner}`}
                  alt={"banner"}
                  onError={(e) => {
                    (e.onError = null),
                      (e.target.src = require("../../assets/images/bg-profile.jpeg"));
                  }}
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              </MDBox>

              <MDTypography
                display="block"
                variant="button"
                fontWeight="medium"
                //   ml={1}
                //   lineHeight={1}
                fontSize={13}
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
                {camelToFlat(value?.name) || "N/A"}
              </MDTypography>
            </MDBox>
          ),
          products: (
            <MDBox
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 0.5,
              }}
            >
              {value?.products &&
                value?.products.length > 0 &&
                value?.products.slice(0, 5).map((items, index) => (
                  <Tooltip key={index} title={items?.name} placeholder="bottom">
                    <MDAvatar
                      src={`${process.env.REACT_APP_URI}/${items?.thumbnail}`}
                      alt="name"
                      size="xs"
                      onError={(e) => {
                        (e.onError = null),
                          (e.target.src = require("../../assets/images/bg-profile.jpeg"));
                      }}
                      sx={{
                        border: ({ borders: { borderWidth }, palette: { white } }) =>
                          `${borderWidth[2]} solid ${white.main}`,
                        cursor: "pointer",
                        position: "relative",

                        "&:not(:first-of-type)": {
                          ml: -1.25,
                        },

                        "&:hover, &:focus": {
                          zIndex: "10",
                        },
                      }}
                    />
                  </Tooltip>
                ))}
              {value?.products && value?.products.length > 5 && (
                <MDAvatar
                  alt="name"
                  size="xs"
                  sx={{
                    border: ({ borders: { borderWidth }, palette: { white } }) =>
                      `${borderWidth[2]} solid ${white.main}`,
                    cursor: "pointer",
                    position: "relative",

                    "&:not(:first-of-type)": {
                      ml: -1.25,
                    },

                    "&:hover, &:focus": {
                      zIndex: "10",
                    },
                  }}
                >
                  <MDTypography
                    display="block"
                    variant="button"
                    fontWeight="medium"
                    //   ml={1}
                    //   lineHeight={1}
                    fontSize={8}
                  >
                    + {value?.products?.length - 5}
                  </MDTypography>
                </MDAvatar>
              )}
            </MDBox>
          ),
          view: (
            <IconButton
              aria-label="action_edit"
              onClick={() => {
                setIsOpen(true);
                dispatch(getSingleExtraSections(`/getHomeExtraSectionById/${value?._id}`));
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
              value={value?.visibility}
              checked={value?.visibility}
              color={"info"}
              onChange={(e) => {
                // handleSwitchControl(value?._id);
                // setIsSwitch(!isSwitch);
                dispatch(
                  updateExtraSections({
                    url: `${process.env.REACT_APP_API}/disableHomeExtraSection/${value?._id}/${admin}`,
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
                    dispatch(getGlobalExtraSections(`/getAllHomeExtraSection`));
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
                  updateExtraSections({
                    url: `${process.env.REACT_APP_API}/ShowInHomehomeExtraSection/${value?._id}/${admin}`,
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
                    dispatch(getGlobalExtraSections(`/getAllHomeExtraSection`));
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
                  setIsOpenView(true);
                  //   setIsOpenUpdate(true);
                  //   // console.log(value?._id);
                  dispatch(getSingleExtraSections(`/getHomeExtraSectionById/${value?._id}`));
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
  }, [extraSections, isSet]);
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
              {/* All Blog&apos;s Table{" "} */}
              Home Extra Section&apos;s Table
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
              //   onClick={() => {
              //     setIsOpen(true);
              //     setIsOpenUpdate(false);
              //   }}
            >
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
              &nbsp; Create Blog&apos;s
            </MDButton> */}
          </MDBox>
          <MDBox py={3}>
            {Loading ? (
              <SkLoading />
            ) : extraSections && extraSections.length > 0 ? (
              <DataTable
                table={{
                  columns: columns,
                  rows: rowsData,
                }}
                isSorted={false}
                entriesPerPage={false}
                isPages={extraSections && extraSections.length}
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
        height={"90vh"}
        padding={3}
        overflowY={true}
      >
        <SingleExtraSections />
      </SkModal>
      <SkModal
        show={isOpenView}
        unShow={setIsOpenView}
        width={{ sx: "100%", md: "65%", xl: "65%", sm: "100%" }}
        height={"auto"}
        padding={3}
        overflowY={true}
      >
        <ExtraSectionForm setIsOpenView={setIsOpenView} setIsSet={setIsSet} isSet={isSet} />
      </SkModal>
    </>
  );
};

export default ExtraSection;
