import { createContext, useState, useContext, useEffect } from 'react';
import {
    fetchData,
    isProjectArray,
    isTaskArray,
    isTimeArray,
    isUserArray,
} from '@/api/index';
const InvoiceContex = createContext<InvoiceContext | null>(null);

export const InvoiceProvider = ({ children }: ProviderProps) => {
    const [users, setUsers] = useState<User[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [timelogs, setTimelogs] = useState<Timelog[]>([]);
    const [loading, setLoading] = useState(true);


    
    const initialLoad = async () => {
        setLoading(true);
        try {
            const users = await fetchData(
                `https://silk-sapphire-houseboat.glitch.me/users`
            );
            const projects = await fetchData(
                `https://silk-sapphire-houseboat.glitch.me/projects`
            );
            const tasks = await fetchData(
                `https://silk-sapphire-houseboat.glitch.me/tasks`
            );
            const timelogs = await fetchData(
                `https://silk-sapphire-houseboat.glitch.me/timelogs`
            );
            if (isUserArray(users)) {
                setUsers(users);
            }
            if (isProjectArray(projects)) {
                setProjects(projects);
            }
            if (isTaskArray(tasks)) {
                setTasks(tasks);
            }
            if (isTimeArray(timelogs)) {
                setTimelogs(timelogs);
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        initialLoad();
    }, []);

    return (
        <InvoiceContex.Provider
            value={{ users, projects, tasks, timelogs, loading }}
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
