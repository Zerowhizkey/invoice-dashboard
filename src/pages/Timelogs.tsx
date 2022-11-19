import { useInvoice } from '@/contexts/Index';
import { Accordion } from '@mantine/core';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';

dayjs.extend(customParseFormat);
dayjs.extend(duration);

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
                        <p>
                            {dayjs
                                .duration(time.timerStop - time.timerStart)
                                .format('HH:mm:ss')}
                        </p>
                        <p>{time.id}</p>
                        <p onClick={() => handleDelete(time.id)}>x</p>
                    </Accordion.Panel>
                ))}
            </Accordion.Item>
        </Accordion>
    );
};

export default Timelogs;
