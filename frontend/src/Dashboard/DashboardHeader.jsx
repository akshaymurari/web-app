import React from 'react';
import icon from '../assets/icon.png';
import * as FaIcons from 'react-icons/fa';
import { Button } from 'react-scroll';

function ClassLinksHeader(props) {
    const mystyle = {
        fontSize: "2rem",
        marginRight: "2rem",
        color: "white",
        '&:hover': {
            color: "green",
        }
    };
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <button onClick={props.click} style={{
                        backgroundColor: "Transparent", 
                        border: "none",
                        cursor:"pointer",
                        overflow: "hidden",
                        outline: "none",
                    }}><FaIcons.FaBars style={
                        mystyle
                    }></FaIcons.FaBars></button>
                    <a className="navbar-brand" href="#">
                        <img src={icon} width="40" height="40" alt="" style={{ borderRadius: '10px' }}></img>
                    </a>
                    <a className="navbar-brand  mr-auto" href="#">VISUAL MEET</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto mr-3">
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default ClassLinksHeader;
