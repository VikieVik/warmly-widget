import React from "react";
import { ChatWidget } from "./components/ChatWidget.js";
import { MessagesContextProvider } from "./components/MessagesContext.js";
import { UserMessageContextProvider } from "./components/UserMessageContext.js";
import { config } from "./config";
import { readCookie } from "./utils.js";

console.log("App");

export function App(props) {
  console.log("App-1");

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
