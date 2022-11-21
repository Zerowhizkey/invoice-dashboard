import { Table } from '@mantine/core';
import { useInvoice } from '@/contexts/Index';

function Invoice() {
    const { invoices, deleteInvoice } = useInvoice();

    const handleDelete = (id: string) => {
        deleteInvoice(id);
    };
    // const customer = invoices.find((i) => i.customer);
    const iows = invoices.map((invoice) => (
        <tr key={invoice.id}>
            <td>{invoice.amount}</td>
            <td>{invoice.id}</td>
            <td>{invoice.status}</td>

            <td onClick={() => handleDelete(invoice.id)}>x</td>
        </tr>
    ));

    return (
        <Table>
            <thead>
                <tr>
                    <th>Price</th>
                    <th>Invoice Customer</th>
                    <th>Invoice Id</th>
                    <th>Invoice Status</th>
                </tr>
            </thead>
            <tbody>{iows}</tbody>
        </Table>
    );
}
export default Invoice;
