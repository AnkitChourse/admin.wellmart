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
  AvatarGroup,
  Avatar,
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
import Details from "./Details";
import { getHomeCategoryCart } from "redux/festures/homeCategoryCart";
import { getSingleCategoryCart } from "redux/festures/homeCategoryCart";
import SkConfirm from "components/SkComfirm";
import { getHomeProduct } from "redux/festures/homeProduct";
import { deleteHomeProduct } from "redux/festures/homeProduct";
import { getSingleHomeProduct } from "redux/festures/homeProduct";
import SingleEHomeCategory from "Pages/EHomeCategoryCart/SingleEHomeCategory";

const columns = {
  AllCoupons: [
    { Header: "S.No", accessor: "no" },
    { Header: " Title", accessor: " Title" },
    { Header: "Product", accessor: "Product" },
    // { Header: "Description", accessor: "Description" },
    // {
    //   Header: "min order price / max discount price",
    //   accessor: "min order price / max discount price",
    // },
    // {
    //   Header: "Products",
    //   accessor: "Products",
    // },
    // { Header: "disable", accessor: "disable" },
    // { Header: "view", accessor: "view" },
    { Header: "action", accessor: "action" },
    { Header: "view", accessor: "view" },
    { Header: "delete", accessor: "delete" },
  ],
};
const HomeProduct = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const [rowsData, setRowsData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState({ open: false, isId: null });
  const { Loading, HomeProduct, singleHomeProduct } = useSelector((state) => ({
    ...state.isHomeProduct,
  }));

  useEffect(() => {
    dispatch(getHomeProduct(`${process.env.REACT_APP_APII}/getAllHomeProduct/${admin}`));
  }, []);

  useEffect(() => {
    if (HomeProduct && HomeProduct.length > 0) {
      const temprows =
        HomeProduct &&
        HomeProduct?.at(0) &&
        HomeProduct?.map((value, index) => ({
          no: (
            <MDTypography sx={{ fontSize: 12, fontWeight: "medium" }} variant="text">
              {index + 1}
            </MDTypography>
          ),
          " Title": (
            <MDBox
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
                  gap: 1,
                  flexDirection: "column",
                }}
              >
                {/* <MDTypography
                  display="block"
                  variant="button"
                  fontWeight="medium"
                  ml={1}
                  lineHeight={1}
                >
                  Title:
                </MDTypography> */}
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
                {/* <MDTypography
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
                  Description:
                </MDTypography>
                <MDTypography
                  display="block"
                  variant="button"
                  fontWeight="medium"
                  ml={1}
                  lineHeight={1}
                  fontSize={12.5}
                >
                  {value?.description || "N/A"}
                </MDTypography> */}
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

          // Products: (
          //   <MDBox flexDirection="column">
          //     {value?.products.map((ele, i) => (
          //       <MDBox
          //         key={i}
          //         sx={{
          //           display: "flex",
          //           justifyContent: "center",
          //           alignItems: "center",
          //           gap: 0.5,
          //           my: 1,
          //         }}
          //       >
          //         <MDBox sx={{ height: 40, width: 40 }}>
          //           <img
          //             src={`${process.env.REACT_APP_URI}/${ele?.images?.at(0)?.url}`}
          //             alt={"img"}
          //             onError={(e) => {
          //               (e.onError = null),
          //                 (e.target.src = require("../../assets/images/bg-profile.jpeg"));
          //             }}
          //             style={{ width: "100%", height: "100%", borderRadius: "50%" }}
          //           />
          //         </MDBox>
          //         <MDBox
          //           sx={{
          //             display: "flex",
          //             justifyContent: "flex-start",
          //             alignItems: "flex-start",
          //             gap: 1,
          //             flexDirection: "column",
          //           }}
          //         >
          //           <MDTypography
          //             display="block"
          //             variant="button"
          //             fontWeight="medium"
          //             ml={1}
          //             lineHeight={1}
          //           >
          //             Title:
          //           </MDTypography>
          //           <MDTypography
          //             display="block"
          //             variant="button"
          //             fontWeight="medium"
          //             ml={1}
          //             lineHeight={1}
          //             style={{
          //               maxWidth: "250px",
          //               lineHeight: "20px",
          //               display: "-webkit-box",
          //               WebkitBoxOrient: "vertical",
          //               WebkitLineClamp: 2,
          //               overflow: "hidden",
          //               textOverflow: "ellipsis",
          //             }}
          //           >
          //             {value?.title || "N/A"}
          //           </MDTypography>
          //           {/* <MDTypography
          //             display="block"
          //             variant="button"
          //             fontWeight="medium"
          //             ml={1}
          //             lineHeight={1}
          //             fontSize={12.5}
          //             style={{
          //               maxWidth: "250px",
          //               lineHeight: "20px",
          //               display: "-webkit-box",
          //               WebkitBoxOrient: "vertical",
          //               WebkitLineClamp: 2,
          //               overflow: "hidden",
          //               textOverflow: "ellipsis",
          //             }}
          //           >
          //             Description:
          //           </MDTypography>
          //           <MDTypography
          //             display="block"
          //             variant="button"
          //             fontWeight="medium"
          //             ml={1}
          //             lineHeight={1}
          //             fontSize={12.5}
          //           >
          //             {value?.description || "N/A"}
          //           </MDTypography> */}
          //           <MDTypography
          //             display="block"
          //             variant="button"
          //             fontWeight="medium"
          //             ml={1}
          //             lineHeight={1}
          //             fontSize={10}
          //           >
          //             Prize: {ele?.price || "N/A"}
          //           </MDTypography>
          //         </MDBox>
          //       </MDBox>
          //     ))}
          //   </MDBox>
          // ),
          // Description: (
          //   <MDBox flexDirection="column">
          //     <MDTypography fontSize={12.5}>{value?.description || "N/A"}</MDTypography>
          //     {/* <MDTypography fontSize={12.5}>Qty : {value?.couponQuantity || "N/A"}</MDTypography> */}
          //   </MDBox>
          // ),
          // Products: (
          //   <MDBox flexDirection="column">
          //     {value?.products.map((ele, i) => (
          //       <MDBox
          //         key={i}
          //         sx={{
          //           display: "flex",
          //           justifyContent: "center",
          //           alignItems: "center",
          //           gap: 0.5,
          //           my: 1,
          //         }}
          //       >
          //         <MDBox sx={{ height: 40, width: 40 }}>
          //           <img
          //             src={`${process.env.REACT_APP_URI}/${ele?.images?.at(0)?.url}`}
          //             alt={"img"}
          //             onError={(e) => {
          //               (e.onError = null),
          //                 (e.target.src = require("../../assets/images/bg-profile.jpeg"));
          //             }}
          //             style={{ width: "100%", height: "100%", borderRadius: "50%" }}
          //           />
          //         </MDBox>
          //         <MDBox
          //           sx={{
          //             display: "flex",
          //             justifyContent: "flex-start",
          //             alignItems: "flex-start",
          //             gap: 1,
          //             flexDirection: "column",
          //           }}
          //         >
          //           <MDTypography
          //             display="block"
          //             variant="button"
          //             fontWeight="medium"
          //             ml={1}
          //             lineHeight={1}
          //           >
          //             Title:
          //           </MDTypography>
          //           <MDTypography
          //             display="block"
          //             variant="button"
          //             fontWeight="medium"
          //             ml={1}
          //             lineHeight={1}
          //             style={{
          //               maxWidth: "250px",
          //               lineHeight: "20px",
          //               display: "-webkit-box",
          //               WebkitBoxOrient: "vertical",
          //               WebkitLineClamp: 2,
          //               overflow: "hidden",
          //               textOverflow: "ellipsis",
          //             }}
          //           >
          //             {ele?.title || "N/A"}
          //           </MDTypography>
          //           {/* <MDTypography
          //             display="block"
          //             variant="button"
          //             fontWeight="medium"
          //             ml={1}
          //             lineHeight={1}
          //             fontSize={12.5}
          //             style={{
          //               maxWidth: "250px",
          //               lineHeight: "20px",
          //               display: "-webkit-box",
          //               WebkitBoxOrient: "vertical",
          //               WebkitLineClamp: 2,
          //               overflow: "hidden",
          //               textOverflow: "ellipsis",
          //             }}
          //           >
          //             Description:
          //           </MDTypography>
          //           <MDTypography
          //             display="block"
          //             variant="button"
          //             fontWeight="medium"
          //             ml={1}
          //             lineHeight={1}
          //             fontSize={12.5}
          //           >
          //             {value?.description || "N/A"}
          //           </MDTypography> */}
          //           <MDTypography
          //             display="block"
          //             variant="button"
          //             fontWeight="medium"
          //             ml={1}
          //             lineHeight={1}
          //             fontSize={10}
          //           >
          //             Prize: {ele?.price || "N/A"}
          //           </MDTypography>
          //         </MDBox>
          //       </MDBox>
          //     ))}
          //   </MDBox>
          // ),
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

          Product: (
            <>
              <AvatarGroup
                max={3}
                sx={{
                  "& .MuiAvatarGroup-root": {
                    width: 24,
                    height: 24,
                    fontSize: 15,
                    borderColor: "white.main",
                  },
                  "& .MuiAvatar-root": {
                    width: 24,
                    height: 24,
                    fontSize: 15,
                    borderColor: "white.main",
                  },
                }}
              >
                {value?.products.map((ele, i) => (
                  <Avatar
                    key={i}
                    src={`${process.env.REACT_APP_URI}/${ele?.images?.at(0)?.url}`}
                    sx={{
                      width: 24,
                      height: 24,
                      "& MuiAvatarGroup-root .MuiAvatar-root": {
                        width: 24,
                        height: 24,
                      },
                    }}
                  />
                ))}
              </AvatarGroup>
            </>
          ),
          action: (
            <>
              <IconButton
                aria-label="action_edit"
                onClick={() => {
                  setIsOpen(true);
                  setIsOpenUpdate(true);

                  dispatch(getSingleHomeProduct(value));
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
          view: (
            <IconButton
              aria-label="action_edit"
              onClick={() => {
                setIsOpenView(true);
                dispatch(getSingleHomeProduct(value));
              }}
            >
              <Visibility
                sx={({ palette: { dark, white, info } }) => ({
                  color: darkMode ? info.main : dark.main,
                })}
              />
            </IconButton>
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
  }, [HomeProduct]);
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
                Home Product&apos;s Table{" "}
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
                &nbsp; Create Home Product
              </MDButton>
            </MDBox>
            <MDBox py={3}>
              {Loading ? (
                <SkLoading />
              ) : HomeProduct && HomeProduct.length > 0 ? (
                <DataTable
                  table={{
                    columns: columns?.AllCoupons,
                    rows: rowsData,
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  isPages={HomeProduct && HomeProduct.length}
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
        maxHeight="90vh"
      >
        <Form isOpenUpdate={isOpenUpdate} setIsOpenUpdate={setIsOpenUpdate} setIsOpen={setIsOpen} />
      </SkModal>

      <SkModal
        show={isOpenView}
        unShow={setIsOpenView}
        width={{ sx: "100%", md: "65%", xl: "65%", sm: "100%" }}
        height={"90vh"}
        padding={3}
        overflowY="auto"
      >
        <Details />
        {/* <SingleEHomeCategory /> */}
      </SkModal>
      <SkConfirm
        dialogTitle={"Delete"}
        dialogContent={"Are you sure you want to delete this Home product?"}
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
                  deleteHomeProduct(
                    `${process.env.REACT_APP_APII}/deleteHomeProduct/${isOpenDialog?.isId}/${admin}`
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
                      getHomeProduct(`${process.env.REACT_APP_APII}/getAllHomeProduct/${admin}`)
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

export default HomeProduct;
