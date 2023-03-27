import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import env from "react-dotenv";

function Map({ width, height, lat, lng }) {
  const containerStyle = {
    width: width || "62vw",
    height: height || "35vw",
    marginTop: "55px",
    marginLeft: "20px",
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBEEMbebzbqITDL8CS0brSsp1-fJn0gMdg",
  });

  const center = {
    lat: 37.9838 || lat,
    lng: 23.7275 || lng,
  };
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
      center={center}
      zoom={9}
      options={options}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
