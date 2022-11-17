import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { InvoiceProvider } from '@/contexts/Index';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <InvoiceProvider>
            <App />
        </InvoiceProvider>
    </React.StrictMode>
);
