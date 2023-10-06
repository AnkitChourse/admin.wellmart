import { Card, CircularProgress } from '@mui/material'
import MDTypography from 'components/MDTypography'
import SkModal from 'components/SkModal'
import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import MDBox from 'components/MDBox';
import InfiniteApnaSelect from 'components/ApnaSelect/InfiniteApnaSelect';
import MDButton from 'components/MDButton';
import http from 'Utils/api2';
import { useDispatch } from 'react-redux';
import { handleAlert } from 'redux/festures/alertSlice';

const AssignPartner = ({ show, unshow, orderId, setOrderId }) => {
    const admin = localStorage.getItem("admin_id");
    const [partnerId, setPartnerId] = useState(null)
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!show && partnerId !== null) setPartnerId(null)
    }, [show])

    const assignPartner = () => {
        setLoader(true)
        http.put(`/assignePartnerByAdmin/${orderId}/${partnerId}/${admin}`)
            .then(response => {
                dispatch(
                    handleAlert({
                        isOpen: true,
                        type: "success",
                        msg: response?.data?.message,
                    })
                )
                setPartnerId(null)
                setLoader(false)
                unshow(false)
            })
            .catch(error => {
                console.log(error)
                dispatch(
                    handleAlert({
                        isOpen: true,
                        type: "error",
                        msg: error?.response?.data?.message,
                    })
                )
                setLoader(false)
            })
    }
    // console.log(partnerId)
    return (
        <SkModal
            show={show}
            unShow={unshow}
            width={{ sx: "100%", md: "55%", xl: "55%", sm: "100%" }}
            height={"auto"}
            padding={3}
            overflowY={true}
            maxHeight="90vh"
        >
            <MDBox display="flex" flexDirection="column" gap="1rem" textAlign="center">
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
                        Assign Partner
                    </MDTypography>
                </Card>
                <MDBox width="100%">
                    <InfiniteApnaSelect
                        fetchApi={`/getAllpartnerProfile/${admin}`}
                        value={partnerId}
                        origin="Partner"
                        valueKey="userId"
                        nameKey="fullName"
                        name="selectedPartner"
                        fetchApiParams={'&orderPartner=true'}
                        onChange={(e) => {
                            setPartnerId(e?.target?.value || null)
                        }}
                    />
                </MDBox>
                <MDButton disabled={loader || !partnerId} color={"info"} verdant={"gradient"} onClick={assignPartner}>
                    {loader ? <CircularProgress size={20} /> : 'Assign Partner'}
                </MDButton>
            </MDBox>
        </SkModal>
    )
}

export default AssignPartner

AssignPartner.propTypes = {
    //   children: PropTypes.node,
    show: PropTypes.bool,
    unshow: PropTypes.func,
    orderId: PropTypes.any,
    setOrderId: PropTypes.func
};