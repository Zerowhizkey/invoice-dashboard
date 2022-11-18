import { useState, useMemo } from 'react';
import { useInvoice } from '@/contexts/Index';
import { Accordion } from '@mantine/core';
import { Select } from '@mantine/core';

const Users = () => {
    const { users, projects, tasks, timelogs } = useInvoice();
    console.log(users);
    console.log(projects);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedTask, setSelectedTask] = useState('');

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
            {selectedUser && projectsArray.length !== 0 && (
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
            )}
            {selectedProject && tasksArray.length !== 0 && (
                <Select
                    clearable
                    label='Tasks'
                    placeholder='Pick one'
                    data={tasksArray}
                    value={selectedTask}
                    onChange={(taskId) => setSelectedTask(taskId || '')}
                />
            )}
            {selectedTask && (
                <Accordion>
                    <Accordion.Item value='customization'>
                        <Accordion.Control>Time logs</Accordion.Control>

                        {timelogs
                            .filter((time) => time.taskId === selectedTask)
                            .map((time) => (
                                <Accordion.Panel key={time.id}>
                                    {time.id}
                                </Accordion.Panel>
                            ))}
                    </Accordion.Item>
                </Accordion>
            )}
        </div>
    );
};

export default Users;
