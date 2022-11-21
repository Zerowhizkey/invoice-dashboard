interface ProviderProps {
    children?: React.ReactNode;
}
interface InvoiceContext {
    users: User[];
    projects: Project[];
    tasks: Task[];
    timelogs: Timelog[];
    invoices: Invoice[];
    loading: boolean;
    deleteTimelog: (id: id) => void;
    deleteTask: (id: id) => void;
    deleteProject: (id: id) => void;
    deleteUser: (id: id) => void;
    deleteInvoice: (id: id) => void;
    addInvoice: (data: unknown) => void;
    addHourly: (id: Id, data: unknown) => void;
}

type User = {
    id: string;
    name: string;
};

type Project = {
    id: string;
    userId: string;
    name: string;
    color: string;
    hourly_rate: number;
};

type Task = {
    id: string;
    userId: string;
    projectId: string;
    title: string;
};

type Timelog = {
    id: string;
    userId: string;
    projectId: string;
    taskId: string;
    timerStart: number;
    timerStop: number;
};

type Invoice = {
    id: string;
    status: string;
    due_date: number;
    amount: number;
    customer: string;
    create_date: number;
};
