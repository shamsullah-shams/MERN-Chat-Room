import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './containers/Dashborad';
import { UserProvider } from "./context/UserProvider";
import Signup from "./components/Signup/Signup";
import Signin from './components/Signin/Signin';



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <UserProvider>
            <Dashboard />
          </UserProvider>}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
