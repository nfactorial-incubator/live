import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { uniqueNamesGenerator } from "unique-names-generator";
import { nouns } from "../../utils/nouns";

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
      nickname,
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
    setRequestStatus("loading");
    await signUp({ ...values, role: "student" });
    setRequestStatus("success");
  };

  useEffect(() => {
    // clean the function to fix memory leak
    return () => setRequestStatus("success");
  }, []);

  return (
    <div>
      <form noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">Firstname</label>
          <input
            value={values.firstname}
            type="text"
            name="firstname"
            id="firstname"
            disabled={requestStatus === "loading"}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="lastname">Lastname</label>
          <input
            value={values.lastname}
            type="text"
            name="lastname"
            id="lastname"
            disabled={requestStatus === "loading"}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="nickname">Nickname</label>
          <input
            value={values.nickname}
            type="text"
            name="nickname"
            id="nickname"
            disabled
            onChange={handleChange}
          />
          <span>Nickname is generated automatically</span>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            value={values.password}
            type="password"
            name="password"
            id="password"
            disabled={requestStatus === "loading"}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={requestStatus === "loading"}>
          {requestStatus === "loading" ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
