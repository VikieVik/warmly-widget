import React from "react";
import { ChatWidget } from "./components/ChatWidget.js";
import { MessagesContextProvider } from "./components/MessagesContext.js";
import { UserMessageContextProvider } from "./components/UserMessageContext.js";
import { UserInfoContextProvider } from "./components/UserInfoContext.js";

export function App(props) {
  return (
    <div>
      {/* {props.hello} */}
      <UserMessageContextProvider>
        <UserInfoContextProvider>
          <MessagesContextProvider>
            <ChatWidget />
          </MessagesContextProvider>
        </UserInfoContextProvider>
      </UserMessageContextProvider>
    </div>
  );
}
