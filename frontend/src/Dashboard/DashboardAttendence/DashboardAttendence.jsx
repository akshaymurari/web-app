import React, {useState,useEffect} from 'react';
//npm install react-chartjs-2 chart.js --save
import {Bar, Line, Pie} from 'react-chartjs-2';
import './DashboardAttendence.scss'

function DashboardAttendence() {
    const [studentAttendenceDetailes, setstudentAttendenceDetailes] = useState({
        subjectName: ["Physics", "Math", "DataStuctures", "Chemistry"],
        classsesAttended: [34, 28, 40, 36],
        classesTaken: [40, 29, 45, 40],
    });
    const [attendanceCount, setattendanceCount] = useState({
        totalNumberOfClassesAttended: studentAttendenceDetailes.classsesAttended.reduce(function(acc, val) { return acc + val; }, 0),
        totalNumberOfClassesConducted: studentAttendenceDetailes.classesTaken.reduce(function(acc, val) { return acc + val; }, 0),
    });

    const [totalAttendancePercentage, settotalAttendancePercentage] = useState(
        ((attendanceCount.totalNumberOfClassesAttended/attendanceCount.totalNumberOfClassesConducted)*100).toPrecision(4)
    );


    return (
        <div style={{backgroundColor: "white", textAlign: "center"}}>
            <h1 style={{margin: "auto"}} className="dashboardAttendanceHeader">Attendence</h1>
            <p style={{fontSize: "2rem"}}>Total Attendence Percetange: <span style={{
                fontWeight: "900",
                marginBottom: "1rem",
            }}>{totalAttendancePercentage}%</span></p>
            <div style={{marginBottom: "3rem"}}>
                <p>Total Number of classes Attended: <span style={{
                    fontWeight: "900"
                }}>{attendanceCount.totalNumberOfClassesAttended}</span></p>
                <p>Total Number of classes Conducted: <span style={{
                    fontWeight: "900"
                }}>{attendanceCount.totalNumberOfClassesConducted}</span></p>
            </div>
            <hr class="separator separator--dots" />
            <p style={{fontSize: "2rem"}}>Subject Wise Attendence Bar Graph</p>
            <div style={{maxHeight: "70vh", minHeight: "70vh"}}>
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
    )
}

export default DashboardAttendence;
