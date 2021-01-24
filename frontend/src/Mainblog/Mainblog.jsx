import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import icon from '../assets/icon.png';
import MainCard from './MainCard';
import attendance from '../assets/attendance.jpg'
import classlinks from '../assets/classlinks.png'
import queries from '../assets/query-board.png'
import event from '../assets/calendar.png'
import './Mainblog.scss';
import {BaseUrl} from '../App.jsx';
import {useParams} from 'react-router';
import {useHistory} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
const Mainblog = () => {
    console.log(localStorage.getItem('value'))
    let state = useSelector(state=>state.signin);
    let dispatch = useDispatch();
    const H = useHistory();
    useEffect(async ()=>{
        let d = new Date();
        const d_s=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
        // e.preventDefault();
        const value=JSON.parse(localStorage.getItem('value'));
        let info = {...value,'date':d_s };
        dispatch({type:'request_signin'});
        try {
            const data = await axios({
                method: "post",
                url: BaseUrl+"studentexists/",
                headers: { 'Authorization': "Token de5fca1fb449f586b63136af9a12ab5afc96602e" },
                data: info,
                responseType: 'json'
            })
            dispatch({type:"success_signin",payload:data.data});
            H.push(`/mainblog`);
        }
        catch {
            dispatch({type:"error_signin",payload:"error"})
            H.push('/error');
        }
    },[])
    let props = [{ "image": attendance, "title": "", "info": "ATTENDANCE","link":"/attendance" }, { "image": classlinks, "title": "","link":"/StudentClassBlog", "info": "CLASSLINKS" }, { "image": queries, "title": "", "info": "QUERYBLOG" },
    { "image": event, "title": "", "info": "EVENTS" }]
    return (
        <div>
            <div className="loader-spinner" style={{visibility:(state.loading )? "visible" : "hidden"}}>
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
            <div className="container-fluid" style={{ "background": "#d7dff7",visibility:(state.loading )? "hidden" : "visible" }}>
                <div className="row fixed-top">
                    <div className="col-12 navbar navbar-light bg-dark">
                        <div className="">
                            <Link className="navbar-brand" >
                                <img src={icon} width="30" height="30" className="d-inline-block align-top" alt="" />
                                <label className="ml-2 text-white">hii {JSON.parse(localStorage.getItem('value')).rollno}</label>
                            </Link>
                        </div>
                        <label className="ml-auto text-white mt-1 text-center">
                            VISUAL MEET
                                </label>
                        <div className="ml-auto">
                            <button className="btn btn-outline-danger mr-2" onClick={()=>{localStorage.removeItem('value');H.push("/");}}>logout</button>
                        </div>
                    </div>
                </div>
                <div className="container mt-5" >
                    <div className="row ml-sm-5" style={{ "marginTop": "8rem" }}>
                        {/* {data.map((v)=><MainCard image={v.image} title={v.info} info={v.title}/>)} */}
                        <div className="card MainCard h-100 my-5 mx-auto px-0 rounded-lg shadow" style={{ "width": "15rem", "height": "12rem" }}>
                            <img src={attendance} className="card-img-top img-responsive" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{props[0].title}</h5>
                                <p className="card-text">{props[0].info}</p>
                                <Link to={props[0].link} className="btn btn-primary">click to view...</Link>
                            </div>
                        </div>
                        <div className="card MainCard h-100  my-5 mx-auto px-0 rounded-lg shadow" style={{ "width": "15rem", "height": "12rem" }}>
<img src={classlinks} className="card-img-top img-responsive" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{props[1].title}</h5>
                                <p className="card-text">{props[1].info}</p>
                                <Link to={props[1].link} className="btn btn-primary">click to view...</Link>
                            </div>
                        </div>
                        <div className="card MainCard h-100  my-5  mx-auto  rounded-lg shadow" style={{ "width": "15rem", "height": "12rem" }}>
                            <img src={queries} className="card-img-top img-responsive" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{props[2].title}</h5>
                                <p className="card-text">{props[2].info}</p>
                                <Link to={props[2].link} className="btn btn-primary">click to view...</Link>
                            </div>
                        </div>
                        <div className="card MainCard h-100  my-5  mx-auto rounded-lg shadow" style={{ "width": "15rem", "height": "12rem" }}>
                            <img src={event} className="card-img-top img-responsive" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{props[3].title}</h5>
                                <p className="card-text">{props[3].info}</p>
                                <Link to={props[3].link} className="btn btn-primary">click to view...</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mainblog
