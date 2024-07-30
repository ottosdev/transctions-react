import {api} from "../api.ts";

export async function findSummary() {
    const response = await api.get('/transactions/summary');
    return response.data;
}