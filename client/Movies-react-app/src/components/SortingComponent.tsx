import axios, { AxiosResponse } from "axios";
import { MovieType } from "./FavMoviesCard";
import Swal from "sweetalert2";

type SortingComponent = {
  updateMovies(data: MovieType[]): void;
};

const SortingComponent = ({ updateMovies }: SortingComponent) => {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
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
      title: `Sorted by : ${event.currentTarget
        .getAttribute("value")
        ?.charAt(0)
        .toUpperCase()}${event.currentTarget
        .getAttribute("value")
        ?.slice(1)
        .toLowerCase()}`,
    });
    axios
      .get(
        `http://127.0.0.1:8000/movies/?sort=-${event.currentTarget.getAttribute(
          "value"
        )}`
      )
      .then((res: AxiosResponse) => {
        updateMovies(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="sortingContainer">
      <div className="btnContainer">
        <div className="dropdown">
          <button
            type="button"
            className="btn btn-outline-dark"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Sorting by:
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                value="price"
                onClick={(event) => handleClick(event)}
              >
                Price
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                value="releaseYear"
                onClick={(event) => handleClick(event)}
              >
                Release Year
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                value="genre"
                onClick={(event) => handleClick(event)}
              >
                Genres
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                value="rating"
                onClick={(event) => handleClick(event)}
              >
                Rating
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SortingComponent;
