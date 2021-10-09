import React, { useState, useEffect, useContext, useRef } from "react";
import "../style.css";
import { ChatWindow } from "./ChatWindow";
import { Popup } from "./Popup";
import { MessagesContext } from "./MessagesContext";
import { UserMessageContext } from "./UserMessageContext";
import { motion } from "framer-motion";
import { config } from "../config";
import { w3cwebsocket as W3CWebSocket } from "websocket";

var client;

export function ChatWidget() {
  if (client == undefined) {
    let room = `${config.token}`;
    client = new W3CWebSocket(`${config.baseUrl}/ws/chat/${room}/`);
  }

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
      fetchPreviousChats(config.userId, config.deviceId);
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
          room_name: `${config.token}`,
          token: `${config.token}`,
          user_id: `${config.userId}`,
          device_id: `${config.deviceId}`,
          from: "user",
          text: `${payloadToSend}`,
        })
      );
    }
  };

  const fetchPreviousChats = (userId, deviceId) => {
    const preChats = client.send(
      JSON.stringify({
        command: "fetch_messages",
        room_name: `${config.token}`,
        token: `${config.token}`,
        user_id: `${config.userId}`,
        device_id: `${config.deviceId}`,
      })
    );
    //console.log(preChats);
  };

  // connect to private room and handle incoming messages
  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected - private room");
    };

    // receives both chats received from agent and chat delivered from user
    client.onmessage = (message) => {
      let incomingMessage = JSON.parse(message.data);

      let messageContent = incomingMessage.message;

      //let incomingMessage = JSON.parse(message.data).message;

      //if incoming message is a single new message
      if (incomingMessage.command === "new_message") {
        //check if message from agent in the room is for this user
        if (
          messageContent.user_id == config.userId &&
          messageContent.device_id == config.deviceId
        ) {
          console.log(messageContent);
          let updatedChats = [...chats, messageContent];
          setChats(updatedChats);
          setMessages(updatedChats);

          if (popupDisplay !== "none") {
            let updatedMessagesForPopup = [...messagesForPopup, messageContent];
            setMessagesForPopup(updatedMessagesForPopup);
          }
        }
      }
      // else if incoming message command is messages(last 50 conversation data)
      else if (incomingMessage.command === "messages") {
        let lastFiftyChats = incomingMessage.messages
          .slice(0)
          .reverse()
          .map((element) => {
            return element;
          });
        //console.log(lastFiftyChats);
        let updatedChats = [...lastFiftyChats];
        setChats(updatedChats);
        setMessages(updatedChats);
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
        id="chat-widget"
        style={{ background: `${config.primaryColor}` }}
        onClick={toggleWidget}
      >
        {/** chat widget icon */}
        {/* <svg
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
        </svg> */}

        {/** smiley chat widget icon */}
        {/* <svg
          style={{ display: `${popupDisplay}`, marginLeft: "10px" }}
          width="32"
          height="32"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.000260353 28L0.000260353 14L14.9336 28L0.000260353 28Z"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14 0C6.26953 0 0 6.26801 0 14C0 21.732 6.26953 28 14 28C21.7305 28 28 21.732 28 14C28 6.26801 21.7305 0 14 0ZM10.6719 20.8909C12.9531 23.5727 17.6758 26.2479 23.0781 20.9695C23.4492 20.6084 23.1875 20 22.668 20H11.1172C10.6406 20 10.3633 20.5265 10.6719 20.8909Z"
            fill="white"
          />
        </svg> */}

        {/** smiley chat widget icon - square*/}
        <svg
          style={{
            display: `${popupDisplay}`,
            marginLeft: "10px",
            marginTop: "2px",
          }}
          width="29"
          height="34"
          viewBox="0 0 29 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.669069 33.3918C0.41212 33.6253 -2.38419e-07 33.443 -2.38419e-07 33.0958L-2.38419e-07 24.4C-2.38419e-07 24.1791 0.179086 24 0.4 24H9.96536C10.331 24 10.505 24.45 10.2344 24.696L0.669069 33.3918Z"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5 0C2.23858 0 0 2.23858 0 5V24C0 26.7614 2.23858 29 5 29H24C26.7614 29 29 26.7614 29 24V5C29 2.23858 26.7614 0 24 0H5ZM7.61991 20.7588C10.1149 23.5048 15.5688 26.381 22.0771 20.8369C22.4197 20.545 22.2093 20 21.7592 20H7.9821C7.57341 20 7.34508 20.4563 7.61991 20.7588Z"
            fill="white"
          />
        </svg>

        {/** down arrow icon */}

        <svg
          style={{
            display: `${chatWindowDisplay}`,
            marginLeft: "15px",
            marginTop: "3px",
          }}
          width="19"
          height="12"
          viewBox="0 0 19 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 2L9.5 10L17 2"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
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
