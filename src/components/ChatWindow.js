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
  const [emailVisible, setEmailVisible] = useState("block");
  const [inputEnabled, setInputEnabled] = useState("not-allowed");
  const [inputDisabled, setInputDisabled] = useState("true");

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

  const isUserEmail = (email) => {
    if (localStorage.getItem("emailInput")) {
      return false;
    }
    if (email.length > 0 && email.indexOf("@") > 0) {
      return false;
    } else {
      return true;
    }
  };

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
            href="https://warmly.ai?ref=widget-branding"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by Warmly
          </a>
        </div>

        <div id="input-section">
          <input
            id="email-input"
            type="text"
            autoFocus
            placeholder="What's your email address ?"
          />

          <div id="divider"></div>
          <div id="input-section-2">
            <input
              id="text-input"
              type="text"
              placeholder="Reply here"
              className="fusion-no-capture"
            />

            <button
              id="send-button"
              className="fusion-no-capture"
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
