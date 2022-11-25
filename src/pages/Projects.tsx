import { Table, Select, Button } from '@mantine/core';
import { useInvoice } from '@/contexts/Index';
import { useMemo, useState } from 'react';

function Projects() {
    const { users, projects, tasks, deleteProject } = useInvoice();
    const [selectedUser, setSelectedUser] = useState('');

    const handleDelete = (id: string) => {
        deleteProject(id);
    };

    const usersArray = useMemo(() => {
        return users.map(({ id, name }) => ({
            value: id,
            label: name,
        }));
    }, [users]);

    const tows = tasks.filter((t) => t.userId === selectedUser).length;
    const rows = projects
        .filter((project) => project.userId === selectedUser)
        .map((project) => (
            <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.userId}</td>
                <td>{tows}</td>

                <td onClick={() => handleDelete(project.id)}>
                    <Button>Remove</Button>
                </td>
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
                <>
                    <Table>
                        <thead>
                            <tr>
                                <th>Project</th>
                                <th>Project id</th>
                                <th>Tasks</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </>
            )}
        </>
    );
}
export default Projects;
