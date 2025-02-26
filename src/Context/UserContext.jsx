import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [authToken, setAuthToken] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
    } else {
      localStorage.setItem("authToken", authToken);
    }
  }, [authToken]);

  useEffect(() => {
    if (authToken) {
      try {
        fetch("https://x8ki-letl-twmt.n7.xano.io/api:M18lWu4n/auth/me", {
          headers: { Authorization: `Bearer ${authToken}` },
        }).then((res)=>console.log(res.status));
      } catch (err) {
        console.error(err);
      }
    }
  }, [authToken]);

  return (
    <UserContext.Provider value={{ authToken, setAuthToken, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
