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

type TaskItem = {
    id: string;
    name: string;
    time: number;
    roundedTime: number;
    selected: boolean;
};

const roundTime = (taskTimeMs: number, resolutionMinutes: number) => {
    if (resolutionMinutes > 0) {
        const roundedMinutes =
            resolutionMinutes *
            Math.ceil(taskTimeMs / (resolutionMinutes * 60 * 1000));
        return dayjs.duration(roundedMinutes, 'minutes').asHours();
    } else {
        return dayjs.duration(taskTimeMs, 'milliseconds').asHours();
    }
};

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
    const [resolution, setResolution] = useState(0);
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

    const taskItems = useMemo(() => {
        const result: TaskItem[] = [];
        tasks
            .filter((tasks) => tasks.projectId === selectedProject)
            .forEach((task) => {
                const taskTime = timelogs
                    .filter((time) => time.taskId === task.id)
                    .reduce((sum, curr) => {
                        return sum + (curr.timerStop - curr.timerStart);
                    }, 0);
                result.push({
                    id: task.id,
                    name: task.title,
                    time: taskTime,
                    roundedTime: roundTime(taskTime, resolution),
                    selected: selectedTasks.includes(task.id),
                });
            });
        return result;
    }, [tasks, timelogs, resolution, selectedTasks, selectedProject]);

    const total = useMemo(() => {
        const p = projects.find((p) => p.id === selectedProject);
        const hourlyRate = (p && p.hourly_rate) ?? 0;
        const roundTime = taskItems
            .filter((item) => item.selected)
            .reduce((sum, curr) => sum + curr.roundedTime, 0);
        const calc = hourlyRate * roundTime;
        return Math.round(calc * 100) / 100;
    }, [projects, selectedProject, taskItems]);

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
        const num = parseInt(e.target.value);
        if (
            num === 0 ||
            num === 1 ||
            num === 5 ||
            num === 15 ||
            num === 30 ||
            num === 60
        ) {
            setResolution(num);
        }
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
                            <th>Current time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskItems.map((task) => (
                            <tr key={task.id}>
                                <td>{task.name}</td>
                                <td>
                                    {dayjs(task.time)
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
                        ))}
                        <tr>
                            <td>
                                <select onChange={handleRound}>
                                    <option value={0}>0</option>
                                    <option value={1}>1 min</option>
                                    <option value={5}>5 min</option>
                                    <option value={15}>15 min</option>
                                    <option value={30}>30 min</option>
                                    <option value={60}>60 min</option>
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
