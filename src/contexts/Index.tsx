import { createContext, useState, useContext, useEffect } from 'react';
import api from '@/api';

const InvoiceContex = createContext<InvoiceContext | null>(null);

export const InvoiceProvider = ({ children }: ProviderProps) => {
    const [users, setUsers] = useState<User[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [timelogs, setTimelogs] = useState<Timelog[]>([]);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);

    const initialLoad = async () => {
        setLoading(true);
        try {
            const [users, projects, tasks, timelogs] = await Promise.all([
                api.users.list(),
                api.projects.list(),
                api.tasks.list(),
                api.timelogs.list(),
            ]);
            setUsers(users);
            setProjects(projects);
            setTasks(tasks);
            setTimelogs(timelogs);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const deleteTimelog = async (id: string) => {
        const deleted = await api.timelogs.delete(id);
        if (!deleted) return;
        await api.timelogs.list().then((timelog) => {
            setTimelogs(timelog);
        });
    };
    const deleteTask = async (id: string) => {
        const deleted = await api.tasks.delete(id);
        if (!deleted) return;
        await api.tasks.list().then((task) => {
            setTasks(task);
        });
    };
    const deleteProject = async (id: string) => {
        const deleted = await api.projects.delete(id);
        if (!deleted) return;
        await api.projects.list().then((project) => {
            setProjects(project);
        });
    };
    const deleteUser = async (id: string) => {
        const deleted = await api.users.delete(id);
        if (!deleted) return;
        await api.users.list().then((user) => {
            setUsers(user);
        });
    };

    const addInvoice = async (id: string, data: unknown, pdata: unknown) => {
        await api.projects.patch(id, pdata);
        const invoice = await api.invoices.post(data);
        setInvoices(invoice);
        await api.projects.list();
        await api.invoices.list();
    };

    useEffect(() => {
        initialLoad();
    }, []);

    return (
        <InvoiceContex.Provider
            value={{
                users,
                projects,
                tasks,
                timelogs,
                invoices,
                loading,
                deleteTimelog,
                deleteProject,
                deleteTask,
                deleteUser,
                addInvoice,
            }}
        >
            {children}
        </InvoiceContex.Provider>
    );
};

export const useInvoice = () => {
    const contextValue = useContext(InvoiceContex);
    if (!contextValue) {
        throw new Error('UseInvoice is outside InvoiceProvider');
    }
    return contextValue;
};

// const users = await api.users.list();
// setUsers(users);
// const users = await fetchData(
//     `https://silk-sapphire-houseboat.glitch.me/users`
// );
// const projects = await api.projects.list();
// setProjects(projects);
// const projects = await fetchData(
//     `https://silk-sapphire-houseboat.glitch.me/projects`
// );
// const tasks = await api.tasks.list();
// setTasks(tasks);
// // const tasks = await fetchData(
//     `https://silk-sapphire-houseboat.glitch.me/tasks`
// );
// const timelogs = await api.timelogs.list();
// setTimelogs(timelogs);
// const timelogs = await fetchData(
//     `https://silk-sapphire-houseboat.glitch.me/timelogs`
// );
// setTimelogs(timelogs);
// if (isUserArray(users)) {
//     setUsers(users);
// }
// if (isProjectArray(projects)) {
//     setProjects(projects);
// }
// if (isTaskArray(tasks)) {
//     setTasks(tasks);
// }
// if (isTimeArray(timelogs)) {
//     setTimelogs(timelogs);
// }
