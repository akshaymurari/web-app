import React, {useState} from 'react';
import "./SignUp.scss";
import signUp from "../assets/signUp.svg";
import Avatar from "./Avatar/Avatar";
import wave from "../assets/wave.png";

const SignUp = () =>{

    const [gender, setgender] = useState(1);
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState('');
    const [isActivePass, setIsActivePass] = useState(false);
    const [valuePass, setValuePass] = useState('');
    const [isActiveEmail, setIsActiveEmail] = useState(false);
    const [valueEmail, setValueEmail] = useState('');

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
    const handleTextChangeEmail = (text) => {
        setValueEmail(text);

        if (text !== '') {
            setIsActiveEmail(true);
        } else {
            setIsActiveEmail(false);
        }
    }

    const changeGender = () => {
        if(gender === 1){
            setgender(0);
            console.log(gender);
        }
        else{
            setgender(1);
            console.log(gender);
        }
    }

    return(
        <div className="signUpPage wholesignup">
            <img className="wave" src={wave} alt="wallpaper"></img>
            <div className="container">
                <img src={signUp} alt="sigup" className="img"></img>
                <div className="login-content">
                    <form className="form">
                        <h2 className="title">SignUP</h2>
                        <Avatar gender={gender}></Avatar>
                        <div class="input-div one">
                            <div class="i">
                                    <i class="fas fa-user"></i>
                            </div>
                            <div class="div">
                                    <h5 className={isActive ? "Active" : ""}>RollNumber</h5>
                                    <input type="text" class="input" value={value}
                                    onChange={(e) => handleTextChange(e.target.value)} required></input>
                            </div>
                        </div>
                        <div class="input-div one">
                            <div class="i">
                                    <i class="fas fa-user"></i>
                            </div>
                            <div class="div">
                                    <h5 className={isActiveEmail ? "Active" : ""}>Email</h5>
                                    <input type="email" class="input" value={valueEmail}
                                    onChange={(e) => handleTextChangeEmail(e.target.value)} required></input>
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
                                {gender === 1? "Male" : "Female"}
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" onClick = {changeGender} href="#">Male</a></li>
                                <li><a className="dropdown-item" onClick = {changeGender} href="#">Female</a></li>
                            </ul>
                        </div>
                        <br/>
                        <a href="#" className="have" m-auto>Already a Member?</a>
                        <input type="submit" class="btn" value="SignUp"></input>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;