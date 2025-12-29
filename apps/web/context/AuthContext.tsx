"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
    User,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { auth, dataconnect } from "../lib/firebase";
import { createUser, updateUser } from "@agentrack/sql-sdk";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Sync with Data Connect
                try {
                    await createUser(dataconnect, {
                        googleId: user.uid,
                        email: user.email || "",
                        displayName: user.displayName,
                        photoUrl: user.photoURL
                    });
                } catch (e) {
                    // Likely user already exists, ignore for simple prototype
                    console.log("User sync note:", e);
                }
            }
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/gmail.send");
        provider.addScope("https://www.googleapis.com/auth/gmail.readonly");

        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;

            if (token && result.user) {
                // For prototype, we sync the access token. 
                // For true "background" automation, we would need a refresh token.
                await updateUser(dataconnect, {
                    googleId: result.user.uid,
                    refreshToken: token // Rename field to 'token' or keep as is for prototype
                });
            }
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
