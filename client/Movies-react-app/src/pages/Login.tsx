import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

type User = {
  username: string;
  password: string;
};

function Login() {
  const [user, setUser] = useState<User>({} as User);
  const navigate = useNavigate();
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

  function handleUserChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:8000/user/login", user)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        if (res.data.status === "success") {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: res.data.message,
          });
          navigate("/profile");
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data,
        });
      });
  }
  return (
    <>
      <section className="auth-container">
        <div className="loginContainer">
          <h1 className="auth-title">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="loginFields">
              <label>Username</label>
              <br />
              <input
                name="username"
                type="text"
                placeholder="Please enter your Username"
                value={user.username}
                onChange={handleUserChange}
              />
              <br />
              <label>Password</label>
              <br />
              <input
                name="password"
                type="password"
                placeholder="Please enter your Password"
                value={user.password}
                onChange={handleUserChange}
              />
              <br />
            </div>
            <button type="submit" className="btn btn-dark ms-2">
              Login
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
