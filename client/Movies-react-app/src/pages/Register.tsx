import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

type UserType = {
  username: string;
  password: string;
  email: string;
};

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType>({} as UserType);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "You already logged in!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/profile");
    }
  }, []);

  function handelUserChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  function handelSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:8000/user/register", user)
      .then((_: AxiosResponse) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Signed up successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
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
  }

  return (
    <>
      <div className="auth-container">
        <div className="loginContainer">
          <h1 className="auth-title">Register</h1>
          <form onSubmit={handelSubmit}>
            <div className="loginFields">
              <label>Username</label>
              <br />
              <input
                name="username"
                type="text"
                placeholder="Please enter your Username"
                value={user.username}
                onChange={handelUserChange}
                required
              />
              <br />
              <label>Email</label>
              <br />
              <input
                name="email"
                type="email"
                placeholder="Please enter your Email"
                value={user.email}
                onChange={handelUserChange}
                required
              />
              <br />
              <label>Password</label>
              <br />
              <input
                name="password"
                type="password"
                placeholder="Please enter your Password"
                value={user.password}
                onChange={handelUserChange}
                min={5}
                required
              />
              <br />
            </div>
            <button type="submit" className="btn btn-dark ms-2">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
