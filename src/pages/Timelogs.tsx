import { useInvoice } from '@/contexts/Index';
import { Accordion } from '@mantine/core';
const Timelogs = () => {
    const { timelogs, deleteTimelog } = useInvoice();

    const handleDelete = (id: string) => {
        deleteTimelog(id);
    };
    return (
        <Accordion>
            <Accordion.Item value='customization'>
                <Accordion.Control>Time logs</Accordion.Control>

                {timelogs.map((time) => (
                    <Accordion.Panel key={time.id}>
                        {time.id} <p onClick={() => handleDelete(time.id)}>x</p>
                    </Accordion.Panel>
                ))}
            </Accordion.Item>
        </Accordion>
    );
};

export default Timelogs;
