import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, Circle, Marker } from "@react-google-maps/api";
import Navbar from "../navbar/Navbar";
import "./CreateGame.css"
import { Input, InputNumber } from "antd";

const containerStyle = {
    width: "90vw",
    marginLeft: "5vw",
    height: "35vw",
    margin: "50px auto",
};

function CreateGame() {
    const center = { lat: 37.9838, lng: 23.7275 };
    

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyBEEMbebzbqITDL8CS0brSsp1-fJn0gMdg",
    });

    const [map, setMap] = React.useState(null);

    const [centerPoint, setCenterPoint] = useState(center);
    const [radius, setRadius] = useState(1000);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    const handleMapClick = (e) => {
        setCenterPoint({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    };

    const handleRadiusChange = (e) => {
        setRadius(parseInt(e.target.value));
    };
        console.log(centerPoint)
    return isLoaded ? (
        <div>
            <Navbar />
            <p className="create-game-title">Create Game</p>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={centerPoint}
                zoom={10}
                onClick={handleMapClick}
                // onLoad={onLoad}
                onUnmount={onUnmount}
            >
                <Circle center={centerPoint} radius={radius} options={{ fillColor: "red", strokeColor: "red"}} />
                <Marker position={centerPoint} />
            </GoogleMap>
            <div className="create-game-detail">

           <div>

            <input
                type="range"
                min="100"
                max="10000"
                value={radius}
                onChange={handleRadiusChange}
                />
                <div>{radius} meters</div>
                </div>
            <div className="game-coords">
                <p>Game Coodinates</p>
                <p>Latitude: {centerPoint.lat.toFixed(4)}</p>
                <p>Longitude:  {centerPoint.lng.toFixed(4)}</p>
            </div>
            <div>
                <label>Game Title: <Input placeholder="game title"/></label>
                <label>Player Limit: <InputNumber /></label>

            </div>
            </div>

        </div>
    ) : (
        <></>
    );
}

export default React.memo(CreateGame);