import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Route,Switch,useHistory} from 'react-router-dom'; 
import Home from './views/Home';
import React,{createContext,useEffect,useReducer,useContext} from 'react';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Profile from './views/Profile';
import CreatePost from './views/CreatePost'
import UserDetails from './views/UserDetails'
import {reducer,initialstate} from './reducers/userReducer'

export const Usercontest = createContext()


const Routing=()=>{
   const history = useHistory();
    const {dispatch} = useContext(Usercontest);
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      dispatch({type:"USER",payload:user});
    }
    else{
      history.push('/SignIn')
    }
  },[dispatch,history]);
  return(
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path='/SignIn'>
        <SignIn/>
      </Route>
      <Route path='/SignUp'>
        <SignUp/>
      </Route>
      <Route exact path='/Profile'>
        <Profile/>
      </Route>
      <Route path='/Profile/:userid'>
        <UserDetails/>
      </Route>
      <Route path='/CreatePost'>
        <CreatePost/>
      </Route>
    </Switch>);
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialstate)
  return (
    <Usercontest.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Navbar/> 
      <Routing/>
    </BrowserRouter>
    </Usercontest.Provider>
   
  );
}

export default App;
