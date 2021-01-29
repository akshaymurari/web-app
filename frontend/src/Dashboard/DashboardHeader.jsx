import React,{useState,useEffect} from 'react';
import icon from '../assets/icon.png';
import * as FaIcons from 'react-icons/fa';
import { Button } from 'react-scroll';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import {BaseUrl} from '../App.jsx';
import {useSelector,useDispatch} from 'react-redux';
import useInterval from 'react-useinterval';
import {useHistory} from 'react-router-dom';

function ClassLinksHeader(props) {
    const mystyle = {
        fontSize: "2rem",
        marginRight: "2rem",
        color: "white",
        '&:hover': {
            color: "green",
        }
    };
    const H = useHistory();
    const [noBadges,setNoBadges] = useState(0);
    const state1 = useSelector(state => state.getNotifications);
    const [delay,setDelay] = useState(1000);
    const [updateNotifications,setUpdateNotifications] = useState(true);
    useEffect(async () => {
        setDelay(null);
        // dispatch({"type":"request_getNotifications"})
        try{
            const data = await axios({
                method : 'post',
                url:BaseUrl+`getNotifications/`,
                headers: { 'Authorization': "Token de5fca1fb449f586b63136af9a12ab5afc96602e" },
                data:{"username":JSON.parse(localStorage.getItem('value')).rollno,seen:0},
                responseType : 'json'
            });
            // dispatch({"type":"success_getNotifications",payload:data.data});
            setNoBadges((data.data).length);
            // console.log((data.data).length);
            setDelay(10000);
        }
        catch{
            // dispatch({"type":"error_getNotifications",payload:""});
            setDelay(null);
        }
    },[updateNotifications])
    const getNotifications = async () => {
        setDelay(null);
        setUpdateNotifications((pre)=>!pre);
    }
    useInterval(getNotifications,delay);
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <button onClick={props.click} style={{
                        backgroundColor: "Transparent", 
                        border: "none",
                        cursor:"pointer",
                        overflow: "hidden",
                        outline: "none",
                    }}><FaIcons.FaBars style={
                        mystyle
                    }></FaIcons.FaBars></button>
                    <a className="navbar-brand" href="#">
                        <img src={icon} width="40" height="40" alt="" style={{ borderRadius: '10px' }}></img>
                    </a>
                    <a className="navbar-brand  mr-auto" href="#">VISUAL MEET</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto mr-3">
                        </ul>
                    </div>
                </div>
                <IconButton aria-label="show 17 new notifications" className="text-white" >
                    <Badge badgeContent={noBadges} color="secondary"  onClick={()=>H.push('/NotificationBlog')}>
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </nav>
        </div>
    )
}

export default ClassLinksHeader;
