import React from "react";
import DashboardPage from "@/pages/DashboardPage";

const Dashboard = () => {
  return (
    <div className="cool-dashboard mb-4">
      <div className="container">
        <h1 className="text-center text-[20px] font-black mt-3 mb-3">RSA</h1>
        <DashboardPage />
      </div>
    </div>
  );
};

export default Dashboard;
