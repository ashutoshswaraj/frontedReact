import Header from "../Auth/Header";
import Footer from "../Auth/Footer";
import "../../css/style.css";
import { useEffect, useState } from "react";
import ImageFile from "../../img/icons.svg";
import { format } from "date-fns";
import SpinnerLoader from "../Spinner/Spinner";
import { useNavigate } from "react-router";
import tourImagecover from "../../img/tours/tour-1-1.jpg";
import useRefreshToken from "../hooks/useRefreshtoken";
import axiosPrivate from "../api/axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
const Homepage = () => {
  const [loader, setLoader] = useState(false);
  // const axiosPrivate = axiosPrivate();
  const [tourData, setTourData] = useState([]);
  const naviagete = useNavigate();

  const fetchData = async () => {
    setLoader(true);
    try {
      const response = await axiosPrivate.get("/tours");
      setTourData(response.data.data);
    } catch (err) {}
    setLoader(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <section class="overview">
        {!loader ? (
          <>
            <div
              class="card-container"
              style={{
                margin: "20px",
              }}
            >
              {tourData.map((tourItem, tourIndex) => (
                <>
                  <div key={tourIndex} className="card">
                    <div className="card__header">
                      <div className="card__picture">
                        <div className="card__picture-overlay">&nbsp;</div>

                        <img
                          src={`/Image/tours/${tourItem.images[0]}`}
                          className="card__picture-img"
                        />
                      </div>

                      <h3 className="heading-tertirary">
                        <span>{tourItem.name}</span>
                      </h3>
                    </div>

                    <div className="card__details">
                      <h4 className="card__sub-heading">
                        {tourItem.difficulty} &nbsp;
                        {tourItem.duration} day tour
                      </h4>
                      <p className="card__text">{tourItem.summary}</p>
                      <div className="card__data">
                        <svg className="card__icon">
                          <use src={`${ImageFile}#icon-map-pin`}></use>
                        </svg>
                        <span>{tourItem.startLocation.description}</span>
                      </div>
                      <div className="card__data">
                        <svg className="card__icon">
                          <use xlinkHref={`${ImageFile}#icon-calendar`}></use>
                        </svg>
                        <span>
                          {format(tourItem.startDates[0], "MMMM yyyy")}
                        </span>
                      </div>
                      <div className="card__data">
                        <svg className="card__icon">
                          <use xlinkHref={`${ImageFile}#icon-flag`}></use>
                        </svg>
                        <span>{tourItem.locations.length}&nbsp; stops</span>
                      </div>
                      <div className="card__data">
                        <svg className="card__icon">
                          <use xlinkHref={`${ImageFile}#icon-user`}></use>
                        </svg>
                        <span>
                          {tourItem.maxGroupSize}
                          &nbsp;people
                        </span>
                      </div>
                    </div>

                    <div className="card__footer">
                      <p>
                        <span className="card__footer-value">
                          ${tourItem.price}&nbsp;
                        </span>
                        <span className="card__footer-text">per person</span>
                      </p>
                      <p className="card__ratings">
                        <span className="card__footer-value">
                          {tourItem.ratingsAverage}&nbsp;
                        </span>
                        <span className="card__footer-text">
                          rating {tourItem.ratingsQuantity}
                        </span>
                      </p>
                      <p
                        className="btn btn--green btn--small"
                        onClick={() => {
                          naviagete(`/tour/${tourItem.slug}`);
                        }}
                      >
                        Details
                      </p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </>
        ) : (
          <SpinnerLoader />
        )}
      </section>
    </>
  );
};

export default Homepage;
