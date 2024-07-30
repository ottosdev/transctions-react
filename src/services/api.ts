import axios from "axios";
import {createStandaloneToast} from "@chakra-ui/react";

const {toast} = createStandaloneToast()

export const api = axios.create({
    baseURL: 'http://localhost:3000',

})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('@auth');

        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }

        return config;
    }, (err) => {
        return Promise.reject(err);
    }
);

api.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401) {
        toast({
            status:'error',
            title: 'Unauthorized',
            description: error.response.message,
            duration: 3000,
            position: 'top-right',
            isClosable: true,
            onCloseComplete: () => {
                localStorage.removeItem('@auth');
                window.location.href = '/';
            }
        })

    }
    return Promise.reject(error);
})
