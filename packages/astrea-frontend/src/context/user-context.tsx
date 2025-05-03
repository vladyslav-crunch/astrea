import {createContext, useContext, useEffect, useState} from "react";
import {signIn as signInRequest, refreshSession, signUp as signUpRequest} from "../api/auth";
import type {SignInFormFields, SignUpFormFields} from "astrea-shared";
import {PublicUser} from "astrea-shared";

type AuthContextType = {
    user: PublicUser | null;
    signIn: (formData: SignInFormFields) => Promise<void>;
    signUp: (formData: SignUpFormFields) => Promise<void>;
    signOut: () => void;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<PublicUser | null>(null);

    const signIn = async (formData: SignInFormFields) => {
        const data = await signInRequest(formData);
        localStorage.setItem("accessToken", data.accessToken);
        setUser(data.user);
    };

    const signUp = async (formData: SignUpFormFields) => {
        const data = await signUpRequest(formData);
        localStorage.setItem("accessToken", data.accessToken);
        setUser(data.user);
    };

    useEffect(() => {
        refreshSession()
            .then(({user, accessToken}) => {
                localStorage.setItem("accessToken", accessToken);
                setUser(user);
            })
            .catch(() => {
                console.log("No valid session found.");
                localStorage.removeItem("accessToken");
                setUser(null);
            });
    }, []);

    const signOut = () => {
        localStorage.removeItem("accessToken");
        setUser(null);
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{user, signIn, signOut, signUp, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useUser = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useUser must be used within an AuthProvider");
    }
    return context;
};
