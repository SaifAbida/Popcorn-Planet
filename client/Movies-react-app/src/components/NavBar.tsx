import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";

function NavBar() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  function handleLogout() {
    localStorage.removeItem("token");
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
      icon: "info",
      title: "Signed out successfully",
    });
    navigate("/login");
  }

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .get(`http://127.0.0.1:8000/movies/filter/?name=${input}`)
      .then((res: AxiosResponse) => {
        navigate(`/movies/${res.data.data._id}`);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Could not find a movie with this name!",
        });
        console.log(error);
      });
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg mt-3">
        <div className="container-fluid">
          <Link className="navbar-brand ms-5" to="/">
            Popcorn <span className="planet">Planet</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="What's on your mind"
                aria-label="Search"
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
              <button type="submit" className="btn btn-dark ms-2">
                Search
              </button>
            </form>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {localStorage.getItem("token") ? (
                <>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-link ms-3"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/settings"
                      className="nav-link ms-1"
                      aria-current="page"
                    >
                      Settings
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/profile">
                      <i className="fa-solid fa-user"></i>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      to="/login"
                      className="nav-link ms-5"
                      aria-current="page"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/register"
                      className="nav-link ms-4"
                      aria-current="page"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
