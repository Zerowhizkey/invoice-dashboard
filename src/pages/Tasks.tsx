import { Table, Select } from '@mantine/core';
import { useInvoice } from '@/contexts/Index';
import { useMemo, useState } from 'react';

function Tasks() {
    const { projects, tasks, deleteTask } = useInvoice();
    const [selectedProject, setSelectedProject] = useState('');

    const handleDelete = (id: string) => {
        deleteTask(id);
    };

    const projectsArray = useMemo(() => {
        return projects.map(({ id, name }) => ({
            value: id,
            label: name,
        }));
    }, [projects]);

    const rows = tasks
        .filter((tasks) => tasks.projectId === selectedProject)
        .map((task) => (
            <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.userId}</td>
                <td onClick={() => handleDelete(task.id)}>x</td>
            </tr>
        ));

    return (
        <>
            <Select
                clearable
                label='Project'
                placeholder='Pick one'
                data={projectsArray}
                value={selectedProject}
                onChange={(projectId) => setSelectedProject(projectId || '')}
            />
            {selectedProject && (
                <Table>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Task id</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            )}
        </>
    );
}
export default Tasks;
