import { Button, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import { CreateProject } from "../CreateProject";

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
    <>
      <div className="grid grid-cols-4">
        <div className="flex flex-col gap-5 col-start-2 col-span-2">
          <Card href="#">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Project Submissions
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here is the list of projects that are being built by our students
              right now.
            </p>
          </Card>
          <Link to="/project/create">
            <Button className="mt-6 py-2.5 px-5 mr-2 mb-6 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              Create Project
            </Button>
          </Link>
          <ul className="flex flex-col gap-5">
            {projects?.length > 0 ? (
              projects.map((project) => (
                <Card>
                  <li key={project.title}>
                    <strong>{project.title}</strong>
                    {/* <strong>{project.description}</strong> */}
                    <strong>{project.githubUrl}</strong>
                    <strong>{project.deployedUrl}</strong>
                  </li>
                </Card>
              ))
            ) : (
              <li>Empty projects list</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
