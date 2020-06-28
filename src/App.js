import React, { Suspense, lazy } from 'react';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { init } from './redux/action';
import './App.css';

const Home = lazy(() => import('./components/home/home'));
const Meeting = lazy(() => import('./components/meeting/meeting'));

const App = ({store, init}) => {
  init();
  return (
  <Provider store = { store }>
    <Router>
      <ErrorBoundary>
        <Suspense fallback = { <div>Loading...</div> }>
          <header>
            Smart Meeting Organiser
          </header>
          <Switch>
            <Route path = "/add-meeting" component = { Meeting } />
            <Route path = "/" component = { Home } />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </Router>
  </Provider>
)}

const mapDispatchToProps = {
  init: init
};

export default connect(false, mapDispatchToProps)(App);

class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className = 'err-screen'>
          Oops! some error occured!
        </div>
      )
    }

    return this.props.children; 
  }
}