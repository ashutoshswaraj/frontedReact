import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import tourImagecover from "../../img/tours/tour-1-1.jpg";

import ImageFile from "../../img/icons.svg";
import Userimg from "../../img/users/user-10.jpg";
import userImg2 from "../../img/users/user-13.jpg";
import tourImg1 from "../../img/tours/tour-1-3.jpg";
import tourImg2 from "../../img/tours/tour-2-1.jpg";
import tourImg3 from "../../img/tours/tour-3-1.jpg";
import SpinnerLoader from "../Spinner/Spinner";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken =
  "pk.eyJ1IjoiYXNodXRvc2hqcyIsImEiOiJjbHJzNG85MGMwMXhnMmtsbWRjdDhmcmphIn0.YSaQMYJZPXVutIPEbUWdpQ";

const SingleTours = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [tourdata, setTourData] = useState([]);
  const { slug } = useParams();
  useEffect(() => {
    Single_Tours();
  }, []);
  const mapContainerRef = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState([]);
  const [lat, setLat] = useState([]);
  const [zoom] = useState(2);

  // Initialize map when component mounts
  useEffect(() => {
    if (mapboxgl) {
      if (map.current || !mapContainerRef.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/ashutoshjs/clrs6dskw007201qver5b9cta",
        center: [lng, lat],
        zoom: 6,
        interactive: false,
      });

      // Add our navigation control (the +/- zoom buttons)
      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      // Add a marker for the given coordinates
      new mapboxgl.Marker({ color: "red", size: "small" })
        .setLngLat([lng, lat])
        .addTo(map.mapContainerRef);

      // Map onload event
      map.current.on("load", () => {
        // Nifty code to force the map to fit inside the container when it loads
        map.current.resize();
      });

      // Clean up on unmount
      // return () => map.current.remove();

      console.error("Mapbox GL not loaded");
    }
  }, [lat, lng, zoom]);
  const Single_Tours = async () => {
    setLoader(true);
    try {
      const response = await axiosPrivate.get(`/tours/slug/${slug}`);
      setTourData(response.data.data);
      setLat([]);
      setLng([]);
      console.log(
        response.data.data[0].locations,
        " response.data.data.locations"
      );
      response.data.data[0].locations.map((loca) => {
        console.log(loca.coordinates[1], "loca.coordinates[1]");
        setLat(loca.coordinates[1]);
        setLng(loca.coordinates[0]);
        if (map.current) {
          map.current.flyTo({
            center: [loca.coordinates[0], loca.coordinates[1]],
          });
        }
      });
    } catch (err) {}
    setLoader(false);
  };
  const checkOut = async () => {
    const stripe = loadStripe(
      "pk_test_51OcxAESCgR1oQTIJEVUe3FLSWyUDoC6igEhrRTea8cRbZUwDqwGdcctqL4bl51LPqmkCEySRP683wWghTSWAai8w00gNsRm0A0"
    );

    try {
      const response = await axiosPrivate.get(
        `/booking/checkout/${tourdata[0].id}`
      );

      // const session = response.data.session.url;
      const sessionId = response.data.session.url;
      window.location.href = sessionId;
      // console.log(stripe); // Add this line to check the value of stripePromise
      // const result = await stripe.redirectToCheckout({
      //   sessionId: sessionId,
      // });

      // console.log("Checkout result:", result);
    } catch (err) {
      console.log(err, "errrrrrrr");
    }
  };

  // Function to generate stars based on the rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <span key={i} className="rating-stars star">
          &#9733;
        </span>
      );
    }
    return stars;
  };
  return (
    <>
      {!loader ? (
        <>
          {tourdata.map((tourItem, tourIndex) => (
            <>
              <section className="section-header">
                <div className="header__hero">
                  <div className="header__hero-overlay">&nbsp;</div>
                  {tourItem.imageCover}
                  <img
                    src={tourImagecover}
                    alt="Tour 5"
                    className="header__hero-img"
                  />
                </div>

                <>
                  <div className="heading-box">
                    <h1 className="heading-primary">
                      <span>{tourItem.name}</span>
                    </h1>
                    <div className="heading-box__group">
                      <div className="heading-box__detail">
                        <svg className="heading-box__icon">
                          <use xlinkHref={`${ImageFile}#icon-clock`}></use>
                        </svg>
                        <span className="heading-box__text">
                          {tourItem.duration} days
                        </span>
                      </div>
                      <div className="heading-box__detail">
                        <svg className="heading-box__icon">
                          <use xlinkHref={`${ImageFile}#icon-map-pin`}></use>
                        </svg>
                        <span className="heading-box__text">
                          {tourItem.startLocation.description}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              </section>
              <div className="sect_description">
                <div className="facts">
                  <div className="quik_facts">
                    <h2 className="heading-secondary ma-bt-lg">Quick Facts</h2>
                    <div className="facts_detail">
                      <svg className="overview-box__icon">
                        <use xlinkHref={`${ImageFile}#icon-clock`}></use>
                      </svg>
                      <h2>Duration</h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <h3
                        style={{
                          fontSize: "15px",
                          color: "#b8bcb9",
                        }}
                      >
                        {tourItem.duration}
                      </h3>
                    </div>
                    <div className="facts_detail">
                      <svg className="overview-box__icon">
                        <use xlinkHref={`${ImageFile}#icon-grid`}></use>
                      </svg>
                      <h2>Dificulty</h2>&nbsp;&nbsp;
                      <h4
                        style={{
                          fontSize: "15px",
                          color: "#b8bcb9",
                        }}
                      >
                        {tourItem.difficulty}
                      </h4>
                    </div>

                    <div className="facts_detail">
                      <svg className="overview-box__icon">
                        <use xlinkHref={`${ImageFile}#icon-user`}></use>
                      </svg>
                      <h2>Participent</h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <h4
                        style={{
                          fontSize: "15px",
                          color: "#b8bcb9",
                        }}
                      >
                        {tourItem.maxGroupSize}
                      </h4>
                    </div>
                    <div className="facts_detail">
                      <svg className="overview-box__icon">
                        <use xlinkHref={`${ImageFile}#icon-star`}></use>
                      </svg>
                      <h2>Rating</h2>&nbsp;&nbsp;&nbsp;
                      <h4
                        style={{
                          fontSize: "15px",
                          color: "#b8bcb9",
                        }}
                      >
                        {tourItem.ratingsAverage}
                      </h4>
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: "30px",
                    }}
                  >
                    <h2 className="heading-secondary ma-bt-lg">
                      Your tour guides
                    </h2>

                    {tourItem.guides.map((guideItem) => (
                      <>
                        <div className="guides_box">
                          <img className="user-image" src={userImg2} alt="" />
                          <h2>{guideItem.role}</h2>&nbsp;&nbsp;&nbsp;
                          <h2
                            style={{
                              color: "#b8bcb9",
                            }}
                          >
                            {guideItem.name}
                          </h2>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                <div className="discription">
                  <h2 className="heading-secondary ma-bt-lg">
                    {tourItem.name}
                  </h2>
                  <p className="descr_text">
                    {/* Description text goes here */}
                    {tourItem.description}
                  </p>
                </div>
              </div>

              <section
                style={{
                  top: "60px",
                }}
                className="section-pictures"
              >
                <div className="picture-box">
                  <img
                    src={`${tourImg1}`}
                    alt="The Park Camper Tour 1"
                    className="picture-box__img picture-box__img--1"
                  />
                </div>

                <div className="picture-box">
                  <img
                    src={`${tourImg2}`}
                    alt="The Park Camper Tour 1"
                    className="picture-box__img picture-box__img--2"
                  />
                </div>

                <div className="picture-box">
                  <img
                    src={`${tourImg3}`}
                    alt="The Park Camper Tour 1"
                    className="picture-box__img picture-box__img--3"
                  />
                </div>
              </section>

              <div className="section-map">
                <div id="map">
                  <div
                    ref={mapContainerRef}
                    className="map-container"
                    style={{}}
                  />
                </div>
              </div>

              {/* Section Reviews */}
              <div
                className="rating-tab"
                style={{
                  marginTop: "90px",
                  // height: "290px",
                  borderRadius: "10px 10px 0 0", // Curve only the bottom corners

                  // backgroundColor: "green", // Set the background color for the main container
                  padding: "10px", // Add padding for space between tabs and cards
                }}
              >
                {tourItem.review.slice(0, 4).map((review, index) => (
                  <div className="single_tab" key={index}>
                    <img
                      src={Userimg}
                      alt={review.user.name}
                      className="user-image"
                    />
                    <span className="tab-name">{review.user.name}</span>
                    <p className="reviews__text">{review.review}</p>
                    <div className="reviews__rating">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Section CTA */}
              <section className="section-cta">
                <div className="cta">
                  <div className="cta__img cta__img--logo">
                    <img src="/img/logo-white.png" alt="Natours logo" />
                  </div>
                  <div className="cta__img cta__img--1">
                    <img src="/img/tour-5-2.jpg" alt="" />
                  </div>
                  <div className="cta__img cta__img--2">
                    <img src="/img/tour-5-1.jpg" alt="" />
                  </div>
                  <div className="cta__content">
                    <h2 className="heading-secondary">
                      What are you waiting for?
                    </h2>
                    <p className="cta__text">
                      10 days. 1 adventure. Infinite memories. Make it yours
                      today!
                    </p>
                    <button
                      className="btn btn--green span-all-rows"
                      onClick={() => {
                        checkOut();
                      }}
                    >
                      Book tour now!
                    </button>
                  </div>
                </div>
              </section>
            </>
          ))}
        </>
      ) : (
        <SpinnerLoader />
      )}
    </>
  );
};

export default SingleTours;
