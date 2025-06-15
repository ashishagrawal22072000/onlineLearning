import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./privateRouter.js";
const LoginPage = lazy(() => import("../pages/auth/login/index.jsx"));
const RegisterPage = lazy(() => import("../pages/auth/register/index.jsx"));
const TopicPage = lazy(() => import("../pages/topic/index.jsx"));
const LandingPage = lazy(() => import("../pages/landingPage/index.jsx"));
const Progress = lazy(() => import("../pages/progress/index.js"));
export const ReactRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <LandingPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/topic"
              element={
                <ProtectedRoute>
                  <TopicPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/progress"
              element={
                <ProtectedRoute>
                  <Progress />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};
