import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/AuthContext";

const initialFormValues = () => {
  return {
    nickname: "",
    password: "",
  };
};

export const Login = () => {
  const [values, setValues] = useState(initialFormValues);
  const [loginRequestStatus, setLoginRequestStatus] = useState("success");
  const { signIn } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoginRequestStatus("loading");
      await signIn(values);
      setLoginRequestStatus("success");
    } catch (error) {
      alert(error);
      setLoginRequestStatus("success");
      setValues(initialFormValues);
    }
  }

  useEffect(() => {
    // clean the function to fix memory leak
    return () => setLoginRequestStatus("success");
  }, []);

  return (
    <div>
      <form noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nickname">Nickname</label>
          <input
            value={values.nickname}
            type="text"
            name="nickname"
            id="nickname"
            disabled={loginRequestStatus === "loading"}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            value={values.password}
            type="password"
            name="password"
            id="password"
            disabled={loginRequestStatus === "loading"}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loginRequestStatus === "loading"}>
          {loginRequestStatus === "loading" ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
