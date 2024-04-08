import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MoviesCard from "../components/MoviesCard";
import SortingComponent from "../components/SortingComponent";
import { MovieType } from "../components/FavMoviesCard";

const Movies = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const fetchMovies = async (page: number) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/movies/?page=${page}`
      );
      const { data, totalPages } = response.data;
      setMovies(data);
      setLoading(false);
      setTotalPages(totalPages);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const updateMovies = (data: MovieType[]) => {
    setMovies(data);
  };

  return (
    <>
      <h1 className="top-trading-title">All Movies:</h1>
      <SortingComponent updateMovies={updateMovies} />
      <div className="container">
        <div className="row">
          {loading ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            movies.map((movie) => <MoviesCard key={movie._id} movie={movie} />)
          )}
        </div>
      </div>
      <nav className="pagination-bar">
        <ul className="pagination">
          <li>
            <Link to={""} className="page-link" onClick={handlePreviousPage}>
              Previous
            </Link>
          </li>
          {[...Array(totalPages).keys()].map((page) => (
            <li key={page + 1} className="page-item">
              <Link
                to={""}
                className="page-link"
                onClick={() => setCurrentPage(page + 1)}
              >
                {page + 1}
              </Link>
            </li>
          ))}
          <li className="page-item">
            <Link to={""} className="page-link" onClick={handleNextPage}>
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Movies;
