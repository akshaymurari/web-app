import React from 'react';
import {Switch,Route} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import SignUp from './SignUp/SignUp.jsx';
import SignIn from './SignIn/SignIn.jsx';
import Welcome from './Welcome/Welcome';
import TeacherSignIn from './TeacherSignIn/TeacherSignIn.jsx';
import TeacherSignUp from './TeacherSignUp/TeacherSignUp.jsx';
import Mainblog from './Mainblog/Mainblog.jsx';
import ForgotPassword from './forgotpass/forgotpass.jsx';
import Attendance from './attendance/attendance.jsx';
import Teacherblog from './teacherblog/teacherblog.jsx';
import {Provider} from 'react-redux';
import Store from './redux/store.jsx';
import Resetpass from './resetpass/Resetpass.jsx';
import Takeattendance from './takeattendance/takeattendance.jsx';
import ClassLinks from './ClassLinks/ClassLinks.jsx';
export const BaseUrl="http://127.0.0.1:8000/";
const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={()=><Welcome/>}></Route>
        <Route exact path="/forgotpass" component={()=><Provider store={Store}><ForgotPassword type="student"/></Provider>}></Route>
        <Route exact path="/forgotpassteacher" component={()=><Provider store={Store}><ForgotPassword type="teacher"/></Provider>}></Route>
        <Route exact path="/resetpass" component={()=><Provider store={Store}><Resetpass type="student"/></Provider>}></Route>
        <Route exact path="/resetpassteacher" component={()=><Provider store={Store}><Resetpass type="teacher"/></Provider>}></Route>
        <Route exact path='/SignIn' render={()=><Provider store={Store}><SignIn/></Provider>}></Route>
        <Route exact path='/SignUp' render={()=><Provider store={Store}><SignUp/></Provider>}></Route>
        <Route exact path='/TeacherSignIn' render={()=><Provider store={Store}><TeacherSignIn/></Provider>}></Route>
        <Route exact path='/TeacherSignUp' render={()=><Provider store={Store}><TeacherSignUp/></Provider>}></Route>
        <Route exact path='/mainblog' component={()=><Provider store={Store}><Mainblog/></Provider>}></Route>
        <Route exact path='/attendance' component={()=><Provider store={Store}><Attendance/></Provider>}></Route>
        <Route exact path='/teacherblog' component={()=><Provider store={Store}><Teacherblog/></Provider>}></Route>
        <Route exact path='/ClassLinks' component={()=><Provider store={Store}><ClassLinks/></Provider>}></Route>
        <Route exact path='/takeattendance/:subject/:section/:time' component={()=><Provider store={Store}><Takeattendance/></Provider>}></Route>
        <Route exact path='/error' component={()=><h1>Error</h1>}/>
      </Switch>
    </>
  )
}
export default App;
