import { Table, Select } from '@mantine/core';
import { useInvoice } from '@/contexts/Index';
import { useMemo, useState } from 'react';
function Projects() {
    const { users, projects } = useInvoice();
    const [selectedUser, setSelectedUser] = useState('');

    const usersArray = useMemo(() => {
        return users.map(({ id, name }) => ({
            value: id,
            label: name,
        }));
    }, [users]);

    const rows = projects
        .filter((project) => project.userId === selectedUser)
        .map((project) => (
            <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.userId}</td>
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
                <Table>
                    <thead>
                        <tr>
                            <th>Project</th>
                            <th>Project id</th>
                            <th>Tasks</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            )}
        </>
    );
}
export default Projects;
