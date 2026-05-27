import React, { useState } from "react";

export default function TestPage() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Test Page</h1>
      <p>This is a simple test page in React.</p>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Increment Count
        </button>
        <p style={{ fontSize: "18px", marginTop: "10px" }}>Count: {count}</p>
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "10px",
          backgroundColor: "#f0f0f0",
          borderRadius: "4px",
        }}
      >
        <h2>Test Items</h2>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    </div>
  );
}
