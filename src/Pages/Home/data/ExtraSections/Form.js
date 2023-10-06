import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Divider } from "@mui/material";
import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SkLoading from "components/SkLoading";
import { useMaterialUIController } from "context";
import { useDispatch, useSelector } from "react-redux";
import { SkPrice } from "Utils/dateFunc";
import { camelToFlat } from "Utils/dateFunc";
import { formattedDateServer } from "Utils/dateFunc";
import ApnaSelect2 from "components/ApnaSelect";
import { getAllProducts } from "redux/festures/productSlice";
import ApnaSelect from "components/ApnaSelect/ApnaSelect";
import ImagePicker from "components/ApnaUploader";
import AstrieskIcon from 'components/AstrieskIcon'

import MDButton from "components/MDButton";
import { handleAlert } from "redux/festures/alertSlice";
import { updateExtraSections } from "redux/festures/isExtraSectionSlice";
import { getAllExtraSections } from "redux/festures/isExtraSectionSlice";
import { Cancel } from "@mui/icons-material";
import { getSingleExtraSections } from "redux/festures/isExtraSectionSlice";
import { getGlobalExtraSections } from "redux/festures/isExtraSectionSlice";

const ExtraSectionForm = ({ setIsOpenView, setIsSet, isSet }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [isProducts, setIsProducts] = useState([]);
  const [isBanner, setIsBanner] = useState("");
  const [isShow, setIsShow] = useState(null);
  const dispatch = useDispatch();
  const admin = localStorage.getItem("admin_id");
  //   const { Loading, singleExtraSections } = useSelector((data) => ({ ...data.isBlogs }));
  const { Loading, singleExtraSections } = useSelector((data) => ({ ...data?.isExtraSections }));
  const { AllProducts } = useSelector((state) => ({ ...state.isProducts }));
  // console.log(singleExtraSections, "singleExtraSections");
  useEffect(() => {
    // dispatch(getAllProducts(`/getAllProduct`));
  }, []);
  useEffect(() => {
    if (singleExtraSections) {
      setIsShow(singleExtraSections?.banner);
      const isArray =
        singleExtraSections?.products &&
        singleExtraSections?.products.length > 0 &&
        singleExtraSections?.products.map((items) => items?._id);
      // console.log(isArray, "isArray");
      setIsProducts(isArray);
    }
  }, [singleExtraSections]);
  // console.log(AllProducts, "AllProducts");
  const handleUpdateExtraSections = (e) => {
    e.preventDefault();
    const formData = new FormData();
    isProducts &&
      isProducts.length > 0 &&
      // isProducts.map((value) => console.log("products", value?._id));
      isProducts.map((value) => formData.append("products", value));
    formData.append("banner", isBanner);
    dispatch(
      updateExtraSections({
        url: `${process.env.REACT_APP_API}/updateHomeExtraSection/${singleExtraSections?._id}/${admin}`,
        data: formData,
      })
    ).then((data) => {
      // console.log(data);
      dispatch(
        handleAlert({
          isOpen: true,
          type: data?.payload?.success ? "success" : "error",
          msg: data?.payload?.message,
        })
      );
      dispatch(getAllExtraSections(`/getAllHomeExtraSection`));
      setIsProducts([]);
      setIsBanner("");
      setIsOpenView(false);
    });
  };
  return (
    <>
      <MDBox
        display="flex"
        alignItems="center"
        lineHeight={1}
        sx={{
          justifyContent: "center",
          textAlign: "center",
          flexDirection: "column",
          gap: 2,
          width: "100%",
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
            Update Extra Sections Details
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
              border: 0.5,
              borderColor: darkMode ? white.main : dark.main,
              borderRadius: 3,
              p: 3,
              width: "100%",
              //   height: "70vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 2,
            })}
            component="form"
            role="form"
            onSubmit={handleUpdateExtraSections}
          >
            <MDBox lineHeight={1} width={"100%"}>
              <MDTypography variant="h6" sx={{ my: 2 }}>
                {" "}
                Select Your Products <AstrieskIcon/>
              </MDTypography>
              {/* {console.log(AllProducts, "AllProducts")} */}
              {/* <ApnaSelect2
                data={AllProducts}
                category={isProducts}
                label="products"
                setCategory={setIsProducts}
                name="Products"
                simpleArray={false}  state, setState, loading, data, name, Label,
              /> */}
              {/* {console.log(isProducts, "isProducts")} */}
              <ApnaSelect
                data={AllProducts}
                state={isProducts}
                label="products"
                setState={setIsProducts}
                name="Products"
                // simpleArray={false}
                required={true}
              />
            </MDBox>
            <MDTypography variant="h6">
              Choose banner
              <MDTypography variant="body1" component="span" fontSize={11}>
                &nbsp; ( image size - 1349 × 400 px )
              </MDTypography>
            </MDTypography>
            <MDBox lineHeight={1} width={"100%"}>
              <ImagePicker
                // required={true}
                name="thumbnail"
                multiple={false}
                images={isBanner}
                setImages={setIsBanner}

                // isImageURLs={isData?.thumbnail}
              />
              {isBanner === "" && isShow && (
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
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      src={`${process.env.REACT_APP_URI}/${isShow}`}
                    />
                  </span>
                  <span
                    className="cross"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      dispatch(
                        updateExtraSections({
                          url: `${process.env.REACT_APP_API}/unlinkHomeExtraSectionImage/${singleExtraSections?._id}/${admin}`,
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
                        if (data?.payload.success)
                          dispatch(
                            getSingleExtraSections(
                              `/getHomeExtraSectionById/${singleExtraSections?._id}`
                            )
                          );
                        dispatch(getGlobalExtraSections(`/getAllHomeExtraSection`));
                        setIsSet(!isSet);
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
              )}
            </MDBox>
            <MDBox
              sx={{
                width: "100%",
                justifyContent: "flex-end",
                textAlign: "center",
                display: "flex",
              }}
            >
              {" "}
              <MDButton color={"info"} verdant={"gradient"} type={"submit"}>
                Update Extra Sections
              </MDButton>
            </MDBox>
          </MDBox>
        )}
      </MDBox>
    </>
  );
};

export default ExtraSectionForm;
ExtraSectionForm.propTypes = {
  setIsOpenView: PropTypes.any,
  setIsSet: PropTypes.any,
  isSet: PropTypes.any,
};
