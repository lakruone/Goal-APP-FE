import React, {Component} from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './Home';
import Dashboard from './Dashboard';

class RouteWrapper extends Component {




  render(){

    return(
      <div>
        <Routes >
          <Route exact path="/dashboard/" element={<Dashboard/>} />
          <Route  path="/" element={<Home/>} />
        </Routes >

      </div>

    );
  }
}

export default RouteWrapper;