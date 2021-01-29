import React from 'react'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {useHistory} from 'react-router-dom';
const BlogCards = (props) => {
    // console.log(JSON.parse(localStorage.getItem('value')).rollno);
    // console.log(props);
    const H=useHistory();
    return (
        <div className="card shadow QueryQuestionsHover text-white text-center mt-4 p-4" style={{ background: (props.type=="teacher") ? "#db3d6a" : "#3ddbd9", borderRadius: "50px" }}>
            {((props.posted_byy===JSON.parse(localStorage.getItem('value')).rollno) || (props.user_type==="teacher"))?
            (<div>
            <IconButton aria-label="delete"
                    typ={props.posted_byy}
                    onClick={()=>props.onDeletePost(props.title)}
                    style={{display:"relative","marginLeft":"85%",marginTop:"-1.6rem"}}
                    >
                    <DeleteIcon fontSize="large" className="text-white" />
                </IconButton></div>):(<div>
                <IconButton aria-label="delete"
                    typ={props.posted_byy}
                    onClick={()=>props.onDeletePost(props.title)}
                    style={{visibility:"hidden","marginLeft":"85%",marginTop:"-1.6rem"}}
                    >
                    <DeleteIcon fontSize="large" className="text-white" />
                </IconButton></div>)
            }
            <blockquote class="blockquote mb-0" onClick={()=>H.push(`/QueryAnswerBlog/${props.title}/${props.user_type}`)} >
                <h3 style={{ textTransform: "uppercase" }}>
                {props.title}
                </h3>
                <p>{props.description}</p>
                <footer class="blockquote-footer text-white">
                    <small>
                        posted by {props.posted_byy} <cite title="Source Title">posted on {props.posted_on}</cite>
                    </small>
                </footer>
            </blockquote>
        </div>
    )
}

export default BlogCards
