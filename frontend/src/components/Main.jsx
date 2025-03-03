import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MenuBar from './MenuBar';
import Leaderboard from "./Leaderboard";
import ResearchTasksComponent from "./ResearchTasksComponent";

export default function Main() {
  return (
    <>
      <MenuBar/>
      <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col">
      </div>
    </>
  );

};

