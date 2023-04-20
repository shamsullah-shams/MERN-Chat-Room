import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './containers/Dashborad';
import { UserProvider } from "./context/UserProvider";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Spinner from "./components/UI/Spinner/Spinner";

const Signin = React.lazy(() => import('./components/Signin/Signin'));
const Signup = React.lazy(() => import('./components/Signup/Signup'));


function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
