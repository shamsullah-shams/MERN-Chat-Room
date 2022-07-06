import React from 'react'
import Signup from './Signup/Signup';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from './NotFound';
import Signin from './Signin/Signin';
import Home from "./Home/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>
          <Home />
        </>} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
