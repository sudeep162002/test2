import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./pages/admin/AdminDashboard";
import FormAnalytics from "./pages/admin/FormAnalytics";
import FormSettings from "./pages/admin/FormSettings";
import Login from "./pages/admin/Login";
import SignUp from "./pages/admin/SignUp";
import Home from "./pages/Home";
import FreeRoute from "./utils/FreeRoute";
import PrivateRoute from "./utils/PrivateRoute";
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
          <Switch>
            <FreeRoute exact path="/" component={Home} />
            <FreeRoute path="/login" component={Login} />
            <FreeRoute path="/signup" component={SignUp} />
            <FreeRoute path="/admin" component={FormSettings} />
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
    </>
  );
}

export default App;
