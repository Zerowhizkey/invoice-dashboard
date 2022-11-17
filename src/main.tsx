import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from '@/pages/Root';
import Homepage from '@/pages/Dashboard';
import Projects from '@/pages/Projects';
import Users from '@/pages/Users';
import Tasks from '@/pages/Tasks';
import Timelogs from '@/pages/Timelogs';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                index: true,
                element: <Homepage />,
            },
            {
                path: 'projects',
                element: <Projects />,
            },
            {
                path: 'users',
                element: <Users />,
            },
            {
                path: 'tasks',
                element: <Tasks />,
            },
            {
                path: 'timelogs',
                element: <Timelogs />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
