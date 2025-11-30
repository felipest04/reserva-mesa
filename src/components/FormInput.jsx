import React from "react";

export default function FormInput({ label, value, onChange, type = "text" }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>
        {label}:
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ marginLeft: "0.5rem" }}
        />
      </label>
    </div>
  );
}
