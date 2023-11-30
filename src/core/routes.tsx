import Layout from '@modules/app/layout/layout';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Auth from '../Auth';

const Login = lazy(() => import('../modules/auth/login'));
const Home = lazy(() => import('../modules/app/home/home'));
const Customize = lazy(() => import('../modules/app/customize/customize'));
const Game = lazy(() => import('../modules/app/game/game'));

const Router = createBrowserRouter([
    {
        path: '',
        element: <Auth />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'app',
                element: <Layout />,
                children: [
                    {
                        path: '',
                        element: <Home />
                    },
                    {
                        path: 'customize',
                        element: <Customize />,
                    },
                    {
                        path: 'game',
                        element: <Game />,
                    }
                ]
            }
        ]
    }
]);

export default Router;
