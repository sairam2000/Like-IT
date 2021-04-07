import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Route} from 'react-router-dom'; 
import Home from './views/Home';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Profile from './views/Profile';
import CreatePost from './views/CreatePost'

function App() {
  return (
    <BrowserRouter>
      <Navbar/> 
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path='/SignIn'>
        <SignIn/>
      </Route>
      <Route path='/SignUp'>
        <SignUp/>
      </Route>
      <Route path='/Profile'>
        <Profile/>
      </Route>
      <Route path='/CreatePost'>
        <CreatePost/>
      </Route>
    </BrowserRouter>
   
  );
}

export default App;
