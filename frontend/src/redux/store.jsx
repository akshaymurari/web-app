import {createStore,applyMiddleware,combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import Reducer from './reducers.jsx';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
let red=combineReducers({
    forgetpass:Reducer('forgetpass'),
    resetpass:Reducer('resetpass'),
    signin:Reducer('signin'),
    signup:Reducer('signup'),
    teachersignin:Reducer('teachersignin'),
    takeattendance:Reducer('takeattendance'),
    uploadattendance:Reducer('uploadattendance'),
    classblog:Reducer('classblog'),
    getclassblog:Reducer('getclassblog'),
    deletenotes:Reducer('deletenotes'),
    StudentClassBlog:Reducer('StudentClassBlog'),
    onSearchLinks:Reducer('onSearchLinks'),
    QueryBlog:Reducer('QueryBlog'),
    DashboardEvent:Reducer('DashboardEvent'),
})
let Store=createStore(red,composeWithDevTools(applyMiddleware(logger,thunk))) 
export default Store;