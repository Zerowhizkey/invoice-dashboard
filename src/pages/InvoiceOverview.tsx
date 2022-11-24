import { Table, Select, Checkbox, NumberInput } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { useInvoice } from '@/contexts/Index';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(isBetween);

const InvoiceOverview = () => {
    const {
        users,
        projects,
        tasks,
        addInvoice,
        addHourly,
        timelogs,
        invoices,
        deleteInvoice,
    } = useInvoice();
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
    const [round, setRound] = useState('');
    // const [totalTime, setTotalTime] = useState(0);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const currentPrice = projects.find(
            (project) => project.userId === selectedUser
        );
        if (currentPrice) {
            setPrice(currentPrice.hourly_rate);
        }
    }, [projects, selectedProject]);

    const usersArray = useMemo(() => {
        return users.map(({ id, name }) => ({
            value: id,
            label: name,
        }));
    }, [users]);

    const projectsArray = useMemo(() => {
        return projects
            .filter((project) => project.userId === selectedUser)
            .map(({ id, name }) => ({
                value: id,
                label: name,
            }));
    }, [projects, selectedUser]);

    const handleAddHourly = (id: string) => {
        addHourly(id, price);
    };

    const custName = users.find((u) => u.id === selectedUser);

    const totalCalcTime = useMemo(() => {
        return timelogs
            .filter((timelog) =>
                selectedTasks.some((taskId) => taskId === timelog.taskId)
            )
            .map((timelog) =>
                dayjs.duration(timelog.timerStop - timelog.timerStart).asHours()
            )
            .reduce((acc, sum) => acc + sum, 0);
    }, [timelogs, selectedTasks]);

    const roundTime = useMemo(() => {
        if (!totalCalcTime) return 0;
        // const remainder = totalCalcTime % 1;
        // const fullHours = totalCalcTime - remainder;
        // console.log(fullHours)
        if (round === 'one-min') {
            return 0.016;
        }

        if (round === 'five-min') {
            return 0.083;
        }
        // if (round === 'fifteen-min') {
        // }
        // if (round === 'thirty-min') {
        // }
        if (round === 'sixty-min') {
            return Math.ceil(totalCalcTime);
        }
        return totalCalcTime;
    }, [totalCalcTime, round]);

    const total = useMemo(() => {
        const p = projects.find((p) => p.id === selectedProject);
        const hourlyRate = (p && p.hourly_rate) ?? 0;
        const calc = hourlyRate * roundTime;
        return Math.round(calc * 100) / 100;
    }, [projects, selectedProject, roundTime]);

    // 1 = 1h 0.5 = 30min 0.25 = 15min 0.083 = 5min 0.016 = 1min

    const handleSelectedTasks = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedTasks((prev) => [...prev, e.target.value]);
        }
        if (!e.target.checked) {
            setSelectedTasks((tasks) =>
                tasks.filter((task) => task !== e.target.value)
            );
        }
    };

    const handleAddInvoice = () => {
        const data = {
            id: uuid(),
            status: 'ej betald',
            due_date: Date.now() + 2592000000,
            amount: total,
            customer: custName?.name || 'unknown',
            create_date: Date.now(),
        };
        addInvoice(data);
    };

    const pows = projects
        .filter(
            (project) =>
                project.userId === selectedUser &&
                project.id === selectedProject
        )
        .map((project) => (
            <tr key={project.id}>
                <td>{project.name}</td>
                <td>
                    <NumberInput
                        value={price}
                        onChange={(price) => setPrice(price || 0)}
                    />
                </td>
                <td>
                    <button onClick={() => handleAddHourly(project.id)}>
                        Add
                    </button>
                </td>
            </tr>
        ));

    const tows = tasks
        .filter((tasks) => tasks.projectId === selectedProject)
        .map((task) => {
            const project = projects.find(
                (project) =>
                    project.userId === selectedUser &&
                    project.id === selectedProject
            );
            return (
                <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{project?.hourly_rate}</td>
                    <td>
                        {dayjs(
                            timelogs
                                .filter((time) => time.taskId === task.id)
                                .map((time) => time)
                                .reduce((sum, curr) => {
                                    return (
                                        sum + (curr.timerStop - curr.timerStart)
                                    );
                                }, 0)
                        )
                            .subtract(1, 'hour')
                            .format('HH:mm:ss')}
                    </td>
                    <td>
                        <Checkbox
                            value={task.id}
                            onChange={handleSelectedTasks}
                        />
                    </td>
                </tr>
            );
        });

    const handleDelete = (id: string) => {
        deleteInvoice(id);
    };

    const selectedUserName = users.find(
        (user) => user.id === selectedUser
    )?.name;

    const iows = invoices
        .filter((i) => i.customer === selectedUserName)
        .map((invoice) => (
            <tr key={invoice.id}>
                <td>{invoice.amount}</td>
                <td>{invoice.customer}</td>
                <td>{invoice.status}</td>

                <td onClick={() => handleDelete(invoice.id)}>x</td>
            </tr>
        ));

    const handleRound = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRound(e.target.value);
    };

    return (
        <>
            <Select
                clearable
                label='Users'
                placeholder='Pick one'
                data={usersArray}
                value={selectedUser}
                onChange={(userId) => setSelectedUser(userId || '')}
            />
            {selectedUser && (
                <Select
                    clearable
                    label='Project'
                    placeholder='Pick one'
                    data={projectsArray}
                    value={selectedProject}
                    onChange={(projectId) =>
                        setSelectedProject(projectId || '')
                    }
                />
            )}

            {selectedProject && (
                <Table>
                    <thead>
                        <tr>
                            <th>Project</th>
                            <th>Hourly price</th>
                        </tr>
                    </thead>
                    <tbody>{pows}</tbody>

                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Price per h</th>
                            <th>Current time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tows}
                        <tr>
                            <td>
                                <select onChange={handleRound}>
                                    <option value='default'>Nada</option>
                                    <option value='one-min'>1 min</option>
                                    <option value='five-min'>5 min</option>
                                    <option value='fifteen-min'>15 min</option>
                                    <option value='thirty-min'>30 min</option>
                                    <option value='sixty-min'>60 min</option>
                                </select>
                            </td>
                            <td>
                                <button onClick={handleAddInvoice}>
                                    Create Invoice
                                </button>
                            </td>
                            <td>
                                <p>Total price: {total} kr</p>
                            </td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <th>Price</th>
                            <th>Invoice Customer</th>
                            <th>Invoice Status</th>
                        </tr>
                    </thead>
                    <tbody>{iows}</tbody>
                </Table>
            )}
        </>
    );
};

