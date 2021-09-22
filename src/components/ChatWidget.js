import React, { useState, useEffect } from "react";
import "../style.css";
import { ChatWindow } from "../components/ChatWindow.js";
import { w3cwebsocket as W3CWebSocket } from "websocket";

export function ChatWidget() {
  const [chatWindowDisplay, setChatWindowDisplay] = useState("block");

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
    } else {
      setChatWindowDisplay("none");
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
        {/**        <ChatWindow chats={chats} />
         */}
        <ChatWindow />
      </div>
    </React.Fragment>
  );
}
