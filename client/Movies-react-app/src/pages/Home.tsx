import ImageSlide from "../components/ImageSlide";
import FavButton from "../components/FavButton";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MovieType } from "../components/FavMoviesCard";

function Home() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/movies/home")
      .then((res) => {
        setMovies(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  if (loading)
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  return (
    <>
      <ImageSlide />
      <h1 className="top-trading-title">Top ratings:</h1>
      <Link
        type="button"
        className="btn btn-outline-dark get-all-movies-btn"
        to="/movies"
      >
        Get all movies
      </Link>
      <div className="container">
        <div className="row">
          {loading ? (
            <p>Loading...</p>
          ) : (
            movies.map((movie, index) => (
              <div className="col">
                <div
                  className="card shadow mb-5 bg-body-tertiary rounded"
                  key={index}
                >
                  <img src={movie.image} className="card-img-top" alt="movie" />
                  <div className="card-body">
                    <h5 className="card-title">{movie.name}</h5>
                    <p className="card-text">Released: {movie.releaseYear}</p>
                    <Link
                      to={`/movies/${movie._id}`}
                      className="btn btn-dark ms-6"
                    >
                      More details
                    </Link>
                    {token && <FavButton id={movie._id} />}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
