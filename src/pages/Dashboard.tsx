import { useListState } from '@mantine/hooks';
import { useState } from 'react';
import { useInvoice } from '@/contexts/Index';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { StrictModeDroppable } from '@/components/StrictModeDroppable';
import DashItem from '@/components/DashItem';

function Dashboard() {
    const { users, projects, tasks, timelogs, invoices } = useInvoice();
    const [show, setShow] = useState<Record<string, boolean>>({});
    const all = invoices
        .filter((invoice) =>
            dayjs(invoice.create_date).isBetween(
                new Date().getFullYear(),
                Date.now()
            )
        )
        .map((i) => i.amount);

    const itemLength = useMemo(() => {
        return {
            users: <p>Users: {users.filter((u) => u.id !== '').length}</p>,
            projects: (
                <p>Projects: {projects.filter((p) => p.id !== '').length}</p>
            ),
            tasks: <p>Tasks: {tasks.filter((t) => t.id !== '').length}</p>,
            invoices: (
                <p>Invoices: {invoices.filter((i) => i.id !== '').length}</p>
            ),
            total: (
                <p>
                    total time:{' '}
                    {dayjs
                        .duration(
                            timelogs
                                .filter(
                                    (time) =>
                                        dayjs(time.timerStart).isBetween(
                                            Date.now() - 2592000000,
                                            Date.now()
                                        ) ||
                                        dayjs(time.timerStop).isBetween(
                                            Date.now() - 2592000000,
                                            Date.now()
                                        )
                                )
                                .map((time) => time)
                                .reduce((sum, curr) => {
                                    return (
                                        sum + (curr.timerStop - curr.timerStart)
                                    );
                                }, 0)
                        )
                        .format('HH:mm:ss')}
                </p>
            ),
            calcAll: (
                <p>
                    Total price:{' '}
                    {Math.round(
                        all.reduce((acc, value) => {
                            return acc + value;
                        }, 0) * 100
                    ) / 100}
                </p>
            ),
        };
    }, [users, projects, tasks, invoices]);

    const [state, handlers] = useListState<keyof typeof itemLength>([
        'users',
        'projects',
        'tasks',
        'invoices',
        'total',
        'calcAll',
    ]);

    const items = state.map((state, index) => (
        <DashItem
            key={state}
            index={index}
            draggableId={state}
            show={show[state]}
        >
            {itemLength[state]}
        </DashItem>
    ));

    return (
        <>
            {state.map((state) => (
                <button
                    key={state}
                    onClick={() =>
                        setShow({
                            ...show,
                            [state]: !show[state],
                        })
                    }
                >
                    {state}
                </button>
            ))}

            <DragDropContext
                onDragEnd={({ destination, source }) =>
                    handlers.reorder({
                        from: source.index,
                        to: destination?.index || 0,
                    })
                }
            >
                <StrictModeDroppable
                    droppableId='dnd-list'
                    direction='vertical'
                >
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {items}
                            {provided.placeholder}
                        </div>
                    )}
                </StrictModeDroppable>
            </DragDropContext>
        </>
    );
}
export default Dashboard;
