import MDButton from "components/MDButton";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useMaterialUIController } from "context";
import { useDispatch, useSelector } from "react-redux";
import ImagePicker from "components/ApnaUploader";
import { Cancel } from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SkLoading from "components/SkLoading";
import MDInput from "components/MDInput";
import { Card } from "@mui/material";
import { handleAlert } from "redux/festures/alertSlice";
import { getGlobalAttribute } from "redux/festures/AttributeSlice";
import { updateAttribute } from "redux/festures/AttributeSlice";
import { createAttributeData } from "redux/festures/AttributeSlice";
import AstrieskIcon from 'components/AstrieskIcon'

const AttributeForm = ({ isOpenUpdate, setIsOpen, setIsOpenUpdate }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [isAttribute, setIsAttribute] = useState({
    name: "",
  });
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const { singleAttribute, Loading, IsLoading } = useSelector((state) => ({
    ...state.isAttribute,
  }));
  const handleForm = (e) => {
    const { name, value } = e.target;
    setIsAttribute((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // console.log(singleBrands, "singleBrands");
  useEffect(() => {
    if (singleAttribute && isOpenUpdate) {
      setIsAttribute((prev) => ({
        ...prev,
        name: singleAttribute?.name,
      }));
    }
  }, [singleAttribute, isOpenUpdate]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isOpenUpdate) {
      dispatch(
        updateAttribute({
          url: `${process.env.REACT_APP_API}/updateAttribute/${singleAttribute?._id}/${admin}`,
          data: { ...isAttribute },
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
          setIsOpen(false);
          setIsOpenUpdate(false);
          setIsAttribute((prev) => ({
            ...prev,
            name: "",
          }));
          dispatch(getGlobalAttribute(`/getAllAttribute`));
        }
      });
    } else {
      dispatch(
        createAttributeData({
          url: `${process.env.REACT_APP_API}/creatAttribute/${admin}`,
          data: { ...isAttribute },
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
          setIsOpen(false);
          setIsOpenUpdate(false);
          setIsAttribute((prev) => ({
            ...prev,
            name: "",
          }));
          dispatch(getGlobalAttribute(`/getAllAttribute`));
        }
      });
    }
  };
  return Loading ? (
    <SkLoading />
  ) : (
    <>
      <MDBox
        display="flex"
        alignItems="center"
        lineHeight={1}
        sx={{
          justifyContent: "center",
          textAlign: "center",
          flexDirection: "column",
          gap: 5,
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
            {isOpenUpdate ? `Update Attribute ` : " Create Attribute"}
          </MDTypography>
        </Card>
        <MDBox
          display="flex"
          alignItems="center"
          lineHeight={1}
          //   sx={{
          //
          //   }}
          sx={({ palette: { dark, white, info } }) => ({
            border: 0.5,
            borderColor: darkMode ? white.main : dark.main,
            borderRadius: 3,
            p: 3,
            justifyContent: "center",
            textAlign: "center",
            flexDirection: "column",
            gap: 3,
            width: "100%",
          })}
          component="form"
          role="form"
          onSubmit={handleFormSubmit}
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
            <MDTypography variant="h6">Attribute name <AstrieskIcon /></MDTypography>
            <MDInput
              required={true}
              type="text"
              placeholder="Attribute name"
              fullWidth
              name="name"
              value={isAttribute.name}
              onChange={handleForm}
            />
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
              {isOpenUpdate ? `Update Attribute` : ` Create Attribute`}
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </>
  );
};

export default AttributeForm;
AttributeForm.propTypes = {
  isOpenUpdate: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.any,
  setIsOpenUpdate: PropTypes.any,
};
