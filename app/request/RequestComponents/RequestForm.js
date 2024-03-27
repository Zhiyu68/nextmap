import React from "react";
import PlaceSearchOrigin from "./PlaceSearchOrigin";
import PlaceSearchDestination from "./PlaceSearchDestination";

export default function RequestForm(props) {
  return (
    <form className="flex flex-col mt-5 mx-2">
      <PlaceSearchOrigin
        searchOriginLatitude={props.searchOriginLatitude}
        searchOriginLongitude={props.searchOriginLongitude}
        setSearchOriginLatitude={props.setSearchOriginLatitude}
        setSearchOriginLongitude={props.setSearchOriginLongitude}
      />

      {props.searchOriginLatitude && props.searchOriginLongitude && (
        <PlaceSearchDestination
          searchDestinationLatitude={props.searchDestinationLatitude}
          searchDestinationLongitude={props.searchDestinationLongitude}
          setSearchDestinationLatitude={props.setSearchDestinationLatitude}
          setSearchDestinationLongitude={props.setSearchDestinationLongitude}
        />
      )}

      <div className="flex justify-center items-center">
        <button className="bg-blue-600 text-white font-bold my-2 px-10 py-2 rounded-2xl">
          Submit
        </button>
      </div>
    </form>
  );
}
