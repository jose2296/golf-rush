import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Login = lazy(() => import('./modules/auth/login'));
const Home = lazy(() => import('./modules/app/home/home'));

export const Initialize = () => {
    const router = createBrowserRouter([
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/',
            element: <Home />
        },
    ]);
    return (
        <RouterProvider router={router} />
    );
};
