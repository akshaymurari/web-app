import React from 'react'
import './Header.scss'
import {Link} from 'react-router-dom'
const Header = () => {
    return (
        <>
          <div className="container-fluid">
              <div className="row bg-dark py-3" id="head">
                   <div className="mr-auto">
                        <h2 className="text-white headname float-left">App name</h2>
                   </div>
                   <div className="ml-auto">
                      <li className="d-inline mx-3"  style={{fontSize:"1.6rem"}}><Link to="/login" id="login" className="text-white">login</Link></li>
                      <li className="d-inline mx-3"  style={{fontSize:"1.6rem"}}><Link to="/register" id="register" className="text-white">register</Link></li>
                   </div>
              </div>
          </div>
        </>
    )
}

export default Header;

