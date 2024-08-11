import {Center, HStack, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {TransactionsContext} from "../context/useTransactions.tsx";
import {useContext} from "react";
import {DeleteIcon} from "@chakra-ui/icons";
import {formatDate} from "../util/format-date.ts";
import {formatPrice} from "../util/format-price.ts";

export default function FinanceTable() {
    const {transactions, deleteTransaction} = useContext(TransactionsContext);

    return (
        <TableContainer w='100%' overflowY='auto'>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Finança</Th>
                        <Th>Valor</Th>
                        <Th>Data</Th>
                        <Th>Ações</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {transactions.length ? transactions.map(transaction => (
                            <Tr key={transaction.id}>
                                <Td>{transaction.name}</Td>
                                <Td color={transaction.type === 'entrada' ? 'green.200' : 'red.200'}>{formatPrice(transaction.price)}</Td>
                                <Td> {formatDate(transaction.createdAt)}</Td>
                                <Td>
                                    <HStack>
                                        <DeleteIcon cursor='pointer' color='red.200' onClick={() => deleteTransaction(transaction.id)}/>
                                    </HStack>

                                </Td>
                            </Tr>
                        )) :
                        <Tr>
                            <Td colSpan={4}>
                                <Center>Nenhum dado encontrado</Center>
                            </Td>
                        </Tr>
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}