import PropTypes from "prop-types";
import { Cancel, Close, ConstructionRounded, PhotoCamera, TramOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Select,
  Stack,
  Switch,
} from "@mui/material";
import ApnaSelect2 from "components/ApnaSelect";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import SkModal from "components/SkModal";
import React, { useEffect } from "react";
import { useRef } from "react";
import SkInput from "components/SkInput";
import { useState } from "react";
import ImagePicker from "components/ApnaUploader";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "redux/festures/categorySlice";
import { getBrands } from "redux/festures/brandSlice";
import { getAttribute } from "redux/festures/AttributeSlice";
import ApnaSelect from "components/ApnaSelect/ApnaSelect";
import SkAutocomplete from "components/ApnaSelect/SkAutocomplete";
import MultiValueInput from "components/SkInputs";
import { createProducts } from "redux/festures/productSlice";
import FileUploader from "components/ApnaUploader/pdfUploader";
import { createProduct } from "redux/festures/productSlice";
import AttributeInput from "components/ApnaSelect/Attribute";
import { handleAlert } from "redux/festures/alertSlice";
// import http from "Utils/api";
import { useMaterialUIController } from "context";
import { updateProduct } from "redux/festures/productSlice";
import http from "Utils/api2";
import { updateProductPic } from "redux/festures/productSlice";
import { getSingleProduct } from "redux/festures/productSlice";
import SkLoading from "components/SkLoading";
import { getAllGlobalProducts } from "redux/festures/productSlice";
import { EditorState, convertToRaw, convertFromHTML } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import Skeditor from "components/SKeditor";
import { getAllCity } from "redux/festures/citySlice";
import SkDatePicker from "components/SkDataPicker";
import MultiInput from "components/MultiInput";
import { getSubGlobalCategory } from "redux/festures/categorySlice";
import CircularProgress from "@mui/material/CircularProgress";
import AstrieskIcon from "components/AstrieskIcon";

