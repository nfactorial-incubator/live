import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { LayoutContainer } from "../../components/LayoutContainer";
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
    <LayoutContainer>
      <Header
        title={"Project Submissions"}
        subtitle={
          "List of projects that are being built by our students right now."
        }
      />
      <Link to="/project">
        <button className="flex flex-row place-content-center gap-2 bg-blue-700 text-white hover:bg-blue-600 text-sm rounded-md py-2.5 px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 self-center"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create project
        </button>
      </Link>
      <div className="grid grid-cols-2 gap-5 mb-6">
        {projects?.length > 0 ? (
          projects.map((project) => (
            <div className="flex flex-col gap-y-1 cursor-pointer border bg-white rounded-md p-6 transform transition-transform ease-in-out duration-100 hover:border-gray-300 hover:-translate-y-1 focus:-translate-y-1">
              <div>{project.emojis}</div>
              <div className="font-semibold text-gray-800">
                {"Tiktok for Programming"}
              </div>
              <div className="text-sm text-gray-400 break-words ">
                {"@aidar-jquery-lover"}
              </div>
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
