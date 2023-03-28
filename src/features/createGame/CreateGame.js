import React, { useState } from "react";
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
    googleMapsApiKey: env.GOOGLE_MAP_KEY,
  });

  const [map, setMap] = React.useState(null);

  const [centerPoint, setCenterPoint] = useState(center);
  const [isRefreshingMap, setIsRefreshingMap] = useState(false);
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
    refreshMap();
    setCenterPoint({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  const handleRadiusChange = (e) => {
    refreshMap();
    setRadius(parseInt(e.target.value));
  };
  const refreshMap = async () => {
    setIsRefreshingMap(true);
    setTimeout(() => {
      setIsRefreshingMap(false);
    }, 100);
  };
  return (
    <div>
      <Navbar />
      <p className="create-game-title">Create Game</p>
      {isLoaded ? (
        <div>
          <div>
            {!isRefreshingMap && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={centerPoint}
                zoom={9}
                onClick={handleMapClick}
                options={options}
              // onDragEnd={(event) => console.log(event.latLng.toString())}
              >
                <div>
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
                  <Marker position={centerPoint} />
                </div>
              </GoogleMap>
            )}
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
            max="10000"
            value={radius}
            style={{ color: "red" }}
            onChange={handleRadiusChange}
          // onChange={(e) => handleRadiusChange(e.target.value)}
          />
          <div>{radius} meters</div>
        </div>
        <Space direction="vertical" size={"large"} className="game-details">
          <p style={{ fontSize: "20px", marginBottom: "10px" }}>Game Details</p>
          <div className="create-game-detail">
            <p style={{ width: "110px", marginBottom: 0, margintop:"5px"}}>Game Title:</p>
            <Input placeholder="game title" required />
          </div>
          <div className="create-game-detail" style={{ marginBottom: "5px",paddingTop:"20px" }}>
            <p style={{ width: "110px", marginBottom: 0 }}>Game Description:</p>
            <textarea placeholder="Game Description" required></textarea>
          </div>
          <div className="create-game-detail" style={{ marginTop: "-10px" }}>
            <p style={{ width: "110px", marginBottom: 0 }}>Player Limit:</p>
            <InputNumber required defaultValue={3} min={2} style={{ width: "100px" }} />
          </div>
        </Space>


      </div>
      <div class="create-game-button">
        <button class="create-btn" type="button">Create</button>
      </div>
    </div>
  );
}

export default React.memo(CreateGame);
