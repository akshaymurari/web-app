import React from 'react';
import './App.scss';
import {Switch,Route} from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
<<<<<<< HEAD
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import TeacherSignIn from './TeacherSignIn/TeacherSignIn';
import TeacherSignUp from './TeacherSignUp/TeacherSignUp';
=======
import Mainblog from './Mainblog/Mainblog';
>>>>>>> d798eeaf45d862f669010a3554c4fc86d1545665
const App = () => {

  return (
    <>
      <Switch>
<<<<<<< HEAD
        <Route path='' component={()=><SignIn/>}></Route>
        <Route path='/login' component={()=><h1>hii</h1>}></Route>
        <Route path='/register' component={()=><h1>hii</h1>}></Route>
=======
        <Route exact path='/' component={()=><Welcome/>}></Route>
        <Route exact path='/login' component={()=><h1>hii</h1>}></Route>
        <Route exact path='/register' component={()=><h1>hii</h1>}></Route>
        <Route exact path='/mainblog' component={()=><Mainblog/>}></Route>
        <Route exact path='/attendance' component={()=><h1>in attendance</h1>}></Route>
>>>>>>> d798eeaf45d862f669010a3554c4fc86d1545665
      </Switch>
    </>
  )
}
export default App;
