import React, { useState, useEffect, useContext } from "react";
import "../style.css";
import { ChatWindow } from "./ChatWindow";
import { Popup } from "./Popup";
import { MessagesContext } from "./MessagesContext";
import { UserMessageContext } from "./UserMessageContext";

import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://localhost:8000/ws/chat/vikas/");

export function ChatWidget() {
  const [chatWindowDisplay, setChatWindowDisplay] = useState("block");
  const [popupDisplay, setPopupDisplay] = useState("block");
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useContext(MessagesContext);
  const [userMessage, setUserMessage] = useContext(UserMessageContext);
  const [messagesForPopup, setMessagesForPopup] = useState([]);

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
      setMessagesForPopup([]);
    } else {
      setChatWindowDisplay("none");
      setPopupDisplay("block");
    }
  };

  const handleWebSocketSend = (payloadToSend) => {
    if (payloadToSend !== "") {
      client.send(
        JSON.stringify({
          command: "new_message",
          room_name: "vikas",
          token: "123456",
          user_id: "44",
          device_id: "66",
          from: "user",
          text: `${payloadToSend}`,
        })
      );
    }
  };

  useEffect(() => {
    //console.log("widget running....");
    //connecting to web-socket chat server
    client.onopen = () => {
      //console.log("WebSocket Client Connected");
      //setServerConnected(true);
    };

    // receives both chats received from agent and chat delivered from user
    client.onmessage = (message) => {
      let incomingMessage = JSON.parse(message.data).message;
      //console.log(incomingMessage);
      let updatedChats = [...chats, incomingMessage];
      setChats(updatedChats);
      setMessages(updatedChats);

      if (popupDisplay !== "none") {
        let updatedMessagesForPopup = [...messagesForPopup, incomingMessage];
        setMessagesForPopup(updatedMessagesForPopup);
      }
    };
  });

  // check if new message saved in userMessage context
  // if yes send it chat-server then empty userMessage context
  useEffect(() => {
    handleWebSocketSend(userMessage);
    setUserMessage("");
  }, [userMessage]);

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
        <Popup chats={messagesForPopup} />
      </div>
    </React.Fragment>
  );
}
