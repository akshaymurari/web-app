import React from 'react';
import Header from '../Header/Header.jsx';
import icon from "../assets/icon.png";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ScrollLogin from "../scrollLogin/scrollLogin";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-scroll';

const useStyles = makeStyles({
  goDownIcon:{
    color: "#54e346",
    fontSize: "5rem",
    margin: "auto"
  }
});

const Welcome = (props) => {
  const classes = useStyles(props);
  return (
      <div id="welcome">
        <Header></Header>
        <div className="display">
          <img className="icon" src={icon} alt="Icon of Visual Meet"></img>
          <div>
            <h1 className="title">Welcome to Virtual Meet</h1>
            <br/>
            <p className="tag">Making ClassRooms Interactive</p>
          </div>
        </div>
        <Link className="arrow" to="login-center" smooth={true}>
          <KeyboardArrowDownIcon className={classes.goDownIcon}></KeyboardArrowDownIcon>
        </Link>
        <ScrollLogin></ScrollLogin>
      </div>
  );
}

export default Welcome;
