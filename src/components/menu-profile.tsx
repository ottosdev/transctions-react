import {Menu, MenuGroup, MenuItem, MenuList} from "@chakra-ui/react";
import {MenuButton} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/useAuth.tsx";

import {HamburgerIcon} from "@chakra-ui/icons";

export default function MenuProfile() {
    const {signOut} = useAuth();
    const navigate = useNavigate();

    function handleSignOut() {
        signOut();
        navigate('/')
    }

    return (
        <Menu>
            <MenuButton>
                <HamburgerIcon  />
            </MenuButton>

            <MenuList>
                <MenuGroup>
                    <MenuItem onClick={handleSignOut}>Sair</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}