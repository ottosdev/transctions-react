import {api} from "../api.ts";

export interface CreateTransaction {
    name: string;
    price: number;
    type: string;
}

interface Transaction {
    id: string;
    name: string;
    price: number;
    type: string;
    createdAt: string
}

export function createTransaction(data: CreateTransaction) {
    return api.post<Transaction>('/transactions', data);
}