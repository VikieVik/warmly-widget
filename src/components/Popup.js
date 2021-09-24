import React from "react";
import "../style.css";

export function Popup(props) {
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
    overflowY: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  };

  var popupMessages = props.chats;

  return (
    <React.Fragment>
      <div style={popupContainerStyle}>
        {/* <div style={popupStyle}>{props.chats}</div> */}

        {popupMessages.map((popupMessage, index) => {
          if (popupMessage.author !== "user") {
            return <PopupBubble chat={popupMessage.content} key={index} />;
          }
        })}
      </div>
    </React.Fragment>
  );
}

//Popup bubble component
function PopupBubble(props) {
  const popupStyle = {
    display: "flex",
    justifyContent: "center",
    whiteSpace: "pre-line",
    alignItems: "center",
    background: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.10) 0px 0px 10px",
    minHeight: "20px",
    width: "fit-content",
    maxWidth: "90%",
    border: "1px solid #dfdfdf",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "max-height .2s ease",
    fontWeight: "300",
    fontSize: "14px",
    padding: "15px",
    marginBottom: "4px",
    marginTop: "4px",
  };
  return <div style={popupStyle}>{props.chat}</div>;
}
