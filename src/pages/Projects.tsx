import { useInvoice } from '@/contexts/Index';

const Projects = () => {
    const { projects } = useInvoice();

    return (
        <div>
            <h4>Projects</h4>
            <div>
                {projects.map((project) => (
                    <p key={project.id}>{project.name}</p>
                ))}
            </div>
        </div>
    );
};

export default Projects;
