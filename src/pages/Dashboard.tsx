// import { Table } from '@mantine/core';
import { useInvoice } from '@/contexts/Index';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
dayjs.extend(duration);

import { useState, useMemo } from 'react';
import {
    DragDropContext,
    Draggable,
    DraggingStyle,
    Droppable,
    DropResult,
    NotDraggingStyle,
} from 'react-beautiful-dnd';

const getItemStyle = (
    isDragging: boolean,
    draggableStyle?: DraggingStyle | NotDraggingStyle
) => ({
    padding: 10,
    margin: `0 50px 15px 50px`,
    background: isDragging ? '#4a2975' : 'white',
    color: isDragging ? 'white' : 'black',
    border: `1px solid black`,
    fontSize: `20px`,
    borderRadius: `5px`,

    ...draggableStyle,
});

function Dashboard() {
    const { users, projects, tasks, timelogs, invoices } = useInvoice();

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

    const [dashList, setDashList] = useState<Array<keyof typeof itemLength>>([
        'users',
        'projects',
        'tasks',
        'invoices',
        'total',
        'calcAll',
    ]);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        const items = Array.from(dashList);
        const [newOrder] = items.splice(source.index, 1);
        items.splice(destination.index, 0, newOrder);

        setDashList(items);
    };

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='todo'>
                    {(provided) => (
                        <div
                            className='todo'
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {dashList.map((key, index) => {
                                return (
                                    <Draggable
                                        key={key}
                                        draggableId={key}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps
                                                        .style
                                                )}
                                            >
                                                {itemLength[key]}
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
}
export default Dashboard;
// const listItems = [
//     {
//         id: '1',
//         name: 'Study Spanish',
//     },
//     {
//         id: '2',
//         name: 'Workout',
//     },
//     {
//         id: '3',
//         name: 'Film Youtube',
//     },
//     {
//         id: '4',
//         name: 'Grocery Shop',
//     },
// ];
// const uows = users.filter((u) => u.id !== '').length;
// const pows = projects.filter((p) => p.id !== '').length;
// const tows = tasks.filter((t) => t.id !== '').length;
// const iows = invoices.filter((i) => i.id !== '').length;
// const listItems = [
//     { id: '1', name: uows },
//     { id: '2', name: pows },
//     { id: '3', name: tows },
//     { id: '4', name: iows },
// ];
// console.log(listItems);
// const calcAll =
//     Math.round(
//         all.reduce((acc, value) => {
//             return acc + value;
//         }, 0) * 100
//     ) / 100;
{
    /* <Table>
                <thead>
                    <tr>
                        <th>Users</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{itemLength.users}</td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th>Projects</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{itemLength.projects}</td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th>Tasks</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{itemLength.tasks}</td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th>
                            Total time since :
                            {dayjs(Date.now() - 2592000000).format(
                                'DD/MM/YYYY'
                            )}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>{dayjs.duration(total).format('HH:mm:ss')}</td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th>Invoices</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>{itemLength.invoices}</td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th>
                            Total amount sek this year :
                            {dayjs(Date.now()).format('YYYY')}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr><td>{calced}</td></tr>
                </tbody>
            </Table> */
}

// const total = timelogs
//     .filter(
//         (time) =>
//             dayjs(time.timerStart).isBetween(
//                 Date.now() - 2592000000,
//                 Date.now()
//             ) ||
//             dayjs(time.timerStop).isBetween(
//                 Date.now() - 2592000000,
//                 Date.now()
//             )
//     )
//     .map((time) => time)
//     .reduce((sum, curr) => {
//         return sum + (curr.timerStop - curr.timerStart);
//     }, 0);
