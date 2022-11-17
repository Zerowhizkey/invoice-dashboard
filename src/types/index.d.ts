interface ProviderProps {
    children?: React.ReactNode;
}
interface InvoiceContext {
    users: User[];
    projects: Project[];
    tasks: Task[];
    timelogs: Timelog[];
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
