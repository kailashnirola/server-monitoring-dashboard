import React from "react";
import Metrics from "./Metrics";

export default function Dashboard() {
  return (
    // <div className="min-h-screen bg-gray-100 p-6 gap-6 w-100% h-100%">
    <>
    <div className="flex justify-content-center grid grid-cols-1 lg:grid-cols-2 w-100% h-100%">
      <Metrics />
    </div>
    </>
  );
}
