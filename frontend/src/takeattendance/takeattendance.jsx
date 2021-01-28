import React, { useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import './takeattendance.scss';
import SearchIcon from '@material-ui/icons/Search';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BaseUrl } from '../App.jsx';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
const Takeattendance = () => {
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
            // H.push(`/takeattendance`);
        }
        catch {
            dispatch({type:"error_teachersignin",payload:"error"})
            H.push('/error');
        }
    },[]);
    let [rows, setrows] = useState([]);
    const H = useHistory();
    const { subject, section ,time } = useParams();
    let state = useSelector(state => state.takeattendance);
    const dispatch = useDispatch();
    let state1=useSelector(state=>state.uploadattendance);
    const [uploadDetails, setuploadDetails] = useState([]);
    const onCheckBoxClick = (p) => {
        console.log(p.rowIds);
        setuploadDetails(p.rowIds);
    }
    const uploadAttendanceForm = async () => {
        dispatch({"type":"request_uploadattendance"});
        let dict={};
        uploadDetails.map((val)=>{
            dict[val]=true;
        })
        rows.map((v)=>{
            if(dict[v['username']]){
                v["present"]=true;
            }
            else{
                v["present"]=false;
            }
            v["section"]=section;
            v["subject"]=subject;
            v["class_time"]=time;
            v["posted_by"]=JSON.parse(localStorage.getItem('value')).rollno;
        })
        console.log(rows);
        try{
            const data = await axios({
                method:"post",
                url:BaseUrl+"addAttendance/",
                headers:{"Authorization":"Token de5fca1fb449f586b63136af9a12ab5afc96602e"},
                responseType:"application/json",
                data:{"rows":rows,"teacheruser":JSON.parse(localStorage.getItem("value")).rollno}
            })
            dispatch({"type":"success_uploadattendance","payload":data.data});
            H.push('/ClassBlog');
        }
        catch{
            dispatch({"type":"error_uploadattendance","payload":"error"});
            H.push('/error');
        }
    }
    const columns = [
        // { field: 'id', headerName: 'ID', width: 130 },
        { field: 'id', headerName: 'ROLLNO', width: 160 },
        { field: 'section', headerName: 'SECTION', width: 130, sortable: false, },
        {
            field: 'total_classes',
            headerName: 'TOTAL CLASSES',
            description: 'total classes taken in this subject',
            width: 130,
            sortable: false,
            type: 'number',
        },
        {
            field: 'total_classes_attended',
            headerName: 'TOTAL_CLASSES_ATTENDED',
            description: 'total classes attended in this subject',
            sortable: false,
            type: 'number',
            width: 180,
        },
        {
            field: 'lastloginat',
            headerName: 'LASTLOGINAT',
            description: 'last login time of student',
            sortable: false,
            width: 180,
        },
    ];
    useEffect(async () => {
        console.log("hii");
        dispatch({ 'type': "request_takeattendance" });
        try {
            console.log("hii");
            const data = await axios({
                method: "post",
                url: BaseUrl + 'attendanceBlog/',
                responseType: "json",
                headers: { "Authorization": "Token de5fca1fb449f586b63136af9a12ab5afc96602e" },
                data: { "section": section, "subject": subject }
            });
            console.log(data.data);
            setrows(data.data);
            dispatch({ 'type': "success_takeattendance", payload: data.data });
        }
        catch {
            dispatch({ 'type': "error_takeattendance", payload: "error" });
            console.log("error")
        }
    }, []);
    const useStyles3 = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
        },
    }));
    const useStyles2 = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));
    const useStyles1 = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
    }));
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));
    const classes = useStyles();
    const classes1 = useStyles1();
    const classes2 = useStyles2();
    const classes3 = useStyles3();
    const [page, setpage] = React.useState(7);
    const handleChange = (event) => {
        setpage(event.target.value);
    };
    return (
        <>
            <div className="container-fluid p-0" style={{ visibility: (state1.loading) ? "hidden" : "visible" }}>
                <div className="row ">
                    <div className={classes.root}>
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="open drawer">
                                    <MenuIcon />
                                </IconButton>
                                <Typography className={classes.title} variant="h6" noWrap>
                                    Takeattendance
                                </Typography>
                                <div>
                                    <FormControl className={classes2.formControl} style={{ color: "#fff !important", marginTop: "-0rem" }}>
                                        <InputLabel id="demo-simple-select-label" className="text-white">pages</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={page}
                                            className="text-white"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={5}>5</MenuItem>
                                            <MenuItem value={10}>10</MenuItem>
                                            <MenuItem value={15}>15</MenuItem>
                                            <MenuItem value={20}>20</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div>
                                    <Button onClick={uploadAttendanceForm} style={{ background: "#d7dff7" }}
                                        variant="contained"
                                        color="default"
                                        className={classes3.button}
                                        startIcon={<CloudUploadIcon />}
                                    >
                                        Upload
                                    </Button>
                                </div>
                            </Toolbar>
                        </AppBar>
                    </div>
                </div>
                <div className="row">
                    <div className={classes1.root}>
                        <Accordion>
                            <AccordionSummary style={{ background: "#d7dff7", border: "none !important" }}
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                <Typography className={classes.heading} color="primary" style={{ fontWeight: "600" }}>Note <DoubleArrowIcon color="primary" style={{ fontSize: "1rem" }} /></Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ background: "#d7dff7", border: "none !important" }}>
                                <Typography>
                                    please click on checkbox if student is present or keep blank in case student is absent
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
                <div className="row">
                    <div className="loader-spinner" style={{ visibility: (state.loading) ? "visible" : "hidden" }}>
                        <div className="spinner-grow text-success mr-1" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-danger mr-1" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-warning mr-1" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
                <div className="row mt-5" style={{ visibility: (state.loading || state1.loading) ? "hidden" : "visible" }}>
                    <div style={{ height: '73vh', width: '100%' }}>
                        <DataGrid rows={rows} columns={columns} pageSize={page} checkboxSelection={true} onSelectionChange={onCheckBoxClick} />
                    </div>
                </div>
            </div>
            {/* <div> */}
                <div className="loader-spinner1" style={{ visibility: (state1.loading) ? "visible" : "hidden" }}>
                    <div className="spinner-grow text-success mr-1" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-danger mr-1" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-warning mr-1" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                {/* </div> */}
            </div>
        </>
    )
}

export default Takeattendance
