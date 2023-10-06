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
import SingleHomeCategory from "./SingleHomeCategory";
import { getHomeCategoryCart } from "redux/festures/homeCategoryCart";
import { getSingleCategoryCart } from "redux/festures/homeCategoryCart";
import SkConfirm from "components/SkComfirm";
import { deleteSingleCategoryCart } from "redux/festures/homeCategoryCart";
import MDBadge from "components/MDBadge";

const columns = {
  AllCoupons: [
    { Header: "S.No", accessor: "no" },
    { Header: " details", accessor: " details" },
    // { Header: "date", accessor: "date" },
    { Header: "Background Colour Code", accessor: "backgroundColourCode" },
    // {
    //   Header: "min order price / max discount price",
    //   accessor: "min order price / max discount price",
    // },
    {
      Header: "Task Colour Code",
      accessor: "taskColourCode",
    },
    // { Header: "disable", accessor: "disable" },
    { Header: "view", accessor: "view" },
    { Header: "action", accessor: "action" },
    { Header: "delete", accessor: "delete" },
  ],
};
const HomeCategoryCart = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const [rowsData, setRowsData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState({ open: false, isId: null });
  const { Loading, homeCategory, singlehomeCategory } = useSelector((state) => ({
    ...state.isHomeCategoryCart,
  }));

  useEffect(() => {
    dispatch(getHomeCategoryCart(`${process.env.REACT_APP_APII}/getAllHomeCategoryCart/${admin}`));
  }, []);

  useEffect(() => {
    if (homeCategory && homeCategory.length > 0) {
      const temprows =
        homeCategory &&
        homeCategory?.at(0) &&
        homeCategory?.map((value, index) => ({
          no: (
            <MDTypography sx={{ fontSize: 12, fontWeight: "medium" }} variant="text">
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
                  Title:
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
                <MDTypography
                  display="block"
                  variant="button"
                  fontWeight="medium"
                  ml={1}
                  lineHeight={1}
                  fontSize={12.5}
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
                  Subtitle:
                </MDTypography>
                <MDTypography
                  display="block"
                  variant="button"
                  fontWeight="medium"
                  ml={1}
                  lineHeight={1}
                  fontSize={12.5}
                >
                  {value?.subtitle || "N/A"}
                </MDTypography>
                {/* <MDTypography
                  display="block"
                  variant="button"
                  fontWeight="medium"
                  ml={1}
                  lineHeight={1}
                  fontSize={10}
                >
                  ID: {value?._id || "N/A"}
                </MDTypography> */}
              </MDBox>
            </MDBox>
          ),
          date: (
            <MDBox flexDirection="column">
              <MDTypography fontSize={12.5}>
                Str At : {formattedDateServer(new Date(value?.startDate))}
              </MDTypography>
              <MDTypography fontSize={12.5}>
                Ex At : {formattedDateServer(new Date(value?.expiryDate))}
              </MDTypography>
              <MDTypography fontSize={12.5}>Validity : {value?.validity} Days</MDTypography>
            </MDBox>
          ),
          backgroundColourCode: (
            <MDBox flexDirection="column">
              {/* <MDTypography fontSize={12.5}>{value?.backgroundColourCode || "N/A"}</MDTypography> */}
              <MDBadge
                badgeContent={value?.backgroundColourCode || "N/A"}
                color={value?.backgroundColourCode || "N/A"}
                variant="gradient"
                size="lg"
              />
              {/* <MDTypography fontSize={12.5}>Qty : {value?.couponQuantity || "N/A"}</MDTypography> */}
            </MDBox>
          ),
          taskColourCode: (
            <MDBox flexDirection="column">
              <MDBadge
                badgeContent={value?.taskColourCode || "N/A"}
                color={value?.taskColourCode || "N/A"}
                variant="gradient"
                size="lg"
              />
              {/* <MDTypography fontSize={12.5}>{value?.taskColourCode || "N/A"}</MDTypography> */}
            </MDBox>
          ),
          "category / Products": (
            <MDBox
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              {value?.product && value?.product?.length > 0 && (
                <>
                  <MDTypography fontSize={10.5}>Products :</MDTypography>
                  <MDBox
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      flexDirection: "row",
                      gap: 0.5,
                    }}
                  >
                    {value?.product &&
                      value?.product?.length > 0 &&
                      value?.product.slice(0, 3).map((items, index) => (
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
                    {value?.product && value?.product?.length > 4 && (
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
                          + {value?.product?.length - 3}
                        </MDTypography>
                      </MDAvatar>
                    )}
                  </MDBox>
                </>
              )}
              {value?.categoryId && value?.categoryId?.length > 0 && (
                <>
                  <MDTypography fontSize={10.5}>Category :</MDTypography>
                  <MDBox
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      flexDirection: "row",
                      gap: 0.5,
                    }}
                  >
                    {value?.categoryId &&
                      value?.categoryId?.length > 0 &&
                      value?.categoryId.slice(0, 3).map((items, index) => (
                        <Tooltip key={index} title={items?.name} placeholder="bottom">
                          <MDAvatar
                            src={`${process.env.REACT_APP_URI}/${items?.icon}`}
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
                    {value?.categoryId && value?.categoryId?.length > 4 && (
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
                          + {value?.categoryId?.length - 3}
                        </MDTypography>
                      </MDAvatar>
                    )}
                  </MDBox>
                </>
              )}
            </MDBox>
          ),
          view: (
            <IconButton
              aria-label="action_edit"
              onClick={() => {
                setIsOpenView(true);
                dispatch(getSingleCategoryCart(value));
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
          //         updateCoupons({
          //           url: `${process.env.REACT_APP_APII}/disableCoupon/${value?._id}/${admin}`,
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
          //           dispatch(getAllCoupons(`${process.env.REACT_APP_APII}/getAllCouponByAdmin/${admin}`));
          //         }
          //       });
          //     }}
          //     inputProps={{ "aria-label": "controlled" }}
          //   />
          // ),
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
          action: (
            <>
              <IconButton
                aria-label="action_edit"
                onClick={() => {
                  setIsOpen(true);
                  setIsOpenUpdate(true);
                  // console.log(value?._id);
                  dispatch(getSingleCategoryCart(value));
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
          delete: (
            <IconButton
              aria-label="action_edit"
              onClick={() => {
                setIsOpenDialog((Preview) => ({
                  ...Preview,
                  open: true,
                  isId: value?._id,
                }));
              }}
            >
              <Delete
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
  }, [homeCategory]);
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
                Home Category Cart&apos;s Table{" "}
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
                &nbsp; Create Home Category Cart
              </MDButton>
            </MDBox>
            <MDBox py={3}>
              {Loading ? (
                <SkLoading />
              ) : homeCategory && homeCategory.length > 0 ? (
                <DataTable
                  table={{
                    columns: columns?.AllCoupons,
                    rows: rowsData,
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  isPages={homeCategory && homeCategory.length}
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
        <SingleHomeCategory />
      </SkModal>
      <SkConfirm
        dialogTitle={"Delete"}
        dialogContent={"Are you sure you want to delete this Home Category?"}
        open={isOpenDialog}
        setOpen={setIsOpenDialog}
        dialogAction={
          <MDBox
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 3,

              px: 3,
            }}
          >
            <MDButton
              variant="gradient"
              color="info"
              sx={{ width: "50%" }}
              onClick={() => {
                setIsOpenDialog((Preview) => ({
                  ...Preview,
                  open: false,
                  isId: null,
                }));
              }}
            >
              Cancel
            </MDButton>
            <MDButton
              variant="gradient"
              sx={{ width: "50%" }}
              color="error"
              onClick={() => {
                dispatch(
                  deleteSingleCategoryCart(
                    `${process.env.REACT_APP_APII}/deleteHomeCategoryCart/${isOpenDialog?.isId}/${admin}`
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
                      getHomeCategoryCart(
                        `${process.env.REACT_APP_APII}/getAllHomeCategoryCart/${admin}`
                      )
                    );
                  }
                });
                setIsOpenDialog((Preview) => ({
                  ...Preview,
                  open: false,
                  isId: null,
                }));
              }}
            >
              yes
            </MDButton>
          </MDBox>
        }
      />
    </>
  );
};

export default HomeCategoryCart;
