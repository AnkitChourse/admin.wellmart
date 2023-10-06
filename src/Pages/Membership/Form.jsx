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
import AstrieskIcon from 'components/AstrieskIcon'
import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
} from "@mui/material";
import { getAllBlogs } from "redux/festures/blogSlice";
import { updateBlog } from "redux/festures/blogSlice";
import { createPostBlogs } from "redux/festures/blogSlice";
import { handleAlert } from "redux/festures/alertSlice";
import ApnaSelect from "components/ApnaSelect/ApnaSelect";
import { getCategory } from "redux/festures/categorySlice";
import { getAllProducts } from "redux/festures/productSlice";
import { formattedDateServer } from "Utils/dateFunc";
import {
  getAllmemberships,
  getSingleMembership,
  getDisableMember,
} from "redux/festures/membershipSlice";
import SkDatePicker from "components/SkDataPicker";
import { getUpdatememberships, getCreatememberships } from "redux/festures/membershipSlice";

const Form = ({ isOpenUpdate, setIsOpenUpdate, setIsOpen }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [memberData, setMemberData] = useState({
    title: "",
    price: "",
    durationInMonth: "",
    discountPercent: "",
  });
  const [isCouponsIcon, setIsCouponsIcon] = useState("");
  const [isShow, setIsShow] = useState("");
  const [isSelection, setIsSelection] = useState("category");
  const [isCategory, setIsCategory] = useState([]);
  const [isProducts, setIsProducts] = useState([]);
  const admin = localStorage.getItem("admin_id");
  const dispatch = useDispatch();
  const { Loading, memberships, singlemembership } = useSelector((data) => ({
    ...data?.isMembership,
  }));
// console.log(singlemembership)
  useEffect(() => {
    if (singlemembership && isOpenUpdate) {
      setIsShow(singlemembership?.logo);
      setMemberData((prev) => ({
        ...prev,
        title: singlemembership?.title,
        price: singlemembership?.price,
        durationInMonth: singlemembership?.durationInMonth,
        discountPercent: singlemembership?.discountPercent,
      }));
    } else {
      setIsShow("");
      setMemberData((prev) => ({
        ...prev,
        title: "",
        price: "",
        durationInMonth: "",
        discountPercent: "",
      }));
    }
  }, [singlemembership, isOpenUpdate]);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setMemberData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isCategory !== "" || isShow !== "") {
      if (isOpenUpdate) {
        const formData = new FormData();
        featureList.map((x) => formData.append("features", x?.features));
        formData.append("logo", isCouponsIcon);

        memberData && Object.entries(memberData).map(([key, value]) => formData.append(key, value));
        dispatch(
          getUpdatememberships({
            url: `${process.env.REACT_APP_APII}/updateMembership/${singlemembership?._id}/${admin}`,
            data: formData,
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
            setIsShow("");
            setMemberData((prev) => ({
              ...prev,
              title: "",
              price: "",
              durationInMonth: "",
              discountPercent: "",
            }));
            dispatch(getAllmemberships(`${process.env.REACT_APP_APII}/getAllMembershipByAdmin/${admin}`));
          }
        });
      } else {
        const formData = new FormData();
        featureList.map((x) => formData.append("features", x?.features));

        formData.append("logo", isCouponsIcon);
        memberData && Object.entries(memberData).map(([key, value]) => formData.append(key, value));
        // console.log("formData", ...formData);

        dispatch(
          getCreatememberships({
            url: `${process.env.REACT_APP_APII}/createMembership/${admin}`,
            data: formData,
          })
        ).then((data) => {
          // console.log(data)
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
            setIsShow("");
            setMemberData((prev) => ({
              ...prev,
              title: "",
              price: "",
              durationInMonth: "",
              discountPercent: "",
            }));
            dispatch(getAllmemberships(`${process.env.REACT_APP_APII}/getAllMembershipByAdmin/${admin}`));
          }
        });
      }
    } else {
      dispatch(
        handleAlert({
          isOpen: true,
          type: "warning",
          msg: "all fields is required !",
        })
      );
    }
  };

  const [featureList, setFeatureList] = useState([{ features: "" },]);
// console.log(featureList)
  const handleFeatureAdd = () => {
    setFeatureList([...featureList, { features: "" }]);
  };
  const handleFeatureChange = (e, index) => {
    const { name, value } = e.target;
    const List = [...featureList];
    List[index][name] = value;
    setFeatureList(List);
  };
  const handleFeatureRemove = (index) => {
    const List = [...featureList];
    List.splice(index, 1);
    setFeatureList(List);
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
            {isOpenUpdate ? `Update MemberShip's ` : " Create MemberShip's"}
          </MDTypography>
        </Card>
        <MDBox
          display="flex"
          alignItems="center"
          lineHeight={1}
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
            <MDTypography variant="h6">Title Name <AstrieskIcon/></MDTypography>
            <MDInput
              required={true}
              type="text"
              placeholder="Title Name"
              fullWidth
              name="title"
              value={memberData?.title}
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
            <MDTypography variant="h6">Discount Percent <AstrieskIcon/></MDTypography>
            <MDInput
              required={true}
              type="number"
              placeholder="Discount Percent"
              fullWidth
              name="discountPercent"
              value={memberData?.discountPercent}
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
            <MDTypography variant="h6">Price <AstrieskIcon/></MDTypography>
            <MDInput
              required={true}
              type="number"
              placeholder="price"
              fullWidth
              name="price"
              value={memberData?.price}
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
            <MDTypography variant="h6">Duration in Month <AstrieskIcon/></MDTypography>
            <MDInput
              required={true}
              type="number"
              placeholder="Max Discount  Price"
              fullWidth
              name="durationInMonth"
              value={memberData?.durationInMonth}
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
            <MDTypography variant="h6">Features <AstrieskIcon/></MDTypography>

            {featureList.map((x, index) => (
              <Box key={index} sx={{display:"flex",flexDirection:"column",justifyContent:"flex-start",}}>
                <Box sx={{ display: "flex" }}>
                  <MDInput
                    required={true}
                    type="text"
                    placeholder="Add More Features"
                    fullWidth
                    name="features"
                    value={x?.features}
                    onChange={(e) => handleFeatureChange(e, index)}
                  />
                  {featureList.length > 1 && (
                  <MDButton color={"info"} verdant={"gradient"} sx={{mx:2}} onClick={() => handleFeatureRemove(index)}>Remove</MDButton>
                   )}
                </Box>
                <Box sx={{display:"flex",justifyContent:"flex-start",my:2}}>
                  {featureList.length - 1 === index && (
                    <MDButton onClick={() => handleFeatureAdd()}>Add Feature</MDButton>
                  )}
                </Box>
              </Box>
            ))}
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
            <MDTypography variant="h6">Logo</MDTypography>
            <ImagePicker
              // required={true}
              name="icon"
              multiple={false}
              images={isCouponsIcon}
              setImages={setIsCouponsIcon}
              //
            />

            {isCouponsIcon === "" && isShow && (
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
                    src={`${process.env.REACT_APP_URI}/${isShow}`}
                  />
                </span>
                <span
                  className="cross"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setIsShow(null);
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
              {isOpenUpdate ? `Update Coupon` : ` Create Coupon`}
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
