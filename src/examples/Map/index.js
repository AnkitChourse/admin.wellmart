import React from "react";
import GoogleMapReact from "google-map-react";
import { Box, IconButton } from "@mui/material";
import { Circle, LocationOn, MyLocation } from "@mui/icons-material";
import PropTypes from 'prop-types'

import mapStyles from "./Mapstyle";


const Map = ({ coords, setCoords, bounds, setBounds }) => {
    const Marker = () => (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                width: "30px",
                height: "30px",
                color: "red",
                position: "absolute",
                transform: "translate(-50%, -100%)",
            }}
        >
            <LocationOn />
        </div>
    );

    return (
        <Box
            sx={{
                height: "50vh",
                width: "100%",
                position: "relative",
            }}
        >
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE,
                }}
                defaultCenter={coords}
                center={bounds}
                defaultZoom={11}
                yesIWantToUseGoogleMapApiInternals
                margin={[50, 50, 50, 50]}
                options={{
                    disableDefaultUI: false,
                    zoomControl: true,
                    styles: mapStyles,
                    gestureHandling: "cooperative",
                }}
                onClick={(e) => {
                    setBounds({ lat: e.lat, lng: e.lng });
                }}
            >
                <Marker lat={bounds.lat} lng={bounds.lng} />
            </GoogleMapReact>
            <Box
                sx={{
                    position: "absolute",
                    bottom: 110,
                    right: 10,
                    zIndex: 1000009,
                }}
            >
                <IconButton
                    onClick={() => {
                        navigator.geolocation.getCurrentPosition(
                            ({ coords: { latitude, longitude } }) => {
                                console.log(latitude, longitude)
                                setCoords({ lat: latitude, lng: longitude });
                                setBounds({ lat: latitude, lng: longitude });
                            }, (error) => console.log(error)
                        );
                    }}
                    sx={{
                        bgcolor: "white.main",
                        borderRadius: 1,
                        width: 40,
                        height: 40,
                        "&:hover": {
                            bgcolor: "white.main",
                        },
                    }}
                    aria-label="getCurrentLocation"
                >
                    <MyLocation fontSize="small" color="primary" />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Map;

Map.propTypes = {
    coords: PropTypes.any,
    setCoords: PropTypes.func,
    bounds: PropTypes.any,
    setBounds: PropTypes.func
}