import React from 'react';
import {BaseUrl} from '../App.jsx';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';

const QueryBlog = () => {
    let state = useSelector(state=>state.signin);
    let dispatch = useDispatch();
    const H = useHistory();
    useEffect(async ()=>{
        let d = new Date();
        const d_s=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
        // e.preventDefault();
        const value=JSON.parse(localStorage.getItem('value'));
        let info = {...value,'date':d_s };
        dispatch({type:'request_signin'});
        try {
            const data = await axios({
                method: "post",
                url: BaseUrl+"studentexists/",
                headers: { 'Authorization': "Token de5fca1fb449f586b63136af9a12ab5afc96602e" },
                data: info,
                responseType: 'json'
            })
            dispatch({type:"success_signin",payload:data.data});
            // H.push(`/mainblog`);
        }
        catch {
            dispatch({type:"error_signin",payload:"error"})
            H.push('/error');
        }
    },[])
    return (
        <>
            <div className="loader-spinner" style={{visibility:(state.loading )? "visible" : "hidden"}}>
                <div className="spinner-grow text-success mr-1" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-danger mr-1" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-warning mr-1" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
          <h1>in QueryBlog</h1>  
        </>
    )
}

export default QueryBlog;
