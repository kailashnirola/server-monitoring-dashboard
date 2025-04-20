import React from "react";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="flex justify-center bg-white shadow p-4 text-2xl font-bold ">Server Monitoring Dashboard</header>
      <Dashboard />
    </div>
  );
}
