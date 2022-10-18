import { createContext, useContext, useState } from "react";

const ContextApp = createContext({
  user: null,
  existUser: (newUser) => {},
  logout: () => {},
});

const Store = ({ children }) => {
  const [user, setUser] = useState(null);

  const existUser = (newUser) => {
    setUser(newUser);
  };
  const logout = () => {
    setUser(null);
  };
  return (
    <ContextApp.Provider value={{ user, existUser, logout }}>
      {children}
    </ContextApp.Provider>
  );
};
const useAppContext = () => useContext(ContextApp);

export { Store, useAppContext };
