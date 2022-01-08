import React from "react";

const HumidityWindDetail = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0.5rem 0.2rem",
      }}
    >
      <div style={{ fontSize: "0.9rem", color: "gray" }}>
        {props.weatherText}
      </div>
      <div style={{ fontWeight: "bold", color: "white" }}>
        {props.weatherValue}
      </div>
    </div>
  );
};

export default HumidityWindDetail;
