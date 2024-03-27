"use client";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
  DirectionsRenderer,
} from "@react-google-maps/api";

export default function MapComponent(props) {
  const containerStyle = {
    width: "100%",
    height: "90vh",
  };
  const options = {
    mapId: "5a9615f3b8a068f7",
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

  const mapRef = useRef(null);

  function panToUserOrigin(props) {
    const newPosition = {
      lat: props.searchOriginLatitude,
      lng: props.searchOriginLongitude,
    };
    const map = mapRef.current;
    map.panTo(newPosition);
  }

  useEffect(() => {
    if (
      props.searchOriginLatitude !== null &&
      props.searchOriginLongitude !== null
    ) {
      panToUserOrigin(props);
    }
  }, [props.searchOriginLatitude, props.searchOriginLongitude]);

  // Directions data
  const [directionsData, setDirectionsData] = useState(null);

  useEffect(() => {
    if (
      props.searchOriginLatitude !== null &&
      props.searchOriginLongitude !== null &&
      props.searchDestinationLatitude !== null &&
      props.searchDestinationLongitude
    ) {
      //Using the directions API
      const requestOrigin = {
        lat: props.searchOriginLatitude,
        lng: props.searchOriginLongitude,
      };
      const requestDestination = {
        lat: props.searchDestinationLatitude,
        lng: props.searchDestinationLongitude,
      };
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: requestOrigin,
          destination: requestDestination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result) => {
          console.log(result);
          setDirectionsData(result);
        }
      );
    }
  }, [
    props.searchOriginLatitude,
    props.searchOriginLongitude,
    props.searchDestinationLatitude,
    props.searchDestinationLongitude,
  ]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={options}
      center={center}
      zoom={13}
      onClick={() => setIsInfoWindowOpen(false)}
      onLoad={(map) => (mapRef.current = map)}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {props.searchOriginLatitude !== null &&
        props.searchOriginLongitude !== null && (
          <MarkerF
            position={{
              lat: props.searchOriginLatitude,
              lng: props.searchOriginLongitude,
            }}
          />
        )}

      {/* Direction renderer */}
      {directionsData && (
        <DirectionsRenderer
          directions={directionsData}
          options={{ polylineOptions: { strokeColor: "red", strokeWeight: 4 } }}
        />
      )}

      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}
