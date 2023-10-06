import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import SkLoading from "components/SkLoading";
import SkModal from "components/SkModal";
import { useMaterialUIController } from "context";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser } from "redux/festures/userSlice";
import { formattedDateServer } from "Utils/dateFunc";
import Form from "./Form";
import { handleAlert } from "redux/festures/alertSlice";

const SinglePartnerProfile = ({
  viewUserId,
  setViewUserId,
  isRefresh,
  setIsRefresh,
  isReloadedData,
}) => {
  const { isLoading, singleUsers } = useSelector((state) => ({ ...state.isUsers }));
  const dispatch = useDispatch();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!isOpen) setData(null);
  }, [isOpen]);

  // console.log(viewUserId, "singleUsers");
  return isLoading ? (
    <SkLoading />
  ) : (
    <>
      <SkModal
        show={isOpen}
        unShow={setIsOpen}
        width={{ sx: "100%", md: "65%", xl: "65%", sm: "100%" }}
        height={"auto"}
        padding={3}
        overflowY={true}
      >
        <Form
          setIsOpen={setIsOpen}
          data={data}
          id={viewUserId?._id}
          setViewUserId={setViewUserId}
          setIsRefresh={setIsRefresh}
          isRefresh={isRefresh}
          isReloadedData={isReloadedData}
        />
      </SkModal>
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
        <MDTypography component="h4">Partner Profile</MDTypography>
        {/* {viewUserId?.fullName && (
          <MDBox display={"flex"} gap={3} justifyContent="space-between" width="100%">
            <MDTypography fontSize={12}> Full Name :</MDTypography>
            <MDTypography fontSize={12}> {viewUserId?.fullName}</MDTypography>
          </MDBox>
        )} */}
        {viewUserId?.name && (
          <MDBox display={"flex"} gap={3} justifyContent="space-between" width="100%">
            <MDTypography fontSize={12}> Professional Name :</MDTypography>
            <MDTypography fontSize={12}> {viewUserId?.name || "-"}</MDTypography>
          </MDBox>
        )}
        {viewUserId?.phoneNumber && (
          <MDBox display={"flex"} gap={3} justifyContent="space-between" width="100%">
            <MDTypography fontSize={12}> Mobile :</MDTypography>
            <MDTypography fontSize={12}> {viewUserId?.phoneNumber || "-"}</MDTypography>
          </MDBox>
        )}
        {viewUserId?.email && (
          <MDBox display={"flex"} gap={3} justifyContent="space-between" width="100%">
            <MDTypography fontSize={12}> Email :</MDTypography>
            <MDTypography fontSize={12}> {viewUserId?.email || "-"}</MDTypography>
          </MDBox>
        )}

        {viewUserId?.address && (
          <MDBox display={"flex"} gap={3} justifyContent="space-between" width="100%">
            <MDTypography fontSize={12}> Address :</MDTypography>
            <MDTypography fontSize={12}> {viewUserId?.address || "-"}</MDTypography>
          </MDBox>
        )}
        {viewUserId?.pincode && (
          <MDBox display={"flex"} gap={3} justifyContent="space-between" width="100%">
            <MDTypography fontSize={12}> Pincode :</MDTypography>
            <MDTypography fontSize={12}> {viewUserId?.pincode || "-"}</MDTypography>
          </MDBox>
        )}
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
              src={`${process.env.REACT_APP_URI}/${viewUserId?.selfie?.image}`}
              onClick={() => {
                if (viewUserId?.selfie?.image) {
                  const a = document.createElement("a");
                  a.target = "__blank";
                  a.href = `${process.env.REACT_APP_URI}/${viewUserId?.selfie?.image}`;
                  a.click();
                } else
                  dispatch(
                    handleAlert({
                      isOpen: true,
                      type: "error",
                      msg: "No Image Present",
                    })
                  );
              }}
              onError={(e) => {
                (e.onError = null), (e.target.src = require("../../assets/images/bg-profile.jpeg"));
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
          </MDBox>
          {viewUserId?.selfie?.status ? (
            <MDBadge
              badgeContent={viewUserId?.selfie?.status}
              color={
                viewUserId?.selfie?.status === "APPROVED"
                  ? "success"
                  : viewUserId?.selfie?.status === "REJECTED"
                  ? "error"
                  : "warning"
              }
              variant="gradient"
              size="lg"
            />
          ) : null}
          <MDTypography fontSize={12}> Selfie Image </MDTypography>
          <MDButton
            color="primary"
            variant="outlined"
            onClick={() => {
              setData("selfieStatus");
              setIsOpen(true);
            }}
          >
            Change Status
          </MDButton>
        </MDBox>
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
          <MDBox width={"100%"} height={"5rem"}>
            <img
              src={`${process.env.REACT_APP_URI}/${viewUserId?.idDocument?.image}`}
              onClick={() => {
                if (viewUserId?.selfie?.image) {
                  const a = document.createElement("a");
                  a.target = "__blank";
                  a.href = `${process.env.REACT_APP_URI}/${viewUserId?.idDocument?.image}`;
                  a.click();
                } else
                  dispatch(
                    handleAlert({
                      isOpen: true,
                      type: "error",
                      msg: "No Image Present",
                    })
                  );
              }}
              onError={(e) => {
                (e.onError = null), (e.target.src = require("../../assets/images/bg-profile.jpeg"));
              }}
              style={{ width: "100%", height: "100%", objectFit: "contain", cursor: "pointer" }}
            />
          </MDBox>
          {viewUserId?.idDocument?.status ? (
            <MDBadge
              badgeContent={viewUserId?.idDocument?.status}
              color={
                viewUserId?.idDocument?.status === "APPROVED"
                  ? "success"
                  : viewUserId?.idDocument?.status === "REJECTED"
                  ? "error"
                  : "warning"
              }
              variant="gradient"
              size="lg"
            />
          ) : null}
          <MDTypography fontSize={12}> Document Image </MDTypography>
          {viewUserId?.idDocument?.type ? (
            <MDTypography fontSize={12}>{viewUserId?.idDocument?.type} </MDTypography>
          ) : null}
          <MDButton
            color="primary"
            variant="outlined"
            onClick={() => {
              setData("status");
              setIsOpen(true);
            }}
          >
            Change Status
          </MDButton>
        </MDBox>

        <MDTypography component="h4">Partner Details</MDTypography>
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
              src={`${process.env.REACT_APP_URI}/${viewUserId?.userId?.image}`}
              onError={(e) => {
                (e.onError = null), (e.target.src = require("../../assets/images/bg-profile.jpeg"));
              }}
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
            />
          </MDBox>
          <MDTypography fontSize={12}> User Image </MDTypography>
        </MDBox>

        <MDBox display={"flex"} gap={3} justifyContent="space-between" width="100%">
          <MDTypography fontSize={12}> Full Name :</MDTypography>
          <MDTypography fontSize={12}> {viewUserId?.userId?.fullName || "-"}</MDTypography>
        </MDBox>

        <MDBox display={"flex"} gap={3} justifyContent="space-between" width="100%">
          <MDTypography fontSize={12}> Mobile :</MDTypography>
          <MDTypography fontSize={12}> {viewUserId?.phoneNumber}</MDTypography>
        </MDBox>

        <MDBox display={"flex"} gap={3} justifyContent="space-between" width="100%">
          <MDTypography fontSize={12}> Email :</MDTypography>
          <MDTypography fontSize={12}> {viewUserId?.email}</MDTypography>
        </MDBox>

        <MDBox display={"flex"} gap={3} justifyContent="space-between" width="100%">
          <MDTypography fontSize={12}> User Type :</MDTypography>
          <MDTypography fontSize={12}>
            {" "}
            {viewUserId?.userId?.userType?.join(", ") || "-"}
          </MDTypography>
        </MDBox>

        <MDBox display={"flex"} gap={3} justifyContent="space-between" width="100%">
          <MDTypography fontSize={12}> Permission :</MDTypography>
          <MDTypography fontSize={12}> {viewUserId?.userId?.permissions?.join(", ")}</MDTypography>
        </MDBox>

        {/* {viewUserId?.disable && (
                    <MDBox display={"flex"} gap={3} justifyContent="space-between" width="100%">
                        <MDTypography fontSize={12}> Disable :</MDTypography>
                        <MDTypography fontSize={12}> {viewUserId?.disable}</MDTypography>
                    </MDBox>
                )} */}
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

export default SinglePartnerProfile;
SinglePartnerProfile.propTypes = {
  //   children: PropTypes.node,
  viewUserId: PropTypes.any,
  setViewUserId: PropTypes.any,
  isRefresh: PropTypes.any,
  setIsRefresh: PropTypes.any,
  isReloadedData: PropTypes.func,
};
