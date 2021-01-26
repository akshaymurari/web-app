import React, { useState, useEffect } from 'react';
import moment from "moment";
import './DashboardEvent.scss';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import { Button, makeStyles } from '@material-ui/core';
import DashboardAddEventArea from './DastboardAddEventArea/DastboardAddEventArea';

const useStyles = makeStyles({

})

function DashboardEvent(props) {
    const classes = useStyles(props);
    const [showAddEvent, setshowAddEvent] = useState(false);
    const [calander, setcalander] = useState([]);
    const [value, setValue] = useState(moment());
    const startDay = value.clone().startOf("month").startOf('week');
    const endDay = value.clone().endOf("month").endOf('week');
    useEffect(() => {
        const a = [];
        const day = startDay.clone().subtract(1,"day");
        while(day.isBefore(endDay, "day")){
            a.push(
                Array(7).fill(0).map(()=>
                    day.add(1,"day").clone()
                )
            )
        }
        setcalander(a);
    }, [value]);    

    const closeAddEvent = () => setshowAddEvent(false);

    const isToday = (day) => {
        return day.isSame(new Date(), "day");
    }

    const afterDay = (day) => {
        return day.isSameOrAfter(new Date(), "day");
    }

    const beforeToday = (day) => {
        return day.isBefore(new Date(), "day");
    }

    const isSelected = (day) => {
        return value.isSame(day, "day");
    }

    const afterMonth = (day) => {
        return value.isBefore(day, "month");
    }
    const beforeMonth = (day) => {
        return value.isAfter(day, "month");
    }

    const dayStyles = (day) => {
        if(isSelected(day)){
            return "selected"
        }
        if(afterMonth(day) || beforeMonth(day)){
            return "beforeMonth"
        }
        if(isToday(day)){
            return "today"
        }
    }

    const currentMonthName = () => value.format("MMMM");
    const currentYearName = () => value.format("YYYY");
    const prevYear = () => value.clone().subtract(1,"year");
    const prevMonth = () => value.clone().subtract(1,"month");
    const nextMonth = () => value.clone().add(1,"month");
    const nextYear = () => value.clone().add(1,"year");
    const headerContent = `${currentMonthName()} ${currentYearName()}`;

    return (
        <React.Fragment style={{width: "100%"}}>
            {showAddEvent? <div className="dashboardEventBackDrop" onClick={closeAddEvent}></div>:null}
            <h1 className="dashboardEventHeading">Events!</h1>
            <div className="dashboardEvent m-auto">
                <div className="dashboardEventHeader">
                    <div className="mt-auto mb-auto">
                        <Button onClick={() => {setValue(prevYear())}}
                        ><FastRewindIcon/></Button>
                    </div>
                    <div className="mt-auto mb-auto">
                        <Button onClick={() => {setValue(prevMonth())}}
                        ><ArrowBackIosIcon/></Button>
                    </div>
                    <div className="ml-auto mt-3 mb-auto p-0" style={{display:"inline-block", textAlign:"center"}}>
                        <p>
                            {headerContent}
                        </p>
                    </div>
                    <div className="ml-auto mt-auto mb-auto">
                        <Button onClick={() => {setValue(nextMonth())}}
                        ><ArrowForwardIosIcon/></Button>
                    </div>
                    <div className="mt-auto mb-auto">
                        <Button onClick={() => {setValue(nextYear())}}
                        ><FastForwardIcon/></Button>
                    </div>
                </div>
                <div>
                    <div className="dayNames">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName)=>(
                            <div className="eachDayNmae">{dayName}</div>
                        ))}
                    </div>
                    {
                        calander.map((week) => (
                            <div>
                                {
                                    week.map((day) => (
                                        <div className="day"
                                            onClick = {() => {
                                                setValue(day);
                                                if(afterDay(day)){
                                                    setshowAddEvent(true);
                                                }
                                            }}
                                        >
                                            <div className={dayStyles(day)}>
                                                {
                                                    day.format("D").toString()
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>)
                        )
                    }
                </div>
                <div className="dashboardAddEventAreaForm">
                    <DashboardAddEventArea
                    showAddEvent={showAddEvent} 
                    closeAddEvent={closeAddEvent}/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default DashboardEvent;
