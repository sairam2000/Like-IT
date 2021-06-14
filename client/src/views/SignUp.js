import {React, useState} from 'react';
import{Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';

const SignUp = ()=>{
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const history = useHistory();
    const fetchData = ()=>{
        if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
            M.toast({html: "Invalid Email", classes:" #b71c1c red darken-4"})
        }
        else{
        fetch('/signup',
        {
            method:"post",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }
        ).then(res=>res.json()).then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:"#b71c1c red darken-4"});
            }
            else{
                M.toast({html: data.msg, classes:" #388e3c green darken-2"});
                history.push('/SignIn');
            }
        }).catch(err=>console.log(err))}
    }
    return(
        <div className = "Authcard">
        <div className="card CardMargin">
            <h2>Like-IT</h2>
            <input 
            type="text"
            placeholder = "username"
            value={name}
            onChange = {(e)=>{setName(e.target.value)}}
            />
            <input 
            type="text"
            placeholder = "email"
            value={email}
            onChange = {(e)=>{setEmail(e.target.value)}}
            />
            <input 
            type="text"
            placeholder = "password"
            value = {password}
            onChange ={(e)=>{setPassword(e.target.value)}}
            />
            <button className="waves-effect waves-light btn button"
            onClick={()=>{fetchData()}}>
                SignUp
                </button>
            <h5>Already have an account?<span style={{fontSize:15}}><Link to="/SignIn"> click here</Link></span></h5>
      </div>
      </div>
    );
}

export default SignUp;