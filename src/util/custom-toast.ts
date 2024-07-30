import {useToast} from "@chakra-ui/react";

interface ToastProps {
    title: string;
    status: "success" | "error" | "warning" | "info";
    description?: string;
    onCloseComplete?: () => void;
}

export function useCustomToast() {
    const toast = useToast();

    function showToast({title, status, description, onCloseComplete}: ToastProps) {
        toast({
            title,
            status,
            description,
            onCloseComplete,
            duration: 3000,
            isClosable: true,
            position: 'top-right',
        })
    }

    return showToast;

}