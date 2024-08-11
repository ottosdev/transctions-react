import {createBrowserRouter} from "react-router-dom";
import SignIn from "../pages/public/signin.tsx";
import Dashboard from "../pages/private/dashboard.tsx";
import PublicLayout from "../_layout/public.tsx";
import PrivateLayout from "../_layout/private.tsx";
import Register from "../pages/public/register.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout/>,
        children: [
            {path: '/', element: <SignIn/>},
            {path: '/register', element: <Register/>},
        ]
    },
    {
        path: "/",
        element: <PrivateLayout/>,
        children: [
            {path: '/dashboard', element: <Dashboard/>},
        ]
    },
]);