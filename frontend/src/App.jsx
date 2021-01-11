import React from 'react';
import './App.scss';
import {Switch,Route} from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import TeacherSignIn from './TeacherSignIn/TeacherSignIn';
import TeacherSignUp from './TeacherSignUp/TeacherSignUp';
const App = () => {

  return (
    <>
      <Switch>
        <Route path='' component={()=><SignIn/>}></Route>
        <Route path='/login' component={()=><h1>hii</h1>}></Route>
        <Route path='/register' component={()=><h1>hii</h1>}></Route>
      </Switch>

    </>
  )
}
export default App;
