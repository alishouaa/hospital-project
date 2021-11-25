import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './component/Home'
import addHelp from './component/addHelp'
import addUser from './component/addUser'
import getUser from './component/getUser'
import Show from './component/show'
import getHelp from './component/getHelp'
import Login from './component/login'
class App extends Component {


  render() {
    return (
      <div>
        <Router>
          <div >
            <Switch>
              <Route exact path='/' component={Login} />
              <Route  path='/home' component={Home} />
              <Route path='/add-user' component={addUser} />
              <Route path='/add-help' component={addHelp} />
              <Route path='/get-user' component={getUser} />
              <Route path='/get-one' component={Show} />
              <Route path='/get-help' component={getHelp} />

            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
