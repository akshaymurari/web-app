import React, { useState } from 'react';
import "./TeacherSignIn.scss";
// import '../SignIn/SignIn'
import signInpic1 from "../assets/signInpic1.svg";
import wave from "../assets/wave.png";
import teacher from "../assets/teacher.png";
import axios from 'axios';
import { useHistory } from 'react-router-dom'
const TeacherSignIn = () => {
    const H = useHistory();
    const [gender, setgender] = useState(1);
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState('');
    const [isActivePass, setIsActivePass] = useState(false);
    const [valuePass, setValuePass] = useState('');
    const [vis, setvis] = useState("hidden");

    const handleTextChange = (text) => {
        setValue(text);

        if (text !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }

    const handleTextChangePass = (text) => {
        setValuePass(text);

        if (text !== '') {
            setIsActivePass(true);
        } else {
            setIsActivePass(false);
        }
    }

    const changeGender = () => {
        if (gender === 1) {
            setgender(0);
            console.log(gender);
        }
        else {
            setgender(1);
            console.log(gender);
        }
    }
    const onsubmitlogin = async (e) => {
        let d = new Date();
        const d_s=d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
        e.preventDefault();
        let info = { "gender": gender, "rollno": value, "password": valuePass,"date":d_s }
        try {
            const data = await axios({
                method: "post",
                url: "http://127.0.0.1:8000/teacherexists/",
                headers: { 'Authorization': "Token de5fca1fb449f586b63136af9a12ab5afc96602e" },
                data: info,
                responseType: 'json'
            })
            console.log("hii");
            console.log(data.data);
            H.push(`/mainblog/${value}`);
        }
        catch {
            setvis("visible")
            console.log("error");
        }
    }
    return (
        <>
            <div className="alert alert-danger alert-dismissible fade show m-0 px-2" style={{ "visibility": vis }} role="alert">
                invalid details provided
            </div>
            <div className="signUpPage wholeteachersignin">
                <img className="wave" src={wave} alt="wallpaper"></img>
                <div className="container">
                    <img src={signInpic1} alt="sigup" className="img" mb-5 style={{ top: "4rem" }}></img>
                    <div className="login-content">
                        <form className="form">
                            <h2 className="title">SignIn</h2>
                            <img src={teacher} alt="Teacher profile pic"></img>
                            <div class="input-div one mt-4">
                                <div class="i">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="div">
                                    <h5 className={isActive ? "Active" : ""}>Id-Number/Email</h5>
                                    <input type="text" class="input" value={value}
                                        onChange={(e) => handleTextChange(e.target.value)} required></input>
                                </div>
                            </div>

                            <div class="input-div pass">
                                <div class="i">
                                    <i class="fas fa-lock"></i>
                                </div>
                                <div class="div">
                                    <h5 className={isActivePass ? "Active" : ""}>Password</h5>
                                    <input type="password" class="input" value={valuePass}
                                        onChange={(e) => handleTextChangePass(e.target.value)} required></input>
                                </div>
                            </div>
                            <div className="btn-group">
                                <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    {gender === 1 ? "Male" : "Female"}
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" onClick={changeGender}>Male</a></li>
                                    <li><a className="dropdown-item" onClick={changeGender}>Female</a></li>
                                </ul>
                            </div>
                            <br />
                            <a href="#" className="have">New to Visual Meet?</a>
                            <a href="/forgotpassteacher">Forgot Password?</a>
                            <input type="submit" onClick={onsubmitlogin} className="btn" value="Login"></input>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TeacherSignIn;