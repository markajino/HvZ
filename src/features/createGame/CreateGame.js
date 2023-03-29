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
import { useNavigate } from "react-router-dom";

import env from "react-dotenv";
import { createGame } from "../../API/API";
import { redirect } from "react-router-dom";

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
  const [circleCoords, setCircleCoords] = useState(0);

  const CircleReverser = (centerLat, centerLng, radius) => {
    const R = 6371e3; // Earth's radius in meters
    const lat1 = (centerLat * Math.PI) / 180;
    const lng1 = (centerLng * Math.PI) / 180;
    const brng = 0; // Bearing is 0 for north

    const lat2 =
      Math.asin(
        Math.sin(lat1) * Math.cos(radius / R) +
          Math.cos(lat1) * Math.sin(radius / R) * Math.cos(brng)
      ) *
      (180 / Math.PI);

    const lng2 =
      ((lng1 +
        Math.atan2(
          Math.sin(brng) * Math.sin(radius / R) * Math.cos(lat1),
          Math.cos(radius / R) - Math.sin(lat1) * Math.sin(lat2)
        )) *
        180) /
      Math.PI;

    const nw_lat = Math.max(centerLat, lat2).toFixed(6);
    const nw_lng = Math.min(centerLng, lng2).toFixed(6);
    const se_lat = Math.min(centerLat, lat2).toFixed(6);
    const se_lng = Math.max(centerLng, lng2).toFixed(6);

    console.log(`North West Corner: ${nw_lat}, ${nw_lng}`);
    console.log(`South East Corner: ${se_lat}, ${se_lng}`);
    return {
      nw_lat: nw_lat,
      nw_lng: nw_lng,
      se_lat: se_lat,
      se_lng: se_lng,
    };
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBEEMbebzbqITDL8CS0brSsp1-fJn0gMdg",
  });

  const [map, setMap] = React.useState(null);

  const [centerPoint, setCenterPoint] = useState(center);
  const [radius, setRadius] = useState(2000);
  const [isRefreshingMap, setIsRefreshingMap] = useState(false);
  const [gameTitle, setGameTitle] = useState("");
  const [gameDescription, setGameDescription] = useState("");

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
  useEffect(() => {
    setCircleCoords(CircleReverser(centerPoint.lat, centerPoint.lng, radius));
  }, [centerPoint, radius]);
  const handleCreateGame = () => {
    const gameData = {
      name: gameTitle,
      description: gameDescription,
      nw_lat: circleCoords.nw_lat,
      nw_lng: circleCoords.nw_lng,
      se_lat: circleCoords.se_lat,
      se_lng: circleCoords.se_lng,
    };
    createGame(gameData).then((res) => {
      window.location.replace("/");
    });
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
            <p style={{ width: "110px", marginBottom: 0, margintop: "5px" }}>
              Game Title:
            </p>
            <Input
              placeholder="game title"
              required={true}
              value={gameTitle}
              onChange={(e) => {
                setGameTitle(e.target.value);
              }}
            />
          </div>
          <div
            className="create-game-detail"
            style={{ marginBottom: "5px", paddingTop: "20px" }}
          >
            <p style={{ width: "110px", marginBottom: 0 }}>Game Description:</p>
            <textarea
              placeholder="Game Description"
              required
              value={gameDescription}
              onChange={(e) => {
                setGameDescription(e.target.value);
              }}
            ></textarea>
          </div>
          {/* <div className="create-game-detail" style={{ marginTop: "-10px" }}>
            <p style={{ width: "110px", marginBottom: 0 }}>Player Limit:</p>
            <InputNumber
              required
              defaultValue={3}
              min={2}
              style={{ width: "100px" }}
            />
          </div> */}
        </Space>
      </div>
      <div class="create-game-button">
        {gameTitle.length > 0 && gameDescription.length > 0 ? (
          <button
            class="create-btn"
            type="button"
            onClick={() => handleCreateGame()}
          >
            Create
          </button>
        ) : (
          <button
            class="create-btn"
            type="button"
            disabled
            onClick={() => handleCreateGame()}
          >
            Create
          </button>
        )}
      </div>
    </div>
  );
}

export default React.memo(CreateGame);
