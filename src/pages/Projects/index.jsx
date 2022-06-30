import { Button, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { LayoutContainer } from "../../components/LayoutContainer";
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
    <LayoutContainer>
      <Header
        title={"Project Submissions"}
        subtitle={
          "List of projects that are being built by our students right now."
        }
      />
      <Link to="/project/create">
        <button className="bg-blue-700 text-white hover:bg-blue-600 text-sm rounded-md py-2.5 px-6">
          Create project
        </button>
      </Link>
      <div className="grid grid-cols-2 gap-5">
        {projects?.length > 0 ? (
          projects.map((project) => (
            <div className="flex flex-col border bg-white rounded-md p-6 transform transition-transform ease-in-out duration-100 hover:border-gray-300">
              <div>🚀🦾</div>
              <div className="font-semibold text-gray-800">{project.title}</div>
              <div className="text-sm text-gray-700 break-words ">
                {project.description}
              </div>
            </div>
          ))
        ) : (
          <p>Empty projects list</p>
        )}
      </div>
    </LayoutContainer>
  );
};
