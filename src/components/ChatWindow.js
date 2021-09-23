import React, { useState, useEffect } from "react";
import "../style.css";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://localhost:8000/ws/chat/vikas/");

export function ChatWindow(props) {
  const [serverConnected, setServerConnected] = useState(false);
  const [userInput, setUserInput] = useState("");

  const [chats, setChats] = useState([]);

  const widgetStyle = {
    fontFamily: "Be Vietnam Pro, sans-serif",
    position: "fixed",
    zIndex: 2147483003,
    bottom: "100px",
    right: "20px",
    background: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 5px 40px",
    height: "670px",
    width: "380px",
    border: "1px solid #dfdfdf",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "max-height .2s ease",
  };

  const topBar = {
    height: "100px",
    width: "100%",
    background: "#1890ff",
    borderRadius: "15px 15px 0px 0px",
    marginBottom: "auto",
    marginTop: "0px",
  };

  const headerText = {
    color: "#fff",
    margin: "0px 0px 10px 20px",
    paddingTop: "15px",
    fontWeight: "500",
    fontSize: "25px",
  };
  const descriptionText = {
    color: "#fff",
    margin: "0px 0px 0px 20px",
    fontSize: "16px",
    fontWeight: "300",
  };

  const textWindow = {
    height: "480px",
    width: "100%",
    marginBottom: "auto",
    background: "#fafafa",
    borderRadius: "0px",
    overflowY: "scroll",
  };

  const fusionBranding = {
    height: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: "auto",
    background: "#f9f9f9",
    borderRadius: "0px",
    borderBottom: "1px solid #dfdfdf",
    fontSize: "12px",
    fontWeight: "400",
  };

  // handle input entered in input field
  const handleUserInput = (event) => {
    event.preventDefault();
    setUserInput(event.target.value);
  };

  const handleSendButton = () => {
    if (userInput !== "") {
      handleWebSocketSend(userInput);
    }
  };

  const handleWebSocketSend = (payloadToSend) => {
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
  };

  useEffect(() => {
    //console.log("widget running....");
    //connecting to web-socket chat server
    client.onopen = (socket) => {
      //console.log("WebSocket Client Connected");
      setServerConnected(true);
    };

    // receives both chats received from agent and chat delivered from user
    client.onmessage = (message) => {
      let incomingMessage = JSON.parse(message.data).message;
      //console.log(incomingMessage);
      let updatedChats = [...chats, incomingMessage];
      setChats(updatedChats);
    };
  });

  return (
    <React.Fragment>
      <div style={widgetStyle} id="chat-window">
        <div style={topBar}>
          <h1 style={headerText}>Hi there 👋</h1>
          <h1 style={descriptionText}>We are away at this momment</h1>
        </div>

        <div style={textWindow}>
          {/** Render chats */}
          {chats.map((chat, index) => {
            if (chat.author == "user") {
              return <ChatBubbleUser chat={chat.content} key={index} />;
            } else {
              return <ChatBubbleAgent chat={chat.content} key={index} />;
            }
          })}
        </div>

        <div style={fusionBranding}>
          <a
            id="fusion-website-link"
            href="https://fusionhq.co"
            target="_blank"
          >
            powered by Fusion
          </a>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
          }}
        >
          <input
            onChange={handleUserInput}
            id="text-input"
            type="text"
            placeholder="Reply here..."
          />
          <button id="send-button" onClick={handleSendButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 26 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-send"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

function ChatBubbleUser(props) {
  const UserChatBubble = {
    minHeight: "20px",
    display: "flex",
    padding: "10px",
    width: "fit-content",
    maxWidth: "90%",
    background: "#eaeaea",
    color: "#000",
    borderRadius: "10px",
    margin: "10px 10px 10px 0px",
    marginLeft: "auto",
    fontWeight: "300",
    fontSize: "14px",
  };

  return (
    <React.Fragment>
      <div style={UserChatBubble}>{props.chat}</div>
    </React.Fragment>
  );
}

function ChatBubbleAgent(props) {
  const agentChatBubble = {
    minHeight: "20px",
    display: "flex",
    padding: "10px",
    width: "fit-content",
    maxWidth: "90%",
    background: "#1890ff",
    color: "#fff",
    borderRadius: "10px",
    margin: "10px 0px 10px 10px",
    marginRight: "auto",
    fontWeight: "300",
    fontSize: "14px",
  };

  return (
    <React.Fragment>
      <div style={agentChatBubble}>{props.chat}</div>
    </React.Fragment>
  );
}
