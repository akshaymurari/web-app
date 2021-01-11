import React from 'react';
import './Header.scss';
import {Link} from 'react-scroll';
import icon from "../assets/icon.png";
import './Header.scss';

const Header = () => {
    return (
        <React.Fragment>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">
                    <img src={icon} width="40" height="40" alt="" style={{borderRadius: '10px'}}></img>
                </a>
                <a className="navbar-brand" href="/mainblog">Virtual Meet</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <Link className=" signin ml-auto mr-3 text-white" to="login-center" smooth={true}>Sign in</Link>
                    <button type="button" className="btn btn-outline-warning ml-2">Register</button>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default Header;

