import { Table } from '@mantine/core';
import { useInvoice } from '@/contexts/Index';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';

dayjs.extend(customParseFormat);
dayjs.extend(duration);

function Dashboard() {
    const { users, projects, tasks, timelogs, invoices } = useInvoice();
    const uows = users.filter((u) => u.id !== '').length;
    const pows = projects.filter((p) => p.id !== '').length;
    const tows = tasks.filter((t) => t.id !== '').length;
    const iows = invoices.filter((i) => i.id !== '').length;

    const total = timelogs
        .map((time) => time)
        .reduce((sum, curr) => {
            return sum + (curr.timerStop - curr.timerStart);
        }, 0);

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
                    <td>{dayjs.duration(total).format('HH:mm:ss')}</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th>Invoices</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>{iows}</td>
                </tr>
            </tbody>
        </Table>
    );
}
export default Dashboard;
