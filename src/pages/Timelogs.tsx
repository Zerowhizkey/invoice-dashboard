import { useInvoice } from '@/contexts/Index';

const Timelogs = () => {
    const { timelogs } = useInvoice();
    return (
        <div>
            <h4>Timelogs</h4>
            <div>
                {timelogs.map((time) => (
                    <p key={time.id}>{time.id}</p>
                ))}
            </div>
        </div>
    );
};

export default Timelogs;
