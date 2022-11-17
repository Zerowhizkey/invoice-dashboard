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

    useEffect(() => {
        fetchData(`https://silk-sapphire-houseboat.glitch.me/users`).then(
            (data) => {
                console.log(data);
                if (isUserArray(data)) {
                    setUsers(data);
                }
            }
        );
    }, []);

    useEffect(() => {
        fetchData(`https://silk-sapphire-houseboat.glitch.me/projects`).then(
            (data) => {
                console.log(data);
                if (isProjectArray(data)) {
                    setProjects(data);
                }
            }
        );
    }, []);

    useEffect(() => {
        fetchData(`https://silk-sapphire-houseboat.glitch.me/tasks`).then(
            (data) => {
                console.log(data);
                if (isTaskArray(data)) {
                    setTasks(data);
                }
            }
        );
    }, []);

    useEffect(() => {
        fetchData(`https://silk-sapphire-houseboat.glitch.me/timelogs`).then(
            (data) => {
                console.log(data);
                if (isTimeArray(data)) {
                    setTimelogs(data);
                }
            }
        );
    }, []);
    return (
        <InvoiceContex.Provider value={{ users, projects, tasks, timelogs }}>
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
