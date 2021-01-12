import React, {useState} from 'react';
import "./TeacherSignIn.scss";
import signInpic1 from "../assets/signInpic1.svg";
import wave from "../assets/wave.png";
import teacher from "../assets/teacher.png";

const TeacherSignIn = () =>{

    const [gender, setgender] = useState(1);
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState('');
    const [isActivePass, setIsActivePass] = useState(false);
    const [valuePass, setValuePass] = useState('');

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
        <div className="signUpPage wholeteachersignin">
            <img className="wave" src={wave} alt="wallpaper"></img>
            <div className="container">
                <img src={signInpic1} alt="sigup" className="img" mb-5 style={{top:"4rem"}}></img>
                <div className="login-content">
                    <form className="form">
                        <h2 className="title">SignIn</h2>
                        <img src={teacher} alt="Teacher profile pic"></img>
                        <div class="input-div one">
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
                                {gender === 1? "Male" : "Female"}
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" onClick = {changeGender} href="#">Male</a></li>
                                <li><a className="dropdown-item" onClick = {changeGender} href="#">Female</a></li>
                            </ul>
                        </div>
                        <br/>
                        <a href="#" className="have">New to Visual Meet?</a>
                        <a href="#">Forgot Password?</a>
                        <input type="submit" class="btn" value="Login"></input>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TeacherSignIn;