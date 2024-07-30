import {api} from "../api.ts";

export async function apiDeleteTransaction(id: string) {
    return api.delete(`/transactions/${id}`);
}