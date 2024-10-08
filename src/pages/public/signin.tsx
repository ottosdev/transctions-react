import {
    Button,
    HStack,
    Input, Text, useToast,
    VStack
} from "@chakra-ui/react";
import {FormEvent, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useAuth} from "../../context/useAuth.tsx";
import {FaEye, FaEyeSlash} from "react-icons/fa6";

export default function SignIn() {
    const navigate = useNavigate();
    const toast = useToast();
    const [lookPassword, setLookPassword] = useState(false);
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState(() => {
        return searchParams.get('email') ?? ''
    });
    const [password, setPassword] = useState('');

    const {login} = useAuth();

    function toggleLookPassword() {
        setLookPassword(!lookPassword);
    }

    function handleGoToRegister() {
        navigate('/register');
    }


    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (email === '' || password === '') {
            toast({
                title: 'Error',
                description: 'E-mail ou a Senha são obrigatórios',
                status: 'error',
                duration: 5000,
                position: 'top-right',
                isClosable: true
            })
            return;
        }

        try {
            setIsLoading(true);
            await login(email, password);

            setIsLoading(false);
            navigate("/dashboard", {replace: true});
        } catch (error) {
            setIsLoading(false);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form style={{width: '100%'}} onSubmit={handleSubmit}>
            <VStack>
                <Text as='strong'>Entrar</Text>

                <Input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
                <HStack w='100%'>
                    <Input placeholder='Password'
                           type={lookPassword ? 'text' : 'password'}
                           onChange={e => setPassword(e.target.value)}/>
                    <Button onClick={toggleLookPassword}>
                        {lookPassword ? < FaEyeSlash/> : < FaEye/>}
                    </Button>
                </HStack>
                <HStack>
                    <Button colorScheme='blue' type='submit' isLoading={isLoading}>Entrar</Button>
                    <Button onClick={handleGoToRegister}>Registrar</Button>
                </HStack>

            </VStack>
        </form>


    )
}