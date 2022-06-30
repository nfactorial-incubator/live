import { Textarea } from "flowbite-react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { LayoutContainer } from "../../components/LayoutContainer";
import { api } from "../../services/api";
import Picker, { SKIN_TONE_NEUTRAL } from "emoji-picker-react";
import { GoMarkGithub } from "react-icons/go";
import { TbExternalLink } from "react-icons/tb";

const initialFormValues = () => {
  return {
    title: "",
    description: "",
    githubUrl: "",
    deployedUrl: "",
    emojis: "",
  };
};

export const Project = () => {
  const { projectId } = useParams();

  return <ProjectDetails />;
};

export const ProjectDetails = () => {
  return (
    <LayoutContainer>
      <div className="flex flex-col gap-2">
        <h5 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          {"🚀👋 → Tiktok programming"}
        </h5>
        <p className="font-regular text-xl text-gray-400">
          {"Aidar Nugmanov • @aidar-jquery-lover"}
        </p>
      </div>
      <p className="text-xl">
        For years parents have espoused the health benefits of eating garlic
        bread with cheese to their children, with the food earning such an
        iconic status in our culture that kids will often dress up as warm,
        cheesy loaf for Halloween.
      </p>
      <div className="flex flex-row gap-4">
        <button
          type="button"
          onClick={() => {}}
          className="max-w-fit border border-gray-300 text-gray-800 hover:bg-gray-50  font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
        >
          <GoMarkGithub className="mr-2 w-6 h-6" />
          View on GitHub
        </button>
        <button
          type="button"
          onClick={() => {}}
          className="max-w-fit border border-gray-300 text-gray-800 hover:bg-gray-50  font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
        >
          <TbExternalLink className="mr-2 w-6 h-6" />
          Visit Website
        </button>
      </div>
      <iframe
        style={{
          width: "100vw",
          height: "100vh",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
        }}
        src="https://trainy.vercel.app/"
      />
    </LayoutContainer>
  );
};

export const CreateOrEditProject = () => {
  const DESCRIPTION_MAX_LENGTH = 150;

  const [values, setValues] = useState(initialFormValues);
  const [requestStatus, setRequestStatus] = useState("success");
  const [chosenEmojis, setChosenEmojis] = useState([]);
  const [descriptionCharsLeft, setDescriptionCharsLeft] = useState(
    DESCRIPTION_MAX_LENGTH
  );

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmojis([emojiObject.emoji, ...chosenEmojis]);
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleDescriptionChange = (e) => {
    handleChange(e);
    setDescriptionCharsLeft(DESCRIPTION_MAX_LENGTH - e.target.value.length);
  };

  const viewAllProjects = () => {
    navigate("/projects");
  };

  const createProject = async (body) => {
    try {
      const response = await api.post("/api/project", body);
      const { title } = response.data;
      alert(title, " project has been successfully created!");
      viewAllProjects();
    } catch (error) {
      const err = error;
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setRequestStatus("loading");
      const emojis = chosenEmojis?.[0] + chosenEmojis?.[1];
      await createProject({ ...values, emojis });
    } catch (error) {
      alert(error.response.data.message ?? error);
    } finally {
      setRequestStatus("success");
    }
  };

  return (
    <LayoutContainer>
      <Header
        title={"Create Project"}
        subtitle={"Submit your amazing project, so others can get inspired!"}
      />
      <button
        type="button"
        onClick={viewAllProjects}
        className="max-w-fit border border-gray-300 text-gray-800 hover:bg-gray-50  font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
          />
        </svg>
        View all projects
      </button>
      <form
        noValidate
        onSubmit={handleSubmit}
        className="grid grid-cols-4 gap-x-6 gap-y-0"
      >
        <div className="col-span-2 col-start-1 ">
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Title
            </label>
            <input
              value={values.title}
              type="text"
              name="title"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
            <Textarea
              id="description"
              name="description"
              required={true}
              rows={4}
              class="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              maxLength={150}
              disabled={requestStatus === "loading"}
              onChange={handleDescriptionChange}
            />
            <p className="text-sm mt-1 text-gray-400">
              {descriptionCharsLeft} chars left
            </p>
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
              className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              id="deployedUrl"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-span-2 col-start-3">
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-300">
              Pick 2 emojis describing your project
            </p>
            <div className="flex flex-row my-4 gap-2">
              <div className="flex place-content-center p-1 w-[31px] h-[34px] bg-white rounded-lg border border-gray-300">
                {chosenEmojis?.[0]}
              </div>
              <div className="flex place-content-center p-1 w-[31px] h-[34px] bg-white rounded-lg border border-gray-300">
                {chosenEmojis?.[1]}
              </div>
            </div>
            <Picker
              onEmojiClick={onEmojiClick}
              disableAutoFocus={true}
              pickerStyle={{
                boxShadow: "none",
                borderColor: "#D1D5DB",
                width: "100%",
              }}
              skinTone={SKIN_TONE_NEUTRAL}
              groupNames={{ smileys_people: "PEOPLE" }}
              native
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={requestStatus === "loading"}
          className="max-w-fit text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center "
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
          {requestStatus === "loading" ? "Loading..." : "Submit"}
        </button>
      </form>
    </LayoutContainer>
  );
};
