import { useState, useEffect } from "react";
import axios from "axios";

type BtnProps = {
  id: string;
};

const FavButton = ({ id }: BtnProps) => {
  const [favList, setFavList] = useState<string[]>([]);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const token = localStorage.getItem("token");

  const addToFavourite = () => {
    axios
      .patch(
        `http://127.0.0.1:8000/user/${id}`,
        {},
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setFavList(res.data.data.favouriteMovies);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteFromFavourite = () => {
    axios
      .delete(`http://127.0.0.1:8000/user/${id}`, {
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFavList(res.data.data.favouriteMovies);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => setIsFavourite(favList.includes(id)), [favList, id]);

  return (
    <>
      {isFavourite ? (
        <button
          type="button"
          className="btn btn-danger"
          onClick={deleteFromFavourite}
        >
          Remove Movie
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-success favorite-btn"
          onClick={addToFavourite}
        >
          Add Movie
        </button>
      )}
    </>
  );
};

export default FavButton;
