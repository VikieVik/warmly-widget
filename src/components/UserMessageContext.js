/**
 * This context is used to store what user enters in chatbox
 * auth0
 */

import React, { useState, createContext } from "react";

export const UserMessageContext = createContext();

export const UserMessageContextProvider = (props) => {
  const [userMessage, setUserMessage] = useState("");

  return (
    <UserMessageContext.Provider value={[userMessage, setUserMessage]}>
      {props.children}
    </UserMessageContext.Provider>
  );
};
