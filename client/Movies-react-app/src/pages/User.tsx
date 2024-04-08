import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../components/UserCard";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

type userType = {
  username: string;
  email: string;
  _id: string;
  role: string;
};

const Users = () => {
  const [users, setUsers] = useState<userType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "You are not authorised!",
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
      navigate("/login");
      return;
    }
    axios
      .get("http://127.0.0.1:8000/user/users", {
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
        setLoading(false);
      });
  }, []);

  function deleteUser(id: string) {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
  }

  function changeRole(id: string) {
    const userIndex = users.findIndex((user) => user._id === id);
    if (userIndex === -1) return;
    const updatedUser = { ...users[userIndex] };
    updatedUser.role = "admin";
    const updatedUsers = [...users];
    updatedUsers[userIndex] = updatedUser;
    setUsers(updatedUsers);
  }

  return (
    <>
      <h1 className="users-header">List of users: </h1>
      <div className="container">
        <div className="row">
          {users.map((user) => {
            return loading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <div className="col">
                <UserCard
                  key={user._id}
                  username={user.username}
                  email={user.email}
                  role={user.role}
                  id={user._id}
                  deleteUser={deleteUser}
                  changeRole={changeRole}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Users;
