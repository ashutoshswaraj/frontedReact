import "../../css/style.css";
import ImageFile from "../../img/icons.svg";
import { useNavigate } from "react-router";
const NavItem = ({ link, text, icon, active }) => (
  <li className={`side-nav${active ? " side-nav--active" : ""}`}>
    <a href={link}>
      <svg className="card__icon">
        <use src={`${ImageFile}#icon-map-pin`}></use>
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
      }}
    >
      <nav className="user-view__menu">
        <ul className="side-nav">
          <NavItem link="#" text="Settings" icon="#settings" active={true} />

          <NavItem
            link="/my_tour"
            text="My Tour"
            icon="star"
            onClick={() => {
              navigate("/my_tour");
            }}
          />
          {/* <NavItem link="#" text="Billing" icon="credit-card" /> */}
        </ul>

        {userData.role === "admin" && (
          <div className="admin-nav">
            <h5 className="admin-nav__heading">Admin</h5>
            <ul className="side-nav">
              <NavItem link="#" text="Manage tours" icon="map" />
              <NavItem link="#" text="Manage users" icon="users" />
              <NavItem link="#" text="Manage reviews" icon="star" />
              <NavItem link="#" text="Manage bookings" icon="briefcase" />
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default SideNav;
