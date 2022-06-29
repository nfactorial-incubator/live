import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

export const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/api/project/all");
      const projects = response?.data || [];
      setProjects(projects);
    } catch (error) {
      console.log(error.response?.data?.message ?? error);
      return error;
    }
  };

  return (
    <div>
      <h1>Projects</h1>
      <Link to="/project/create">
        <button
          type="button"
          class="mt-6 py-2.5 px-5 mr-2 mb-6 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Create Project
        </button>
      </Link>
      <ul>
        {projects?.length > 0 ? (
          projects.map((project) => (
            <li key={project.title}>
              <strong>{project.title}</strong>
              <strong>{project.description}</strong>
              <strong>{project.githubUrl}</strong>
              <strong>{project.deployedUrl}</strong>
            </li>
          ))
        ) : (
          <li>Empty projects list</li>
        )}
      </ul>
    </div>
  );
};
