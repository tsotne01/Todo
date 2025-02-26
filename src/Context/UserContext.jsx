import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState();
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    if (authToken) {
      try {
        fetch("https://x8ki-letl-twmt.n7.xano.io/api:M18lWu4n/auth/me", {
          headers: { Authorization: `Bearer ${authToken}` },
        })
          .then((res) => res.json())
          .then((data) => setUserId(data.id));
      } catch (err) {
        console.error(err);
      }
    }
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
    } else {
      localStorage.setItem("authToken", authToken);
    }
  }, [authToken]);

  return (
    <UserContext.Provider value={{ authToken, setAuthToken, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
