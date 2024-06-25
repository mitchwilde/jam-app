// UserContext.tsx
import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type AuthUser = {
    username: string;
    email: string;
};

type UserContextType = {
    loggedInUser: AuthUser | null;
    setLoggedInUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserContextProviderProps = {
    children: ReactNode;
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [loggedInUser, setLoggedInUser] = useState<AuthUser | null>(null);
    const value = useMemo(() => {
        return {
            loggedInUser,
            setLoggedInUser
        };
    }, [loggedInUser]);
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
};