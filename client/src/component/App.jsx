import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from './Signin';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} exact />
        <Route path="/dashboard" element={<Dashboard />} exact />
      </Routes>
    </Router>
  );
};

export default App;
