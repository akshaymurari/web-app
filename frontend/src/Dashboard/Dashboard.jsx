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
    const state = useSelector(state => state.signin);
    const [showSideBar, setshowSideBar] = useState(true);
    const H = useHistory();
    let dispatch = useDispatch();
    const [values,setvalues] = useState({});
    useEffect(async () => {
        let d = new Date();
        const d_s = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        // e.preventDefault();
        const value = JSON.parse(localStorage.getItem('value'));
        let info = { ...value, 'date': d_s };
        setvalues(info);
        // dispatch({ type: 'request_signin' });
        try {
            const data = await axios({
                method: "post",
                url: BaseUrl + "studentexists/",
                headers: { 'Authorization': "Token de5fca1fb449f586b63136af9a12ab5afc96602e" },
                data: info,
                responseType: 'json'
            })
            dispatch({ type: "success_signin", payload: data.data });
            // H.push(`/mainblog`);
        }
        catch {
            dispatch({ type: "error_signin", payload: "error" })
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
            <DashboardMenu open={showSideBar} username={JSON.parse(localStorage.getItem('value')).rollno} whatToDisplay={diplayDashboardContent}></DashboardMenu>
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
