import React, { useState, useEffect } from 'react';
import axios from 'axios';
//npm install react-chartjs-2 chart.js --save
import { Bar, Line, Pie } from 'react-chartjs-2';
import './DashboardAttendence.scss'
import { BaseUrl } from '../../App.jsx';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function DashboardAttendence() {
    let state = useSelector(state => state.signin);
    let dispatch = useDispatch();
    const [onsignin,setonsignin] = useState(false);
    const [onsubjects,setonsubjects] = useState(false);
    const [section, setsection] = useState("");
    const H = useHistory();
    useEffect(async () => {
        let d = new Date();
        const d_s = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        // e.preventDefault();
        const value = JSON.parse(localStorage.getItem('value'));
        let info = { ...value, 'date': d_s };
        dispatch({ type: 'request_signin' });
        try {
            const data = await axios({
                method: "post",
                url: BaseUrl + "studentexists/",
                headers: { 'Authorization': "Token de5fca1fb449f586b63136af9a12ab5afc96602e" },
                data: info,
                responseType: 'json'
            })
            dispatch({ type: "success_signin", payload: data.data });
            // console.log(data.data);
            // H.push(`/mainblog`);
        }
        catch {
            dispatch({ type: "error_signin", payload: "error" })
            H.push('/error');
        }
    }, []);
    const [studentAttendenceDetailes, setstudentAttendenceDetailes] = useState({
        subjectName: [],
        classsesAttended: [],
        classesTaken: [],
    });
    const [attendanceCount, setattendanceCount] = useState({
        totalNumberOfClassesAttended: "",
        totalNumberOfClassesConducted: ""
    });

    const [totalAttendancePercentage, settotalAttendancePercentage] = useState(
        ((attendanceCount.totalNumberOfClassesAttended / attendanceCount.totalNumberOfClassesConducted) * 100).toPrecision(4)
    );


    useEffect(async ()=>{
        // event.preventDefault();
            try{
                const data = await axios({
                    method:"get",
                    url:BaseUrl+`studentStore/${JSON.parse(localStorage.getItem('value')).rollno}/`,
                    headers: { 'Authorization': "Token de5fca1fb449f586b63136af9a12ab5afc96602e" },
                    responseType:'json'
                })
                console.log(data.data);
                setattendanceCount({totalNumberOfClassesAttended:data.data["total_classes_attended"],totalNumberOfClassesConducted:data.data["total_classes"]})
                console.log(totalAttendancePercentage);
                // settotalAttendancePercentage(((attendanceCount.totalNumberOfClassesAttended / attendanceCount.totalNumberOfClassesConducted) * 100).toPrecision(4));
                // console.log("erssjs");
                setsection(data.data["section"]);
                setonsignin(true);
            }
            catch{
                console.log("error");
            }
    },[]);

    useEffect(async () => {
        if(onsignin){
            try{
                const data = await axios({
                    method:"get",
                    url:BaseUrl+`getSubjects/${section}`,
                    headers: { 'Authorization': "Token de5fca1fb449f586b63136af9a12ab5afc96602e" },
                    responseType:'json'
                })
                console.log(data.data);
                // setattendanceCount({totalNumberOfClassesAttended:data.data["total_classes_attended"],totalNumberOfClassesConducted:data.data["total_classes"]})
                // console.log(totalAttendancePercentage);
                // settotalAttendancePercentage(((attendanceCount.totalNumberOfClassesAttended / attendanceCount.totalNumberOfClassesConducted) * 100).toPrecision(4));
                console.log("erssjs");
                setstudentAttendenceDetailes((pre)=>({...pre,"subjectName":data.data}))
                setonsubjects((pre)=>!pre);
            }
            catch{
                console.log("error");
            }   
        }
    },[onsignin]);
    // console.log("hiiiiiiiiiiiii")
    // console.log(studentAttendenceDetailes);
    // const [subjectU,setsubjectU] = useState();
    useEffect(() => {
        if(onsubjects){
            let a=[],b=[];
            studentAttendenceDetailes.subjectName.map(async (subject) => {
                const info={"section":section,"subject":subject,"username":JSON.parse(localStorage.getItem("value")).rollno }
                try{
                    const data = await axios({
                        method:"post",
                        url:BaseUrl+`subWiseAttendance/`,
                        headers: { 'Authorization': "Token de5fca1fb449f586b63136af9a12ab5afc96602e" },
                        data:info,
                        responseType:'json'
                    })
                    // console.log(subject);
                    a.push(data.data["classsesAttended"])
                    b.push(data.data["classesTaken"])
                    setstudentAttendenceDetailes({subjectName:studentAttendenceDetailes.subjectName,classsesAttended:a,classesTaken:b});
                    // setattendanceCount({totalNumberOfClassesAttended:data.data["total_classes_attended"],totalNumberOfClassesConducted:data.data["total_classes"]})
                    // console.log(totalAttendancePercentage);
                    settotalAttendancePercentage(((attendanceCount.totalNumberOfClassesAttended / attendanceCount.totalNumberOfClassesConducted) * 100).toPrecision(4));
                    // console.log("erssjs");
                    // setstudentAttendenceDetailes((pre)=>({...pre,"subjectName":data.data}))
                }
                catch{
                    // console.log("error");
                }   
            })
            // console.log(studentAttendenceDetailes);
            // console.log(a);
            // console.log(b);
        }
    },[onsubjects]);

    return (
        <>
            {/* <div> */}
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
                <div style={{ backgroundColor: "white", textAlign: "center",visibility: (state.loading) ? "hidden" : "visible" }}>
                    <h1 style={{ margin: "auto" }} className="dashboardAttendanceHeader">Attendence</h1>
                    <p style={{ fontSize: "2rem" }}>Total Attendence Percetange: <span style={{
                        fontWeight: "900",
                        marginBottom: "1rem",
                    }}>{totalAttendancePercentage}%</span></p>
                    <div style={{ marginBottom: "3rem" }}>
                        <p>Total Number of classes Attended: <span style={{
                            fontWeight: "900"
                        }}>{attendanceCount.totalNumberOfClassesAttended}</span></p>
                        <p>Total Number of classes Conducted: <span style={{
                            fontWeight: "900"
                        }}>{attendanceCount.totalNumberOfClassesConducted}</span></p>
                    </div>
                    <hr class="separator separator--dots" /> 
                     <p style={{ fontSize: "2rem" }}>Subject Wise Attendence Bar Graph</p>
                    <div style={{ maxHeight: "70vh", minHeight: "70vh" }}>
                        <Bar
                            height={400}
                            width={100}
                            data={{
                                labels: studentAttendenceDetailes.subjectName,
                                datasets: [
                                    {
                                        label: "Number of classes Attended",
                                        data: studentAttendenceDetailes.classsesAttended,
                                        backgroundColor: new Array(studentAttendenceDetailes.classsesAttended.length).fill("rgb(219, 242, 242, 0.3)"),
                                        borderColor: new Array(studentAttendenceDetailes.classsesAttended.length).fill("#66C9C9"),
                                        borderWidth: 1,
                                    },
                                    {
                                        label: "Number of classes Conducted",
                                        data: studentAttendenceDetailes.classesTaken,
                                        backgroundColor: new Array(studentAttendenceDetailes.classsesAttended.length).fill("rgb(255, 245, 221, 0.3)"),
                                        borderColor: new Array(studentAttendenceDetailes.classsesAttended.length).fill("#FFD46F"),
                                        borderWidth: 1,
                                    }
                                ]
                            }}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                },
                                legend: {
                                    display: true,
                                    labels: {
                                        fontColor: 'rgb(0, 0, 0)'
                                    }
                                },
                            }}
                        />
                    </div>
                </div>
        </>
    )
}

export default DashboardAttendence;
