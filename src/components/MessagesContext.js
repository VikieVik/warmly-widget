/**
 * This context is used to store all user messages to be rendered
 * auth0
 */

import React, { useState, createContext } from "react";

export const MessagesContext = createContext();

export const MessagesContextProvider = (props) => {
  const [messages, setMessages] = useState([]);

  return (
    <MessagesContext.Provider value={[messages, setMessages]}>
      {props.children}
    </MessagesContext.Provider>
  );
};
