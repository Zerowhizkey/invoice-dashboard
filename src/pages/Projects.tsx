import { Table, Select } from '@mantine/core';
import { useInvoice } from '@/contexts/Index';
import { useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
function Projects() {
    const { users, projects, tasks, deleteProject, addInvoice } = useInvoice();
    const [selectedUser, setSelectedUser] = useState('');
    const [price, setPrice] = useState(0);

    const handleAdd = (id: string) => {
        const data = {
            id: uuid(),
            status: 'ej betald',
            due_date: Date.now() + 2592000000,
            amount: 100,
            customer: selectedUser,
            create_date: Date.now(),
        };
        addInvoice(id, data, price);
    };

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
                <td>
                    <button onClick={() => handleAdd(project.id)}>Add</button>
                </td>
                <td onClick={() => handleDelete(project.id)}>x</td>
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
