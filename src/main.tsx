import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import AppShellLayout from '@/components/AppShellLayout';
import { InvoiceProvider } from './contexts/Index';
import LoadingOverlay from './components/LoadingOverlay';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <InvoiceProvider>
            <LoadingOverlay />
            <AppShellLayout />
        </InvoiceProvider>
    </React.StrictMode>
);
