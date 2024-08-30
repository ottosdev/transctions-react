import {useToast, ToastProps} from "@chakra-ui/react";

export function useCustomToast() {
    const toast = useToast();

    function showToast({title, status, description, onCloseComplete, position}: ToastProps) {
        toast({
            title,
            status,
            description,
            onCloseComplete,
            duration: 3000,
            isClosable: true,
            position: position ? position : 'top-right'
        })
    }

    return showToast;

}