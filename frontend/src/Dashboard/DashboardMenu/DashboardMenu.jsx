import React, {useState} from 'react';
import Profile_pic from '../../assets/male_avatar.png';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ClassLinks from '../../ClassLinks/ClassLinks';
import './DashboardMenu.scss';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    dashboardMenuButtonGroup:{
        width: "100%"
    },
    dashboardMenuButton: {
        height: "3.2rem",
        border: "none",
        outline: "none",
        width: "inherit",
        textAlignLast: "right",
        "&:hover": {
            backgroundColor: "#7bf159",
            color: "white",
        }
    },
    dashboardMenuButtonSelected: {
        borderLeft: "5px rgb(26, 238, 26) solid",
        backgroundColor: "white"
    }
});

function DashboardMenu(props) {
    const classes = useStyles(props);
    const [view, setView] = React.useState('list');

    const handleChange = (event, nextView) => {
        setView(nextView);
    };

    const [content, setcontent] = useState(null);

    const diplayDashboardContent = (event) => {
        if(content==="classLinks"){
            return <ClassLinks/>
        }
    }

    return (
        <div className="dashboardMenu" style={{height:"100vh"}}>
            <img src={Profile_pic} alt="Profile" style={{width:"9rem", height:"8rem"}} className="mt-5 mb-3"></img>
            <p>Hello! --Name--</p>
            <ToggleButtonGroup orientation="vertical" value={view} exclusive onChange={handleChange} className={classes.dashboardMenuButtonGroup}>
                <ToggleButton value="profile" aria-label="profile" selected ={content==="profile"?true:false} onClick={() => setcontent("profile")} className={`${content==="profile"?classes.dashboardMenuButtonSelected:""} ${classes.dashboardMenuButton}`}>
                    <h6 className="mr-auto my-auto">Profile</h6>
                </ToggleButton>
                <ToggleButton value="attendance" aria-label="attendance" selected ={content==="attendance"?true:false} onClick={() => setcontent("attendance")} className={`${content==="attendance"?classes.dashboardMenuButtonSelected:""} ${classes.dashboardMenuButton}`}>
                    <h6 className="mr-auto my-auto">Attendence</h6>
                </ToggleButton>
                <ToggleButton value="classLinks" aria-label="classLinks" selected ={content==="classLinks"?true:false} onClick={() => setcontent("classLinks")} className={`${content==="classLinks"?classes.dashboardMenuButtonSelected:""} ${classes.dashboardMenuButton}`}>
                    <h6 className="mr-auto my-auto ml-1">Class Links</h6>
                </ToggleButton>
                <ToggleButton value="queryBlog" aria-label="queryBlog" selected ={content==="queryBlog"?true:false} onClick={() => setcontent("queryBlog")} className={`${content==="queryBlog"?classes.dashboardMenuButtonSelected:""} ${classes.dashboardMenuButton}`}>
                    <h6 className="mr-auto my-auto">Query Blog</h6>
                </ToggleButton>
                <ToggleButton value="events" aria-label="events" selected ={content==="events"?true:false} onClick={() => setcontent("events")} className={`${content==="events"?classes.dashboardMenuButtonSelected:""} ${classes.dashboardMenuButton}`}>
                    <h6 className="mr-auto my-auto">Events</h6>
                </ToggleButton>
            </ToggleButtonGroup>
            { diplayDashboardContent() }
        </div>
    )
}

export default DashboardMenu;
