/**
 * This context is used to store what user enters in chatbox
 * auth0
 */

import React, { useState, createContext } from "react";

export const UserInfoContext = createContext();

export const UserInfoContextProvider = (props) => {
  const [userInfo, setUserInfo] = useState("");

  return (
    <UserInfoContext.Provider value={[userInfo, setUserInfo]}>
      {props.children}
    </UserInfoContext.Provider>
  );
};
