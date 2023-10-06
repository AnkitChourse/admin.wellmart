import { Edit, Visibility, VisibilityOff } from "@mui/icons-material";
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
import { getAllProducts } from "redux/festures/productSlice";
import CreateForm from "./CreateForm";
import SingleProduct from "./SingleProduct";
import BasicTabs from "./Tabs";
import { useLocation } from "react-router-dom";
import { getSingleProduct } from "redux/festures/productSlice";

// const rowsData = [];
const Products = () => {
  const [controller] = useMaterialUIController();
  const { pathname } = useLocation()
  const { darkMode } = controller;
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const [rowsData, setRowsData] = useState([]);
  const [isPages, setIsPages] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  // const [isPages, setIsPages] = useState(1);
  const { AllProducts, Loading, page } = useSelector((state) => ({ ...state.isProducts }));

  const [createProduct, setCreateProduct] = useState(false);
  const [createLens, setCreateLens] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(false);
  const [viewProductModal, setViewProductModal] = useState(false);
  const [viewProductId, setViewProductId] = useState("");
  const [viewContactModal, setViewContactModal] = useState(false);
  const [updateProductModal, setUpdateProductModal] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [isSwitch, setIsSwitch] = useState(null);
  const [productId, setProductId] = useState(null);
  const [confirm, setConfirm] = useState({
    state: false,
    id: null,
    callback: null,
    body: null,
  });
  const [getUrl, setGetUrl] = useState("");


  useEffect(() => {
    if (!isOpen && !viewProductModal) dispatch(getSingleProduct(null));
  }, [isOpen, viewProductModal]);

  console.log(AllProducts, "allProducts   ");
  // console.log(page, "page  ");

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
                Products Table{" "}
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
                  setUpdateProductModal(false);
                }}
              >
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp; Create Product
              </MDButton>
            </MDBox>
            {/* {AllProducts && AllProducts?.length > 0 && ( */}
            <MDBox py={1}>
              <BasicTabs
                setUpdateProduct={setUpdateProduct}
                setCreateProduct={setCreateProduct}
                setGetUrl={setGetUrl}
                setCreateLens={setCreateLens}
                setViewData={setViewData}
                setViewContactModal={setViewContactModal}
                setViewProductModal={setViewProductModal}
                setViewProductId={setViewProductId}
                isPages={isPages}
                setIsPages={setIsPages}
                isSwitch={isSwitch}
                setIsSwitch={setIsSwitch}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setProductId={setProductId}
                setUpdateProductModal={setUpdateProductModal}
              />

              <MDBox
                sx={{
                  mt: 5,
                  // minHeigth: "100vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Stack spacing={2} direction={"row"}>
                  <MDTypography>Page: {isPages}</MDTypography>
                  <Pagination
                    sx={({ palette: { dark, white, info } }) => ({
                      "&.MuiPaginationItem-text": {
                        color: white.main,
                      },
                      "&	.MuiPaginationItem-icon": {
                        color: white.main,
                      },
                      "&		.MuiPaginationItem-textInfo": {
                        color: white.main,
                      },
                    })}
                    color="info"
                    variant="text"
                    count={page}
                    page={isPages}
                    onChange={(e, value) => setIsPages(value)}
                  />
                </Stack>
              </MDBox>
            </MDBox>
            {/* )} */}

            {/* <MDBox py={3}>
              {Loading ? (
                <SkLoading />
              ) : (
                AllProducts &&
                AllProducts.length > 0 && (
                  <DataTable
                    table={{
                      columns: pColumns,
                      rows: rowsData,
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
                )
              )}
             
            </MDBox> */}
          </Card>
        </MDBox>
        <Footer />
      </DashboardLayout>

      <CreateForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isSwitch={isSwitch}
        setIsSwitch={setIsSwitch}
        productId={productId}
        updateProductModal={updateProductModal}
        setUpdateProductModal={setUpdateProductModal}
        ecom={pathname === '/products/ecom-products' ? true : false}
      />

      <SkModal
        show={viewProductModal}
        unShow={setViewProductModal}
        width={{ sx: "100%", md: "55%", xl: "55%", sm: "100%" }}
        height={"90vh"}
        padding={3}
        overflowY={true}
      >
        <SingleProduct single={viewProductId}  />
      </SkModal>
    </>
  );
};

export default Products;
