import {Outlet} from "react-router";
import {Center, Container, VStack} from "@chakra-ui/react";

export default function PublicLayout() {
    return (
        <VStack bg='gray.200'
                width='100vw'
                height='100vh'
                justifyContent='center'
                alignItems='center'>
            <Container>
                <Center bg='white' px='16px' height='300px'  rounded='8px'>
                    <Outlet/>
                </Center>
            </Container>

        </VStack>
    );
}