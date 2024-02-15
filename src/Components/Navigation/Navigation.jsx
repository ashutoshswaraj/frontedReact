import { Routes, Route } from "react-router-dom";
import LoginForm from "../Auth/Login";
import Header from "../Auth/Header";
import Footer from "../Auth/Footer";
import Homepage from "../Admin/Homepage";
import SingleTours from "../Tours/SingleTours";
import ProtectedRoutes from "../Admin/ProtectedRoutes";
import Layout from "../Auth/Layout";
import SingleUserme from "../Users/Singleuserme";
import Signup from "../Auth/Signup";
import Mytour from "../Tours/Mytour";
const Navigation = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />
        {/* Protected routes */}
        {/* <ProtectedRoutes path="/tour/:slug" element={<SingleTours />} /> */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<SingleTours />} path="/tour/:slug" />
          <Route element={<SingleUserme />} path="/me" />
          <Route element={<Mytour />} path="/my_tour" />
        </Route>
      </Routes>
    </>
  );
};
export default Navigation;
