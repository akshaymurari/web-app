import React from 'react'
import { Link } from 'react-router-dom'
import icon from '../assets/icon.png';
import MainCard from './MainCard';
import attendance from '../assets/attendance.jpg'
import classlinks from '../assets/classlinks.png'
import queries from '../assets/query-board.png'
import event from '../assets/calendar.png'
import './Mainblog.scss';
import {useParams} from 'react-router';
import {useHistory} from 'react-router-dom';
const Mainblog = () => {
    const H = useHistory();
    let {user} = useParams();
    let props = [{ "image": attendance, "title": "", "info": "ATTENDANCE" }, { "image": classlinks, "title": "", "info": "CLASSLINKS" }, { "image": queries, "title": "", "info": "QUERYBLOG" },
    { "image": event, "title": "", "info": "EVENTS" }]
    return (
        <div>
            <div className="container-fluid" style={{ "background": "#eaf2ef" }}>
                <div className="row fixed-top">
                    <div className="col-12 navbar navbar-light bg-dark">
                        <div className="">
                            <Link className="navbar-brand" to="">
                                <img src={icon} width="30" height="30" className="d-inline-block align-top" alt="" />
                                <label className="ml-2 text-white">hii {user}</label>
                            </Link>
                        </div>
                        <label className="ml-auto text-white mt-1 text-center">
                            VISUAL MEET
                                </label>
                        <div className="ml-auto">
                            <button className="btn btn-outline-danger mr-2" onClick={()=>H.push("/")}>logout</button>
                        </div>
                    </div>
                </div>
                <div className="container mt-5" >
                    <div className="row ml-sm-5" style={{ "marginTop": "8rem" }}>
                        {/* {data.map((v)=><MainCard image={v.image} title={v.info} info={v.title}/>)} */}
                        <div className="card MainCard h-100 my-5 mx-auto  rounded-lg shadow" style={{ "width": "15rem", "height": "12rem" }}>
                            <img src={attendance} className="card-img-top img-responsive" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{props.title}</h5>
                                <p className="card-text">{props.info}</p>
                                <Link to={props.link} className="btn btn-primary">click to view...</Link>
                            </div>
                        </div>
                        <div className="card MainCard h-100  my-5 mx-auto  rounded-lg shadow" style={{ "width": "15rem", "height": "12rem" }}>
                            <img src={classlinks} className="card-img-top img-responsive" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{props.title}</h5>
                                <p className="card-text">{props.info}</p>
                                <Link to={props.link} className="btn btn-primary">click to view...</Link>
                            </div>
                        </div>
                        <div className="card MainCard h-100  my-5  mx-auto  rounded-lg shadow" style={{ "width": "15rem", "height": "12rem" }}>
                            <img src={queries} className="card-img-top img-responsive" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{props.title}</h5>
                                <p className="card-text">{props.info}</p>
                                <Link to={props.link} className="btn btn-primary">click to view...</Link>
                            </div>
                        </div>
                        <div className="card MainCard h-100  my-5  mx-auto rounded-lg shadow" style={{ "width": "15rem", "height": "12rem" }}>
                            <img src={event} className="card-img-top img-responsive" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{props.title}</h5>
                                <p className="card-text">{props.info}</p>
                                <Link to={props.link} className="btn btn-primary">click to view...</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mainblog
