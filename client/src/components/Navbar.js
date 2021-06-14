import React,{useContext} from 'react';
import { Link ,useHistory} from 'react-router-dom';
import '../App.css'
import {Usercontest} from '../App'





const Navbar = ()=>{
  const {state,dispatch} = useContext(Usercontest);
  const history = useHistory()
  const RendorList =()=>{
    
      if(state){
        return [<li><Link to="/Profile">Profile</Link></li>,
        <li><Link to="/CreatePost">CreatePost</Link></li>,
        <button className=" btn button #b71c1c red darken-4"
        onClick = {()=>{
          localStorage.clear()
          dispatch({type:'CLEAR'})
          history.push('/SignIn')
        }}>
            SignOut
            </button>]
      }
      else{
        return [<li><Link to="/SignIn">SignIn</Link></li>,
        <li><Link to="/SignUp">SignUp</Link></li>]
      }
    }
    return(
      
        <nav>
    <div className="nav-wrapper white">
      <Link to={state?"/":"SignIn"} className="brand-logo left ">Instagram</Link>
      {/* <a href="#" data-target="mobile-demo"  className="sidenav-trigger"><i  className="material-icons">menu</i></a> */}
      <ul id="nav-mobile" className="right">
        {RendorList()}
      </ul>
    </div>
  </nav>
    );   
}

export default Navbar;
