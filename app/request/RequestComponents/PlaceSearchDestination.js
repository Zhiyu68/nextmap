"use client";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { useState, useEffect } from "react";

export default function PlaceSearchDestination(props) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
      // componentRestrictions: { country: "gb" },
      // sw:,
      // ne:,

      locationRestriction: {
        east: 0.26914680916940115, // longitude if eastern boundary
        north: 51.73574265105226, // latitude if northern boundary
        south: 51.09597246576255, // latitude if southern boundary
        west: -0.9572020976579318, // longitude if western boundary
      },
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When the user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        // console.log("📍 Coordinates: ", { lat, lng });
        props.setSearchDestinationLatitude(lat);
        props.setSearchDestinationLongitude(lng);
      });
    };

  useEffect(() => {
    if (props.searchDestinationLatitude && props.searchDestinationLongitude) {
      console.log(
        `Retrieved ${props.searchDestinationLatitude} and ${props.searchDestinationLongitude}`
      );
    }
  }, [props.searchDestinationLatitude, props.searchDestinationLongitude]);

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          className="bg-blue-100 my-2 cursor-pointer"
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref}>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        className="w-full bg-black my-2 h-10 rounded-xl text-white font-bold p-2"
        placeholder="Your Destination"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
}
