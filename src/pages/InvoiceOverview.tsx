import { Table, Select, Checkbox, NumberInput } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { useInvoice } from '@/contexts/Index';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';

dayjs.extend(customParseFormat);
dayjs.extend(duration);

const InvoiceOverview = () => {
    const { users, projects, tasks, addInvoice, addHourly, timelogs } =
        useInvoice();
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
                const sum = (hourlyRate * t) / 60;

                return prev + sum;
            }, 0);
        return invPrice;
    });
    const total = chosenTask.reduce((acc, sum) => acc + sum, 0);

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
            amount: total.toFixed(2),
            customer: custName,
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
                        // defaultValue={price || currentPrice?.hourly_rate}
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
                    {/* {projects
                        .filter(
                            (project) =>
                                project.userId === selectedUser &&
                                project.id === selectedProject
                        )
                        .map((project) => ( */}
                    <td>{project?.hourly_rate}</td>
                    {/* ))} */}
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
                <>
                    <Table>
                        <thead>
                            <tr>
                                <th>Project</th>
                                <th>Hourly price</th>
                            </tr>
                        </thead>
                        <tbody>{pows}</tbody>
                    </Table>
                    <Table>
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
                                    <button onClick={handleAddInvoice}>
                                        Create Invoice
                                    </button>
                                </td>
                                <td>
                                    <p>Total price: {total}kr</p>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </>
            )}
        </>
    );
};

export default InvoiceOverview;
