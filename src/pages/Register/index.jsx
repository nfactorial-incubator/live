import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { uniqueNamesGenerator } from "unique-names-generator";
import { nouns } from "../../utils/nouns";
import { Link } from "react-router-dom";

const initialFormValues = () => {
  return {
    firstname: "",
    lastname: "",
    nickname: "",
    password: "",
  };
};

export const Register = () => {
  const [values, setValues] = useState(initialFormValues);
  const [isMentor, setIsMentor] = useState(false);
  const [requestStatus, setRequestStatus] = useState("success");
  const { signUp } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let nickname;
    if (name === "firstname") {
      nickname = generateNickname(value);
    }
    setValues({
      ...values,
      [name]: value,
      ...(nickname !== undefined && { nickname }),
    });
  };

  const generateNickname = (firstname) => {
    if (firstname === "") {
      return "";
    }
    const lowercased = firstname.toLowerCase();
    const random = uniqueNamesGenerator({
      dictionaries: [nouns],
      length: 1,
      separator: "-",
      style: "lowerCase",
    });
    return `${lowercased}-${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setRequestStatus("loading");
      console.log("values", values);
      await signUp({ ...values, role: isMentor ? "mentor" : "student" });
    } catch (error) {
      alert(error.response.data.message ?? error);
    } finally {
      setRequestStatus("success");
    }
  };

  const onPasswordClick = (e) => {
    if (e.detail === 5) {
      setIsMentor(true);
    }
  };

  useEffect(() => {
    // clean the function to fix memory leak
    return () => setRequestStatus("success");
  }, []);

  return (
    <div class="grid h-screen place-items-center overflow-auto">
      <form noValidate onSubmit={handleSubmit} class="flex flex-col w-80 my-16">
        <div class="mb-6">
          <label
            for="firstname"
            class="block mb-2 text-sm font-medium text-gray-900 "
          >
            Firstname
          </label>
          <input
            value={values.firstname}
            type="text"
            name="firstname"
            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            id="firstname"
            placeholder="Samat"
            disabled={requestStatus === "loading"}
            onChange={handleChange}
          />
        </div>

        <div class="mb-6">
          <label
            for="lastname"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Lastname
          </label>
          <input
            value={values.lastname}
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Legendov"
            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            disabled={requestStatus === "loading"}
            onChange={handleChange}
          />
        </div>

        <div class="mb-6">
          <label
            for="nickname"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Nickname
          </label>
          <input
            value={values.nickname}
            type="text"
            name="nickname"
            placeholder="sake-the-legend"
            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            id="nickname"
            disabled
            onChange={handleChange}
          />
          <p
            id="helper-text-explanation"
            class="mt-2 text-sm text-gray-500 dark:text-gray-400"
          >
            Nickname is generated automatically
          </p>
        </div>

        <div class="mb-6">
          <label
            for="password"
            onClick={onPasswordClick}
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Password
          </label>
          <input
            value={values.password}
            type="password"
            name="password"
            id="password"
            placeholder="•••••••"
            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            disabled={requestStatus === "loading"}
            onChange={handleChange}
          />
        </div>

        {isMentor && (
          <>
            <div class="mb-6">
              <label
                for="secret"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Mentor's Passpharse
              </label>
              <input
                value={values.secret}
                type="password"
                name="secret"
                id="secret"
                placeholder="•••••••"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                disabled={requestStatus === "loading"}
                onChange={handleChange}
              />
              <p class="mt-2 text-sm text-pink-600 dark:text-pink-500">
                <span class="font-medium">Welcome, sensei!</span> Mentor mode
                activated.
              </p>
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={requestStatus === "loading"}
          class="w-full text-white bg-blue-700 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {requestStatus === "loading" && (
            <>
              <svg
                role="status"
                class="inline w-4 h-4 mr-3 text-white animate-spin"
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
          {requestStatus === "loading" ? "Loading..." : "Register"}
        </button>
        <div class="relative flex py-4 items-center">
          <div class="flex-grow border-t border-gray-300"></div>
          <span class="flex-shrink mx-4 text-gray-400">or</span>
          <div class="flex-grow border-t border-gray-300"></div>
        </div>

        <Link to="/login">
          <button
            type="button"
            class="w-full py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
          >
            Login
          </button>
        </Link>
      </form>
    </div>
  );
};
