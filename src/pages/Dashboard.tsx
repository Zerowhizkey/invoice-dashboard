import { Table } from '@mantine/core';
import { useInvoice } from '@/contexts/Index';
function Dashboard() {
    const { users, projects, tasks, timelogs } = useInvoice();

    const uows = users.filter((u) => u.id !== '').length;
    const pows = projects.filter((p) => p.id !== '').length;
    const tows = tasks.filter((t) => t.id !== '').length;
    const tuows = timelogs.filter((t) => t.id !== '').length;

    return (
        <Table>
            <thead>
                <tr>
                    <th>Users</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{uows}</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th>Projects</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{pows}</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th>Tasks</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{tows}</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th>Total time</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>{tuows}</td>
                </tr>
            </tbody>
        </Table>
    );
}
export default Dashboard;
