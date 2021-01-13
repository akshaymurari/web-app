import React,{useState} from 'react';
import Avatar from "./Avatar/Avatar";
import wave from "../assets/wave.png";
import axios from 'axios';
import signInpic1 from "../assets/signInpic1.svg";
const ForgotPassword = (props) => {
        const [value, setValue] = useState('');
        const [isActive, setIsActive] = useState(false);
        const [vis,setvis] = useState({"visibility":"hidden","background":"#5ae663","msg":""});
        const handleTextChange = (text) => {
            setValue(text);
    
            if (text !== '') {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        }
        const onsubmitlogin = async (e) => {
            e.preventDefault();
            const info = {"type":props.type,"email":value}
            try{
                const data = await axios({
                    method:"post",
                    url:"http://127.0.0.1:8000/forgetpassword/",
                    headers:{"Authorization":"Token de5fca1fb449f586b63136af9a12ab5afc96602e"},
                    responseType:"json",
                    data:info
                })
                setvis(()=>({"background":"#5ae663","visibility":"visible","msg":"password as been sent to your mail"}));
            }
            catch{
                setvis(()=>({"background":"#e05871","visibility":"visible","msg":"invalid email"}));
                console.log("error")
            }
        }

        return (
            <>
                <div className="alert alert-danger alert-dismissible fade show m-0 px-2" style={{ "visibility": vis.visibility,"background":vis.background }} role="alert">
                    {vis.msg}
                </div>
                <div className="signUpPage whole">
                    <img className="wave" src={wave} alt="wallpaper"></img>
                    <div className="container">
                        <img src={signInpic1} alt="sigup" className="img" mb-5 style={{ top: "4rem" }}></img>
                        <div className="login-content">
                            <form className="form">
                                {/* <h2 className="title">Forgot</h2> */}
                                <div class="input-div one">
                                    <div class="i">
                                        <i class="fas fa-user"></i>
                                    </div>
                                    <div class="div">
                                        <h5 className={isActive ? "Active" : ""}>Email</h5>
                                        <input type="text" class="input" value={value}
                                            onChange={(e) => handleTextChange(e.target.value)} required></input>
                                    </div>
                                </div>
{/* 
                                <div class="input-div pass">
                                    <div class="i">
                                        <i class="fas fa-lock"></i>
                                    </div>
                                </div> */}
                                <br />
                                <input type="submit" className="btn" onClick={onsubmitlogin} value="Submit"></input>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }

export default ForgotPassword;