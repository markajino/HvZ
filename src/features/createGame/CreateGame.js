import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Circle,
  Marker,
} from "@react-google-maps/api";
import "./CreateGame.css";
import Navbar from "../navbar/Navbar";
import { Space, Input, InputNumber, Button } from "antd";

import env from "react-dotenv";

const containerStyle = {
  width: "90vw",
  marginLeft: "5vw",
  height: "35vw",
  margin: "30px auto",
};

const options = {
  mapId: "9eec87d694dcdb5",
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
};

function CreateGame() {
  const center = { lat: 37.9838, lng: 23.7275 };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBEEMbebzbqITDL8CS0brSsp1-fJn0gMdg",
  });

  const [map, setMap] = React.useState(null);

  const [centerPoint, setCenterPoint] = useState(center);
  const [clicked, setClicked] = useState(false);
  const [radius, setRadius] = useState(2000);

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);

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

  useEffect(() => {
    setClicked(
      <Circle
        center={centerPoint}
        radius={radius}
        options={{
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          clickable: false,
          draggable: false,
          editable: false,
          visible: true,

          radius: radius,
          zIndex: 1,
        }}
      />
    );
  }, [centerPoint]);

  return (
    <div>
      <Navbar />
      <p className="create-game-title">Create Game</p>
      {isLoaded ? (
        <div>
          <div>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={centerPoint}
              zoom={9}
              onClick={handleMapClick}
              options={options}
            >
              <div>
                {/* <Circle
                  center={centerPoint}
                  radius={radius}
                  options={{
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#FF0000",
                    fillOpacity: 0.35,
                    clickable: false,
                    draggable: false,
                    editable: false,
                    visible: true,

                    radius: radius,
                    zIndex: 1,
                  }}
                /> */}
                {clicked}
                <Marker position={centerPoint} />
              </div>
            </GoogleMap>
          </div>
        </div>
      ) : null}
      <div className="create-game-detail">
        <div className="game-coords">
          <p style={{ fontSize: "20px" }}>Game Coodinates</p>
          <p>Latitude: {centerPoint.lat.toFixed(4)}</p>
          <p>Longitude: {centerPoint.lng.toFixed(4)}</p>
        </div>
        <div className="radius-box">
          <p style={{ fontSize: "20px" }}>Set Radius</p>
          <input
            type="range"
            min="100"
            max="1000"
            value={radius}
            style={{ color: "red" }}
            onChange={handleRadiusChange}
            // onChange={(e) => handleRadiusChange(e.target.value)}
          />
          <div>{radius} meters</div>
        </div>
        <Space direction="vertical" size={"large"} className="game-details">
          <p style={{ fontSize: "20px" }}>Game Details</p>
          <div className="create-game-detail">
            <p style={{ width: "110px" }}>Game Title:</p>
            <Input placeholder="game title" required />
          </div>
          <div className="create-game-detail">
            <p style={{ width: "110px" }}>Game Description:</p>
            <Input.TextArea placeholder="game description" required />
          </div>
          <label>
            Player Limit: <InputNumber required defaultValue={3} min={2} />
          </label>
        </Space>
      </div>

      <div className="create-game-button">
        <button className="create-btn" type="primary">
          Create
        </button>
      </div>
    </div>
  );
}

export default React.memo(CreateGame);
