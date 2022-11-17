import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div className='root-container'>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Root;
