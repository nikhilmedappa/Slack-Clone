//module imports
import React from 'react';
import { connect } from "react-redux"
import io from "socket.io-client";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

//styling
import './App.css';

//component imports
import WelcomePage from './components/WelcomePage/index'
import Home from './components/Home'
import SignupPage from './components/SignupPage';
import SigninPage from './components/SigninPage';
import Chatroom from './components/ChatRoom'


function App(props){
  
  const isLoggedin = props.isLoggedin;

  const [socket, setSocket] = React.useState(null);

  const setupSocket = () => {
    const token = localStorage.getItem("CC_Token");
    if (token && !socket) {
      const newSocket = io("http://localhost:8000", {
        query: {
          token: localStorage.getItem("CC_Token"),
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        //makeToast("error", "Socket Disconnected!");
      });
      
      newSocket.on("connect", () => {
        //makeToast("success", "Socket Connected!");
      });

      setSocket(newSocket);
    }
  };

  React.useEffect(() => {
    setupSocket();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="App">
        <BrowserRouter>
          <Route exact path="/" component={WelcomePage} />
          <Route exact path="/signin" render={props => {
            if(!isLoggedin){
              return <SigninPage setupSocket={setupSocket}/>
            } else {
              return <Redirect to="/home/:user" />
            }
          }} />
          <Route exact path="/home/:user" render={props => {
            if(isLoggedin){
              return <Home {...props} socket={socket} />
            } else {
              return <Redirect to="/signin" />
            }
          }} />
          <Route exact path="/register" component={SignupPage}/>
          <Route
          path="/chatroom/:id"
          render={() => <Chatroom socket={socket} />}
          exact
        />
        </BrowserRouter>
    </div>
  );
}


const mapStateToProps = state => {
  
  return {
    isLoggedin: state.user.isLoggedin,
    email: state.user.email
  }
}

export default connect(mapStateToProps)(App);


