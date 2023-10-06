import { Close, Delete, Edit, Input, Visibility, VisibilityOff } from "@mui/icons-material";
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
  Avatar,
  AvatarGroup,
  MenuItem,
  Select,
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
// import SingleCoupons from "./SingleCoupons";
import Form from "./Form";
import SingleCoupons from "./SingleCoupons";
import { getGlobalCoupons } from "redux/festures/couponsSlice";
import { getCategory } from "redux/festures/categorySlice";
import MDBadge from "components/MDBadge";
import ApnaSelect from "components/ApnaSelect/ApnaSelect";

// import Form from "./Form";
// import SingleBlog from "./SingleBlog";
const columns = {
  AllCoupons: [
    { Header: "S.No", accessor: "no" },
    { Header: " details", accessor: " details" },
    { Header: "date", accessor: "date" },
    { Header: "discount - % / qty", accessor: "discount - % / qty" },
    {
      Header: "min order price / max discount price",
      accessor: "min order price / max discount price",
    },
    // {
    //   Header: "type",
    //   accessor: "type",
    // },
    {
      Header: "category",
      accessor: "category",
    },
    // { Header: "disable", accessor: "disable" },
    { Header: "delete", accessor: "delete" },
    { Header: "view", accessor: "view" },
    { Header: "action", accessor: "action" },
  ],
};

const disableFilter = [
  {
    _id: "0",
    name: "All",
  },
  {
    _id: true,
    name: "Delete",
  },
  {
    _id: false,
    name: "Active",
  },
];

