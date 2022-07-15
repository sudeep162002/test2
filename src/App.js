import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./pages/admin/AdminDashboard";
import FormAnalytics from "./pages/admin/FormAnalytics";
import FormSettings from "./pages/admin/FormSettings";
import Login from "./pages/admin/Login";
import SignUp from "./pages/admin/SignUp";
import Home from "./pages/Home";
import FreeRoute from "./utils/FreeRoute";
import PrivateRoute from "./utils/PrivateRoute";
import Footer from "./components/Footer"
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <FreeRoute exact path="/" component={Home} />
            <FreeRoute path="/login" component={Login} />
            <FreeRoute path="/signup" component={SignUp} />
            <PrivateRoute path="/admin" component={AdminDashboard} />
            <PrivateRoute
              exact
              path="/admin/:formId/analytics"
              component={FormAnalytics}
            />
            <PrivateRoute
              path="/admin/:formId/settings"
              component={FormSettings}
            />
          </Switch>
        </AuthProvider>
      </Router>
      <Footer/>
    </>
  );
}

export default App;
