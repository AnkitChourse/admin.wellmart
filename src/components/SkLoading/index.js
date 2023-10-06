import MDBox from "components/MDBox";
import MDProgress from "components/MDProgress";
import MDTypography from "components/MDTypography";
import React, { useEffect } from "react";
import img from "../../assets/images/illustrations/loading.gif";
import { useDispatch, useSelector } from "react-redux";
import { skCompany } from "redux/festures/isCompany";
const SkLoading = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(skCompany({ url: "get/company" }));
  }, []);
  const { Loading, companyData } = useSelector((data) => ({ ...data?.isCompany }));
  return (
    <MDBox
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        m: "auto",
        p: "auto",
      }}
    >
      <MDBox
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 100,
          width: 100,
          m: "auto",
          p: "auto",
        }}
      >
        <img
          src={`${process.env.REACT_APP_URI}/${companyData?.loader}`}
          style={{ height: "100%", width: "100%", objectFit: "contain" }}
          alt="loading"
          onError={(e) => {
            e.onError = null;
            e.target.src = img;
          }}
        />
        {/* <MDProgress /> */}
        {/* <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        Loading.........
      </MDTypography> */}
      </MDBox>
    </MDBox>
  );
};

export default SkLoading;
