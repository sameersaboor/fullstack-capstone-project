import { useState } from "react";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="app">

      <nav className="navbar">
        <h2>GiftLink 🎁</h2>

        <div>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("login")}>Login</button>
          <button onClick={() => setPage("register")}>Register</button>
        </div>
      </nav>

      {page === "home" && (
        <section className="hero">
          <div className="hero-content">
            <h1>Welcome to GiftLink 🎁</h1>

            <p>
              Give what you don't need, receive what you do.
              Connect with people and discover useful gifts.
            </p>

            <button
              className="main-button"
              onClick={() => setPage("register")}
            >
              Get Started
            </button>
          </div>
        </section>
      )}

      {page === "login" && (
        <div className="page-container">
          <LoginPage />
        </div>
      )}

      {page === "register" && (
        <div className="page-container">
          <RegisterPage />
        </div>
      )}

    </div>
  );
}

export default App;