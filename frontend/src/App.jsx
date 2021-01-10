import React from 'react';
import './App.scss';
import {Switch,Route} from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Mainblog from './Mainblog/Mainblog';
const App = () => {

  return (
    <>
      <Switch>
        <Route exact path='/' component={()=><Welcome/>}></Route>
        <Route exact path='/login' component={()=><h1>hii</h1>}></Route>
        <Route exact path='/register' component={()=><h1>hii</h1>}></Route>
        <Route exact path='/mainblog' component={()=><Mainblog/>}></Route>
        <Route exact path='/attendance' component={()=><h1>in attendance</h1>}></Route>
      </Switch>
    </>
  )
}
export default App;