const Coupons = () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const [rowsData, setRowsData] = useState([]);
  const { Loading, coupons, singleCoupons } = useSelector((data) => ({ ...data?.isCoupons }));
  const [isOpen, setIsOpen] = useState(false);
  const [istype, setIsType] = useState("");
  const [isOpenView, setIsOpenView] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const { category } = useSelector((state) => ({
    ...state.isCategory,
  }));

  const [filter, setFilter] = useState(0);

  // console.log(type,"type")
  useEffect(() => {
    dispatch(
      getAllCoupons(
        `${process.env.REACT_APP_API}/getAllCoupons`
      )
    );
  }, [filter]);
  console.log(coupons, "coupons");
  // useEffect(() => {
  //   dispatch(getCategory(`${process.env.REACT_APP_APII}/getAllCategoryByAdmin/${admin}`));
  // }, []);
  useEffect(() => {
    if (coupons && coupons.length > 0) {
      const temprows =
        coupons &&
        coupons?.at(0) &&
        coupons?.map((value, index) => ({
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
                  {value?.couponName || "N/A"}
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
                  CouponCode:
                </MDTypography>
                <MDTypography
                  display="block"
                  variant="button"
                  fontWeight="medium"
                  ml={1}
                  lineHeight={1}
                  fontSize={12.5}
                >
                  {value?.couponCode || "N/A"}
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
                Ex At : {formattedDateServer(new Date(value?.endDate))}
              </MDTypography>
              {/* <MDTypography fontSize={12.5}>Validity : {value?.validity} Days</MDTypography> */}
            </MDBox>
          ),
          "discount - % / qty": (
            <MDBox flexDirection="column">
              <MDTypography fontSize={12.5}>
                {value?.discount || "N/A"}% / {value?.couponQuantity || "N/A"} .Qty
              </MDTypography>
              {/* <MDTypography fontSize={12.5}>Qty : {value?.couponQuantity || "N/A"}</MDTypography> */}
            </MDBox>
          ),
          "min order price / max discount price": (
            <MDBox flexDirection="column">
              <MDTypography fontSize={12.5}>min order :</MDTypography>
              <MDTypography fontSize={12.5}>{SkPrice(value?.minimumOrderValue) || "N/A"}</MDTypography>
              <MDTypography fontSize={12.5}>max discount :</MDTypography>
              <MDTypography fontSize={12.5}>
                {SkPrice(value?.maximumDiscount) || "N/A"}
              </MDTypography>
            </MDBox>
          ),
          // type: (
          //   <MDBadge
          //     badgeContent={value?.type == "ECOM_CATEGORY" ? "ECOM CATEGORY" : "SERVICE CATEGORY"}
          //     color={value?.type == "ECOM_CATEGORY" ? "success" : "error"}
          //     variant="gradient"
          //     size="lg"
          //   />
          // ),
          // <MDTypography fontSize={12.5}>{value?.type || "N/A"}</MDTypography>

          category: (
            <MDBox>
              {/* {value?.type == "ECOM_CATEGORY" ? ( */}
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
                  {value?.categoryId.map((ele, i) => (
                    //  console.log(ele?.banner?.at(0)?.url,"value"),
                    <Avatar
                      key={i}
                      src={`${process.env.REACT_APP_URI}/${ele}`}
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
              {/* ) : (
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
                  {value?.categoryId.map((ele, i) => (
                    <Avatar
                      key={i}
                      src={`${process.env.REACT_APP_URI}/${ele?.banner?.at(0)?.url}`}
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
              )} */}
            </MDBox>
            // <MDBox
            //   sx={{
            //     display: "flex",
            //     justifyContent: "flex-start",
            //     alignItems: "flex-start",
            //     flexDirection: "column",
            //     gap: 0.5,
            //   }}
            // >
            //   {value?.product && value?.product?.length > 0 && (
            //     <>
            //       <MDTypography fontSize={10.5}>Products :</MDTypography>
            //       <MDBox
            //         sx={{
            //           display: "flex",
            //           justifyContent: "flex-start",
            //           alignItems: "flex-start",
            //           flexDirection: "row",
            //           gap: 0.5,
            //         }}
            //       >
            //         {value?.product &&
            //           value?.product?.length > 0 &&
            //           value?.product.slice(0, 3).map((items, index) => (
            //             <Tooltip key={index} title={items?.name} placeholder="bottom">
            //               <MDAvatar
            //                 src={`${process.env.REACT_APP_URI}/${items?.thumbnail}`}
            //                 alt="name"
            //                 size="xs"
            //                 onError={(e) => {
            //                   (e.onError = null),
            //                     (e.target.src = require("../../assets/images/bg-profile.jpeg"));
            //                 }}
            //                 sx={{
            //                   border: ({ borders: { borderWidth }, palette: { white } }) =>
            //                     `${borderWidth[2]} solid ${white.main}`,
            //                   cursor: "pointer",
            //                   position: "relative",

            //                   "&:not(:first-of-type)": {
            //                     ml: -1.25,
            //                   },

            //                   "&:hover, &:focus": {
            //                     zIndex: "10",
            //                   },
            //                 }}
            //               />
            //             </Tooltip>
            //           ))}
            //         {value?.product && value?.product?.length > 4 && (
            //           <MDAvatar
            //             alt="name"
            //             size="xs"
            //             sx={{
            //               border: ({ borders: { borderWidth }, palette: { white } }) =>
            //                 `${borderWidth[2]} solid ${white.main}`,
            //               cursor: "pointer",
            //               position: "relative",

            //               "&:not(:first-of-type)": {
            //                 ml: -1.25,
            //               },

            //               "&:hover, &:focus": {
            //                 zIndex: "10",
            //               },
            //             }}
            //           >
            //             <MDTypography
            //               display="block"
            //               variant="button"
            //               fontWeight="medium"
            //               //   ml={1}
            //               //   lineHeight={1}
            //               fontSize={8}
            //             >
            //               + {value?.product?.length - 3}
            //             </MDTypography>
            //           </MDAvatar>
            //         )}
            //       </MDBox>
            //     </>
            //   )}

            //   {value?.categoryId && value?.categoryId?.length > 0 && (
            //     <>
            //       <MDTypography fontSize={10.5}>Category :</MDTypography>
            //       <MDBox
            //         sx={{
            //           display: "flex",
            //           justifyContent: "flex-start",
            //           alignItems: "flex-start",
            //           flexDirection: "row",
            //           gap: 0.5,
            //         }}
            //       >
            //         {value?.categoryId &&
            //           value?.categoryId?.length > 0 &&
            //           value?.categoryId.slice(0, 3).map((items, index) => (
            //             <Tooltip key={index} title={items?.name} placeholder="bottom">
            //               <MDAvatar
            //                 src={`${process.env.REACT_APP_URI}/${items?.icon}`}
            //                 alt="name"
            //                 size="xs"
            //                 onError={(e) => {
            //                   (e.onError = null),
            //                     (e.target.src = require("../../assets/images/bg-profile.jpeg"));
            //                 }}
            //                 sx={{
            //                   border: ({ borders: { borderWidth }, palette: { white } }) =>
            //                     `${borderWidth[2]} solid ${white.main}`,
            //                   cursor: "pointer",
            //                   position: "relative",

            //                   "&:not(:first-of-type)": {
            //                     ml: -1.25,
            //                   },

            //                   "&:hover, &:focus": {
            //                     zIndex: "10",
            //                   },
            //                 }}
            //               />
            //             </Tooltip>
            //           ))}
            //         {value?.categoryId && value?.categoryId?.length > 4 && (
            //           <MDAvatar
            //             alt="name"
            //             size="xs"
            //             sx={{
            //               border: ({ borders: { borderWidth }, palette: { white } }) =>
            //                 `${borderWidth[2]} solid ${white.main}`,
            //               cursor: "pointer",
            //               position: "relative",

            //               "&:not(:first-of-type)": {
            //                 ml: -1.25,
            //               },

            //               "&:hover, &:focus": {
            //                 zIndex: "10",
            //               },
            //             }}
            //           >
            //             <MDTypography
            //               display="block"
            //               variant="button"
            //               fontWeight="medium"
            //               //   ml={1}
            //               //   lineHeight={1}
            //               fontSize={8}
            //             >
            //               + {value?.categoryId?.length - 3}
            //             </MDTypography>
            //           </MDAvatar>

            //           // <AvatarGroup max={3} sx={{
            //           //   "& .MuiAvatarGroup-root": {
            //           //     width: 24,
            //           //     height: 24,
            //           //     fontSize: 15,
            //           //     borderColor: "white.main",
            //           //   },
            //           //   "& .MuiAvatar-root": {
            //           //     width: 24,
            //           //     height: 24,
            //           //     fontSize: 15,
            //           //     borderColor: "white.main",
            //           //   },
            //           // }}>
            //           //   {value?.products.map((ele, i) => (
            //           //     <Avatar
            //           //       key={i}
            //           //       src={`${process.env.REACT_APP_URI}/${items?.icon}`}
            //           //       sx={{ width: 24, height: 24 ,
            //           //         "& MuiAvatarGroup-root .MuiAvatar-root":{
            //           //         width: 24, height: 24,

            //           //       }
            //           //     }}
            //           //     />
            //           //   ))}
            //           // </AvatarGroup>
            //         )}
            //       </MDBox>
            //     </>
            //   )}
            // </MDBox>
          ),

          view: (
            <IconButton
              aria-label="action_edit"
              onClick={() => {
                setIsOpenView(true);
                dispatch(getSingleCoupons(value));
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
                  updateCoupons({
                    url: `${process.env.REACT_APP_API}/disableCoupon/${value?._id}/${admin}`,
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
                      getAllCoupons(
                        `${process.env.REACT_APP_API}/getAllCoupons`
                      )
                    );
                  }
                });
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
          ),

          delete: (
            <Tooltip title={value?.disable ? "move to Active" : "delete"}>
              <IconButton
                aria-label="action_edit"
                // disabled={value?.disable}
                onClick={() => {
                  dispatch(
                    updateCoupons({
                      url: `${process.env.REACT_APP_API}/disableCoupon/${
                        value?._id
                      }/${admin}`,
                    })
                    
                  ).then((data) => {
                    // console.log(data,"ghvhvhvhbvh")
                    dispatch(
                      handleAlert({
                        isOpen: true,
                        type: `${data?.payload?.success ? "success" : "error"}`,
                        msg: data?.payload?.message,
                      })
                    );
                    if (data?.payload?.success) {
                      dispatch(
                        getAllCoupons(
                          `${process.env.REACT_APP_API}/getAllCoupons`
                        )
                      );
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
            // <IconButton
            //   disabled={value?.disable === true}
            //   aria-label="action_edit"
            //
            // >
            //   <Delete
            //     sx={({ palette: { dark, white, info } }) => ({
            //       color: darkMode ? info.main : dark.main,
            //     })}
            //   />
            // </IconButton>
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
          action: (
            <>
              <IconButton
                aria-label="action_edit"
                onClick={() => {
                  setIsOpen(true);
                  setIsOpenUpdate(true);
                  // console.log(value?._id);
                  dispatch(getSingleCoupons(value));
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
  }, [coupons]);
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
                Coupon&apos;s Table{" "}
              </MDTypography>
              <MDBox display="flex" gap="5px">
                <MDButton
                  variant="gradient"
                  disabled={Loading}
                  color="dark"
                  sx={({ palette: { dark, white, info, success } }) => ({
                    color: white.main,
                    backgroundColor: dark.main,
                    // "&:hover": {
                    //   color: success.main,
                    //   backgroundColor: success.main,
                    // },
                  })}
                  onClick={() => {
                    setIsOpen(true);
                    setIsOpenUpdate(false);
                    // setIsType("ECOM_CATEGORY");
                  }}
                >
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp; Create New Coupon
                </MDButton>
                {/* <MDButton
                  variant="gradient"
                  disabled={Loading}
                  color="dark"
                  sx={({ palette: { dark, white, info, success } }) => ({
                    color: white.main,
                    backgroundColor: dark.main,
                    "&:hover": {
                      color: success.main,
                      backgroundColor: success.main,
                    },
                  })}
                  onClick={() => {
                    setIsOpen(true);
                    setIsOpenUpdate(false);
                    setIsType("CATEGORY");
                  }}
                >
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp; Create Service Coupon
                </MDButton> */}
              </MDBox>
            </MDBox>

            <MDBox py={3} display="flex" justifyContent="end">
              <MDBox width="23%" display="flex" flexDirection="column" padding="2%">
                <MDTypography variant="button">Filter By Visibility</MDTypography>
                <Select
                  disabled={Loading}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  sx={({ palette: { dark, white, info } }) => ({
                    width: "100%",
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
                  {disableFilter?.map((ele, i) => (
                    <MenuItem component="option" key={i} value={ele?._id}>
                      {ele?.name}
                    </MenuItem>
                  ))}
                </Select>
              </MDBox>
            </MDBox>
            <MDBox py={3}>
              {Loading ? (
                <SkLoading />
              ) : coupons && coupons.length > 0 ? (
                <DataTable
                  table={{
                    columns: columns?.AllCoupons,
                    rows: rowsData,
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  isPages={coupons && coupons.length}
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
        // type={istype}

        width={{ sx: "100%", md: "65%", xl: "65%", sm: "100%" }}
        height={"88vh"}
        padding={3}
        overflowY={true}
      >
        <Form
          isOpenUpdate={isOpenUpdate}
          setIsOpenUpdate={setIsOpenUpdate}
          setIsOpen={setIsOpen}
          type={istype}
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
        <SingleCoupons />
      </SkModal>
    </>
  );
};

export default Coupons;
