import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {BaseUrl} from '../App.jsx';
import DashboardContent from './DashboardContent/DashboardContent';
import DashboardMenu from './DashboardMenu/DashboardMenu';
import DashboardHeader from './DashboardHeader';
import './Dashboard.scss'
import DashboardProfile from './DashboardProfile/DashboardProfile';
import DashboardEvent from './DashboardEvent/DashboardEvent';
import * as FaIcons from 'react-icons/fa';
import {useSelector,useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

function Dashboard(props) {
    console.log(props);
    const state = useSelector(state => {
        if (props.type === "student") {
            return state.signin;
        }
        if (props.type === "teacher") {
            return state.teachersignin;
        }
    });
    const [showSideBar, setshowSideBar] = useState(true);
    const H = useHistory();
    let dispatch = useDispatch();
    const [values,setvalues] = useState({});
    useEffect(async () => {
        let d = new Date();
        const d_s = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        const value = JSON.parse(localStorage.getItem('value'));
        let info = { ...value, 'date': d_s };
        // console.log(info)
        setvalues(info);
        if(props.type==="student"){
            dispatch({ type: 'request_signin' });
        }
        else if(props.type==="teacher"){
            dispatch({ type: 'request_teachersignin' });
        }
        try {
            const data = await axios({
                method: "post",
                url: BaseUrl + props.type+"exists/",
                headers: { 'Authorization': "Token de5fca1fb449f586b63136af9a12ab5afc96602e" },
                data: info,
                responseType: 'json'
            })
            if(props.type==="student"){
                dispatch({ type: "success_signin", payload: data.data });
            }
            else if(props.type==="teacher"){
                dispatch({ type: "success_teachersignin", payload: data.data });
            }
            // H.push(`/mainblog`);
        }
        catch {
            if(props.type==="student"){
                dispatch({ type: "error_signin", payload: "" });
            }
            else if(props.type==="teacher"){
                dispatch({ type: "error_teachersignin", payload: "" });
            }
            H.push('/error');
        }
    }, []);
    const diplayDashboardContent = (content) => {
        console.log(content);
        if(true){
            return <DashboardProfile {...values}/>
        }
    }

    return (
        <React.Fragment>
            <DashboardHeader click={()=>setshowSideBar(!showSideBar)}></DashboardHeader>
            <DashboardMenu open={showSideBar} username={JSON.parse(localStorage.getItem('value')).rollno} type={props.type} whatToDisplay={diplayDashboardContent}></DashboardMenu>
            <div className="dashboard container">
                <div className="" style={{
                    width: "100vw",
                    zIndex: "1"
                    }}>
                    { diplayDashboardContent() }
                </div>
            </div>
        </React.Fragment>
    )
}

export default Dashboard;
