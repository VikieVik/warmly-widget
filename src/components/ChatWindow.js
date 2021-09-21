import React from "react";
import "../style.css";

export function ChatWindow() {
  const widgetStyle = {
    fontFamily: "Be Vietnam Pro, sans-serif",
    position: "fixed",
    zIndex: 2147483003,
    bottom: "100px",
    right: "20px",
    background: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 5px 40px",
    height: "650px",
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
    height: "460px",
    width: "100%",
    marginBottom: "auto",
    background: "#f9f9f9",
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

  return (
    <React.Fragment>
      <div style={widgetStyle} id="chat-window">
        <div style={topBar}>
          <h1 style={headerText}>Hi there 👋</h1>
          <h1 style={descriptionText}>We are away at this momment</h1>
        </div>

        <div style={textWindow}>
          <ChatBubbleAgent chat="hello there how may i help nothing just checking out your website nothing just checking out your website" />
          <ChatBubbleUser chat="nothing just checking out your website" />
          <ChatBubbleUser chat="nothing just checking out your website" />
          <ChatBubbleUser chat="nothing just checking out your website" />
          <ChatBubbleAgent chat="he" />
          <ChatBubbleAgent chat="hello there how may i help" />
          <ChatBubbleAgent chat="hello there how may i help" />
          <ChatBubbleUser chat="nothing just checking out your website" />
          <ChatBubbleUser chat="nothing just checking out your website" />
          <ChatBubbleAgent chat="hello there how may i help" />
          <ChatBubbleAgent chat="hello there how may i help" />
          <ChatBubbleAgent chat="q" />
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
            id="text-input"
            type="text"
            placeholder="Write your message here..."
          />
          <button id="send-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 26 20"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-send"
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
    width: "50%",
    background: "#1890ff",
    color: "#fff",
    borderRadius: "5px",
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
    width: "50%",
    background: "#efefef",
    color: "#000",
    borderRadius: "5px",
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
