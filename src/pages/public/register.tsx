import {Button, HStack, Input, Text, VStack} from "@chakra-ui/react";
import {FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {api} from "../../services/api.ts";
import {useCustomToast} from "../../util/custom-toast.ts";
import {FaEye, FaEyeSlash} from 'react-icons/fa6'

interface RegisterUser {
    name: string;
    email: string;
    password: string
}

export default function Register() {
    const [loading, setLoading] = useState(false);
    const [lookPassword, setLookPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useCustomToast();
    const navigate = useNavigate();

    function toggleLookPassword() {
        setLookPassword(!lookPassword);
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (name === '' || email === '' || password === '') {
            toast({
                title: 'Todos os campos são obrigatórios',
                status: 'error',
            })
            return;
        }

        try {
            setLoading(true);
            const newUser: RegisterUser = {
                name, email, password
            }

            await api.post('/auth/sign-up', newUser);

            toast({
                title: 'Usuario registrado com sucesso',
                status: 'success',
                onCloseComplete: () => {
                    navigate(`/?email=${email}`);
                }
            });

        } catch (e) {
            toast({
                title: 'Error',
                description: 'Error ao registrar usuario',
                status: 'error',
            });
        } finally {
            setLoading(false);
        }

    }

    return (
        <form onSubmit={handleSubmit} style={{width: '100%', background: 'white'}}>

            <VStack w='100%'>
                <Text as='strong'>Registrar Usuário</Text>
                <Input placeholder='Nome' onChange={e => setName(e.target.value)}/>
                <Input placeholder='E-mail' onChange={e => setEmail(e.target.value)}/>
                <HStack w='100%'>
                    <Input placeholder='Senha' type={lookPassword ? 'text' : 'password'}
                           onChange={e => setPassword(e.target.value)}/>
                    <Button onClick={toggleLookPassword}>
                        {lookPassword ? < FaEyeSlash  /> : < FaEye  />}
                    </Button>
                </HStack>
                <HStack>
                    <Link to='/'>
                        <Button type='button'> Volta</Button>
                    </Link>
                    <Button type='submit' colorScheme='green' isLoading={loading} >Registar</Button>
                </HStack>

            </VStack>
        </form>
    )
}