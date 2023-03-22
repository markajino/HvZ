import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

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
    lat: -3.745 || lat,
    lng: -38.523 || lng,
  };
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={9}
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
