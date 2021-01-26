import React, { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './DastboardAddEventArea.scss';

const useStyles = makeStyles({
    addEventToCalanderButton: {
        borderRadius: "50%",
        backgroundColor: "#77f496",
        color: "#fff",
        margin: "1rem 1rem 0rem auto",
        display: "block",
        "&:hover": {
            backgroundColor: "#fff",
            color: "#77f496",
        },
    },
    addEventToCalanderIcon: {
        fontSize: "3rem",
    }
})

function DastboardAddEventArea(props) {
    const classes = useStyles(props);
    const [dashboardEvent, setdashboardEvent] = useState("");
    const eventAdderHandler = (event) => {
        setdashboardEvent(event.target.value)
    }
    return (
        <div className="dashBoardAddEventToCalander" style={{
            margin: props.showAddEvent ? "auto": "none",
            transform: props.showAddEvent? 'translate(0vh)': "translate(-100vh)",
            display: props.showAddEvent ? "inline-block": "none"
        }}>
            <form>
                <label for="addEvent">Add Event</label>
                <textarea placeholder="Add the Event Description" name="addEvent" className="dashBoardAddEventToCalanderInput" value={dashboardEvent} onChange={eventAdderHandler}></textarea>
                <br/>
                <Button className={classes.addEventToCalanderButton} onClick={()=>{
                    props.closeAddEvent();
                    setdashboardEvent("");
                }}>
                    <AddIcon className={classes.addEventToCalanderIcon}></AddIcon>
                </Button>
            </form>
        </div>
    )
}

export default DastboardAddEventArea
