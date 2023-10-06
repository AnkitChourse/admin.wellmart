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
import { getAllBlogs } from "redux/festures/blogSlice";
import { updateBlog } from "redux/festures/blogSlice";
import { createPostBlogs } from "redux/festures/blogSlice";
import { handleAlert } from "redux/festures/alertSlice";
import { getAllTutorials } from "redux/festures/isTutorialSlice";
import ApnaSelect2 from "components/ApnaSelect";
import { updateTutorials } from "redux/festures/isTutorialSlice";
import { createTutorials } from "redux/festures/isTutorialSlice";
import { getAllQuerys } from "redux/festures/QuerySlice";
import { updateQuerys } from "redux/festures/QuerySlice";
import { createQueryByShubham } from "redux/festures/QuerySlice";
const Form = ({ isOpenUpdate, setIsOpenUpdate, setIsOpen }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [isFormData, setIsFormData] = useState({
    name: "",
    email: "",
    description: "",
  });
  const [isShow, setIsShow] = useState("");
  //   const [isBrandShowHome, setIsBrandShowHome] = useState(false);
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const { Loading, singleQuery } = useSelector((data) => ({ ...data?.isQuery }));
  const handleForm = (e) => {
    const { name, value } = e.target;
    setIsFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // console.log(isFormData, "isFormData");
  // console.log(singleBrands, "singleBrands");
  useEffect(() => {
    if (singleQuery && isOpenUpdate) {
      setIsFormData((prev) => ({
        ...prev,
        name: singleQuery?.name,
        email: singleQuery?.email,
        description: singleQuery?.description,
      }));
    }
  }, [singleQuery, isOpenUpdate]);
  // // console.log(singleQuery);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isOpenUpdate) {
      dispatch(
        updateQuerys({
          url: `${process.env.REACT_APP_API}/updateQuery/${singleQuery?._id}`,
          data: isFormData,
        })
      ).then((data) => {
        dispatch(
          handleAlert({
            isOpen: true,
            type: `${data?.payload?.success ? "success" : "error"}`,
            msg: data?.payload?.message,
          })
        );
        setIsOpen(false);
        setIsOpenUpdate(false);
        setIsFormData((prev) => ({
          ...prev,
          name: "",
          email: "",
          description: "",
        }));
        dispatch(getAllQuerys(`/getAllQuery/${admin}`));
      });
    } else {
      dispatch(
        createQueryByShubham({
          url: `${process.env.REACT_APP_API}/createQuery`,
          data: isFormData,
        })
      ).then((data) => {
        dispatch(
          handleAlert({
            isOpen: true,
            type: `${data?.payload?.success ? "success" : "error"}`,
            msg: data?.payload?.message,
          })
        );
        setIsOpen(false);
        setIsOpenUpdate(false);
        setIsFormData((prev) => ({
          ...prev,
          name: "",
          email: "",
          description: "",
        }));
        dispatch(getAllQuerys(`/getAllQuery/${admin}`));
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
            {isOpenUpdate ? `Update Query ` : " Create Query"}
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
          <MDBox lineHeight={1} gap={3} width={"90%"}>
            <MDTypography variant="h6">Query Name</MDTypography>
            <MDInput
              type="text"
              placeholder="Query Name"
              fullWidth
              name="name"
              value={isFormData?.name}
              onChange={handleForm}
            />
          </MDBox>
          <MDBox lineHeight={1} gap={3} width={"90%"}>
            <MDTypography variant="h6"> Query Description </MDTypography>
            <MDInput
              type="text"
              placeholder="Query description"
              fullWidth
              name="description"
              value={isFormData?.description}
              onChange={handleForm}
              multiline
              rows={5}
            />
          </MDBox>
          <MDBox lineHeight={1} gap={3} width={"90%"}>
            <MDTypography variant="h6">Query Email</MDTypography>
            <MDInput
              type="email"
              placeholder="Query Email"
              fullWidth
              name="email"
              value={isFormData?.email}
              onChange={handleForm}
            />
          </MDBox>
          {/* <MDBox sx={{ display: "flex", flexDirection: "column", gap: 3 }} width={"90%"}>
            <MDTypography variant="h6">Select Your Video Provider&apos;s</MDTypography>
            <ApnaSelect2
              data={["YouTube", "instagram", "faceBook", "other Providers"]}
              category={isFormData?.videoProvider}
              label="videoProvider"
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
          </MDBox>
          <MDBox lineHeight={1} gap={3} width={"90%"}>
            <MDTypography variant="h6">Tutorial Video Link</MDTypography>
            <MDInput
              type="text"
              placeholder="Video Link"
              fullWidth
              name="videoLink"
              value={isFormData?.videoLink}
              onChange={handleForm}
            />
          </MDBox> */}

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
              {isOpenUpdate ? `Update Query` : ` Create Query`}
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </>
  );
};

export default Form;
Form.propTypes = {
  isOpenUpdate: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.any,
  setIsOpenUpdate: PropTypes.any,
};
