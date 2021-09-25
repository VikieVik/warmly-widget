import React, { useState, useEffect, useContext } from "react";
import "../style.css";
import { MessagesContext } from "./MessagesContext";
import { UserMessageContext } from "./UserMessageContext";
import { motion } from "framer-motion";
import { config } from "../config";

console.log("chat-window");

export function ChatWindow(props) {
  console.log("chat-window-1");

  const [userMessage, setUserMessage] = useContext(UserMessageContext);
  const [messages, setMessages] = useContext(MessagesContext);
  const [userInput, setUserInput] = useState("");

  // handle input entered in input field
  const handleUserInput = (event) => {
    event.preventDefault();
    setUserInput(event.target.value);
  };

  const handleSendButton = () => {
    if (userInput !== "") {
      //handleWebSocketSend(userInput);

      // save Message to send into userMessage context
      setUserMessage(userInput);
    }
  };

  // const handleWebSocketSend = (payloadToSend) => {
  //   client.send(
  //     JSON.stringify({
  //       command: "new_message",
  //       room_name: "vikas",
  //       token: "123456",
  //       user_id: "44",
  //       device_id: "66",
  //       from: "user",
  //       text: `${payloadToSend}`,
  //     })
  //   );
  // };

  // useEffect(() => {
  //   //console.log("widget running....");
  //   //connecting to web-socket chat server
  //   client.onopen = (socket) => {
  //     //console.log("WebSocket Client Connected");
  //     setServerConnected(true);
  //   };

  //   // receives both chats received from agent and chat delivered from user
  //   client.onmessage = (message) => {
  //     let incomingMessage = JSON.parse(message.data).message;
  //     //console.log(incomingMessage);
  //     let updatedChats = [...chats, incomingMessage];
  //     setChats(updatedChats);
  //     setMessages(updatedChats);
  //   };
  // });

  return (
    <React.Fragment>
      <motion.div id="chat-window">
        <div id="top-bar">
          <h1 id="header-text">{config.title}</h1>
          <h1 id="description-text">{config.subtitle}</h1>
        </div>

        <div id="text-window">
          {/** Render chats */}
          {messages.map((chat, index) => {
            if (chat.author == "user") {
              return <ChatBubbleUser chat={chat.content} key={index} />;
            } else {
              return <ChatBubbleAgent chat={chat.content} key={index} />;
            }
          })}
        </div>

        <div id="fusion-branding">
          <a
            id="fusion-website-link"
            href="https://fusionhq.co"
            target="_blank"
            rel="noopener noreferrer"
          >
            powered by Fusion
          </a>
        </div>

        <div id="input-section">
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
      </motion.div>
    </React.Fragment>
  );
}

function ChatBubbleUser(props) {
  return (
    <React.Fragment>
      <div id="user-chat-bubble">{props.chat}</div>
    </React.Fragment>
  );
}

function ChatBubbleAgent(props) {
  return (
    <React.Fragment>
      <div id="agent-chat-bubble">{props.chat}</div>
    </React.Fragment>
  );
}
