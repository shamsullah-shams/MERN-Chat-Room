import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './containers/Dashborad';
import { UserProvider } from "./context/UserProvider";
import Signup from "./components/Signup/Signup";
import Signin from './components/Signin/Signin';
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

          <Route element={<RequireAuth />}>
            <Route path="/" element={
              <UserProvider>
                <Dashboard />
              </UserProvider>}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
