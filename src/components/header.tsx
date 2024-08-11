import {HStack} from "@chakra-ui/react";
import MenuProfile from "./menu-profile.tsx";
import {useAuth} from "../context/useAuth.tsx";

export default function Header() {

    const {userName} = useAuth();
    return (
        <HStack w='100%' height='10vh' justifyContent='space-between' alignItems='center'
                borderBottom='1px solid #00000020'>
            <h1>Olá, {userName}</h1>
            <HStack>
                <MenuProfile/>
            </HStack>
        </HStack>
    )
}