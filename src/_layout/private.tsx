import {Center, Container, VStack} from "@chakra-ui/react";
import {Navigate, Outlet} from "react-router";
import Header from "../components/header.tsx";
import {useAuth} from "../context/useAuth.tsx";

export default function PrivateLayout() {
    const {isAuthenticated} = useAuth();

    if (!isAuthenticated) {
        return Navigate({to: '/'});
    }

    return (
        <Container justifyContent='center' alignItems='center' maxW='1280px' height='100vh'>
                <Header/>
                <VStack height='80vh' py='4' w='100%' alignItems='start'>
                    <Outlet/>
                </VStack>

                <Center color='gray.300' height='10vh' borderTop='1px solid #00000020'>
                    Criado por Otto
                </Center>
        </Container>
    );
}