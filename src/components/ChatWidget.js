import React, { useState, useEffect, useContext } from "react";
import "../style.css";
import { ChatWindow } from "./ChatWindow";
import { Popup } from "./Popup";
import { MessagesContext } from "./MessagesContext";
import { UserMessageContext } from "./UserMessageContext";
import { motion } from "framer-motion";

import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://localhost:8000/ws/chat/vikas/");

export function ChatWidget() {
  const [chatWindowDisplay, setChatWindowDisplay] = useState("none");
  const [popupDisplay, setPopupDisplay] = useState("block");
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useContext(MessagesContext);
  const [userMessage, setUserMessage] = useContext(UserMessageContext);
  const [messagesForPopup, setMessagesForPopup] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);

  const toggleWidget = () => {
    if (chatWindowDisplay == "none") {
      setChatWindowDisplay("block");
      setChatOpen(true);
      setPopupDisplay("none");
      setMessagesForPopup([]);
    } else {
      setChatOpen(false);
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
      console.log("WebSocket Client Connected");
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
      <motion.button
        animate={{
          Y: 0,
          opacity: 1,
          rotate: 360,
        }}
        initial={{
          opacity: 0.01,
          Y: 10,
        }}
        transition={{
          type: "spring",
          stiffness: 25,
          damping: 10,
        }}
        id="chat-widget-button"
        // style={widgetStyle}
        onClick={toggleWidget}
      >
        {/** chat widget icon */}

        <svg
          style={{ display: `${popupDisplay}`, marginLeft: "10px" }}
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

        {/** down arrow icon */}
        <svg
          style={{
            display: `${chatWindowDisplay}`,
            marginLeft: "12px",
            marginTop: "2px",
          }}
          width="22"
          height="14"
          viewBox="0 0 22 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 2L11 12L20 2"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>

      <motion.div
        animate={chatOpen ? "open" : "closed"}
        initial="closed"
        variants={{
          closed: { opacity: 0 },
          open: { opacity: 1 },
        }}
        transition={{ duration: 0.2, ease: "easeIn" }}
      >
        <ChatWindow />
      </motion.div>

      <motion.div
        animate={chatOpen ? "closed" : "open"}
        initial="closed"
        variants={{
          closed: { opacity: 0 },
          open: { opacity: 1 },
        }}
        transition={{ duration: 0.2, ease: "easeIn" }}
      >
        <Popup chats={messagesForPopup} />
      </motion.div>
    </React.Fragment>
  );
}
