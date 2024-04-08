import FavButton from "./FavButton";
import { Link } from "react-router-dom";
import { MovieType } from "./FavMoviesCard";

type MoviesCard = {
  movie: MovieType;
};

const MoviesCard = (props: MoviesCard) => {
  const token = localStorage.getItem("token");
  return (
    <div className="col" key={props.movie._id}>
      <div className="card shadow mb-5 bg-body-tertiary rounded">
        <img src={props.movie.image} className="card-img-top" alt="movie" />
        <div className="card-body">
          <h5 className="card-title">{props.movie.name}</h5>
          <p className="card-text">Released: {props.movie.releaseYear}</p>
          <Link to={`/movies/${props.movie._id}`} className="btn btn-dark">
            More details
          </Link>
          {token && <FavButton id={props.movie._id} />}
        </div>
      </div>
    </div>
  );
};

export default MoviesCard;
