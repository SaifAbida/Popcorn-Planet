import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

type UserUpdate = {
  username: string;
  email: string;
};

type PasswordUpdate = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

const UpdateUsers = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState<UserUpdate>({} as UserUpdate);
  const [password, setPassword] = useState<PasswordUpdate>(
    {} as PasswordUpdate
  );
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!token) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "You are not authorised!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
      return;
    }
    axios
      .get(`http://127.0.0.1:8000/user/users/${id}`, {
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { username, email } = res.data.data;
        setUser({ username, email });
      });
  }, []);

  const handleSubmitUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .put(`http://127.0.0.1:8000/user/users/update/${id}`, user, {
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .then((_: AxiosResponse) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleSubmitChangePassword = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    axios
      .patch(`http://127.0.0.1:8000/user/users/reset/${id}`, password, {
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .then((_: AxiosResponse) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Password changed successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.response.data,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPassword((prevPassword) => ({
      ...prevPassword,
      [name]: value,
    }));
  };
  return (
    <>
      <section className="auth-container">
        <div className="loginContainer">
          <h1 className="auth-title">Update: </h1>
          <form onSubmit={handleSubmitUpdate}>
            <div className="loginFields">
              <label>Username:</label>
              <br />
              <input
                name="username"
                type="text"
                placeholder="Please enter your Username"
                value={user.username}
                onChange={handleUserChange}
                required
              />
              <br />
              <label>Email:</label>
              <br />
              <input
                name="email"
                type="email"
                placeholder="Please enter your Email"
                value={user.email}
                onChange={handleUserChange}
                required
              />
              <br />
            </div>
            <button type="submit" className="btn btn-dark ms-2">
              Update
            </button>
          </form>
        </div>
        <div className="loginContainer">
          <h1 className="auth-title">Change password: </h1>
          <form onSubmit={handleSubmitChangePassword}>
            <div className="loginFields">
              <br />
              <input
                name="currentPassword"
                type="password"
                placeholder="Please enter your current password"
                value={password.currentPassword}
                onChange={handlePasswordChange}
                required
              />
              <br />
              <input
                name="password"
                type="password"
                placeholder="Please enter your new password"
                value={password.password}
                onChange={handlePasswordChange}
                required
              />
              <br />
              <input
                name="confirmPassword"
                type="password"
                placeholder="Please confirm your password"
                value={password.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
              <br />
            </div>
            <button type="submit" className="btn btn-dark ms-2">
              Update
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default UpdateUsers;
