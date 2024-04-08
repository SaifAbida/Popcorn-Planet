import img1 from "../assets/image1.jpeg";
import img2 from "../assets/image2.jpg";
import img3 from "../assets/image3.jpg";
import img4 from "../assets/image4.jpg";
import img5 from "../assets/image5.jpg";

const ImageSlide = () => {
  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade "
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={img1} className="d-block w-100" alt="slide" />
        </div>
        <div className="carousel-item">
          <img src={img2} className="d-block w-100" alt="slide" />
        </div>
        <div className="carousel-item">
          <img src={img3} className="d-block w-100" alt="slide" />
        </div>
        <div className="carousel-item">
          <img src={img4} className="d-block w-100" alt="slide" />
        </div>
        <div className="carousel-item">
          <img src={img5} className="d-block w-100" alt="slide" />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default ImageSlide;
