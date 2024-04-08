import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";

type userProps = {
  key: string;
  username: string;
  email: string;
  role: string;
  id: string;
  deleteUser(id: string): void;
  changeRole(id: string): void;
};

const UserCard = ({
  username,
  email,
  role,
  id,
  deleteUser,
  changeRole,
}: userProps) => {
  const token = localStorage.getItem("token");

  function handleDelete() {
    axios
      .delete(`http://127.0.0.1:8000/user/users/delete/${id}`, {
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .then((_: AxiosResponse) => {
        deleteUser(id);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
        console.log(error);
      });
  }

  function upgradeToAdmin() {
    axios
      .patch(
        `http://127.0.0.1:8000/user/users/admin/${id}`,
        {},
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      )
      .then((_: AxiosResponse) => {
        changeRole(id);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
        console.log(error);
      });
  }

  return (
    <>
      <div className="card shadow mb-5 bg-body-tertiary rounded">
        <div className="card-body">
          <h5
            className="card-title user-card-name"
            style={{ marginBottom: "15px" }}
          >
            Username: <strong>{username}</strong>
          </h5>
          <p className="card-text">ID: {id}</p>
          <p className="card-text">Email: {email}</p>
          <p className="card-text">Role: {role}</p>
          <a href={`/users/${id}`} className="btn btn-dark">
            Update
          </a>
          <a className="btn btn-danger ms-2" onClick={handleDelete}>
            Delete
          </a>
          {role === "user" && (
            <a className="btn btn-success ms-2" onClick={upgradeToAdmin}>
              Admin
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default UserCard;
