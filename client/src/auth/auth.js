import React, { useState } from "react";

export const AuthContext = React.createContext("auth");

export function Auth({ children }) {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};