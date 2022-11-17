import { useInvoice } from '@/contexts/Index';

const Tasks = () => {
    const { tasks } = useInvoice();
    return (
        <div>
            <h4>Tasks</h4>
            <div>
                {tasks &&
                    tasks.map((task) => <p key={task.id}>{task.title}</p>)}
            </div>
        </div>
    );
};

export default Tasks;
