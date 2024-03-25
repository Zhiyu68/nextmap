import React from "react";
import MapComponent from "./RequestComponents/MapComponent";
import RequestForm from "./RequestComponents/RequestForm";

export const metadata = {
  title: "Trip Request | Next",
  description: "Make a trip request tp go anywhere in London",
};

export default function RequestPage() {
  return (
    <div className="flex">
      <div className="w-1/5">
        <RequestForm />
      </div>
      <div className="w-4/5">
        <MapComponent />
      </div>
    </div>
  );
}