export default InvoiceOverview;
// const chosenTask = selectedTasks.map((t) => {
//     const invPrice: number = timelogs
//         .filter((time) => time.taskId === t)
//         .reduce<number>((prev, time) => {
//             const t = dayjs
//                 .duration(time.timerStop - time.timerStart)
//                 .seconds();
//             const p = projects.find((p) => p.id === time.projectId);
//             const hourlyRate = (p && p.hourly_rate) ?? 0;

//             const sum = (hourlyRate * t) / 60;
//             console.log(t);
//             return prev + sum;
//         }, 0);
//     return invPrice;
// });
// const total =
//     Math.round(chosenTask.reduce((acc, sum) => acc + sum, 0) * 10) / 100;
// const handleSelectedTasksRound = (
//     e: React.ChangeEvent<HTMLInputElement>
// ) => {
//     if (e.target.checked) {
//         setSelectedTasksRound((prev) => [...prev, e.target.value]);
//     }
//     if (!e.target.checked) {
//         setSelectedTasksRound((tasks) =>
//             tasks.filter((_, index) => index !== 0)
//         );
//     }
// };

// const chosenTaskRound = selectedTasksRound.map((t) => {
//     const invPrice: number = timelogs
//         .filter((time) => time.taskId === t)
//         .reduce<number>((prev, time) => {
//             const t = dayjs
//                 .duration(time.timerStop - time.timerStart)
//                 .asHours();
//             const p = projects.find((p) => p.id === time.projectId);
//             const hourlyRate = (p && p.hourly_rate) ?? 0;
//             // if (t < 1) return (t = 1);
//             const hour = t / 100;
//             const sum = hourlyRate * hour * 10;
//             console.log(t);
//             console.log(hour);
//             console.log(sum);
//             return prev + sum;
//         }, 0);
//     return invPrice;
// });

// const totalRound =
//     Math.round(chosenTaskRound.reduce((acc, sum) => acc + sum, 0) * 100) /
//     100;
