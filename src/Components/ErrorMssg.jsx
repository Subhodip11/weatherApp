import React from "react";

const ErrorMssg = (props) => {
  return (
    <div
      style={{
        width: "70%",
        margin: "0 auto",
        backgroundColor: props.color,
        paddingLeft: "5rem",
      }}
    >
      <p>{props.code !== "" ? props.code + " - " + props.mssg : ""}</p>
    </div>
  );
};

export default ErrorMssg;
