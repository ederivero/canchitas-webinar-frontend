import React from "react";
import { Header } from "./Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    return (
        <div className="App">
            <Header />
            <main>
                {children}
            </main>
        </div >
    );
}

export { Layout };