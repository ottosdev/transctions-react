import {api} from "../api.ts";

interface IRequest {
    email: string;
    password: string;
}

export function signIn(data : IRequest) {
    return api.post('/auth/sign-in', data);
}