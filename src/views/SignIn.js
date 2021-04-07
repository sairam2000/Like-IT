import {React} from 'react';
import { Link } from 'react-router-dom';

const SignIn = ()=>{
    return(
        <div className = "Authcard">
        <div className="card CardMargin">
            <h2>Instagram</h2>
            <input 
            type="text"
            placeholder = "email"
            />
            <input 
            type="text"
            placeholder = "password"
            />
            <button className="waves-effect waves-light btn button">SignIn</button>
            <h5>Don't have an account?<span style={{fontSize:15}}><Link to="/SignUp"> click here</Link></span></h5>
      </div>
      </div>
    );
}

export default SignIn;