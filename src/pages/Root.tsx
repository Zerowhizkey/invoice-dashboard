import LoadingOverlay from '@/components/LoadingOverlay';
import Navbar from '@/components/Navbar';
import { InvoiceProvider } from '@/contexts/Index';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <InvoiceProvider>
            <LoadingOverlay />
            <div className='root-container'>
                <Navbar />
                <Outlet />
            </div>
        </InvoiceProvider>
    );
};

export default Root;
