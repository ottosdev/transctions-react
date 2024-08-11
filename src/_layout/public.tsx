import {Outlet} from "react-router";
import {Center, Container, VStack} from "@chakra-ui/react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/useAuth.tsx";

export default function PublicLayout() {

    const {isAuthenticated} = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [navigate, isAuthenticated]);

    return (
        <VStack bg='gray.200'
                width='100vw'
                height='100vh'
                justifyContent='center'
                alignItems='center'>
            <Container>
                <Center bg='white' px='16px' height='300px' rounded='8px'>
                    <Outlet/>
                </Center>
            </Container>

        </VStack>
    );
}