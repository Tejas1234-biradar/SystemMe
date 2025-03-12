import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import NProgress from "nprogress";
import Quest from "./components/quest";
import "nprogress/nprogress.css"; // Default CSS
// import "./nprogress.css"; // Your custom styles

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Start loading bar on route change
    NProgress.start();

    // Simulate loading completion delay
    const timer = setTimeout(() => {
      NProgress.done();
    }, 500); // adjust delay if needed

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />      
      <Route path="/quests" element={<Quest />} />      
      {/* More routes */}
    </Routes>
  );
};

export default App;
