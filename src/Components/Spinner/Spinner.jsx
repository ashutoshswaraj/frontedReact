import Spinner from "react-bootstrap/Spinner";
import camel from "../../img/camel.gif";
const SpinnerLoader = () => {
  return (
    <>
      <div className="LoaderContainer">
        <img src={camel} height={500} alt="loader" />
        <h5>
          &nbsp;
          <Spinner
            as="span"
            animation="grow"
            size="md"
            role="status"
            aria-hidden="true"
          />
          &nbsp;
          <Spinner
            as="span"
            animation="grow"
            size="md"
            role="status"
            aria-hidden="true"
          />
          &nbsp;
          <Spinner
            as="span"
            animation="grow"
            size="md"
            role="status"
            aria-hidden="true"
          />
        </h5>
      </div>
    </>
  );
};

export default SpinnerLoader;
