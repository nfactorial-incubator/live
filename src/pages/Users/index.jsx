import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adjectives } from "unique-names-generator";
import { api } from "../../services/api";

export const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/api/user/all");
      const users = response?.data || [];
      setUsers(users);
    } catch (error) {
      console.log(error.response?.data?.message ?? error);
      return error;
    }
  };

  return (
    <div>
      <h1>Users</h1>

      <ul>
        {users?.length > 0 ? (
          users.map((user) => (
            <li key={user.nickname}>
              <strong>Nickname: </strong>
              <Link key={user.nickname} to={`/user/${user.nickname}`}>
                {user.nickname}
              </Link>
              <strong>Full Name: </strong> {user.firstname} {user.lastname}
            </li>
          ))
        ) : (
          <li>Empty user list</li>
        )}
      </ul>
    </div>
  );
};
