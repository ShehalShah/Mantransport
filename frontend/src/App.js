import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Registration from './components/Registration';
import LandingPage from './components/LandingPage';
import ManufacturerForm from './components/ManufacturerForm';
import TransporterForm from './components/TransporterForm';

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Registration} />
          <Route path="/manufacturer" component={ManufacturerForm} />
          <Route path="/transporter" component={TransporterForm} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
