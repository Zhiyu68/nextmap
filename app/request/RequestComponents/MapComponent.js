"use client";
import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";

export default function MapComponent() {
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

  const pinIcon = {
    url: "/assets/pin.png",
    scaledSize: { width: 50, height: 50 },
  };

  const [isInfoWondowOpen, setIsInfoWindowOpen] = useState(false);

  // On click function
  function MarkerClicked(event) {
    console.log("You have just clicked the marker");
    setIsInfoWindowOpen(true);
  }

  // On drag end function
  function MarkerFinishDrag(event) {
    console.log("The final latitude is : ", event.latLng.lat());
    console.log("The final longitude is : ", event.latLng.lng());
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={options}
      center={center}
      zoom={13}
      onClick={() => setIsInfoWindowOpen(false)}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <MarkerF
        position={{ lat: 51.50534952276425, lng: -0.07553889288923747 }}
        icon={pinIcon}
        // visibles
        // cursor="pointer"
        // label={{
        //   text: "This is the text label",
        //   className: "text-3xl text-center text-black bg-yellow-500",
        // }}
        draggable
        onClick={MarkerClicked}
        onDragEnd={MarkerFinishDrag}
      >
        {isInfoWondowOpen && (
          <InfoWindowF
            onCloseClick={() => setIsInfoWindowOpen(false)}
            position={{ lat: 51.50534952276425, lng: -0.07553889288923747 }}
          >
            <div className="w-80 p-2">
              <div className="flex items-center mb-2 space-x-5">
                <img
                  src="https://plus.unsplash.com/premium_photo-1709311442556-f4af586ad5fb?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-14 h-14 rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold">Some title</h3>
                  <p>Some subtitle</p>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Vulputate sapien nec sagittis aliquam malesuada bibendum arcu
                vitae elementum.
              </p>
            </div>
          </InfoWindowF>
        )}
      </MarkerF>
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}
