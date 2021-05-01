import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import HeaderNavbar from "./components/Shared/HeaderNavbar/HeaderNavbar";
import Footer from "./components/Shared/Footer/Footer";
import UserContextProvider from "./contexts/UserContext";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Checkout from "./components/Checkout/Checkout/Checkout";
import { Toaster } from 'react-hot-toast';
import Packages from "./components/Packages/Packages/Packages";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Toaster />
        <Switch>
          <Route path="/dashboard"></Route>
          <Route path="*">
            <HeaderNavbar />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/packages">
            <Packages />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/checkout/:id">
            <Checkout />
          </PrivateRoute>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <Switch>
          <Route path="/dashboard"></Route>
          <Route path="*">
            <Footer />
          </Route>
        </Switch>
      </Router>
    </UserContextProvider>
  );
}

export default App;
