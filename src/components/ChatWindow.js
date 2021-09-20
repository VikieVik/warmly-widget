import React, { useEffect } from "react";

export function ChatWindow() {
  const widgetStyle = {
    position: "fixed",
    zIndex: 2147483003,
    bottom: "100px",
    right: "20px",
    background: "#f9f9f9",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 5px 40px",
    height: "75%",
    width: "380px",
    border: "1px solid #eee",
    borderRadius: "15px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justtifyContent: "flex-start",
  };

  const topBar = {
    height: "150px",
    width: "100%",
    background: "#1890ff",
    borderRadius: "15px 15px 0px 0px",
    marginBottom: "auto",
  };

  const headerText = {
    color: "#fff",
    margin: "15px 0px 10px 20px",
    fontSize: "32px",
    fontWeight: "500",
  };
  const descriptionText = {
    color: "#fff",
    margin: "10px 0px 10px 20px",
    fontSize: "18px",
    fontWeight: "400",
  };

  const textWindow = {
    height: "350px",
    width: "100%",
    background: "#fff",
    borderRadius: "0px",
    marginTop: "0px",
    marginBottom: "auto",
    overflowY: "scroll",
  };

  return (
    <React.Fragment>
      <div style={widgetStyle}>
        <div style={topBar}>
          <h1 style={headerText}>Hi there 👋</h1>
          <h1 style={descriptionText}>Sends us your queries !</h1>
          <div style={textWindow}>
            <ChatBubbleAgent />
            <ChatBubbleUser />
            <ChatBubbleUser />
            <ChatBubbleUser />
            <ChatBubbleUser />
            <ChatBubbleUser />
            <ChatBubbleUser />
            <ChatBubbleUser />
            <ChatBubbleUser />
            <ChatBubbleUser />
            <ChatBubbleUser />
            <ChatBubbleUser />
            <ChatBubbleUser />
            <ChatBubbleUser />
          </div>
        </div>
        <div></div>
      </div>
    </React.Fragment>
  );
}

function ChatBubbleUser() {
  const UserChatBubble = {
    minHeight: "20px",
    display: "flex",
    padding: "10px",
    width: "50%",
    background: "#1890ff",
    borderRadius: "5px",
    margin: "10px 10px 10px 0px",
    marginLeft: "auto",
  };

  return (
    <React.Fragment>
      <div style={UserChatBubble}>Aur bhai kya hal chal</div>
    </React.Fragment>
  );
}

function ChatBubbleAgent() {
  const agentChatBubble = {
    minHeight: "20px",
    display: "flex",
    padding: "10px",
    width: "30%",
    background: "#efefef",
    borderRadius: "5px",
    margin: "10px 0px 10px 10px",
    marginRight: "auto",
  };

  return (
    <React.Fragment>
      <div style={agentChatBubble}>hello there</div>
    </React.Fragment>
  );
}
