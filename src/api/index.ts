import axios from 'axios';
import * as x from 'x-is-type';

export const fetchData = async (path: string): Promise<unknown> => {
    const res = await axios.get(path);
    console.log(res);
    return res.data;
};

export const isUser = (data: unknown): data is User => {
    return x.isObj(data) && 'id' in data && 'name' in data;
};

export const isUserArray = (data: unknown): data is User[] => {
    if (!x.isArr(data)) return false;
    return data.every((user) => isUser(user));
};

export const isProject = (data: unknown): data is Project => {
    return (
        data instanceof Object &&
        'id' in data &&
        'userId' in data &&
        'name' in data &&
        'color' in data
    );
};

export const isProjectArray = (data: unknown): data is Project[] => {
    if (!Array.isArray(data)) return false;
    return data.every((project) => isProject(project));
};

export const isTask = (data: unknown): data is Task => {
    return (
        data instanceof Object &&
        'id' in data &&
        'userId' in data &&
        'projectId' in data &&
        'title' in data
    );
};

export const isTaskArray = (data: unknown): data is Task[] => {
    if (!Array.isArray(data)) return false;
    return data.every((task) => isTask(task));
};

export const isTime = (data: unknown): data is Timelog => {
    return (
        data instanceof Object &&
        'id' in data &&
        'userId' in data &&
        'projectId' in data &&
        'taskId' in data &&
        'timerStart' in data &&
        'timerStop' in data
    );
};

export const isTimeArray = (data: unknown): data is Timelog[] => {
    if (!Array.isArray(data)) return false;
    return data.every((time) => isTime(time));
};
