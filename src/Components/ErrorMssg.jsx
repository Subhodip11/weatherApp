import React from "react";

const ErrorMssg = (props) => {
  return (
    <div
      style={{
        width: "70%",
        margin: "1rem auto",
        backgroundColor: props.color,
        color: props.textColor,
        paddingLeft: "5rem",
        paddingRight: "1rem",
        fontSize: "14px",
        display: "flex",
        justifyContent: "space-between",
        zIndex: props.zIndex,
      }}
    >
      <p>{props.code !== "" ? props.code + " - " + props.mssg : props.mssg}</p>
      <button
        style={{
          border: "none",
          color: props.textColor,
          fontSize: "17px",
          fontWeight: "bold",
          background: "transparent",
        }}
        onClick={() => {
          props.setMssgVisibility(false);
        }}
      >
        X
      </button>
    </div>
  );
};

export default ErrorMssg;
