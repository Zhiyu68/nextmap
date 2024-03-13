"use client";
import React from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";

export default function RequestPage() {
  const containerStyle = {
    width: "100%",
    height: "90vh",
  };
  const options = {
    mapId: "cb8d394acbf575f4",
    mapTypeControl: false,
    zoomControl: false,
    fullscreenControl: false,
    clickableIcons: false,
    scrollwheel: true,
    streetViewControl: false,
  };

  const center = {
    lat: 51.510781084202684,
    lng: -0.09240945902731963,
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={options}
      center={center}
      zoom={13}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <MarkerF
        position={{ lat: 51.50534952276425, lng: -0.07553889288923747 }}
      />
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}
