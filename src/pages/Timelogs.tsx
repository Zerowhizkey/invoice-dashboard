import { useInvoice } from '@/contexts/Index';
import { Accordion } from '@mantine/core';
const Timelogs = () => {
    const { timelogs } = useInvoice();
    return (
        <Accordion>
            <Accordion.Item value='customization'>
                <Accordion.Control>Time logs</Accordion.Control>

                {timelogs.map((time) => (
                    <Accordion.Panel key={time.id}>{time.id}</Accordion.Panel>
                ))}
            </Accordion.Item>
        </Accordion>
    );
};

export default Timelogs;
