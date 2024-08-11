import {Grid} from "@chakra-ui/react";
import SummaryGridItem from "./summary-grid-item.tsx";
import {useContext, useEffect, useState} from "react";
import {findSummary} from "../../services/transactions/find-summary.ts";
import {useCustomToast} from "../../util/custom-toast.ts";
import {TransactionsContext} from "../../context/useTransactions.tsx";

interface SummaryProps {
    total: number;
    entradas: number;
    saidas: number;
}

export default function Summary() {
    const [summary, setSummary] = useState({} as SummaryProps);
    const {transactions} = useContext(TransactionsContext)

    const toast = useCustomToast();

    async function getSummary() {
        try {
            const response = await findSummary();
            setSummary(response);
        } catch (err) {
            toast({
                title: 'Erro',
                description: 'Error getting summary',
                status: 'error'
            })
        }
    }

    useEffect(() => {
        getSummary();
    }, [transactions])

    return (
        <Grid templateColumns='repeat(3, 1fr)' gap={6} w='100%'>
            <SummaryGridItem title='Entradas' money={summary.entradas} background='green.200'/>
            <SummaryGridItem title='Saídas' money={summary.saidas} background='red.200'/>
            <SummaryGridItem title='Total' money={summary.total} background='gray.200'/>
        </Grid>

    )
}