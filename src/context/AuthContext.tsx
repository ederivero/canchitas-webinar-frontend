import { createContext } from "react";

const AuthContext = createContext({ isLogged: false });

export { AuthContext };