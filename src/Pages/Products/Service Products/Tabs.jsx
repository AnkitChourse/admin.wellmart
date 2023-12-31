// import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import Products from "./products";
import Pagination from "@mui/material/Pagination";
import MDBox from "components/MDBox";
import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllProduct,
//   updateVisibility,
//   getAllLens,
//   updateLensVisibility,
// } from "api/productSlice";
import MDTypography from "components/MDTypography";
import {
  Button,
  Collapse,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Delete,
  Input,
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
  Star,
} from "@mui/icons-material";
// import { handlePage } from "api/productSlice";
import Switch from "@mui/material/Switch";
import { Edit, Visibility, VisibilityOff } from "@mui/icons-material";
import { useMaterialUIController } from "context";
import DataTable from "examples/Tables/DataTable";
import { getAllProducts } from "redux/festures/productSlice";
import { useEffect, useState } from "react";
import SkLoading from "components/SkLoading";
import MDBadge from "components/MDBadge";
import { updateProducts } from "redux/festures/productSlice";
import { handleAlert } from "redux/festures/alertSlice";
import { getSingleProduct } from "redux/festures/productSlice";
import { getSingleReview } from "redux/festures/reviewSlice";
import { getAllGlobalProducts } from "redux/festures/productSlice";
import MDInput from "components/MDInput";
import { useLocation } from "react-router-dom";
import { getProductsWithoutLoading } from "redux/festures/productSlice";
import http from "Utils/api2";
import { getAllCity } from "redux/festures/citySlice";
import { getCategory } from "redux/festures/categorySlice";
import SimpleSelect from "components/ApnaSelect/SimpleSelect";

