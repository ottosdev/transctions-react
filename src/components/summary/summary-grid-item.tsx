import {GridItem, HStack} from "@chakra-ui/react";

interface Props {
    title: string;
    money: number;
    background: string;
}

export default function SummaryGridItem({title, money, background} : Props) {


    function formatarValor(valor: number) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor)
    }


    return (
        <GridItem w='100%' h='20' bg={background} rounded='8px'>
            <HStack justifyContent='space-between' alignItems='center' px='4' h='100%'>
                <p>{title}</p>
                <strong>
                    {formatarValor(money)}
                </strong>
            </HStack>
        </GridItem>
    )
}