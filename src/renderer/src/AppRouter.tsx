import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";

const router = [
  {
    path: "/",
    element: <Dashboard />,
  },
];

const AppRouter = () => {
  return (
    <Routes>
      {router.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default AppRouter;
