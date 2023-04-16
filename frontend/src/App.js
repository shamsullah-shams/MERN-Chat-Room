import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './containers/Dashborad';
import { UserProvider } from "./context/UserProvider";



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <UserProvider>
            <Dashboard />
          </UserProvider>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
