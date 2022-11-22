import { Table } from '@mantine/core';
import { useInvoice } from '@/contexts/Index';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
dayjs.extend(duration);

function Dashboard() {
    const { users, projects, tasks, timelogs, invoices } = useInvoice();
    const uows = users.filter((u) => u.id !== '').length;
    const pows = projects.filter((p) => p.id !== '').length;
    const tows = tasks.filter((t) => t.id !== '').length;
    const iows = invoices.filter((i) => i.id !== '').length;

    const total = timelogs
        .filter(
            (time) =>
                dayjs(time.timerStart).isBetween(
                    Date.now() - 2592000000,
                    Date.now()
                ) ||
                dayjs(time.timerStop).isBetween(
                    Date.now() - 2592000000,
                    Date.now()
                )
        )
        .map((time) => time)
        .reduce((sum, curr) => {
            return sum + (curr.timerStop - curr.timerStart);
        }, 0);

    const all = invoices
        .filter((invoice) =>
            dayjs(invoice.create_date).isBetween(
                new Date().getFullYear(),
                Date.now()
            )
        )
        .map((i) => i.amount);
    const calced =
        Math.round(
            all.reduce((acc, value) => {
                return acc + value;
            }, 0) * 100
        ) / 100;
    console.log(calced);

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
                    <th>
                        Total time since :
                        {dayjs(Date.now() - 2592000000).format('DD/MM/YYYY')}
                    </th>
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
            <thead>
                <tr>
                    <th>
                        Total amount sek this year :
                        {dayjs(Date.now()).format('YYYY')}
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>{calced}</td>
                </tr>
            </tbody>
        </Table>
    );
}
export default Dashboard;
