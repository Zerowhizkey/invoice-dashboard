import axios from 'axios';
const BASE_URL = 'https://silk-sapphire-houseboat.glitch.me';
const validRoutes = ['users', 'projects', 'tasks', 'timelogs'];

const createApiHandler = (route: string) => {
    if (!validRoutes.includes(route)) {
        throw `Invalid route: ${route}, valid routes are ${validRoutes
            .map((route) => `"${route}"`)
            .join(' | ')}`;
    }
    const URL = `${BASE_URL}/${route}`;
    return {
        async get() {
            const response = await axios.get(URL);
            return response.data;
        },
        async post(data: unknown) {
            const response = await axios.post(URL, data);
            return response.data;
        },
        async patch(id: string, data: unknown) {
            const response = await axios.patch(`${URL}/${id}`, data);
            return response.data;
        },
        async delete(id: string) {
            const response = await axios.delete(`${URL}/${id}`);
            return response.status === 200;
        },
    };
};
const api = {
    users: createApiHandler('users'),
    projects: createApiHandler('projects'),
    tasks: createApiHandler('tasks'),
    timelogs: createApiHandler('timelogs'),
};
export default api;
