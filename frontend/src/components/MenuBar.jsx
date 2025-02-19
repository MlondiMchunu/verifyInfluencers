import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Shield } from "lucide-react";
import Leaderboard from "./Leaderboard";
import ResearchTasksComponent from "./ResearchTasksComponent";
import InfluencerPageComponent from "./InfluencerPageComponent";

const Menubar = () => {
  return (

    <Router>
      <nav className="w-full bg-[#101727] border-b border-gray-800 p-4 flex flex-wrap items-center justify-between md:px-8 ">
        {/* Logo or App Name (Optional) */}
        <div className="flex items-center space-x-2  text-sm md:text-base font-bold mr-8 -ml-8">
          <Shield size={20} className="text-[#10bb80]" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#24ae86] to-[#3d68c0]">VerifyInfluencers</span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4 md:space-x-6 text-xs/5 opacity-70 ">
          <Link to="/leaderboard" className="text-white !text-white hover:text-green-400 transition-colors ">Leaderboard</Link>
          <Link to="/researchTasks" className="text-white !text-white hover:text-green-400 transition-colors">Research Tasks</Link>
          <Link to="/products" className="text-white !text-white hover:text-green-400 transition-colors">Products</Link>
          <Link to="/monetization" className="text-white !text-white hover:text-green-400 transition-colors">Monetization</Link>
          <Link to="/about" className="text-white !text-white hover:text-green-400 transition-colors">About</Link>
          <Link to="/contact" className="text-white !text-white hover:text-green-400 transition-colors">Contact</Link>
          <Link to="/admin" className="text-white !text-white hover:text-green-400 transition-colors">Admin</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/researchTasks" element={<ResearchTasksComponent/>} />
        <Route path="/products" element={<div>Products Page</div>} />
        <Route path="/monetization" element={<div>Monetization Page</div>} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/contact" element={<div>Contact Page</div>} />
        <Route path="/admin" element={<div>Admin Page</div>} />
        <Route path="/influencer-page" element={<InfluencerPageComponent/>} />
      </Routes>
    </Router>
  );
};
export default Menubar;
