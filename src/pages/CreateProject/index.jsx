import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";

const initialFormValues = () => {
  return {
    title: "",
    description: "",
    githubUrl: "",
    deployedUrl: "",
  };
};

export const CreateProject = ({ show }) => {
  const [values, setValues] = useState(initialFormValues);
  const [requestStatus, setRequestStatus] = useState("success");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  const createProject = async (body) => {
    try {
      const response = await api.post("/api/project", body);
      const { title } = response.data;
      alert(title, " project has been successfully created!");
      goBack();
    } catch (error) {
      const err = error;
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setRequestStatus("loading");
      await createProject(values);
    } catch (error) {
      alert(error.response.data.message ?? error);
    } finally {
      setRequestStatus("success");
    }
  };

  return (
    <div className="grid place-items-center overflow-auto">
      <button
        onClick={goBack}
        className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Go back
      </button>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col w-80">
        <div className="mb-6">
          <label
            for="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Title
          </label>
          <input
            value={values.title}
            type="text"
            name="title"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            id="title"
            disabled={requestStatus === "loading"}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label
            for="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your project description..."
            disabled={requestStatus === "loading"}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-6">
          <label
            for="githubUrl"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Github URL
          </label>
          <input
            value={values.githubUrl}
            type="text"
            name="githubUrl"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="githubUrl"
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label
            for="deployedUrl"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Deployed URL
          </label>
          <input
            value={values.deployedUrl}
            type="text"
            name="deployedUrl"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="deployedUrl"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={requestStatus === "loading"}
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {requestStatus === "loading" && (
            <>
              <svg
                role="status"
                className="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            </>
          )}
          {requestStatus === "loading" ? "Loading..." : "Create Project"}
        </button>
      </form>
    </div>
  );
};
