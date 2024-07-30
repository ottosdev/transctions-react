import {
    Button,
    HStack,
    Input, Text,
    VStack
} from "@chakra-ui/react";
import {FormEvent, useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.tsx";
import {FaEye, FaEyeSlash} from "react-icons/fa6";

export default function SignIn() {
    const navigate = useNavigate();
    const authenticated = false;
    const [lookPassword, setLookPassword] = useState(false);
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState(() => {
        return searchParams.get('email') ?? ''
    });
    const {login, isAuthenticated} = useAuth();

    const [password, setPassword] = useState('');

    function toggleLookPassword() {
        setLookPassword(!lookPassword);
    }

    function handleGoToRegister() {
        navigate('/register');
    }

    useEffect(() => {
        if (authenticated) {
            navigate('/dashboard');
        }
    })

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        try {
            await login(email, password);

            setIsLoading(false);
            navigate("/dashboard", {replace: true});
        } catch (error) {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [navigate, isAuthenticated])

    return (
        <form style={{width: '100%'}} onSubmit={handleSubmit}>
            <VStack>
                <Text as='strong'>Entrar</Text>

                <Input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
                <HStack w='100%'>
                    <Input placeholder='Password' type={lookPassword ? 'text' : 'password'}
                           onChange={e => setPassword(e.target.value)}/>
                    <Button onClick={toggleLookPassword}>
                        {lookPassword ? < FaEyeSlash  /> : < FaEye  />}
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