import React from "react";
import Metrics from "./Metrics";

export default function Dashboard() {
  return (
    <>
    <div className="flex justify-content-center grid grid-cols-1 lg:grid-cols-2 w-100% h-100%">
      <Metrics />
    </div>
    </>
  );
}
