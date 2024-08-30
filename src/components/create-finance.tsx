import {
    Button, HStack, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay, useDisclosure, VStack
} from "@chakra-ui/react";
import {FormEvent, useContext, useState} from "react";

import {TransactionsContext} from "../context/useTransactions.tsx";
import {AddIcon} from "@chakra-ui/icons";
import {useCustomToast} from "../util/custom-toast.ts";
import {CreateTransaction} from "../services/transactions/create-transaction.ts";

export default function CreateFinance() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [type, setType] = useState('entrada');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const toast = useCustomToast();
    const {saveTransaction} = useContext(TransactionsContext)

    const changeTypeEntradaColor = type === 'entrada' ? 'green.100' : '';
    const changeTypeSaidaColor = type === 'saida' ? 'red.100' : '';


    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (name === '' || price === '') {
            toast({
                title: 'Error',
                description: 'Preencha todos os campos',
                status: 'error',
                position: 'top'
            })

            return;
        }

        const data: CreateTransaction = {
            name,
            price: Number(price),
            type
        }

        await saveTransaction(data);

        setType('entrada');
        setName('');
        setPrice('');
        onClose();
    }

    return (
        <HStack justifyContent='end' width='100%'>
            <Button bg='green.200' color='white' _hover={{bg: 'green.300'}} onClick={onOpen}>
                <AddIcon/>
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Adicionar </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <form onSubmit={handleSubmit}>
                            <VStack spacing='1rem'>
                                <HStack w='100%'>
                                    <Button variant='outline' bg={changeTypeEntradaColor} _hover={{
                                        bg: 'green.300'
                                    }} onClick={() => setType('entrada')} w='100%'>Entrada</Button>
                                    <Button variant='outline' _hover={{
                                        bg: 'red.300'
                                    }} bg={changeTypeSaidaColor} onClick={() => setType('saida')}
                                            w='100%'>Saida</Button>
                                </HStack>
                                <Input placeholder='Nome' onChange={e => setName(e.target.value)}/>
                                <Input placeholder='Valor' onChange={e => setPrice(e.target.value)}/>
                                <Button bg='green.200' color='white' _hover={{bg: 'green.300'}} w='100%'
                                        type='submit'>Registrar</Button>
                            </VStack>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </HStack>
    );
}