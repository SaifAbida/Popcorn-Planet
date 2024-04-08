import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FavMoviesCard from "../components/FavMoviesCard";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

type userType = {
  username: string;
  favouriteMovies: string[];
  role: string;
};

function Profile() {
  const [user, setUser] = useState<userType>({
    username: "",
    favouriteMovies: [],
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
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
        const response = await axios.get("http://127.0.0.1:8000/user/profile", {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setUser(response.data.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error fetching user profile. Please try again later.",
        });
        console.error("Profile Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const removeMovie = (id: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      favouriteMovies: prevUser.favouriteMovies.filter(
        (movieID) => movieID !== id
      ),
    }));
  };

  return (
    <>
      <div className="profile-container">
        {loading && (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        <>
          <h1>Welcome back, {user.username}</h1>
          {user.role === "admin" && (
            <>
              <span className="badge text-bg-success">Admin</span>
              <Link type="button" className="btn btn-outline-dark" to="/users">
                Manage users
              </Link>
            </>
          )}
          <h2>Favourite Movies:</h2>
          {user.favouriteMovies.length === 0 ? (
            <>
              <p className="add-movie-btn">
                Your list of favorite movies is empty.
              </p>
              <Link to="/movies" className="btn btn-dark btn-lg btn ">
                Add Movies
              </Link>
            </>
          ) : (
            <>
              <p>Here you can find favourite movies:</p>
              <div className="container">
                <div className="row ">
                  {user.favouriteMovies.map((movieId) => (
                    <div className="col">
                      <FavMoviesCard
                        key={movieId}
                        id={movieId}
                        updatingMovies={removeMovie}
                      />
                    </div>
                  ))}
                  <Link to="/movies" className="btn btn-dark btn-lg">
                    Add more movies
                  </Link>
                </div>
              </div>
            </>
          )}
        </>
      </div>
    </>
  );
}

export default Profile;
