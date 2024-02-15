import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Auth/Header";
import Footer from "./Components/Auth/Footer";
import Navigation from "./Components/Navigation/Navigation";
function App() {
  return (
    <div className="App">
      <Header />
      <Navigation />
      <Footer />
    </div>
  );
}

export default App;
