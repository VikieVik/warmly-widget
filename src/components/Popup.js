import React, { useState } from "react";
import "../style.css";

export function Popup() {
  const popupContainerStyle = {
    fontFamily: "Be Vietnam Pro, sans-serif",
    position: "fixed",
    zIndex: 2147483003,
    bottom: "90px",
    right: "20px",
    background: "transparent",
    height: "450px",
    maxWidth: "350px",
    transition: "max-height .2s ease",
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  };

  const popupStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.10) 0px 0px 10px",
    height: "20px",
    width: "fit-content",
    maxWidth: "90%",
    border: "1px solid #dfdfdf",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "max-height .2s ease",
    fontWeight: "300",
    fontSize: "14px",
    padding: "15px",
    marginBottom: "5px",
    marginTop: "5px",
  };

  return (
    <React.Fragment>
      <div style={popupContainerStyle}>
        <div style={popupStyle}>Thanks for using Fusion. Chat is live now</div>
        <div style={popupStyle}>You can start using it</div>
      </div>
    </React.Fragment>
  );
}
