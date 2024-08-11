import {createContext, ReactNode, useContext, useState} from "react";
import {useToast} from "@chakra-ui/react";
import {signIn} from "../services/user/signin.ts";

interface AuthContextProps {
    login: (email: string, password: string) => Promise<void>;
    signOut: () => void;
    isAuthenticated: boolean;
    userName: string;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps)


export function AuthProvider({children}: AuthProviderProps) {
    const toast = useToast();
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem('@auth');
        return !!token;
    });

    const [userName, setUserName] = useState(() => {
        return localStorage.getItem('@user_name') ?? '';
    })

    async function login(email: string, password: string) {
        if (email === '' || password === '') {
            toast({
                title: 'Error',
                description: 'E-mail ou a Senha são obrigatórios',
                status: 'error',
                duration: 5000,
                position: 'top-right',
                isClosable: true
            })
            return;
        }

        try {
            const data = {email, password}
            const response = await signIn(data)
            localStorage.setItem('@auth', response.data.token);
            localStorage.setItem('@user_name', response.data.name);
            setIsAuthenticated(true);
            setUserName(response.data.name);
        } catch (err) {
            toast({
                title: 'Error',
                description: 'Error ao realizar o login',
                status: 'error',
                duration: 5000,
                position: 'top-right',
                isClosable: true
            })
        }
    }

    async function signOut() {
        localStorage.removeItem('@auth');
        setIsAuthenticated(false);

    }

    return (
        <AuthContext.Provider value={{login, isAuthenticated, signOut, userName}}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth() {
    return useContext(AuthContext)
}