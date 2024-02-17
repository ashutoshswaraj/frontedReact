import "../../css/style.css";
import ImageFile from "../../img/icons.svg";
import { useNavigate } from "react-router";
const NavItem = ({ link, text, icon, active }) => (
  <li className={`side-nav${active ? " side-nav--active" : ""}`}>
    <a href={link}>
      <svg className="card__icon">
        <use src={`${ImageFile}#icon-settings`}></use>
      </svg>
      <span>{text}</span>
    </a>
  </li>
);

const SideNav = ({ userData }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        width: "18%",
      }}
    >
      <nav className="user-view__menu">
        <ul className="side-nav ul_Text">
          {/* <NavItem link="#" text="Settings" icon="#settings" active={true} /> */}
          <li className="side-nav--active">Settings</li>
          <li
            onClick={() => {
              navigate("/my_tour");
            }}
          >
            {" "}
            My Tour
          </li>
          <li
            className=""
            onClick={() => {
              navigate("/my_review");
            }}
          >
            My Reviews
          </li>
        </ul>

        {userData.role === "admin" && (
          <div className="admin-nav">
            <h5 className="admin-nav__heading">Admin</h5>
            <ul className="side-nav ul_Text">
              <li>Manage tours</li>
              <li>Manage users</li>
              <li>Manage reviews</li>
              <li>Manage bookings</li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default SideNav;
