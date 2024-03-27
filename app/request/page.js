import React from "react";
import ParentRequestComponent from "./RequestComponents/ParentRequestComponent";

export const metadata = {
  title: "Trip Request | Next",
  description: "Make a trip request tp go anywhere in London",
};

export default function RequestPage() {
  return <ParentRequestComponent />;
}
