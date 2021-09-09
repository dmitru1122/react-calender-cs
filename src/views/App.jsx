import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../theme/main.scss';

import Header from '../components/main-layout/header/Header';
import Footer from '../components/main-layout/footer/Footer';
import HomePage from '../components/pages/home-page/HomePage';
import Request from '../components/pages/request/Request';
import createLoacalStorage from '../fakeDb/connect';

function App() {
  createLoacalStorage();
  return (
    <div className='App'>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/request/:id' component={Request} />
          <Route exact path='/' component={HomePage} />
          <Route component={HomePage} />
          <Footer />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
