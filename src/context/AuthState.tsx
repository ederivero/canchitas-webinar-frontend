import { ReactNode } from "react";
import { isAuthenticated } from "../services/auth";
import { AuthContext } from './AuthContext';

const AuthState: React.FC<{ children: ReactNode }> = ({ children }) => {

    const isLogged = isAuthenticated();

    return (
        <AuthContext.Provider
            value={{
                isLogged: isLogged
            }}
        >
            {children}
        </AuthContext.Provider >
    )
}

export { AuthState };