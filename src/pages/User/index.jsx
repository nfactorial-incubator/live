import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";

export const User = () => {
  const [user, setUser] = useState([]);
  const { nickname } = useParams();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const response = await api.get(`/api/user/${nickname}`);
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
