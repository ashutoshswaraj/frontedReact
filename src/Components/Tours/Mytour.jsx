import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import tourImagecover from "../../img/tours/tour-1-1.jpg";
import ImageFile from "../../img/icons.svg";
import SpinnerLoader from "../Spinner/Spinner";
const Mytour = () => {
  const axiosPrivate = useAxiosPrivate();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [tourDetail, setTourDetail] = useState([]);
  useEffect(() => {
    My_tours();
  }, []);
  const My_tours = async () => {
    setLoader(true);
    try {
      const response = await axiosPrivate.get(`tours/my-tours`);
      console.log(response, "responsee");
      setTourDetail(response.data.tours);
    } catch (err) {}
    setLoader(false);
  };
  return (
    <>
      {!loader ? (
        <>
          <div
            class="card-container"
            style={{
              margin: "10px",
            }}
          >
            {tourDetail.map((tourItem, tourIndex) => (
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
                      {/* <span>{format(tourItem.startDates[0], "MMMM yyyy")}</span> */}
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
                        navigate(`/tour/${tourItem.slug}`);
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
    </>
  );
};

export default Mytour;
