import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SkLoading from "components/SkLoading";
import { useMaterialUIController } from "context";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser } from "redux/festures/userSlice";
import { formattedDateServer } from "Utils/dateFunc";

const SingleUserDetails = ({ viewUserId, setViewProductModal }) => {
  const { isLoading, singleUsers } = useSelector((state) => ({ ...state.isUsers }));
  const dispatch = useDispatch();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  // useEffect(() => {
  //   dispatch(getSingleUser(`getUserById/${viewUserId}`));
  // }, [viewUserId]);

  // console.log(singleUsers, "singleUsers");
  return isLoading ? (
    <SkLoading />
  ) : (
    <>
      <MDBox
        sx={({ palette: { dark, white, info } }) => ({
          border: 0.5,
          borderColor: darkMode ? white.main : dark.main,
          borderRadius: 3,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          flexDirection: "column",
          gap: 2.5,
        })}
      >
        {/* {viewUserId?.fullName && (
          <MDBox display={"flex"} gap={3} justifyContent="space-between" width="100%">
            <MDTypography fontSize={12}> Full Name :</MDTypography>
            <MDTypography fontSize={12}> {viewUserId?.fullName}</MDTypography>
          </MDBox>
        )} */}
        <MDBox
          sx={{
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: 2,
          }}
        >
          <MDBox width={"100px"} height={"100px"} borderRadius={"100%"}>
            <img
              src={`${process.env.REACT_APP_URI}/${viewUserId?.image}`}
              onError={(e) => {
                e.error = null
                e.target.src = require("../../assets/images/bg-profile.jpeg")
              }} 
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
            />
          </MDBox>
          <MDTypography fontSize={12}> User Image </MDTypography>
        </MDBox>
        {viewUserId?.fullName && (
          <MDBox display={"flex"} gap={3} justifyContent="space-between" width="100%">
            <MDTypography fontSize={12}> Full Name :</MDTypography>
            <MDTypography fontSize={12}> {viewUserId?.fullName}</MDTypography>
          </MDBox>
        )}
        {viewUserId?.phoneNumber && (
          <MDBox display={"flex"} gap={3} justifyContent="space-between" width="100%">
            <MDTypography fontSize={10}> Mobile :</MDTypography>
            <MDTypography fontSize={10}> {viewUserId?.phoneNumber}</MDTypography>
          </MDBox>
        )}
        {viewUserId?.email && (
          <MDBox display={"flex"} gap={3} justifyContent="space-between" width="100%">
            <MDTypography fontSize={10} > Email :</MDTypography>
            <MDTypography fontSize={10}> {viewUserId?.email}</MDTypography>
          </MDBox>
        )}

        {viewUserId?.userType && viewUserId?.userType?.length ? (
          <MDBox display={"flex"} gap={3} justifyContent="space-between" width="100%">
            <MDTypography fontSize={12}> User Type :</MDTypography>
            <MDTypography fontSize={12}> {viewUserId?.userType?.join(',')}</MDTypography>
          </MDBox>
        ) : null}
        {viewUserId?.permissions && viewUserId?.permissions?.length ? (
          <MDBox display={"flex"} gap={3} justifyContent="space-between" width="100%">
            <MDTypography fontSize={12}> Permission :</MDTypography>
            <MDTypography fontSize={12} width="50%"> {viewUserId?.permissions?.join(',')}</MDTypography>
          </MDBox>
        ) : null}

        <MDBox display={"flex"} gap={3} justifyContent="space-between" width="100%">
          <MDTypography fontSize={12}> Disable :</MDTypography>
          <MDBadge badgeContent={viewUserId?.disable ? "Yes" : 'No'} color={viewUserId?.disable ? 'error' : 'success'} variant="gradient" size="lg" />
        </MDBox>

        {/* {singleUsers?.role && (
          <MDBox display={"flex"} gap={3} justifyContent="space-between" width="100%">
            <MDTypography fontSize={12}> Role :</MDTypography>
            <MDTypography fontSize={12}> {singleUsers?.role}</MDTypography>
          </MDBox>
        )} */}
        {/* {singleUsers?.updatedAt && (
          <MDBox display={"flex"} gap={3} justifyContent="space-between" width="100%">
            <MDTypography fontSize={12}> Last Updated :</MDTypography>
            <MDTypography fontSize={12}>
              {formattedDateServer(new Date(singleUsers?.updatedAt))}
            </MDTypography>
          </MDBox>
        )} */}
        {/* <MDBox display={"flex"} gap={3} justifyContent="space-between" width="100%">
          <MDTypography fontSize={12}> User Otp Verify :</MDTypography>
          {singleUsers?.otpVerify ? (
            <MDBadge badgeContent={"Yes"} color={"info"} variant="gradient" size="lg" />
          ) : (
            <MDBadge badgeContent={"No"} color={"error"} variant="gradient" size="lg" />
          )}
        </MDBox>
        <MDBox display={"flex"} gap={3} justifyContent="space-between" width="100%">
          <MDTypography fontSize={12}> Social Login :</MDTypography>
          {singleUsers?.socilaLogin ? (
            <MDBadge badgeContent={"Yes"} color={"info"} variant="gradient" size="lg" />
          ) : (
            <MDBadge badgeContent={"No"} color={"error"} variant="gradient" size="lg" />
          )}
        </MDBox>
        <MDBox display={"flex"} gap={3} justifyContent="space-between" width="100%">
          <MDTypography fontSize={12}> User Visible :</MDTypography>
          {singleUsers?.disable ? (
            <MDBadge badgeContent={"NO"} color={"info"} variant="gradient" size="lg" />
          ) : (
            <MDBadge badgeContent={"Yes"} color={"error"} variant="gradient" size="lg" />
          )}
        </MDBox> */}
      </MDBox>
    </>
  );
};

export default SingleUserDetails;
SingleUserDetails.propTypes = {
  //   children: PropTypes.node,
  viewUserId: PropTypes.any,
  setViewProductModal: PropTypes.any,
};
