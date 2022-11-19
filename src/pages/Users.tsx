import { useState, useMemo } from 'react';
import { useInvoice } from '@/contexts/Index';
import { Accordion } from '@mantine/core';
import { Select } from '@mantine/core';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';

dayjs.extend(customParseFormat);
dayjs.extend(duration);

const Users = () => {
    const {
        users,
        projects,
        tasks,
        timelogs,
        deleteUser,
        deleteProject,
        deleteTask,
        deleteTimelog,
    } = useInvoice();
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedTask, setSelectedTask] = useState('');

    const handleDeleteU = (id: string) => {
        deleteUser(id);
    };
    const handleDeleteP = (id: string) => {
        deleteProject(id);
    };
    const handleDeleteT = (id: string) => {
        deleteTask(id);
    };
    const handleDeleteTi = (id: string) => {
        deleteTimelog(id);
    };

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

    const tasksArray = useMemo(() => {
        return tasks
            .filter((task) => task.projectId === selectedProject)
            .map(({ id, title }) => ({
                value: id,
                label: title,
            }));
    }, [tasks, selectedProject]);

    return (
        <div className='page-container'>
            <h4>Users</h4>

            <Select
                clearable
                label='Users'
                placeholder='Pick one'
                data={usersArray}
                value={selectedUser}
                onChange={(userId) => setSelectedUser(userId || '')}
            />
            {selectedUser && (
                <button onClick={() => handleDeleteU(selectedUser)}>x</button>
            )}
            {selectedUser && projectsArray.length !== 0 && (
                <>
                    <Select
                        clearable
                        label='Projects'
                        placeholder='Pick one'
                        data={projectsArray}
                        value={selectedProject}
                        onChange={(projectId) =>
                            setSelectedProject(projectId || '')
                        }
                    />
                    {selectedProject && (
                        <button onClick={() => handleDeleteP(selectedProject)}>
                            x
                        </button>
                    )}
                </>
            )}
            {selectedProject && tasksArray.length !== 0 && (
                <>
                    <Select
                        clearable
                        label='Tasks'
                        placeholder='Pick one'
                        data={tasksArray}
                        value={selectedTask}
                        onChange={(taskId) => setSelectedTask(taskId || '')}
                    />
                    {selectedTask && (
                        <button onClick={() => handleDeleteT(selectedTask)}>
                            x
                        </button>
                    )}
                </>
            )}
            {selectedTask && (
                <Accordion>
                    <Accordion.Item value='customization'>
                        <Accordion.Control>Time logs</Accordion.Control>

                        {timelogs
                            .filter((time) => time.taskId === selectedTask)
                            .map((time) => (
                                <Accordion.Panel key={time.id}>
                                    {dayjs
                                        .duration(
                                            time.timerStop - time.timerStart
                                        )
                                        .format('HH:mm:ss')}
                                    <p onClick={() => handleDeleteTi(time.id)}>
                                        X
                                    </p>
                                </Accordion.Panel>
                            ))}
                    </Accordion.Item>
                </Accordion>
            )}
        </div>
    );
};

export default Users;
