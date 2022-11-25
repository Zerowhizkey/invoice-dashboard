import { Table } from '@mantine/core';
import { useInvoice } from '@/contexts/Index';
import dayjs from 'dayjs';
function Invoice() {
    const { invoices, deleteInvoice } = useInvoice();

    const handleDelete = (id: string) => {
        deleteInvoice(id);
    };
    // const customer = invoices.find((i) => i.customer);
    const iows = invoices.map((invoice) => (
        <tr key={invoice.id}>
            <td>{invoice.amount} kr</td>
            <td>{invoice.customer}</td>
            <td>{invoice.status}</td>
            <td>{dayjs(invoice.due_date).format('YYYY/MM/DD')}</td>

            <td onClick={() => handleDelete(invoice.id)}>x</td>
        </tr>
    ));

    return (
        <Table>
            <thead>
                <tr>
                    <th>Price</th>
                    <th>Invoice Customer</th>
                    <th>Invoice Status</th>
                    <th>Invoice Due Date</th>
                </tr>
            </thead>
            <tbody>{iows}</tbody>
        </Table>
    );
}
export default Invoice;
