import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

type MovieType = {
  _id: string;
  name: string;
  image: string;
  price: string;
  releaseYear: number;
  rating: number;
};

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieType>({} as MovieType);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/movies/${id}`)
      .then((res) => {
        setMovie(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);
  if (loading)
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  if (error) return <h1>{error}</h1>;
  return (
    <>
      {
        <div className="movieContainer">
          <img
            src={movie.image}
            alt={movie.name + " image"}
            className="shadow mb-5 bg-body-tertiary rounded"
          />
          <div className="infoContainer">
            <h1>{movie.name}</h1>
            <p>
              Price: {movie.price} <strong>$</strong>
            </p>
            <p>Release year: {movie.releaseYear}</p>
            <p>Rating: {movie.rating}/10</p>
          </div>
        </div>
      }
    </>
  );
};

export default Movie;
