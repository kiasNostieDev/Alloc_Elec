import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import App from './App';
import Admin from './Components/Admin/Admin';
import GivePreferences from './Components/GivePreferences';
import Station from './Components/Admin/Station';
import PrintSection from './Components/PrintSection';

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/admin' component={Admin} />
        <Route path='/prefersection' component={GivePreferences} />
        <Route path='/console' component={Station} />
        <Route path='/generateDocs/:slug' component={PrintSection}/>
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);
