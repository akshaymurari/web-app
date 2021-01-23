import React, { useState,useEffect } from 'react'
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {BaseUrl} from '../App.jsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import './ClassBlog.scss';
import Notes from './Notes.jsx';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {useSelector,useDispatch} from 'react-redux';
const ClassBlog = () => {
    const H=useHistory();
    let state = useSelector(state=>state.teachersignin);
    let state1=useSelector(state=>state.classblog);
    let dispatch = useDispatch();
    let [onadd,setonadd] = useState(true); 
    let [notesdata,setnotesdata] = useState([]); 
    console.log(notesdata);
    useEffect(async ()=>{
        let d = new Date();
        const d_s=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
        // e.preventDefault();
        const value=JSON.parse(localStorage.getItem('value'));
        let info = {...value,'date':d_s };
        dispatch({type:'request_teachersignin'});
        try {
            const data = await axios({
                method: "post",
                url: BaseUrl+"teacherexists/",
                headers: { 'Authorization': "Token de5fca1fb449f586b63136af9a12ab5afc96602e" },
                data: info,
                responseType: 'json'
            })
            dispatch({type:"success_teachersignin",payload:data.data});
            H.push(`/ClassBlog`);
        }
        catch {
            dispatch({type:"error_teachersignin",payload:"error"})
            H.push('/error');
        }
    },[]);
    let [values,setvalues]=useState({"subject":"","link":"","section":"","date":""})
    useEffect(async ()=>{
        dispatch({'type':'request_getclassblog'});
        try{
            const data=await axios({
               method: 'get',
               url:BaseUrl+'filterClassLinkBlogByUsername/'+JSON.parse(localStorage.getItem('value')).rollno,
               headers:{'Authorization':'Token de5fca1fb449f586b63136af9a12ab5afc96602e'},
               responseType: 'json'
            })
            console.log("hii");
            dispatch({'type':'success_getclassblog',payload:data.data});
            console.log(data.data);
            setnotesdata(data.data);
        }
        catch{
            console.log("error");
            dispatch({'type':'error_getclassblog',payload:""});
        }
    },[onadd]);
    // console.log(values);
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }));
    const useStyles1 = makeStyles((theme) => ({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }));
    const addnotes = async () => {
        console.log("hiii");
        console.log(values);
        dispatch({'type':"request_classblog"});
        console.log({...values,posted_by:JSON.parse(localStorage.getItem("value")).rollno});
        try{
            const data = await axios({
                method:"post",
                url:BaseUrl+'classLinkBlog/',
                headers:{'Authorization':'Token de5fca1fb449f586b63136af9a12ab5afc96602e'},
                data:{...values,posted_by:JSON.parse(localStorage.getItem("value")).rollno},
                responseType:'json'
            })
            console.log("successs");
            console.log(data.data);
            dispatch({'type':"success_classblog"});
            setvalues({"subject":"","link":"","section":"","date":""});
            setonadd((pre)=>!pre);
        }
        catch{
            console.log("error");
            dispatch({'type':"error_classblog"});
        }
    }
    const ondel = (info) => {
        setonadd((pre)=>!pre);
    }
    const onlogout = () => {
        localStorage.removeItem('value');
        H.push('/')
    }
    const classes = useStyles();
    const classes1 = useStyles1();
    return (
        <div>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <AddIcon onClick={addnotes}/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            ADDCLASSES
                        </Typography>
                        <Button variant="contained" onClick={onlogout} color="secondary">Logout</Button>
                    </Toolbar>
                </AppBar>
            </div>
            <div className="container pt-5">
                <div className="row">
                    <div className="col-sm-6 border mx-auto boxx text-center px-md-3 shadow" style={{background:"#d3e0f5",borderRadius:"2rem"}}>
                        {/* <TextField value={values.link}
                            onChange={(e)=>setvalues((pre)=>({...pre,link:e.target.value}))}
                            id="standard-multiline-static"
                            label="LINK"
                            multiline
                            rows={3}
                            // defaultValue=""
                        /><br/> */}
                        <TextField id="standard-basic" value={values.link} onChange={(e)=>setvalues((pre)=>({...pre,link:e.target.value}))} label="LINK" /><br/>
                        <TextField value={values.subject}
                        onChange={(e)=>setvalues((pre)=>({...pre,subject:e.target.value}))}
                        id="standard-basic" style={{ textAlign: "center", margin: "0.3rem 0" }} label="SUBJECT" /> <br />
                        <TextField value={values.section} 
                        onChange={(e)=>setvalues((pre)=>({...pre,section:e.target.value}))}
                        id="standard-basic" style={{ textAlign: "center", margin: "0.3rem 0" }} label="SECTION" /> <br /><br />
                        <TextField
                            // value={values.date}
                            onChange={(e) =>{setvalues((pre)=>({...pre,date:e.target.value}))}}
                            id="datetime-local"
                            label="Next appointment"
                            type="datetime-local"
                            // defaultValue="2021-01-01T10:30"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ textAlign: "center" }}
                        /> 
                        <br/>
                        <Button id="circleicon" onClick={addnotes}><AddIcon id="addcircle" /></Button>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="notesblog" >
                    {notesdata.map((val,i)=><Notes id={val.id} subject={val.subject} fun={ondel} link={val.link} date={val.class_time} section={val.section}/>)}
                </div>
            </div>
        </div>
    )
}

export default ClassBlog
