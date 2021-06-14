import {React, useState,useContext} from 'react';
import {Usercontest} from '../App'
import { Link ,useHistory} from 'react-router-dom';
import M from 'materialize-css';
const SignIn = ()=>{
    const {dispatch} = useContext(Usercontest)
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const history = useHistory()
    const fetchData = () =>{
        fetch('/signin',{
            method:"post",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })

        }).then(res => res.json()).then(data=>{
            if (data.error){
                M.toast({html:data.error , classes:"#b71c1c red darken-4"});
            }
            else{
                localStorage.setItem("jwt",data.token);
                localStorage.setItem("user",JSON.stringify(data.user));
                dispatch({type:"USER",payload:data.user});
                M.toast({html:"SignIn successfull",classes : "#388e3c green darken-2"});
                history.push('/');
            }
        }).catch(err=>console.log(err));
    }
    return(
        <div className = "Authcard">
        <div className="card CardMargin">
            <h2>Like-IT</h2>
            <input 
            type="text"
            placeholder = "email"
            value = {email}
            onChange = {e =>{setEmail(e.target.value)}}
            />
            <input 
            type="password"
            placeholder = "password"
            value = {password}
            onChange ={e=>{setPassword(e.target.value)}}
            />
            <button className="waves-effect waves-light btn button"
            onClick = {()=>fetchData()}>
                SignIn
                </button>
            <h5>Don't have an account?<span style={{fontSize:15}}><Link to="/SignUp"> click here</Link></span></h5>
      </div>
      </div>
    );
}

export default SignIn;