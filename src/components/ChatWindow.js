import React, { useState, useEffect, useContext, useRef } from "react";
import "../style.css";
import { MessagesContext } from "./MessagesContext";
import { UserMessageContext } from "./UserMessageContext";
import { UserInfoContext } from "./UserInfoContext";
import { motion } from "framer-motion";
import { config } from "../config";
import { readCookie, createCookie } from "../utils";

export function ChatWindow(props) {
  const [userMessage, setUserMessage] = useContext(UserMessageContext);
  const [userInfo, setUserInfo] = useContext(UserInfoContext);
  const [messages, setMessages] = useContext(MessagesContext);
  const [userInput, setUserInput] = useState("");
  const [userEmailInput, setUserEmailInput] = useState("");
  const [emailVisible, setEmailVisible] = useState("block");
  const [inputEnabled, setInputEnabled] = useState("not-allowed");

  const scrollRef = useRef();

  // handle input entered in input field
  const handleUserInput = (event) => {
    event.preventDefault();
    setUserInput(event.target.value);
  };

  // handle input entered in input field
  const handleEmailInput = (event) => {
    event.preventDefault();
    setUserEmailInput(event.target.value);
  };

  const handleSendButton = () => {
    if (userInput !== "") {
      //handleWebSocketSend(userInput);
      // save Message to send into userMessage context
      setUserMessage(userInput);
      //set user email to context
      if (userEmailInput !== "") {
        setUserInfo(userEmailInput);
        setWidgetCookie();
        setEmailVisible("none");
      }
    }
  };

  //set widget cookie to true if email already sent
  const setWidgetCookie = () => {
    createCookie(`fusion_widget_${config.token}`, "true", 730);
  };

  useEffect(() => {
    //get if email was sent prev from widget cookie
    var fusionWidgetCookie = readCookie(`fusion_widget_${config.token}`);
    console.log(fusionWidgetCookie);
    if (fusionWidgetCookie === "false") {
      setEmailVisible("block");
      setInputEnabled("not-allowed");
    } else {
      setEmailVisible("none");
      setInputEnabled("pointer");
    }
  }, []);

  //autoscroll chat window on new messages
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <React.Fragment>
      <motion.div id="chat-window">
        <div id="top-bar" style={{ background: `${config.primaryColor}` }}>
          <h1 id="header-text">{config.title}</h1>
          <h1 id="description-text">{config.subtitle}</h1>
        </div>

        <div id="text-window">
          {/** Render chats */}
          {messages.map((chat, index) => {
            if (chat.author == "user") {
              return (
                <div ref={scrollRef}>
                  <ChatBubbleUser chat={chat.content} key={index} />
                </div>
              );
            } else {
              return (
                <div ref={scrollRef}>
                  <ChatBubbleAgent chat={chat.content} key={index} />
                </div>
              );
            }
          })}
        </div>

        <div id="fusion-branding">
          <a
            id="fusion-website-link"
            href="https://fusionhq.co?ref=widget-branding"
            target="_blank"
            rel="noopener noreferrer"
          >
            powered by Fusion
          </a>
        </div>

        <div id="input-section">
          <input
            style={{ display: `${emailVisible}` }}
            id="email-input"
            onChange={handleEmailInput}
            type="email"
            placeholder="Enter your email first..."
          />

          <div id="divider" style={{ display: `${emailVisible}` }}></div>
          <div id="input-section-2">
            <input
              onChange={handleUserInput}
              id="text-input"
              style={{ cursor: `${inputEnabled}` }}
              type="text"
              // disabled={false}
              placeholder="Reply here..."
            />

            <button
              id="send-button"
              onClick={handleSendButton}
              style={{
                background: `${config.primaryColor}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <svg
                style={{ background: `${config.primaryColor}` }}
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
      <div
        id="agent-chat-bubble"
        style={{ background: `${config.primaryColor}` }}
      >
        {props.chat}
      </div>
    </React.Fragment>
  );
}
