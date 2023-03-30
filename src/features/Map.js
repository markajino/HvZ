import React, { useEffect } from "react";
import {
  Circle,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import env from "react-dotenv";

function Map({ width, height, lat, lng, center, radius, killData }) {
  const containerStyle = {
    width: width || "62vw",
    height: height || "35vw",
    marginTop: "55px",
    marginLeft: "20px",
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: env.GOOGLE_MAPS_API_KEY,
  });
  const [circleCenter, setCircleCenter] = React.useState({
    lat: lat,
    lng: lng,
  });
  const [circleRadius, setCircleRadius] = React.useState(radius);

  useEffect(() => {
    setCircleCenter(center);
    console.log("center radius", radius);
  }, [center]);
  // const center = {
  //   lat: 37.9838 || lat,
  //   lng: 23.7275 || lng,
  // };
  // function random_point_in_disk(max_radius) {
  //   var r = Math.sqrt(Math.random()) * max_radius;
  //   var theta = Math.random() * 2 * Math.PI;
  //   return [r * Math.cos(theta), r * Math.sin(theta)];
  // }

  // const center = {
  //   lat: 37.9838 || lat,
  //   lng: 23.7275 || lng,
  // };

  function random_point_in_disk(max_radius) {
    var r = Math.sqrt(Math.random()) * max_radius;
    var theta = Math.random() * 2 * Math.PI;
    return [r * Math.cos(theta), r * Math.sin(theta)];
  }

  const randomPoint = random_point_in_disk(circleRadius);

  const x = randomPoint[0];
  const y = randomPoint[1];
  const latitude = circleCenter.lat + y / 111111; // 1 degree of latitude is approximately 111111 meters
  const longitude =
    circleCenter.lng + x / (111111 * Math.cos(circleCenter.lat));

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const options = {
    disableDefaultUI: true, // disable all default UI controls
    zoomControl: true, // enable zoom control
    gestureHandling: "cooperative", // enable touch gestures
    mapId: "9eec87d694dcdb5",
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={circleCenter}
      zoom={9}
      options={options}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <>
        <Circle
          center={circleCenter}
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

            zIndex: 1,
          }}
        />

        {killData?.map((kill) => (
          <Marker
            position={{
              lat: kill.lat,
              lng: kill.lng,
            }}
            icon={{
              url: "https://img.icons8.com/ios-filled/50/null/headstone.png",
              scaledSize: new window.google.maps.Size(50, 50),
            }}
          />
        ))}
        {/* <Marker
          position={{ lat: latitude, lng: longitude }}
          icon={{
            url: "https://img.icons8.com/material-rounded/300/null/here.png",
            scaledSize: new window.google.maps.Size(50, 50),
          }}
        /> */}
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
