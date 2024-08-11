import {createContext, useEffect, useState, ReactNode} from "react";
import {findAll} from "../services/transactions/findAll.ts";
import {createTransaction} from "../services/transactions/create-transaction.ts";
import {useCustomToast} from "../util/custom-toast.ts";
import {apiDeleteTransaction} from "../services/transactions/delete-transaction.ts";

interface TransacaoProps {
    id: string;
    name: string;
    price: number;
    type: string;
    createdAt: string
}

type TransactionInput = Omit<TransacaoProps, "id" | 'createdAt'>

interface TransactionsContextProps {
    transactions: TransacaoProps[];
    saveTransaction: (data: TransactionInput) => Promise<void>
    deleteTransaction: (id: string) => Promise<void>
}

interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextProps);

export function TransactionsProvider({children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<TransacaoProps[]>([]);
    const toast = useCustomToast();

    async function getTransactions() {
        try {
            const response = await findAll();
            setTransactions(response.data);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getTransactions();
    }, []);

    async function saveTransaction(data: TransactionInput) {
        try {
            const response = await createTransaction(data);
            const transaction = response.data;

            setTransactions(prevTransactions => [
                ...prevTransactions,
                transaction
            ]);

            toast({
                title: 'Transação criada com sucesso',
                status: 'success',
            })

        } catch (err) {
            toast({
                title: 'Error ao deletar transação',
                status: 'error',
            })
        }
    }

    async function deleteTransaction(id: string) {
        try {
            await apiDeleteTransaction(id);
            setTransactions(transactions.filter(transaction => transaction.id !== id));
            toast({
                title: 'Transação deletada com sucesso',
                status: 'success',
            })
        } catch (err) {
            toast({
                title: 'Error ao deletar transação',
                status: 'error',
            })
        }
    }

    return (
        <TransactionsContext.Provider value={{transactions, saveTransaction, deleteTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}