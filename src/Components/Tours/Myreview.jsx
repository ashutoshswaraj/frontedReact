import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import ImageFile from "../../img/icons.svg";
import SpinnerLoader from "../Spinner/Spinner";
import useAuth from "../hooks/useAuth";
import tourImagecover from "../../img/tours/tour-1-1.jpg";
import NoDataMessage from "../Spinner/NoDataMessage";
const Myreview = () => {
  const { auth } = useAuth();

  const userId = localStorage.getItem("user_id");
  const axiosPrivate = useAxiosPrivate();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [tourDetail, setTourDetail] = useState([]);
  const [review, setReview] = useState([]);
  useEffect(() => {
    if (userId) My_tours();
  }, [userId]);
  const My_tours = async () => {
    setLoader(true);
    try {
      const response = await axiosPrivate.get(`/review/${userId}`);
      console.log(response, "resssssssssssssss");
      const newDataArray = await Promise.all(
        response.data.data.map(async (itemTour, tourIndex) => {
          // Skip mapping for qualiItem.q_id 1 and 3

          const allAnswers = await Single_Tours(itemTour.tour);

          // Map the data to the desired structure

          return {
            review: itemTour.review,
            rating: itemTour.rating,
            allAnswers,
            // Set allocated_ans_code to the array of fetched answer details
          };
        })
      );
      console.log(newDataArray, "newDataArray");
      // Filter out null values and update state
      setTourDetail((prevData) => [
        ...newDataArray.filter((item) => item !== null),
      ]);
    } catch (err) {}
    setLoader(false);
  };
  const Single_Tours = async (id) => {
    try {
      const response = await axiosPrivate.get(`/tours/single_tour/${id}`);

      //   const allAnswers = response.data.data.map((answer) => ({}));
      const allAnswers = response.data.data.map((answer) => ({
        name: answer.name,
        price: answer.price,
        summary: answer.summary,
        duration: answer.duration,
        address: answer.startLocation.address,
      }));
      return allAnswers;
    } catch (err) {}
    // setLoader(false);
  };
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <span
          key={i}
          className=" star"
          style={{
            color: "#e54c12b3",
          }}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };
  return (
    <>
      {!loader ? (
        tourDetail.length !== 0 ? (
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

                      <img src={tourImagecover} className="card__picture-img" />
                    </div>

                    <h3 className="heading-tertirary">
                      <span>{tourItem.allAnswers[0].name}</span>
                    </h3>
                  </div>

                  <div className="card__details">
                    <h4 className="card__sub-heading">
                      {/* {tourItem.difficulty} &nbsp; */}
                      {tourItem.allAnswers[0].duration} day tour
                    </h4>

                    <p className="card__text">
                      {tourItem.allAnswers[0].summary}
                    </p>
                    <div
                      className="card__data"
                      style={{
                        border: "1px solid #ffd400fa",
                        display: "block",
                        width: "100%",
                        backgroundClip:
                          " #ffcccc" /* Light red background color */,
                        boxShadow: " 0 0 10px rgba(255, 0, 0, 0.5)",
                      }}
                    >
                      <p>Address</p>
                      <span>{tourItem.allAnswers[0].address}</span>
                    </div>
                    <div>
                      <p>Your Ratings</p>
                      {renderStars(tourItem.rating)}
                    </div>
                  </div>

                  <div className="card__footer">
                    <p>
                      <span className="">
                        &#8377; {10 * tourItem.allAnswers[0].price}&nbsp;
                      </span>
                      <span className="card__footer-text">per person</span>
                    </p>
                  </div>
                  <div className="my_Revewfooter">
                    <h3>Your Review</h3>
                    <p>{tourItem.review}</p>
                  </div>
                </div>
              </>
            ))}
          </div>
        ) : (
          <NoDataMessage data={"No Reviews Found"} />
        )
      ) : (
        <div
          class="card-container"
          style={{
            margin: "10px",
          }}
        >
          <SpinnerLoader />
        </div>
      )}
    </>
  );
};

export default Myreview;
