import React, { memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const location = useLocation();

  const { pathname } = location;

  const splitLocation = pathname.split("/");

  return (
    <header className="bg-dark py-4 text-light">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <h1 className="text-center mb-4 mb-md-0">Dashboard</h1>

        <div className="d-flex justify-content-between align-items-center">
          <Link
            to="/"
            className={
              splitLocation[1] === ""
                ? "text-decoration-none text-light fw-bold mx-2"
                : "text-decoration-none text-secondary mx-2"
            }
          >
            Profile
          </Link>

          <Link
            to="/topic"
            className={
              splitLocation[1] === "topic"
                ? "text-decoration-none text-light fw-bold mx-2"
                : "text-decoration-none text-secondary mx-2"
            }
          >
            Topic
          </Link>

          <Link
            to="/progress"
            className={
              splitLocation[1] === "progress"
                ? "text-decoration-none text-light fw-bold mx-2"
                : "text-decoration-none text-secondary mx-2"
            }
          >
            Progress
          </Link>

          <button
            className="p-2 border border-light mx-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default memo(Index);
