import React,{useState} from 'react';
import DashboardContent from './DashboardContent/DashboardContent';
import DashboardMenu from './DashboardMenu/DashboardMenu';
import DashboardHeader from './DashboardHeader';
import './Dashboard.scss'
import DashboardProfile from './DashboardProfile/DashboardProfile';
import DashboardEvent from './DashboardEvent/DashboardEvent';
import * as FaIcons from 'react-icons/fa';
import {useHistory} from 'react-router-dom';

function Dashboard() {
    const [showSideBar, setshowSideBar] = useState(true);
    const H = useHistory();
    const diplayDashboardContent = (content) => {
        console.log(content);
        if(true){
            return <DashboardProfile/>
        }
    }

    return (
        <React.Fragment>
            <DashboardHeader click={()=>setshowSideBar(!showSideBar)}></DashboardHeader>
            <DashboardMenu open={showSideBar} whatToDisplay={diplayDashboardContent}></DashboardMenu>
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
