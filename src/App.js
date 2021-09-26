import React from "react";
import { ChatWidget } from "./components/ChatWidget.js";
import { MessagesContextProvider } from "./components/MessagesContext.js";
import { UserMessageContextProvider } from "./components/UserMessageContext.js";

export function App(props) {
  return (
    <div>
      {/* {props.hello} */}
      <UserMessageContextProvider>
        <MessagesContextProvider>
          <ChatWidget />
        </MessagesContextProvider>
      </UserMessageContextProvider>
    </div>
  );
}
