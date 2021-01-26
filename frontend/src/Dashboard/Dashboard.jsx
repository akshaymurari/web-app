import React,{useState} from 'react';
import DashboardContent from './DashboardContent/DashboardContent';
import DashboardMenu from './DashboardMenu/DashboardMenu';
import DashboardHeader from './DashboardHeader';
import './Dashboard.scss'
import DashboardProfile from './DashboardProfile/DashboardProfile';
import DashboardEvent from './DashboardEvent/DashboardEvent';

function Dashboard() {
    const [content, setcontent] = useState("profile");
    return (
        /* <div className="dashboard container">
            <div className="row d-flex align-items-stretch">
                <div className="col-lg-2 col-md-3 p-0">
                    <DashboardMenu/>
                </div>
                <div className="col">
                    <DashboardContent/>
                </div>
            </div>
        </div> */
        /* <DashboardProfile></DashboardProfile> */
        <DashboardEvent></DashboardEvent>
    )
}

export default Dashboard;
