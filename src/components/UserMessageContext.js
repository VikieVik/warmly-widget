/**
 * This context is used to store what user enters in chatbox
 * auth0
 */

import React, { useState, createContext } from "react";

export const UserMessageContext = createContext();

export const UserMessageContextProvider = (props) => {
  const [userInput, setUserInput] = useState("");

  return (
    <UserMessageContext.Provider value={[userInput, setUserInput]}>
      {props.children}
    </UserMessageContext.Provider>
  );
};
