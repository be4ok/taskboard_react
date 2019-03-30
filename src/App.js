import React, {Component} from 'react';
import './App.css';
import './static/css/form.css';
import './static/css/project-board.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import NavBar from "./components/layout/NavBar";
import TaskBoard from "./components/projectTask/TaskBoard";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import ProjectBoard from "./components/projectBoard/ProjectBoard";
import Login from "./components/userManagment/Login";
import Register from "./components/userManagment/Register";
import Landing from "./components/layout/Landing";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import {SET_CURRENT_USER} from "./actions/types";
import {logout} from "./actions/securityActions";
import SecuredRoute from "./securityUtils/secureRoute";
import Activation from "./components/userManagment/Activation";
import Profile from "./components/userManagment/Profile";

let jwtToken;

if (localStorage.taskBoardJwt) {
    jwtToken = localStorage.taskBoardJwt;
}

if (sessionStorage.taskBoardJwt) {
    jwtToken = sessionStorage.taskBoardJwt;
}

if (jwtToken) {
    setJWTToken(jwtToken);
    const decoded = jwt_decode(jwtToken);
    store.dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
    });

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logout());
        window.location.href = "/login"
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <NavBar/>

                        {/*Private routes*/}
                        <Switch>
                            <SecuredRoute exact path="/board" component={ProjectBoard}/>
                            <SecuredRoute exact path="/board/:id/taskboard" component={TaskBoard}/>
                            <SecuredRoute exact path="/profile/:username" component={Profile}/>
                            {/*Private routes*/}

                            {/*Public routes*/}
                            <Route exact path="/" component={Landing}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/activation/:activationCode" component={Activation}/>
                            {/*Public routes*/}
                        </Switch>


                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
