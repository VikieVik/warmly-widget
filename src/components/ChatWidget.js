import React, { useState, useEffect, useContext, useRef } from "react";
import "../style.css";
import { ChatWindow } from "./ChatWindow";
import { Popup } from "./Popup";
import { MessagesContext } from "./MessagesContext";
import { UserMessageContext } from "./UserMessageContext";
import { UserInfoContext } from "./UserInfoContext";
import { motion } from "framer-motion";
import { config } from "../config";
import { createCookie } from "../utils.js";

var client;

export function ChatWidget() {
  const [chatWindowDisplay, setChatWindowDisplay] = useState("none");
  const [parentBoxHeight, setParentBoxHeight] = useState("0vh");
  const [popupDisplay, setPopupDisplay] = useState("block");
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useContext(MessagesContext);
  const [userMessage, setUserMessage] = useContext(UserMessageContext);
  const [userInfo, setUserInfo] = useContext(UserInfoContext);

  const [messagesForPopup, setMessagesForPopup] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);

  const toggleWidget = () => {
    if (chatWindowDisplay == "none") {
      setChatWindowDisplay("block");
      setParentBoxHeight("100vh");
      setPopupDisplay("none");
      setMessagesForPopup([]);
      setChatOpen(true);
    } else {
      setChatWindowDisplay("none");
      setParentBoxHeight("0vh");
      setPopupDisplay("block");
      setChatOpen(false);
    }
  };

  //set widget cookie to true if email already sent
  const setWidgetCookie = () => {
    createCookie(`fusion_widget_${config.token}`, "true", 730);
  };

  const handleEmailSend = (userInfoToSend) => {
    if (userInfoToSend !== "") {
      //console.log("email sending");
      // TODO:convert to socket io
      //send message to channel
      // client.send(
      //   JSON.stringify({
      //     command: "user_info",
      //     room_name: `${config.token}`,
      //     token: `${config.token}`,
      //     email: `${userInfoToSend}`,
      //     user_id: `${config.userId}`,
      //     device_id: `${config.deviceId}`,
      //     from: "user",
      //   })
      // );
      // setWidgetCookie();
    }
  };

  const handleWebSocketSend = (payloadToSend) => {
    if (payloadToSend !== "") {
      //console.log("chat sending");
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

  return (
    <div id="parent-box" style={{ height: `${parentBoxHeight}` }}>
      <motion.div
        animate={chatOpen ? "open" : "closed"}
        initial="closed"
        variants={{
          closed: { opacity: 0 },
          open: { opacity: 1 },
        }}
        transition={{ duration: 0.05, ease: "easeIn" }}
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
        transition={{ duration: 0.05, ease: "easeIn" }}
      >
        <Popup chats={messagesForPopup} />
      </motion.div>
      <motion.button
        animate={{
          Y: 0,
          opacity: 1,
        }}
        initial={{
          opacity: 0.01,
          Y: 10,
        }}
        // transition={{
        //   type: "spring",
        //   stiffness: 30,
        //   damping: 10,
        // }}
        id="chat-widget"
        style={{
          background: `${config.primaryColor}`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={toggleWidget}
        className="fusion-no-capture"
      >
        {/**  chat widget icon(chat window closed) */}
        <svg
          style={{
            display: `${popupDisplay}`,
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
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 0C2.23858 0 0 2.23858 0 5V24C0 26.7614 2.23858 29 5 29H24C26.7614 29 29 26.7614 29 24V5C29 2.23858 26.7614 0 24 0H5ZM7.61991 20.7588C10.1149 23.5048 15.5688 26.381 22.0771 20.8369C22.4197 20.545 22.2093 20 21.7592 20H7.9821C7.57341 20 7.34508 20.4563 7.61991 20.7588Z"
            fill="white"
          />
        </svg>

        {/** down arrow icon(chat window opened) */}
        <svg
          style={{
            display: `${chatWindowDisplay}`,
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
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>
    </div>
  );
}
