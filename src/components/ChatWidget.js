import React, { useState, useEffect, useContext } from "react";
import "../style.css";
import { ChatWindow } from "./ChatWindow";
import { Popup } from "./Popup";
import { MessagesContext } from "./MessagesContext";

export function ChatWidget() {
  const [chatWindowDisplay, setChatWindowDisplay] = useState("none");
  const [popupDisplay, setPopupDisplay] = useState("block");

  const [messages, setMessages] = useContext(MessagesContext);

  const widgetStyle = {
    position: "fixed",
    zIndex: 2147483003,
    bottom: "20px",
    right: "20px",
    background: "#1890ff",
    height: "60px",
    width: "60px",
    border: "1px",
    borderRadius: "50px",
    cursor: "pointer",
  };

  const toggleWidget = () => {
    if (chatWindowDisplay == "none") {
      setChatWindowDisplay("block");
      setPopupDisplay("none");
    } else {
      setChatWindowDisplay("none");
      setPopupDisplay("block");
    }
  };

  return (
    <React.Fragment>
      <button
        id="chat-widget-button"
        style={widgetStyle}
        onClick={toggleWidget}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="28" height="28" rx="14" fill="white" />
          <path
            d="M0.000260353 28L0.000260353 14L14.9336 28L0.000260353 28Z"
            fill="white"
          />
        </svg>
      </button>

      <div style={{ display: `${chatWindowDisplay}` }}>
        <ChatWindow />
      </div>

      <div style={{ display: `${popupDisplay}` }}>
        <Popup />
      </div>
    </React.Fragment>
  );
}