export default function BasicTabs({
  setUpdateProduct,
  setCreateProduct,
  setGetUrl,
  setCreateLens,
  unShow,
  setViewData,
  setViewContactModal,
  setViewProductModal,
  setViewProductId,
  isPages,
  setIsPages,
  isSwitch,
  setIsSwitch,
  isOpen,
  setIsOpen,
  setUpdateProductModal,
  setProductId,
}) {
  const dispatch = useDispatch();
  const admin = localStorage.getItem("admin_id");
  const { pathname } = useLocation();
  //   const ProductSlice = useSelector((state) => state.productSlice);
  //   const totalPage = useSelector((state) => state.productSlice.totalPage);
  //   const filterPage = useSelector((state) => state.productSlice.filterPage);
  //   const admin = useSelector((state) => state.authSlice.admin);
  const { AllProducts, Loading, page } = useSelector((state) => ({ ...state.isProducts }));
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [value, setValue] = useState("");
  const [isFilterName, setIsFilterName] = useState("name");
  const [isSort, setIsSort] = useState("Sort By");
  const [isSearch, setIsSearch] = useState("");

  //filter states

  const [filterCollapse, setFilterCollapse] = useState(false);
  const [AllSubCategory, setAllSubCategory] = useState([]);
  const [AllTax, setAllTax] = useState([]);
  const { city } = useSelector((state) => state.isCity);

  const [rowsData, setRowsData] = useState([]);

  // const [current, setcurrent] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [filter, setFilter] = useState("");
  const [rating, setRating] = useState("");
  const [sold, setSold] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [brandId, setBrandId] = useState(null);
  const [productId, setproductId] = useState("");

  //Static Filters

  const dateFilter = [
    {
      _id: 0,
      name: "All Products",
    },
    {
      _id: "today",
      name: "Today",
    },
    {
      _id: "week",
      name: "This Week",
    },
    {
      _id: "month",
      name: "This Month",
    },
    {
      _id: "year",
      name: "This Year",
    },
    // {
    //   _id: 'manually',
    //   name: 'Manually'
    // },
  ];

  const sortByPrice = [
    {
      _id: 0,
      name: "All",
    },
    {
      _id: "HIGHTOLOW",
      name: "High To Low",
    },
    {
      _id: "LOWTOHIGH",
      name: "Low To High",
    },
  ];

  const disableFilter = [
    {
      _id: null,
      name: "All",
    },
    {
      _id: true,
      name: "Disable",
    },
    {
      _id: false,
      name: "Enable",
    },
  ];
  const isDisableFilter = [
    {
      _id: "0",
      name: "All",
    },
    {
      _id: false,
      name: "Active",
    },
    {
      _id: true,
      name: "Deleted",
    },
  ];

  const columns = {

    col: [
      { Header: "S.No", accessor: "no" },
      { Header: "Thumbnail", accessor: "thumbnail" },
      { Header: "Title", accessor: "title" },
      // { Header: "Price", accessor: "price" },
      { Header: "MRP", accessor: "mrp" },
      //   {
      //     Header: "featured/bestselling/trending",
      //     accessor: "featured/bestselling/trending",
      //   },
      { Header: "Category", accessor: "category" },
      // { Header: "Stock / Qty", accessor: "showStock/Qty" },
      // { Header: "Visibility", accessor: "visibility" },
      { Header: "delete", accessor: "delete" },

      { Header: "View", accessor: "view" },
      { Header: "Action", accessor: "action" },
    ],
    // },
  };

  const { category } = useSelector((data) => ({ ...data?.isCategory }));

  useEffect(() => {
    dispatch(
      getAllGlobalProducts(
        `${process.env.REACT_APP_API}productFilter?categoryId=${categoryId || ""}&name=${
          name || ""
        }&filter=${filter || ""}&price=${price || ""}&brandId=${brandId || ""}&productId=${
          productId || ""
        }&discount=${discount || ""}&stock=${stock || ""}&sold=${sold || ""}&rating=${rating || ""}
       `
      )
    );
  }, [
    isPages,
    isOpen,
    categoryId,
    name,
    filter,
    rating,
    sold,
    stock,
    price,
    discount,
    brandId,
    productId,
  ]);

  console.log(AllProducts, "AllProducts");
  useEffect(() => {
    setRowsData(
      AllProducts && AllProducts?.length
        ? AllProducts?.map((value, index) => ({
            no: (
              <MDTypography sx={{ fontSize: 12, fontWeight: "medium" }} variant="text">
                {index + 1}
              </MDTypography>
            ),
            thumbnail: (
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
                    src={`${process.env.REACT_APP_URI}/${value?.thumbnail}`}
                    alt={"img"}
                    onError={(e) => {
                      (e.onError = null),
                        (e.target.src = require("../../../assets/images/bg-profile.jpeg"));
                    }}
                    style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                  />
                </MDBox>
              </MDBox>
            ),
            title: (
              <MDBox
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 0.5,
                  flexDirection: "column",
                  // overflow: "hidden",
                  // textOverflow: "ellipsis",
                }}
              >
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
                  Name: {value?.name || "-"}
                </MDTypography>
                {/* <MDTypography
                    display="block"
                    variant="button"
                    fontWeight="medium"
                    ml={1}
                    lineHeight={1}
                    fontSize={10}
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
                    SubTitle: {value?.subtitle || "-"}
                  </MDTypography> */}
                <MDTypography
                  display="block"
                  variant="button"
                  fontWeight="medium"
                  ml={1}
                  lineHeight={1}
                  fontSize={10}
                >
                  ProductId: {value?._id || "-"}
                </MDTypography>
              </MDBox>
            ),
            price: (
              <MDTypography
                display="block"
                variant="button"
                fontWeight="medium"
                ml={1}
                lineHeight={1}
              >
                {/* {value?.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "INR",
                  }) || "-"} */}
              </MDTypography>
            ),
            mrp: (
              <MDTypography
                display="block"
                variant="button"
                fontWeight="medium"
                ml={1}
                lineHeight={1}
              >
                {/* {value?.mrp.toLocaleString("en-US", {
                  style: "currency",
                  currency: "INR",
                }) || "-"} */}
                {value?.mrp || "-"}₹
              </MDTypography>
            ),
            category: (
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
                {value?.categoryId?.name || "-"}
              </MDTypography>
            ),
            view: (
              <IconButton
                aria-label="action_edit"
                onClick={() => {
                  setViewProductModal(true);
                  setViewProductId(value);
                }}
              >
                <Visibility
                  sx={({ palette: { dark, white, info } }) => ({
                    color: darkMode ? info.main : dark.main,
                  })}
                />
              </IconButton>
            ),
            // visibility: (
            //   <Switch
            //     value={value?.disable}
            //     checked={value?.disable}
            //     color={"info"}
            //     onChange={(e) => {
            //       handleSwitchControl(value?._id);

            //       // dispatch(
            //       //       updateProducts({
            //       //         url:`${process.env.REACT_APP_APII}/disableProduct/${value?._id}/${admin}`,
            //       //       }))
            //       setIsSwitch(!isSwitch);
            //     }}
            //     inputProps={{ "aria-label": "controlled" }}
            //   />
            // ),

            delete: (
              // <Tooltip title={value?.disable ? "move to Active" : "delete"}>
              //   <IconButton
              //     aria-label="action_edit"
              //     // disabled={value?.disable}
              //     onClick={() => {
              //       binControl(value?._id);
              //       // setViewProductId(value);
              //     }}
              //   >
              //     {value?.disable ? (
              //       <Input
              //         sx={({ palette: { dark, white, info } }) => ({
              //           color: darkMode ? info.main : dark.main,
              //         })}
              //       />
              //     ) : (
              //       <Delete
              //         sx={({ palette: { dark, white, info } }) => ({
              //           color: darkMode ? info.main : dark.main,
              //         })}
              //       />
              //     )}
              //   </IconButton>
              // </Tooltip>

              <Tooltip title={value?.disable ? "move to Active" : "delete"}>
                <IconButton
                  aria-label="action_edit"
                  // disabled={value?.disable}
                  onClick={() => {
                    dispatch(
                      updateProducts({
                        url: `${process.env.REACT_APP_API}/disableProduct/${value?._id}/${admin}`,
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
                        dispatch(getAllGlobalProducts(`${process.env.REACT_APP_API}productFilter`));
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
              <IconButton
                aria-label="action_edit"
                onClick={() => {
                  setIsOpen(true);
                  setUpdateProductModal(true);
                  // console.log(value?._id);
                  dispatch(getSingleProduct(value));
                }}
              >
                <Edit
                  sx={({ palette: { dark, white, info } }) => ({
                    color: darkMode ? info.main : dark.main,
                  })}
                />
              </IconButton>
            ),
          }))
        : null
    );
  }, [AllProducts]);

  const handlePageChange = (event, value) => {
    // dispatch(handlePage(value));
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <MDBox
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 3,
          width: "100%",
        }}
      >
        <MDBox
          // px={3}
          sx={({ palette: { dark, white, info }, breakpoints }) => ({
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
            width: "100%",
            gap: 0.5,
            [breakpoints.up("xs")]: {
              flexDirection: "column",
            },
            [breakpoints.up("sm")]: {
              flexDirection: "column",
            },
            [breakpoints.up("md")]: {
              flexDirection: "column",
            },
            [breakpoints.up("lg")]: {
              flexDirection: "column",
            },
          })}
        >
          <MDBox
            sx={({ palette: { dark, white, info }, breakpoints }) => ({
              [breakpoints.up("xs")]: {
                flexDirection: "column",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 1.5,
                pl: 3,
              },
              [breakpoints.up("sm")]: {
                flexDirection: "column",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 1.5,
                pl: 3,
              },
              [breakpoints.up("md")]: {
                flexDirection: "column",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 1.5,
                pt: 4,
              },
              [breakpoints.up("lg")]: {
                flexDirection: "column",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 1.5,
                pt: 4,
              },
            })}
          >
            <MDTypography variant="button">Product Filter</MDTypography>

            <MDInput
              disabled={Loading}
              placeholder="Name, Include, Exclude, Id..."
              type="text"
              fullWidth
              name="sarch here"
              value={name}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={({ palette: { dark, white, info } }) => ({
                      backgroundColor: darkMode ? white.main : dark.main,
                      height: "100%",
                      padding: "1rem",
                      borderRadius: "5px",
                    })}
                  >
                    {filterCollapse ? (
                      <KeyboardArrowUpRounded
                        onClick={() => setFilterCollapse(false)}
                        size="20"
                        sx={({ palette: { dark, white, info } }) => ({
                          color: !darkMode ? white.main : dark.main,
                          cursor: "pointer",
                        })}
                      />
                    ) : (
                      <KeyboardArrowDownRounded
                        onClick={() => setFilterCollapse(true)}
                        size="20"
                        sx={({ palette: { dark, white, info } }) => ({
                          color: !darkMode ? white.main : dark.main,
                          cursor: "pointer",
                        })}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setName(e.target.value)}
            />
          </MDBox>
          <Collapse in={filterCollapse} timeout="auto" unmountOnExit sx={{ width: "100%", p: 3 }}>
            <MDBox
              sx={({ palette: { dark, white, info }, breakpoints }) => ({
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 0.5,
                width: "100%",
                [breakpoints.up("xs")]: {
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                },
                [breakpoints.up("sm")]: {
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                },
                [breakpoints.up("md")]: {
                  flexDirection: "row",
                  flexWrap: "wrap",
                },
                [breakpoints.up("lg")]: {
                  flexDirection: "row",
                  flexWrap: "wrap",
                },
              })}
            >
              <MDBox width="23%" display="flex" flexDirection="column">
                <MDTypography variant="button">Filter By Duration</MDTypography>
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
                  {dateFilter?.map((ele, i) => (
                    <MenuItem component="option" key={i} value={ele?._id}>
                      {ele?.name}
                    </MenuItem>
                  ))}
                </Select>
              </MDBox>
              <MDBox width="23%" display="flex" flexDirection="column">
                <MDTypography variant="button">Filter By Category</MDTypography>
                <Select
                  disabled={Loading}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={categoryId}
                  // onChange={(e) => {
                  //   setIsPages(1);
                  //   setCategoryId((prev) => ({
                  //     ...prev,
                  //     filter: { ...prev?.filter, categoryId: e.target.value },
                  //   }));
                  // }}

                  onChange={(e) => setCategoryId(e.target.value)}
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
                  <MenuItem value={0}>Choose Category</MenuItem>
                  {category?.map((ele, i) => (
                    <MenuItem key={i} value={ele?._id}>
                      {ele?.name}
                    </MenuItem>
                  ))}
                </Select>
              </MDBox>

              <MDBox width="23%" display="flex" flexDirection="column">
                <MDTypography variant="button">Filter By Rating</MDTypography>
                <Select
                  disabled={Loading}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  // onChange={(e) => {
                  //   setIsPages(1);
                  //   setcurrent((prev) => ({
                  //     ...prev,
                  //     filter: { ...prev?.filter, cityId: e.target.value },
                  //   }));
                  // }}
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
                  {/* <MenuItem value={0}>Choose ratting</MenuItem> */}
                  {sortByPrice?.map((ele, i) => (
                    <MenuItem key={i} value={ele?._id}>
                      {ele?.name}
                    </MenuItem>
                  ))}
                </Select>
              </MDBox>

              <MDBox width="23%" display="flex" flexDirection="column">
                <MDTypography variant="button">Sort By Price</MDTypography>
                <Select
                  disabled={Loading}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  // onChange={(e) => {
                  //   setIsPages(1);
                  //   setcurrent((prev) => ({
                  //     ...prev,
                  //     filter: { ...prev?.filter, price: e.target.value },
                  //   }));
                  // }}
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
                  {sortByPrice?.map((ele, i) => (
                    <MenuItem key={i} value={ele?._id}>
                      {ele?.name}
                    </MenuItem>
                  ))}
                </Select>
              </MDBox>
              <MDBox width="23%" display="flex" flexDirection="column">
                <MDTypography variant="button">Filter By Sold</MDTypography>
                <Select
                  disabled={Loading}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={sold}
                  onChange={(e) => setSold(e.target.value)}
                  // onChange={(e) => {
                  //   setIsPages(1);
                  //   setcurrent((prev) => ({
                  //     ...prev,
                  //     filter: { ...prev?.filter, cityId: e.target.value },
                  //   }));
                  // }}
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
                  {/* <MenuItem value={0}>Choose ratting</MenuItem> */}
                  {sortByPrice?.map((ele, i) => (
                    <MenuItem key={i} value={ele?._id}>
                      {ele?.name}
                    </MenuItem>
                  ))}
                </Select>
              </MDBox>
              <MDBox width="23%" display="flex" flexDirection="column">
                <MDTypography variant="button">Filter By Stock</MDTypography>
                <Select
                  disabled={Loading}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  // onChange={(e) => {
                  //   setIsPages(1);
                  //   setcurrent((prev) => ({
                  //     ...prev,
                  //     filter: { ...prev?.filter, cityId: e.target.value },
                  //   }));
                  // }}
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
                  {/* <MenuItem value={0}>Choose ratting</MenuItem> */}
                  {sortByPrice?.map((ele, i) => (
                    <MenuItem key={i} value={ele?._id}>
                      {ele?.name}
                    </MenuItem>
                  ))}
                </Select>
              </MDBox>
              <MDBox width="23%" display="flex" flexDirection="column">
                <MDTypography variant="button">Filter By Discount</MDTypography>
                <Select
                  disabled={Loading}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  // onChange={(e) => {
                  //   setIsPages(1);
                  //   setcurrent((prev) => ({
                  //     ...prev,
                  //     filter: { ...prev?.filter, cityId: e.target.value },
                  //   }));
                  // }}
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
                  {/* <MenuItem value={0}>Choose ratting</MenuItem> */}
                  {sortByPrice?.map((ele, i) => (
                    <MenuItem key={i} value={ele?._id}>
                      {ele?.name}
                    </MenuItem>
                  ))}
                </Select>
              </MDBox>

              <MDBox width="23%" display="flex" flexDirection="column">
                <MDTypography variant="button">Brand Id </MDTypography>

                <MDInput
                  disabled={Loading}
                  placeholder="Brand Id"
                  type="text"
                  fullWidth
                  name="brandId"
                  value={brandId}
                  onChange={(e) => setBrandId(e.target.value)}
                />
              </MDBox>
              <MDBox width="23%" display="flex" flexDirection="column">
                <MDTypography variant="button">Product Id </MDTypography>

                <MDInput
                  disabled={Loading}
                  placeholder="product Id"
                  type="text"
                  fullWidth
                  name="productId"
                  value={productId}
                  onChange={(e) => setproductId(e.target.value)}
                />
              </MDBox>
            </MDBox>
          </Collapse>
        </MDBox>
      </MDBox>

      {Loading ? (
        <SkLoading />
      ) : (
        <>
          {AllProducts && AllProducts.length > 0 ? (
            <DataTable
              table={{
                columns: columns?.col,
                rows: rowsData || [],
              }}
              isSorted={false}
              entriesPerPage={false}
              isPages={AllProducts && AllProducts.length}
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
          {/* {current?.pagination ? (
            <MDBox className="center" py={3}>
              {/* <Pagination
                    count={totalPage}
                    page={filterPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    color="primary"
                  /> */}
          {/* </MDBox>
          ) : null}  */}
        </>
      )}
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

BasicTabs.propTypes = {
  //   children: PropTypes.node,
  setUpdateProduct: PropTypes.any,
  setCreateProduct: PropTypes.any,
  setGetUrl: PropTypes.any,
  setCreateLens: PropTypes.any,
  unShow: PropTypes.any,
  setViewData: PropTypes.any,
  setViewContactModal: PropTypes.any,
  setViewProductModal: PropTypes.any,
  setIsSwitch: PropTypes.any,
  isOpen: PropTypes.any,
  setIsOpen: PropTypes.any,
  setProductId: PropTypes.any,
  setUpdateProductModal: PropTypes.any,
  isSwitch: PropTypes.any,
  setIsPages: PropTypes.any,
  setViewProductId: PropTypes.string,
  isPages: PropTypes.number,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
