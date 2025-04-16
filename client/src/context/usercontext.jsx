import React from 'react'
import { createContext, useState } from "react";
export const UserContext = createContext();
export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({ username: "", fname: "", lname: "", email: "", password: "" })
  const [burned, setburned] = useState(0)
  const [totalCals] = useState(2029)
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo,burned,setburned,totalCals }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
