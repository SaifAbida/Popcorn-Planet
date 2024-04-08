import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

type FavMoviesProps = {
  id: string;
  updatingMovies(id: string): void;
};

export type MovieType = {
  _id: string;
  image: string;
  name: string;
  releaseYear: string;
};

const FavMoviesCard = ({ id, updatingMovies }: FavMoviesProps) => {
  const [movie, setMovie] = useState<MovieType>({} as MovieType);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/movies/${id}`)
      .then((res) => {
        setMovie(res.data.data);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error fetching movie data",
        });
        console.error("Movie Fetch Error:", error.message);
      });
  }, []);

  const deleteFromFavourite = () => {
    axios
      .delete(`http://127.0.0.1:8000/user/${id}`, {
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data.favouriteMovies);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!movie) {
    return <div className="loading-message">Loading...</div>;
  }
  return (
    <div className="card shadow-lg p-3 mb-5 bg-body-tertiary rounded">
      <img src={movie.image} className="card-img-top" alt="movie" />
      <div className="card-body">
        <h5 className="card-title">{movie.name}</h5>
        <p className="card-text">Released: {movie.releaseYear}</p>
        <Link to={`/movies/${movie._id}`} className="btn btn-dark ms-6">
          More details
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            deleteFromFavourite();
            updatingMovies(id);
          }}
        >
          Remove Movie
        </button>
      </div>
    </div>
  );
};

export default FavMoviesCard;
