import React from "react";

const rows = [
  { id: "1", endpoint: "/api/users", method: "GET", status: "200", time: "45ms" },
  { id: "2", endpoint: "/api/orders", method: "POST", status: "201", time: "120ms" },
  { id: "3", endpoint: "/api/auth", method: "POST", status: "401", time: "12ms" },
];

export const MockScreenshot: React.FC = () => {
  return (
    <div
      style={{
        width: 720,
        height: 460,
        backgroundColor: "#1e1e2e",
        borderRadius: 16,
        padding: 24,
        fontFamily: "monospace",
        color: "#cdd6f4",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
        border: "1px solid #313244",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 20,
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#f38ba8" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#f9e2af" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#a6e3a1" }} />
        <span style={{ marginLeft: 12, fontSize: 14, color: "#6c7086" }}>
          API Dashboard
        </span>
      </div>

      {/* Table header */}
      <div
        style={{
          display: "flex",
          padding: "10px 16px",
          backgroundColor: "#313244",
          borderRadius: 8,
          marginBottom: 4,
          fontSize: 13,
          fontWeight: 700,
          color: "#89b4fa",
        }}
      >
        <span style={{ width: 40 }}>ID</span>
        <span style={{ flex: 1 }}>Endpoint</span>
        <span style={{ width: 80 }}>Method</span>
        <span style={{ width: 70 }}>Status</span>
        <span style={{ width: 70, textAlign: "right" }}>Time</span>
      </div>

      {/* Table rows */}
      {rows.map((row) => (
        <div
          key={row.id}
          style={{
            display: "flex",
            padding: "12px 16px",
            fontSize: 14,
            borderBottom: "1px solid #313244",
            alignItems: "center",
          }}
        >
          <span style={{ width: 40, color: "#6c7086" }}>{row.id}</span>
          <span style={{ flex: 1, color: "#cdd6f4" }}>{row.endpoint}</span>
          <span
            style={{
              width: 80,
              color: row.method === "GET" ? "#a6e3a1" : "#f9e2af",
            }}
          >
            {row.method}
          </span>
          <span
            style={{
              width: 70,
              color: row.status === "401" ? "#f38ba8" : "#a6e3a1",
            }}
          >
            {row.status}
          </span>
          <span style={{ width: 70, textAlign: "right", color: "#6c7086" }}>
            {row.time}
          </span>
        </div>
      ))}
    </div>
  );
};