const CreateForm = ({
  isOpen,
  setIsOpen,
  isSwitch,
  setIsSwitch,
  productId,
  updateProductModal,
  setUpdateProductModal,
  ecom,
}) => {
  const picInput = useRef(null);
  const dispatch = useDispatch();
  const admin = localStorage.getItem("admin_id");
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const { AllProducts, singleProduct, Loading, createUpdateLoading } = useSelector((state) => ({
    ...state.isProducts,
  }));

  const { city } = useSelector((state) => state.isCity);
  const { category, subCategory } = useSelector((state) => ({ ...state.isCategory }));

  // console.log("singleProduct", singleProduct);

  const [isThumbnil, setIsThumbnil] = useState("");
  const [serverThumbnail, setServerThumbnail] = useState("");
  const [isImages, setIsImages] = useState(null);
  const [serverImages, setServerImages] = useState(null);
  const [additionalImages, setAdditionalImages] = useState(null);
  const [serverAdditionalImages, setServerAdditionalImages] = useState(null);
  // const [additionalVideos, setAdditionalVideos] = useState(null)
  // const [serverAdditionalVideos, setServerAdditionalVideos] = useState(null)
  // const [isVideo, setIsVideo] = useState(null);
  // const [serverVideo, setServerVideo] = useState(null)
  const [allBrands, setAllBrands] = useState([]);
  const [allTax, setAllTax] = useState([]);
  const [isProductDescriptionServer, setIsProductDescriptionServer] = useState("");
  const [isProductDescription, setIsProductDescription] = useState(EditorState.createEmpty());

  const [isData, setIsData] = useState({
    name: "",
    price: "",
    include: [""],
    exclude: [""],
    warranty: new Date(),
    categoryId: "",
    pcategoryId: "",
    mrp: "",
    time: "1",
    cityId: "",
    taxId: "",
    subtitle: "",
  });

  const types = {
    service: {
      title: "",
      price: "",
      include: [""],
      exclude: [""],
      warranty: new Date(),
      categoryId: "",
      pcategoryId: "",
      mrp: "",
      time: "1",
      cityId: "",
      taxId: "",
      subtitle: "",
    },
    serviceServer: {
      title: singleProduct?.title || "",
      price: singleProduct?.price || "",
      include: singleProduct?.include || [""],
      exclude: singleProduct?.exclude || [""],
      warranty: new Date(singleProduct?.warranty) || new Date(),
      categoryId: singleProduct?.categoryId?._id || "",
      pcategoryId: singleProduct?.categoryId?.pCategory || "",
      mrp: singleProduct?.mrp || "",
      time: singleProduct?.time || "1",
      cityId: singleProduct?.cityId?._id || "",
      taxId: singleProduct?.taxId?._id || "",
      subtitle: singleProduct?.subtitle || "",
    },
    ecomm: {
      title: "",
      price: "",
      features: [""],
      warranty: new Date(),
      categoryId: "",
      pcategoryId: "",
      mrp: "",
      time: "1",
      cityId: "",
      taxId: "",
      subtitle: "",
      stock: "",
      brandId: "",
    },
    ecommServer: {
      title: singleProduct?.title || "",
      price: singleProduct?.price || "",
      features: singleProduct?.features || [""],
      warranty: new Date(singleProduct?.warranty) || new Date(),
      categoryId: singleProduct?.categoryId?._id || "",
      pcategoryId: singleProduct?.categoryId?.pCategory || "",
      mrp: singleProduct?.mrp || "",
      time: singleProduct?.time || "1",
      cityId: singleProduct?.cityId?._id || "",
      taxId: singleProduct?.taxId?._id || "",
      subtitle: singleProduct?.subtitle || "",
      stock: singleProduct?.stock || "",
      brandId: singleProduct?.brandId?._id || "",
    },
  };

  useEffect(() => {
    if (isData?.pcategoryId)
      dispatch(
        getSubGlobalCategory(
          ecom
            ? `/eCommerce/getCategoryWithPcategory/${isData?.pcategoryId}/${admin}`
            : `/getCategoryWithPcategory/${isData?.pcategoryId}/${admin}`
        )
      );
  }, [isData?.pcategoryId]);

  useEffect(() => {
    if (isOpen) {
      if (ecom) {
        http
          .get(`/getAllBrandByAdmin/${admin}`)
          .then((response) => {
            setAllBrands(response?.data?.data || []);
          })
          .catch((error) => {
            dispatch(
              handleAlert({
                isOpen: true,
                type: "error",
                msg: error?.response?.data?.message,
              })
            );
          });
      } else dispatch(getAllCity(`/getAllCityByAdmin/${admin}`));

      http
        .get(`/getAllTax/${admin}`)
        .then((response) => {
          const tax =
            response?.data?.data && response?.data?.data?.length
              ? [...response?.data?.data]?.map((ele) => {
                  const temp = { ...ele };
                  temp.taxPercent = `${temp.taxPercent} %`;
                  return temp;
                })
              : [];
          setAllTax(tax);
        })
        .catch((error) => {
          dispatch(
            handleAlert({
              isOpen: true,
              type: "error",
              msg: error?.response?.data?.message,
            })
          );
        });
      dispatch(
        getCategory(
          ecom ? `/eCommerce/getAllNullPcategory/${admin}` : `/getAllNullPcategory/${admin}`
        )
      );
    }
  }, [isOpen, ecom]);

  const handleSwitchControll = (event, state, setState) => {
    setState(event.target.state);
  };

  useEffect(() => {
    if (isOpen && singleProduct) {
      if (ecom) setIsData(types?.ecommServer);
      else setIsData(types?.serviceServer);

      setServerThumbnail(singleProduct?.thumnail);
      const tempImages = [];
      const tempVideos = [];

      const tempImages2 = [];
      const tempVideos2 = [];

      if (singleProduct?.images && singleProduct?.images?.length)
        singleProduct?.images?.map((ele) =>
          ele?.type === "IMAGE" ? tempImages?.push(ele) : tempVideos.push(ele)
        );

      if (singleProduct?.additional && singleProduct?.additional?.length)
        singleProduct?.additional?.map((ele) =>
          ele?.type === "IMAGE" ? tempImages2?.push(ele) : tempVideos2.push(ele)
        );

      setServerImages(tempImages && tempImages?.length ? tempImages : null);
      // setServerVideo(tempVideos && tempVideos?.length ? tempVideos : null)
      setServerAdditionalImages(tempImages2 && tempImages2?.length ? tempImages2 : null);
      // setServerAdditionalVideos(tempVideos2 && tempVideos2?.length ? tempVideos2 : null)
      setIsProductDescriptionServer(singleProduct?.description || "");
    } else {
      if (ecom) setIsData(types?.ecomm);
      else setIsData(types?.service);

      setServerImages(null);
      setServerAdditionalImages(null);
      setServerThumbnail(null);
      setIsImages(null);
      setAdditionalImages(null);
      setIsThumbnil("");
      setIsProductDescriptionServer("");
      setIsProductDescription(EditorState.createEmpty());
    }
  }, [singleProduct, isOpen, ecom]);

  // console.log(isData?.tags, "isData?.tags");
  const handleSubmitCrateProduct = (e) => {
    e.preventDefault();
    const convertContentToHTML = () => {
      const contentState = isProductDescription?.getCurrentContent();
      const html = stateToHTML(contentState);
      return html;
    };
    // console.log(isThumbnil, "isThumbnil ");
    // console.log(isData?.thumbnail, "isData?.thumbnail ");
    // console.log(isImages, "isImages ");
    // console.log(isData?.images, "isData?.images ");
    // console.log(isMetaImages, "isMetaImages ");
    // console.log(isData?.metaImage, "isData?.metaImage ");
    // console.log(
    //   ((isThumbnil && isThumbnil?.length > 0) ||
    //     (isData?.thumbnail && isData?.thumbnail?.length > 0)) &&
    //     ((isImages && isImages?.length > 0) || (isData?.images && isData?.images?.length > 0)) &&
    //     ((isMetaImages && isMetaImages?.length > 0) ||
    //       (isData?.metaImage && isData?.metaImage?.length > 0)),
    //   "condition "
    // );
    // if (
    //   ((isThumbnil && isThumbnil !== "") || (isData?.thumbnail && isData?.thumbnail !== "")) &&
    //   ((isImages) || (isData?.images && isData?.images !== ""))
    // ) {
    if (singleProduct) {
      if (ecom) {
        const formdata = new FormData();
        if (isImages && isImages?.length)
          isImages.map((images) => formdata.append("images", images));
        if (additionalImages && additionalImages?.length)
          additionalImages.map((images) => formdata.append("additional", images));
        if (isThumbnil) formdata.append("thumnail", isThumbnil);

        Object.keys(isData)?.map((ele) =>
          ele === "features"
            ? isData[ele]?.map((e) => formdata.append("features", e))
            : formdata.append(ele, isData[ele])
        );
        formdata.append("description", convertContentToHTML());

        // formdata.append("metaImage", isMetaImages);
        // formdata.append("thumbnail", isThumbnil);
        // formdata.append("name", isData?.name);
        // formdata.append("category", isData?.category);
        // formdata.append("brand", isData?.brand);
        // formdata.append("unit", isData?.unit);
        // formdata.append("weight", isData?.weight);
        // // formdata.append("thumbnail", isThumbnil);
        // isData?.variant && formdata.append("variant", isData?.variant);
        // formdata.append("unitPrice", isData?.unitPrice);
        // formdata.append("quantity", isData?.quantity);
        // formdata.append("gst", isData?.gst);
        // formdata.append("trending", isData?.trending);
        // formdata.append("tags", isData?.tags);
        // isData?.whoseVariant && formdata.append("whoseVariant", isData?.whoseVariant);
        // // formdata.append("attributes", isAttribute);
        // formdata.append("minimumQuantity", isData?.minimumQuantity);
        // formdata.append("refundable", isData?.refundable);
        // formdata.append("videoProvider", isData?.videoProvider);
        // formdata.append("videoLink", isData?.videoLink);
        // formdata.append("pdfSpecification", isData?.pdfSpecification);
        // formdata.append("discount", isData?.discount);
        // formdata.append("featured", isData?.featured);
        // formdata.append("bestselling", isData?.bestselling);
        // formdata.append("cod", isData?.cod);
        // formdata.append("shippingDays", isData?.shippingDays);
        // formdata.append("showStock", isData?.showStock);
        // formdata.append("hideStock", isData?.hideStock);
        // formdata.append("metaTitle", isData?.metaTitle);
        // formdata.append("metaDiscripition", isData?.metaDescription);
        // formdata.append("metaImage", isMetaImages);
        dispatch(
          // createProducts({ url: `${process.env.REACT_APP_API}/createProduct/${admin}`, data: formdata })
          updateProduct({
            url: `${process.env.REACT_APP_APII}/eCommerce/updateProduct/${singleProduct?._id}/${admin}`,
            data: formdata,
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
              getAllGlobalProducts(
                `/eCommerce/filterProductByDate/${admin}?categoryId&price&taxId&disable&page=1&search`
              )
            ).then(() => {
              setIsOpen(false);
              setIsSwitch(!isSwitch);
              setIsOpen(false);
              setUpdateProductModal(false);
            });
          }
        });
      } else {
        const formdata = new FormData();
        if (isImages && isImages?.length)
          isImages.map((images) => formdata.append("images", images));
        if (additionalImages && additionalImages?.length)
          additionalImages.map((images) => formdata.append("additional", images));
        if (isThumbnil) formdata.append("thumnail", isThumbnil);

        Object.keys(isData)?.map((ele) =>
          ele === "include" || ele === "exclude"
            ? isData[ele]?.map((e) => formdata.append(ele, e))
            : formdata.append(ele, isData[ele])
        );
        formdata.append("description", convertContentToHTML());

        // formdata.append("metaImage", isMetaImages);
        // formdata.append("thumbnail", isThumbnil);
        // formdata.append("name", isData?.name);
        // formdata.append("category", isData?.category);
        // formdata.append("brand", isData?.brand);
        // formdata.append("unit", isData?.unit);
        // formdata.append("weight", isData?.weight);
        // // formdata.append("thumbnail", isThumbnil);
        // isData?.variant && formdata.append("variant", isData?.variant);
        // formdata.append("unitPrice", isData?.unitPrice);
        // formdata.append("quantity", isData?.quantity);
        // formdata.append("gst", isData?.gst);
        // formdata.append("trending", isData?.trending);
        // formdata.append("tags", isData?.tags);
        // isData?.whoseVariant && formdata.append("whoseVariant", isData?.whoseVariant);
        // // formdata.append("attributes", isAttribute);
        // formdata.append("minimumQuantity", isData?.minimumQuantity);
        // formdata.append("refundable", isData?.refundable);
        // formdata.append("videoProvider", isData?.videoProvider);
        // formdata.append("videoLink", isData?.videoLink);
        // formdata.append("pdfSpecification", isData?.pdfSpecification);
        // formdata.append("discount", isData?.discount);
        // formdata.append("featured", isData?.featured);
        // formdata.append("bestselling", isData?.bestselling);
        // formdata.append("cod", isData?.cod);
        // formdata.append("shippingDays", isData?.shippingDays);
        // formdata.append("showStock", isData?.showStock);
        // formdata.append("hideStock", isData?.hideStock);
        // formdata.append("metaTitle", isData?.metaTitle);
        // formdata.append("metaDiscripition", isData?.metaDescription);
        // formdata.append("metaImage", isMetaImages);
        dispatch(
          // createProducts({ url: `${process.env.REACT_APP_API}/createProduct/${admin}`, data: formdata })
          updateProduct({
            url: `${process.env.REACT_APP_APII}/updateProduct/${singleProduct?._id}/${admin}`,
            data: formdata,
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
              getAllGlobalProducts(
                `/filterProductByDate/${admin}?categoryId&cityId&price&taxId&disable&productId&search&page=1`
              )
            ).then(() => {
              setIsOpen(false);
              setIsSwitch(!isSwitch);
              setIsOpen(false);
              setUpdateProductModal(false);
            });
          }
        });
      }
    } else {
      if (ecom) {
        const formdata = new FormData();
        if (isImages && isImages?.length)
          isImages.map((images) => formdata.append("images", images));
        if (additionalImages && additionalImages?.length)
          additionalImages.map((images) => formdata.append("additional", images));
        if (isThumbnil) formdata.append("thumnail", isThumbnil);

        Object.keys(isData)?.map((ele) =>
          ele === "features"
            ? isData[ele]?.map((e) => formdata.append("features", e))
            : formdata.append(ele, isData[ele])
        );
        formdata.append("description", convertContentToHTML());

        // formdata.append("metaImage", isMetaImages);
        // formdata.append("thumbnail", isThumbnil);
        // formdata.append("name", isData?.name);
        // formdata.append("category", isData?.category);
        // formdata.append("brand", isData?.brand);
        // formdata.append("unit", isData?.unit);
        // formdata.append("weight", isData?.weight);
        // // formdata.append("thumbnail", isThumbnil);
        // isData?.variant && formdata.append("variant", isData?.variant);
        // formdata.append("unitPrice", isData?.unitPrice);
        // formdata.append("quantity", isData?.quantity);
        // formdata.append("gst", isData?.gst);
        // formdata.append("trending", isData?.trending);
        // formdata.append("tags", isData?.tags);
        // isData?.whoseVariant && formdata.append("whoseVariant", isData?.whoseVariant);
        // // formdata.append("attributes", isAttribute);
        // formdata.append("minimumQuantity", isData?.minimumQuantity);
        // formdata.append("refundable", isData?.refundable);
        // formdata.append("videoProvider", isData?.videoProvider);
        // formdata.append("videoLink", isData?.videoLink);
        // formdata.append("pdfSpecification", isData?.pdfSpecification);
        // formdata.append("discount", isData?.discount);
        // formdata.append("featured", isData?.featured);
        // formdata.append("bestselling", isData?.bestselling);
        // formdata.append("cod", isData?.cod);
        // formdata.append("shippingDays", isData?.shippingDays);
        // formdata.append("showStock", isData?.showStock);
        // formdata.append("hideStock", isData?.hideStock);
        // formdata.append("metaTitle", isData?.metaTitle);
        // formdata.append("metaDiscripition", isData?.metaDescription);
        // formdata.append("metaImage", isMetaImages);
        dispatch(
          // createProducts({ url: `${process.env.REACT_APP_API}/createProduct/${admin}`, data: formdata })
          createProducts({
            url: `${process.env.REACT_APP_APII}/eCommerce/createProduct/${admin}`,
            data: formdata,
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
              getAllGlobalProducts(
                `/eCommerce/filterProductByDate/${admin}?categoryId&price&taxId&disable&page=1&search`
              )
            ).then(() => {
              setIsOpen(false);
              setIsSwitch(!isSwitch);
              setIsOpen(false);
              setUpdateProductModal(false);
            });
          }
        });
      } else {
        const formdata = new FormData();
        if (isImages && isImages?.length)
          isImages.map((images) => formdata.append("images", images));
        if (additionalImages && additionalImages?.length)
          additionalImages.map((images) => formdata.append("additional", images));
        if (isThumbnil) formdata.append("thumnail", isThumbnil);

        Object.keys(isData)?.map((ele) =>
          ele === "include" || ele === "exclude"
            ? isData[ele]?.map((e) => formdata.append(ele, e))
            : formdata.append(ele, isData[ele])
        );
        formdata.append("description", convertContentToHTML());

        // formdata.append("metaImage", isMetaImages);
        // formdata.append("thumbnail", isThumbnil);
        // formdata.append("name", isData?.name);
        // formdata.append("category", isData?.category);
        // formdata.append("brand", isData?.brand);
        // formdata.append("unit", isData?.unit);
        // formdata.append("weight", isData?.weight);
        // // formdata.append("thumbnail", isThumbnil);
        // isData?.variant && formdata.append("variant", isData?.variant);
        // formdata.append("unitPrice", isData?.unitPrice);
        // formdata.append("quantity", isData?.quantity);
        // formdata.append("gst", isData?.gst);
        // formdata.append("trending", isData?.trending);
        // formdata.append("tags", isData?.tags);
        // isData?.whoseVariant && formdata.append("whoseVariant", isData?.whoseVariant);
        // // formdata.append("attributes", isAttribute);
        // formdata.append("minimumQuantity", isData?.minimumQuantity);
        // formdata.append("refundable", isData?.refundable);
        // formdata.append("videoProvider", isData?.videoProvider);
        // formdata.append("videoLink", isData?.videoLink);
        // formdata.append("pdfSpecification", isData?.pdfSpecification);
        // formdata.append("discount", isData?.discount);
        // formdata.append("featured", isData?.featured);
        // formdata.append("bestselling", isData?.bestselling);
        // formdata.append("cod", isData?.cod);
        // formdata.append("shippingDays", isData?.shippingDays);
        // formdata.append("showStock", isData?.showStock);
        // formdata.append("hideStock", isData?.hideStock);
        // formdata.append("metaTitle", isData?.metaTitle);
        // formdata.append("metaDiscripition", isData?.metaDescription);
        // formdata.append("metaImage", isMetaImages);
        dispatch(
          // createProducts({ url: `${process.env.REACT_APP_API}/createProduct/${admin}`, data: formdata })
          createProducts({
            url: `${process.env.REACT_APP_APII}/createProduct/${admin}`,
            data: formdata,
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
              getAllGlobalProducts(
                `/filterProductByDate/${admin}?categoryId&cityId&price&taxId&disable&productId&search&page=1`
              )
            ).then(() => {
              setIsOpen(false);
              setIsSwitch(!isSwitch);
              setIsOpen(false);
              setUpdateProductModal(false);
            });
          }
        });
      }
    }
    // } else {
    //   dispatch(
    //     handleAlert({
    //       isOpen: true,
    //       type: "warning",
    //       msg: "all filed is required",
    //     })
    //   );
    // }
    // console.log(isData, "isData");
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    if (name === "price" || name === "mrp" || name === "time" || name === "stock") {
      setIsData((prev) => ({
        ...prev,
        [name]: isNaN(parseInt(value[value.length - 1]))
          ? value.length === 1
            ? ""
            : value.slice(0, value.length - 1)
          : value,
      }));
    } else
      setIsData((prev) => ({
        ...prev,
        [name]: value,
      }));

    if (
      name !== "price" &&
      name !== "mrp" &&
      isData?.price !== "" &&
      isData?.mrp !== "" &&
      isData?.price > isData?.mrp
    ) {
      dispatch(
        handleAlert({
          isOpen: true,
          type: "warning",
          msg: "Price should be less than or equal to MRP",
        })
      );
      setIsData((prev) => ({
        ...prev,
        price: isData?.mrp,
      }));
    }
  };

  return (
    <>
      <SkModal
        show={isOpen}
        unShow={setIsOpen}
        width={{ sx: "100%", md: "70%", xl: "70%", sm: "100%" }}
        height={"90vh"}
        padding={3}
        overflowY={true}
      >
        <MDBox
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 2,
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Card
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 , 10px",
            }}
          >
            <MDTypography variant="h6" py={0.9}>
              {singleProduct ? `Update Product` : "Create Product"}
            </MDTypography>
          </Card>
          {Loading ? (
            <SkLoading />
          ) : (
            <MDBox
              display="flex"
              alignItems="center"
              lineHeight={1}
              sx={({ palette: { dark, white, info } }) => ({
                justifyContent: "center",
                textAlign: "center",
                flexDirection: "column",
                gap: 3,
                width: "100%",
                flexWrap: "wrap",
                border: 1,
                borderColor: darkMode ? white.main : dark.main,
                borderRadius: 3,
                py: 3,
              })}
              component="form"
              role="form"
              onSubmit={handleSubmitCrateProduct}
            >
              <MDBox
                lineHeight={1}
                gap={3}
                width={"90%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDTypography variant="h6">
                  Product Title <AstrieskIcon />
                </MDTypography>
                <MDInput
                  disabled={createUpdateLoading}
                  required={true}
                  type="text"
                  placeholder="Product Title"
                  fullWidth
                  name="title"
                  value={isData?.title}
                  onChange={handleForm}
                />
              </MDBox>
              <MDBox
                lineHeight={1}
                gap={3}
                width={"90%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDTypography variant="h6">
                  Product Subtitle <AstrieskIcon />
                </MDTypography>
                <MDInput
                  disabled={createUpdateLoading}
                  required={true}
                  type="text"
                  placeholder="Product Subtitle"
                  fullWidth
                  name="subtitle"
                  value={isData?.subtitle}
                  onChange={handleForm}
                />
              </MDBox>
              <MDBox
                lineHeight={1}
                gap={3}
                width={"90%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDTypography variant="h6">
                  Product Description <AstrieskIcon />
                </MDTypography>
                {/* <MDInput
                  required={true}
                  type="text"
                  placeholder="Product Description"
                  fullWidth
                  name="description"
                  value={isData?.description}
                  onChange={handleForm}
                  multiline
                  rows={5}
                /> */}
                <Skeditor
                  required={true}
                  disabled={createUpdateLoading}
                  editorState={isProductDescription}
                  setEditorState={setIsProductDescription}
                  placeholder={"Product Description"}
                  initialContent={isOpen && singleProduct ? isProductDescriptionServer : ""}
                  isButton={true}
                  // content={"Blog Content"}
                />
              </MDBox>
              <MDBox
                display={"flex"}
                alignItems="center"
                justifyContent="space-between"
                lineHeight={1}
                gap={3}
                width={"90%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDBox
                  lineHeight={1}
                  gap={3}
                  width={"100%"}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <MDTypography variant="h6">
                    Product Price <AstrieskIcon />
                  </MDTypography>
                  <MDInput
                    disabled={createUpdateLoading}
                    required={true}
                    type="text"
                    placeholder="Price"
                    fullWidth
                    name="price"
                    value={isData?.price}
                    onChange={handleForm}
                  />
                </MDBox>
                <MDBox
                  lineHeight={1}
                  gap={3}
                  width={"100%"}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <MDTypography variant="h6">
                    Product MRP <AstrieskIcon />
                  </MDTypography>
                  <MDInput
                    disabled={createUpdateLoading}
                    required={true}
                    type="text"
                    placeholder="MRP"
                    fullWidth
                    name="mrp"
                    value={isData?.mrp}
                    onChange={handleForm}
                  />
                </MDBox>
                {!ecom ? (
                  <MDBox
                    lineHeight={1}
                    gap={3}
                    width={"100%"}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: "column",
                    }}
                  >
                    <MDTypography variant="h6">
                      Service Implementation Time <AstrieskIcon />
                    </MDTypography>
                    <MDInput
                      disabled={createUpdateLoading}
                      required={true}
                      type="text"
                      placeholder="Time In Minutes"
                      fullWidth
                      name="time"
                      value={isData?.time}
                      onChange={handleForm}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            sx={({ palette: { dark, error, info, white } }) => ({
                              "& .MuiTypography-root": {
                                color: !darkMode ? dark.main : white.main, // Customize the text color
                              },
                            })}
                          >
                            Minutes
                          </InputAdornment>
                        ),
                      }}
                    />
                  </MDBox>
                ) : null}
                <MDBox
                  lineHeight={1}
                  gap={3}
                  width={"100%"}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <MDTypography variant="h6">
                    Product Warranty <AstrieskIcon />
                  </MDTypography>
                  <SkDatePicker
                    onChange={(date) => handleForm({
                      target: {
                        name: 'warranty',
                        value: date
                      }
                    })}
                    initialDate={isData?.warranty}
                    required={true}
                    placeholder="Warranty Date"
                    // fullWidth
                    disabled={createUpdateLoading}
                    minDate={new Date()}
                  />

                  {/* <SkDatePicker
                    onChange={(date) => {
                      const currentDate = new Date();

                      if (date > currentDate) {
                        // Display an error message or take appropriate action
                        console.error("Warranty date cannot be later than the current date.");
                      } else {
                        // Allow setting the warranty date
                        handleForm({
                          target: {
                            name: "warranty",
                            value: date,
                          },
                        });
                      }
                    }}
                    initialDate={isData?.warranty}
                    required={true}
                    placeholder="Warranty Date"
                    disabled={createUpdateLoading}
                  /> */}
                </MDBox>
                {ecom ? (
                  <MDBox
                    lineHeight={1}
                    gap={3}
                    width={"100%"}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: "column",
                    }}
                  >
                    <MDTypography variant="h6">
                      Product Stock <AstrieskIcon />
                    </MDTypography>
                    <MDInput
                      disabled={createUpdateLoading}
                      required={true}
                      type="text"
                      placeholder="Stock"
                      fullWidth
                      name="stock"
                      value={isData?.stock}
                      onChange={handleForm}
                    />
                  </MDBox>
                ) : null}
                {!ecom ? (
                  <>
                    <MDBox
                      lineHeight={1}
                      gap={3}
                      width={"100%"}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      <MDTypography variant="h6">
                        Include <AstrieskIcon />
                      </MDTypography>
                      <MultiInput
                        state={isData?.include}
                        setState={(e) => handleForm({ target: { name: "include", value: e } })}
                        addButtonText="Add New Include"
                        addButtonHandler={(e) =>
                          handleForm({ target: { name: "include", value: e } })
                        }
                        removeButtonHandler={(e) =>
                          handleForm({ target: { name: "include", value: e } })
                        }
                        previousFilledValidate={true}
                        required={true}
                        disabled={createUpdateLoading}
                      />
                    </MDBox>
                    <MDBox
                      lineHeight={1}
                      gap={3}
                      width={"100%"}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      <MDTypography variant="h6">
                        Exclude <AstrieskIcon />
                      </MDTypography>
                      <MultiInput
                        state={isData?.exclude}
                        setState={(e) => handleForm({ target: { name: "exclude", value: e } })}
                        addButtonText="Add New Exclude"
                        addButtonHandler={(e) =>
                          handleForm({ target: { name: "exclude", value: e } })
                        }
                        removeButtonHandler={(e) =>
                          handleForm({ target: { name: "exclude", value: e } })
                        }
                        previousFilledValidate={true}
                        required={true}
                        disabled={createUpdateLoading}
                      />
                    </MDBox>
                  </>
                ) : (
                  <MDBox
                    lineHeight={1}
                    gap={3}
                    width={"100%"}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: "column",
                    }}
                  >
                    <MDTypography variant="h6">
                      Features <AstrieskIcon />
                    </MDTypography>
                    <MultiInput
                      state={isData?.features}
                      setState={(e) => handleForm({ target: { name: "features", value: e } })}
                      addButtonText="Add New Feature"
                      addButtonHandler={(e) =>
                        handleForm({ target: { name: "features", value: e } })
                      }
                      removeButtonHandler={(e) =>
                        handleForm({ target: { name: "features", value: e } })
                      }
                      previousFilledValidate={true}
                      required={true}
                      disabled={createUpdateLoading}
                    />
                  </MDBox>
                )}
              </MDBox>

              <MDBox
                lineHeight={1}
                gap={3}
                width={"90%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDTypography variant="h6">
                  Select Parent Category&apos;s <AstrieskIcon />
                </MDTypography>
                <ApnaSelect2
                  required={true}
                  data={category}
                  value={isData?.pcategoryId}
                  origin="Category"
                  onChange={handleForm}
                  name="pcategoryId"
                  nameKey="name"
                  valueKey="_id"
                  simpleArray={false}
                />
              </MDBox>
              <MDBox
                lineHeight={1}
                gap={3}
                width={"90%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDTypography variant="h6">
                  Select Sub Category&apos;s <AstrieskIcon />
                </MDTypography>
                <ApnaSelect2
                  required={true}
                  data={subCategory}
                  value={isData?.categoryId}
                  origin="Sub Category"
                  onChange={handleForm}
                  name="categoryId"
                  valueKey="_id"
                  nameKey="name"
                  simpleArray={false}
                />
              </MDBox>
              <MDBox
                lineHeight={1}
                gap={3}
                width={"90%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDTypography variant="h6">
                  Select Tax Slab <AstrieskIcon />
                </MDTypography>
                <ApnaSelect2
                  data={allTax}
                  required={true}
                  value={isData?.taxId}
                  origin="Tax Slab"
                  onChange={handleForm}
                  name="taxId"
                  nameKey={"taxPercent"}
                  valueKey={"_id"}
                  isSimpleArray={false}
                />
              </MDBox>
              {ecom ? (
                <MDBox
                  lineHeight={1}
                  gap={3}
                  width={"90%"}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <MDTypography variant="h6">
                    Select Brand <AstrieskIcon />
                  </MDTypography>
                  <ApnaSelect2
                    data={allBrands}
                    required={true}
                    value={isData?.brandId}
                    origin="Brand"
                    onChange={handleForm}
                    name="brandId"
                    nameKey={"name"}
                    valueKey={"_id"}
                    isSimpleArray={false}
                  />
                </MDBox>
              ) : // <MDBox
              //   lineHeight={1}
              //   gap={3}
              //   width={"90%"}
              //   sx={{
              //     display: "flex",
              //     alignItems: "flex-start",
              //     flexDirection: "column",
              //   }}
              // >
              //   <MDTypography variant="h6">Select City <AstrieskIcon /></MDTypography>
              //   <ApnaSelect2
              //     disabled={createUpdateLoading}
              //     data={city}
              //     required={true}
              //     value={isData?.cityId}
              //     origin="City"
              //     onChange={
              //       handleForm
              //     }
              //     name="cityId"
              //     nameKey={'cityName'}
              //     valueKey={'_id'}
              //     isSimpleArray={false}
              //   />
              // </MDBox>
              null}
              <MDBox
                display="flex"
                flexDirection="column"
                alignItems="center"
                lineHeight={1}
                gap={1}
                width={"90%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDTypography variant="h6">
                  Product Thumbnail Image <AstrieskIcon />
                  <MDTypography variant="body1" component="span" fontSize={11}>
                    &nbsp; ( image size - 546 × 400 px )
                  </MDTypography>
                </MDTypography>
                <ImagePicker
                  required={!singleProduct}
                  disabled={createUpdateLoading}
                  // required={true}
                  name="thumbnail"
                  multiple={false}
                  images={isThumbnil}
                  setImages={setIsThumbnil}
                  // isImageURLs={isData?.thumbnail}
                />
                {/* {console.log(isData?.thumbnail, "isThumbnil")} */}

                {isThumbnil === "" && serverThumbnail ? (
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <span
                      style={{
                        display: "inline-block",
                        width: "50px",
                        height: "50px",
                        margin: "0 0.5rem",
                      }}
                    >
                      <img
                        className="Image"
                        style={{ width: "100%", height: "100%" }}
                        src={`${process.env.REACT_APP_URI}/${serverThumbnail}`}
                      />
                    </span>
                    {/* <span
                      className="cross"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setIsData((prev) => ({
                          ...prev,
                          thumbnail: null,
                        }));
                      }}
                    >
                      <Cancel
                        sx={({ palette: { dark, white, info } }) => ({
                          color: darkMode ? white?.main : dark.main,
                        })}
                      />
                    </span> */}
                  </div>
                ) : null}
              </MDBox>
              <MDBox
                display="flex"
                flexDirection="column"
                alignItems="center"
                lineHeight={1}
                gap={1}
                width={"90%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDTypography variant="h6">
                  Product Banners <AstrieskIcon />
                  <MDTypography variant="body1" component="span" fontSize={11}>
                    &nbsp; ( image size - 546 × 400 px )
                  </MDTypography>
                </MDTypography>
                <ImagePicker
                  required={!singleProduct}
                  disabled={createUpdateLoading}
                  name="images"
                  multiple={true}
                  images={isImages}
                  setImages={setIsImages}
                  // isImageURLsImages={isData?.images}
                />
                {/* {console.log(isData?.images, "isData?.images")} */}
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  {!isImages &&
                    serverImages &&
                    serverImages?.length &&
                    serverImages.map((value, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start" }}>
                        <span
                          style={{
                            display: "inline-block",
                            width: "50px",
                            height: "50px",
                            margin: "0 0.5rem",
                          }}
                        >
                          <img
                            className="Image"
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                            src={`${process.env.REACT_APP_URI}/${value?.url}`}
                          />
                        </span>
                        <span
                          className="cross"
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            // setIsData((prev) => ({
                            //   ...prev,
                            //   images: isData?.images?.filter((obj) => obj !== value),
                            // }));
                            dispatch(
                              updateProductPic({
                                url: ecom
                                  ? `${process.env.REACT_APP_APII}/eCommerce/productUnLinks/${singleProduct?._id}/${admin}`
                                  : `${process.env.REACT_APP_APII}/productUnLinks/${singleProduct?._id}/${admin}`,
                                data: { imageIndex: i + 1 },
                              })
                            ).then((data) => {
                              // console.log(data);
                              dispatch(
                                handleAlert({
                                  isOpen: true,
                                  type: `${data?.payload?.success ? "success" : "error"}`,
                                  msg: data.payload.message,
                                })
                              );
                              if (data?.payload.success) {
                                const temp = [...serverImages];
                                temp.splice(i, 1);
                                setServerImages(temp);
                              }
                            });
                          }}
                        >
                          <Cancel
                            sx={({ palette: { dark, white, info } }) => ({
                              color: darkMode ? white?.main : dark.main,
                            })}
                          />
                        </span>
                      </div>
                    ))}
                </div>
              </MDBox>
              <MDBox
                display="flex"
                flexDirection="column"
                alignItems="center"
                lineHeight={1}
                gap={1}
                width={"90%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDTypography variant="h6">
                  Additional Banners{" "}
                  <MDTypography variant="body1" component="span" fontSize={11}>
                    &nbsp; ( image size - 546 × 400 px )
                  </MDTypography>
                </MDTypography>
                <ImagePicker
                  required={!singleProduct}
                  disabled={createUpdateLoading}
                  name="images"
                  multiple={true}
                  images={additionalImages}
                  setImages={setAdditionalImages}
                  // isImageURLsImages={isData?.images}
                />
                {/* {console.log(isData?.images, "isData?.images")} */}
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  {!additionalImages &&
                    serverAdditionalImages &&
                    serverAdditionalImages?.length &&
                    serverAdditionalImages.map((value, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start" }}>
                        <span
                          style={{
                            display: "inline-block",
                            width: "50px",
                            height: "50px",
                            margin: "0 0.5rem",
                          }}
                        >
                          <img
                            className="Image"
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                            src={`${process.env.REACT_APP_URI}/${value?.url}`}
                          />
                        </span>
                        <span
                          className="cross"
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            // setIsData((prev) => ({
                            //   ...prev,
                            //   images: isData?.images?.filter((obj) => obj !== value),
                            // }));
                            dispatch(
                              updateProductPic({
                                url: ecom
                                  ? `${process.env.REACT_APP_APII}/eCommerce/productUnLinks/${singleProduct?._id}/${admin}`
                                  : `${process.env.REACT_APP_APII}/productUnLinks/${singleProduct?._id}/${admin}`,
                                data: { additionalIndex: i + 1 },
                              })
                            ).then((data) => {
                              // console.log(data);
                              dispatch(
                                handleAlert({
                                  isOpen: true,
                                  type: `${data?.payload?.success ? "success" : "error"}`,
                                  msg: data?.payload?.message,
                                })
                              );
                              if (data?.payload?.success) {
                                const temp = [...serverAdditionalImages];
                                temp.splice(i, 1);
                                setServerAdditionalImages(temp);
                              }
                            });
                          }}
                        >
                          <Cancel
                            sx={({ palette: { dark, white, info } }) => ({
                              color: darkMode ? white?.main : dark.main,
                            })}
                          />
                        </span>
                      </div>
                    ))}
                </div>
              </MDBox>
              {/* <MDBox
                width={"90%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <MDTypography variant="h6">Select Your Video Provider&apos;s</MDTypography>
                <ApnaSelect2
                  // required={true}
                  data={[
                    "YouTube", //"instagram", "faceBook", "other Providers"
                  ]}
                  category={isData?.videoProvider}
                  label="label"
                  setCategory={(e) =>
                    handleForm({
                      target: {
                        name: "videoProvider",
                        value: e,
                      },
                    })
                  }
                  name="videoProvider"
                  simpleArray={true}
                />
                {isData?.videoProvider !== "" && (
                  <MDInput
                    required={true}
                    type="text"
                    placeholder="videoLink"
                    fullWidth
                    name="videoLink"
                    value={isData?.videoLink}
                    onChange={handleForm}
                  />
                )}
              </MDBox> */}
              {/* <MDBox
                display="flex"
                flexDirection="column"
                alignItems="center"
                lineHeight={1}
                gap={1}
                width={"90%"}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <MDTypography variant="h6">Meta Title</MDTypography>
                <MDInput
                  required={true}
                  type="text"
                  placeholder="metaTitle"
                  fullWidth
                  name="metaTitle"
                  value={isData?.metaTitle}
                  onChange={handleForm}
                />
                <MDTypography variant="h6">Meta Description</MDTypography>
                <MDInput
                  required={true}
                  type="text"
                  placeholder="metaDescription"
                  fullWidth
                  name="metaDescription"
                  value={isData?.metaDescription}
                  onChange={handleForm}
                  multiline
                  rows={6}
                />
                <MDTypography variant="h6">
                  Meta Images{" "}
                  <MDTypography variant="body1" component="span" fontSize={11}>
                    &nbsp; ( image size - 546 × 400 px )
                  </MDTypography>
                </MDTypography>
                <ImagePicker
                  // required={true}
                  name="metaImage"
                  multiple={false}
                  images={isMetaImages}
                  setImages={setIsMetaImages}
                  isImageURLs={isData?.metaImage}
                />
                {isMetaImages === "" && isData?.metaImage && (
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <span
                      style={{
                        display: "inline-block",
                        width: "50px",
                        height: "50px",
                        margin: "0 0.5rem",
                      }}
                    >
                      <img
                        className="Image"
                        style={{ width: "100%", height: "100%" }}
                        src={`${process.env.REACT_APP_URI}/${isData?.metaImage}`}
                      />
                    </span>
                    <span
                      className="cross"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setIsData((prev) => ({
                          ...prev,
                          metaImage: null,
                        }));
                      }}
                    >
                      <Cancel
                        sx={({ palette: { dark, white, info } }) => ({
                          color: darkMode ? white?.main : dark.main,
                        })}
                      />
                    </span>
                  </div>
                )}
              </MDBox> */}

              <MDBox
                sx={{
                  width: "90%",
                  justifyContent: "flex-end",
                  textAlign: "center",
                  display: "flex",
                }}
              >
                {" "}
                <MDButton
                  disabled={createUpdateLoading}
                  color={"info"}
                  verdant={"gradient"}
                  type={"submit"}
                >
                  {createUpdateLoading ? (
                    <CircularProgress size={20} />
                  ) : singleProduct ? (
                    `Update Product`
                  ) : (
                    ` Create Product`
                  )}
                </MDButton>
              </MDBox>
            </MDBox>
          )}
        </MDBox>
      </SkModal>
    </>
  );
};

export default CreateForm;

CreateForm.propTypes = {
  ecom: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.any,
  setIsSwitch: PropTypes.func,
  isSwitch: PropTypes.any,
  productId: PropTypes.string,
  updateProductModal: PropTypes.bool,
  setUpdateProductModal: PropTypes.bool,
};

// {
//
//   "category": "64743b6ca3f0e3f152c21c7e",
//   "brand": "64743aafa3f0e3f152c21c5c",
////   "tags": [
//       "abcd",
//       "ghj"
//   ],
//   "refundable": false,
//   "images": [
//       "electroKing/1685355923596marie.jpg"
//   ],
//   "thumbnail": "electroKing/1685355923597team-2.jpg",
////   "variant": false,
//   "attributes": "645b754274a08e92ed5e5ac2",
//   "featured": false,
//   "bestselling": false,
//   "trending": true,
//   //   "cod": false,
// //   "showStock": false,
//   "hideStock": false,
//   "visibility": false,
//   "metaImage": null,
// }
