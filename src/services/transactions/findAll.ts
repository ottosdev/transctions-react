import {api} from "../api.ts";

interface TransactionsProps {
    id: string;
    name: string;
    price: number;
    type: string;
    createdAt: string
}

export async function findAll() {
    return await api.get<TransactionsProps[]>('/transactions');
}