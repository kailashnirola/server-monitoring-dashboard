import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import api from "../services/api";

const COLORS = ["#3b82f6", "#e5e7eb"];

export default function Metrics() {
  const [metrics, setMetrics] = useState({ cpu: 0, ram: {}, disk: {}, net: {} });
  const [history, setHistory] = useState([]);

  const fetchMetrics = async () => {
    const [cpu, ram, disk, net] = await Promise.all([
      api.get("/metrics/cpu"),
      api.get("/metrics/ram"),
      api.get("/metrics/disk"),
      api.get("/metrics/network"),
    ]);

    const newMetrics = {
      timestamp: new Date().toLocaleTimeString(),
      cpu: cpu.data.percent,
      ram: ram.data.percent,
      disk: disk.data.percent,
      net_recv: net.data.bytes_recv,
      net_sent: net.data.bytes_sent,
    };

    setMetrics({
      cpu: cpu.data.percent,
      ram: ram.data,
      disk: disk.data,
      net: net.data,
    });

    setHistory((prev) => [...prev.slice(-19), newMetrics]);
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ml-80 p-6 space-y-6 bg-blue-700 rounded-xl w-full h-full">
      <div className="grid gap-6">
        <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
          <h3 className="font-semibold text-gray-700 mb-4">CPU Daily Usage</h3>
          <GaugeChart percent={metrics.cpu} />
          <p className="mt-4 text-sm text-gray-500">
            CPU usage is <span className="text-blue-600 font-medium">good</span>
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="font-semibold text-gray-700 mb-2">RAM Usage</h3>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" hide />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="ram"
                stroke="#6366f1"
                strokeWidth={2}
                fillOpacity={0.3}
                fill="#6366f1"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="font-semibold text-gray-700 mb-2">Network Received (bytes)</h3>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" hide />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="net_recv"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="font-semibold text-gray-700 mb-2">Network Sent (bytes)</h3>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" hide />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="net_sent"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md space-y-4">
          <div className="bg-orange-100 text-orange-700 p-4 rounded-lg text-center font-semibold text-lg">
            12 Most Recent Alarms
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
            <h4 className="font-medium text-gray-700 mb-2">Heat Map</h4>
            <PieChart width={160} height={160}>
              <Pie
                data={[
                  { name: "Clear", value: 60 },
                  { name: "Critical", value: 25 },
                  { name: "Trouble", value: 15 },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                <Cell fill="#8b5cf6" />
                <Cell fill="#ef4444" />
                <Cell fill="#facc15" />
              </Pie>
            </PieChart>
            <ul className="text-sm text-gray-600 space-y-1 mt-2 text-center">
              <li>
                <span className="inline-block w-3 h-3 bg-purple-600 rounded-full mr-2"></span>
                Clear
              </li>
              <li>
                <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                Critical
              </li>
              <li>
                <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                Trouble
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Active Instances</h3>
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs uppercase bg-gray-100 text-gray-500">
            <tr>
              <th className="px-4 py-2">Server</th>
              <th className="px-4 py-2">IP Address</th>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2">Tag</th>
              <th className="px-4 py-2">Provider</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: "Noveruche Admin",
                ip_address: "192.168.130.26",
                created_at: "2 Months ago",
                tag: "Web Server",
                provider: "Indioserver",
                color: "bg-red-100 text-red-600",
              },
              {
                name: "Developing Hier",
                ip_address: "192.168.130.26",
                created_at: "4 Months ago",
                tag: "Desky",
                provider: "Jeniorder",
                color: "bg-indigo-100 text-indigo-600",
              },
              {
                name: "Natural Dilam",
                ip_address: "192.168.130.26",
                created_at: "5 Months ago",
                tag: "Software",
                provider: "Wailkarsi",
                color: "bg-green-100 text-green-600",
              },
            ].map((instance, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 flex items-center gap-2">
                  <img
                    src={`https://i.pravatar.cc/30?img=${index + 1}`}
                    className="w-6 h-6 rounded-full"
                    alt="avatar"
                  />
                  {instance.name}
                </td>
                <td className="px-4 py-2">{instance.ip_address}</td>
                <td className="px-4 py-2">{instance.created_at}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${instance.color}`}>
                    {instance.tag}
                  </span>
                </td>
                <td className="px-4 py-2">{instance.provider}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GaugeChart({ percent }) {
  const usage = [
    { name: "Used", value: percent },
    { name: "Remaining", value: 100 - percent },
  ];

  return (
    <PieChart width={250} height={140}>
      <Pie
        data={usage}
        startAngle={180}
        endAngle={0}
        innerRadius={60}
        outerRadius={85}
        paddingAngle={3}
        dataKey="value"
      >
        {usage.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
      <text
        x={125}
        y={105}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-xl fill-gray-700"
      >
        {percent.toFixed(2)}%
      </text>
    </PieChart>
  );
}
