import { useEffect, useState } from "react";
import { api } from "../../services/api";

export const Profile = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const response = await api.get("/api/user/me");
      const user = response?.data || {};
      setUser(user);
    } catch (error) {
      console.log(error.response?.data?.message ?? error);
      return error;
    }
  };

  return (
    <div>
      <h1>{user.nickname}</h1>
      <p>{user.firstname}</p>
    </div>
  );
};
