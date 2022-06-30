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
      <div className="grid grid-cols-4 h-screen ">
        <div className="flex flex-col gap-5 col-start-2 col-span-2">
          <h5 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Project Submissions
          </h5>
          <p className="font-normal text-2xl text-gray-600">
            List of projects that are being built by our students right now.
          </p>
          <Link to="/project/create">
            <button className="bg-gray-800 text-gray-100 hover:bg-gray-700 rounded-md py-2 px-6">
              Submit project
            </button>
          </Link>
          <div className="grid grid-cols-2 gap-5">
            {projects?.length > 0 ? (
              projects.map((project) => (
                // <li key={project.title}>
                <div className="flex flex-col border bg-white rounded-md p-6 transform transition-transform ease-in-out duration-100 hover:border-gray-300">
                  <div>🚀🦾</div>
                  <div className="font-semibold text-gray-800">
                    {project.title}
                  </div>
                  <div className="text-sm text-gray-700 break-words ">
                    {project.description}
                  </div>
                </div>
                // </li>
              ))
            ) : (
              <p>Empty projects list</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
