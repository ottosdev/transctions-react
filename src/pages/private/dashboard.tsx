import Summary from "../../components/summary/summary.tsx";
import FinanceTable from "../../components/finance-table.tsx";
import CreateFinance from "../../components/create-finance.tsx";
import {TransactionsProvider} from "../../hooks/useTransactions.tsx";

export default function Dashboard() {
    return (
        <TransactionsProvider>
            <Summary/>
            <CreateFinance />
            <FinanceTable />
        </TransactionsProvider>
    );
}