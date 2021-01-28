import React, {useState,useEffect, useRef} from 'react';
import './QueryBlogChat.scss';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Button, makeStyles } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import profile_pic from '../assets/male_avatar.png';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
//npm i emoji-mart

const useStyles = makeStyles({
    queryBlogChatAddEmoji: {
        zIndex: "30",
        borderRadius: "50%",
        cursor: "pointer",
        '&:hover': {
            color: "#10cce7"
        }
    }
});

function QueryBlogChat(props) {
    const classes=useStyles(props);
    const [messages, setmessages] = useState([{
        who_sent: "student",
        message: "Hello"
    }]);
    const [showEmoji, setshowEmoji] = useState(false);
    const [backDrop, setbackDrop] = useState(false);
    const [newMessage, setnewMessage] = useState([{
        who_sent: "me",
        message: ""
    }]);
    const handleChange = e => {
        console.log(newMessage)
        setnewMessage({
            who_sent: "me",
            message: e.target.value
        });
    }
    const addEmoji = e => {
        let sym = e.unified.split('-')
        let codesArray = []
        sym.forEach(el => codesArray.push('0x' + el))
        let emoji = String.fromCodePoint(...codesArray)
        setnewMessage({
            who_sent: "me",
            message: newMessage.message+emoji,
        });
    }

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [messages]);
    
    return (
        <div className="queryBlogChatScreen p-0">
            {backDrop? <div style={{width:"100%", height: "100%", position: "absolute", zIndex:"20", border: "0"}} onClick={(e)=>{
                setbackDrop(false);
                setshowEmoji(false);
            }}></div>: null}
            <div className="queryBlogChatArea container ">
                <div className="row align-items-stretch" style={{height: "100%", borderRadius: "10px"}}>
                    <div className="col-md-3 p-0 queryBlogChatAreaLeftPane">
                        <div className="queryBlogChatBack">
                            <Button><ArrowBackIcon></ArrowBackIcon></Button>
                        </div>
                        <div className="queryBlogChatTitle">
                            <img src={profile_pic} style={{width: "9rem", height: "8rem"}}></img>
                            <h1>Hello!</h1>
                            <p>---Name---</p>
                        </div>
                        <h3 style={{
                            marginLeft: "20px"
                        }}>TOPIC:</h3>
                        <h3 style={{
                            border: "black 0.8px solid",
                            borderLeft: "#79d70f 5px solid",
                            marginTop: "20px",
                            padding: "8px",
                        }}>Title of the Topic</h3>
                        <div style={{
                            position:"absolute",
                            bottom: "0.3rem",
                            lineHeight: "0.5px",
                            textAlign: "center",
                            display: "block",
                            margin: "0 2rem",
                            fontSize: "0.8rem"
                        }}>
                            <p>Please Follow the Community GuideLines</p>
                            <p>Virtual Meet</p>
                        </div>
                    </div>
                    <div className="col-md-9 p-0 queryBlogChatAreaRightPane" style={{border: "black 1px solid"}}>
                        <div className="queryBlogChatMessagesArea">
                            <div className="queryBlogChatHeader p-2">
                                <h1 className="queryBlogChatHeaderHeading">Discussion Forum 🔍</h1>
                            </div>
                            <div className="queryBlogChats">
                                <div ref={messagesEndRef} />
                                {messages.map((value, idx)=>(
                                    <div className={value.who_sent} id={idx}>
                                        <p className="queryBlogChatMessageName">{value.who_sent==="me"?"Me":"Name of the person"}</p>
                                        <p>{value.message}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="queryBlogChatNewMessageArea">
                            {showEmoji? (
                                <span style={{
                                    position: "absolute",
                                    bottom: "80px",
                                    left: "10px",
                                    zIndex: "40",
                                }}>
                                    <Picker onSelect={(e)=>addEmoji(e)} title="Visual Meet"/>:
                                </span>
                                ): null
                            }
                            <InsertEmoticonIcon
                            className={classes.queryBlogChatAddEmoji}
                            style={{
                                fontSize:"1.8rem"
                            }}
                            onClick={() => {
                                setshowEmoji(!showEmoji);
                                setbackDrop(!backDrop);
                            }}></InsertEmoticonIcon>
                            <textarea placeholder="Enter you Message" className="queryBlogChatNewMessageTeaxtArea mt-2" value={newMessage.message} onChange={(event)=>handleChange(event)} id="cin" style={{width: "75%"}} 
                            onKeyPress={
                                (e)=>{
                                    var code = e.keyCode || e.which;
                                    if (code === 13 && !e.shiftKey){
                                        e.preventDefault();
                                        if(newMessage.message!==""){
                                            setmessages([
                                                newMessage,
                                                ...messages,
                                            ]);
                                            setnewMessage({
                                                ...newMessage,
                                                message: ""
                                            });
                                        }
                                    }
                                }
                            }></textarea>
                            <Button onClick={()=>{
                                setmessages([
                                    newMessage,
                                    ...messages,
                                ]);
                                setnewMessage({
                                    ...newMessage,
                                    message: ""
                                });
                            }}><SendIcon></SendIcon></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QueryBlogChat;
