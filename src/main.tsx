import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {ChakraProvider} from "@chakra-ui/react";
import {AuthProvider} from "./context/useAuth.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <ChakraProvider>
                <App/>
            </ChakraProvider>
        </AuthProvider>
    </React.StrictMode>,
)
