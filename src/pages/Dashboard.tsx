import { useInvoice } from '@/contexts/Index';
const Dashboard = () => {
    const { projects, tasks } = useInvoice();

    return (
        <div className='page-container'>
            <h4>Dashboard</h4>
            <div>
                {projects.map((project) => (
                    <p key={project.id}>{project.name}</p>
                ))}
                {tasks.map((task) => (
                    <p key={task.id}>{task.title}</p>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
