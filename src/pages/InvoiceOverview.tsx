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

    const chosenTask = selectedTasks.map((t) => {
        const invPrice: number = timelogs
            .filter((time) => time.taskId === t)
            .reduce<number>((prev, time) => {
                const t = dayjs
                    .duration(time.timerStop - time.timerStart)
                    .seconds();
                const p = projects.find((p) => p.id === time.projectId);
                const hourlyRate = (p && p.hourly_rate) ?? 0;
                // if (t < 60) {
                //     console.log(t)
                //     return (t = 60);
                // }
                const sum = (hourlyRate * t) / 60;
                return prev + sum;
            }, 0);
        return invPrice;
    });
    const total =
        Math.round(chosenTask.reduce((acc, sum) => acc + sum, 0) * 10) / 100;

    const handleSelectedTasks = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedTasks((prev) => [...prev, e.target.value]);
        }
        if (!e.target.checked) {
            setSelectedTasks((tasks) =>
                tasks.filter((_, index) => index !== 0)
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
                    {timelogs
                        .filter((time) => time.taskId === task.id)
                        .map((time) => (
                            <td key={time.id}>
                                <p>
                                    {dayjs
                                        .duration(
                                            time.timerStop - time.timerStart
                                        )
                                        .format('HH:mm:ss')}
                                </p>
                            </td>
                        ))}
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
                        </tr>
                    </thead>
                    <tbody>
                        {tows}
                        <tr>
                            <td>
                                <button>Round up</button>
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
                            <th>Invoice Id</th>
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
