import { Table, Select, Checkbox, NumberInput } from '@mantine/core';
import { useMemo, useState } from 'react';
import { useInvoice } from '@/contexts/Index';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';

dayjs.extend(customParseFormat);
dayjs.extend(duration);

const Invoice = () => {
    const { users, projects, tasks, addInvoice, addHourly, timelogs } =
        useInvoice();
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedTasks, setSelectedTasks] = useState('');
    const [price, setPrice] = useState(0);

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

    const custName = users
        .filter((u) => u.id === selectedUser)
        .map((u) => u.name);

    const invPrice = timelogs
        .filter((time) => time.taskId === selectedTasks)
        .map((time) => {
            const t = dayjs
                .duration(time.timerStop - time.timerStart)
                .seconds();
            const p = projects
                .filter((p) => p.id === time.projectId)
                .map((p) => {
                    return p.hourly_rate;
                });
            const sum = (p[0] * t) / 60;

            return sum;
        });
    console.log(invPrice);
    const handleAddInvoice = () => {
        const data = {
            id: uuid(),
            status: 'ej betald',
            due_date: Date.now() + 2592000000,
            amount: invPrice[0],
            customer: custName[0],
            create_date: Date.now(),
        };
        addInvoice(data);
    };
    // const tows = tasks.filter((t) => t.userId === selectedUser);

    const pows = projects
        .filter((project) => project.userId === selectedUser)
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
        .map((task) => (
            <tr key={task.id}>
                <td>{task.title}</td>
                {projects
                    .filter((project) => project.userId === selectedUser)
                    .map((project) => (
                        <td key={task.id}>{project.hourly_rate}</td>
                    ))}
                {timelogs
                    .filter((time) => time.taskId === task.id)
                    .map((time) => (
                        <td key={time.id}>
                            <p>
                                {dayjs
                                    .duration(time.timerStop - time.timerStart)
                                    .format('HH:mm:ss')}
                            </p>
                        </td>
                    ))}
                <td>
                    <Checkbox
                        value={task.id}
                        onChange={(e) => setSelectedTasks(e.target.value)}
                    />
                </td>
            </tr>
        ));
    console.log(selectedTasks);
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
                            </tr>
                        </tbody>
                    </Table>
                </>
            )}
        </>
    );
};

export default Invoice;
