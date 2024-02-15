import { BASE_URL } from "../api/axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import axios from "../api/axios";
import Cookies from "js-cookie";
const useRefreshToken = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const jwtToken = Cookies.get("jwt");

  const token = "Bearer" + " " + localStorage.getItem("token");

  const axiosRefresh = axios.create({
    baseURL: BASE_URL,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
    withCredentials: true,
  });

  const refresh = async () => {
    try {
      const response = await axiosRefresh.post("users/refresh", {});
      console.log(response, "respppppppp");
      setAuth((prev) => {
        return {
          ...prev,
          accessToken: response.data.accessToken,
        };
      });

      return response.data.accessToken;
    } catch (error) {
      navigate("/login");
    }
  };
  return refresh;
};
export default useRefreshToken;
