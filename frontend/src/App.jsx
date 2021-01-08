import React from 'react';
import './App.scss';
import {Switch,Route} from 'react-router-dom';
import Welcome from './Welcome/Welcome.jsx';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
const App = () => {

  return (
    <>
      <Switch>
        <Route path='' component={()=><Welcome/>}></Route>
        <Route path='/login' component={()=><h1>hii</h1>}></Route>
        <Route path='/register' component={()=><h1>hii</h1>}></Route>
      </Switch>

    </>
  )
}
export default App;
