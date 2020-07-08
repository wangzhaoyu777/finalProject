import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
} from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import Profile from "./component/Profile";
import Header from "./component/Header";
import Builder from "./component/Builder";
import Head from "./component/Head";
import MenuList from "./component/MenuList";
import MenuItemUpdate from "./component/MenuItemUpdate";
import MenusItemAdd from "./component/MenusItemAdd";
import Template from "./component/Template";
import Home from "./component/Home";
import Menus from "./component/Menus";
import Landing from "./component/Landing";
import PublicLanding from "./component/PublicLanding";

class App extends Component {


    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path="/" exact>
                            <Header/>
                            <Home/>
                        </Route>
                        <Route path="/landing" exact>
                            <Header/>
                            <Landing/>
                        </Route>
                        <Route path="/menus" exact>
                            <Header/>
                            <Menus/>
                        </Route>
                        <Route path="/login" exact>
                            <Header/>
                            <Login/>
                        </Route>
                        <Route path="/register">
                            <Header/>
                            <Register/>
                        </Route>
                        <Route path="/profile">
                            <Header/>
                            <Profile/>
                        </Route>
                        <Route path="/builder">
                            <Template>
                                <Builder/>
                            </Template>
                        </Route>
                        <Route path="/head">
                            <main role="main" className={"flex-shrink-0"}>
                                <div className={"align-items-center"}>
                                    <div className="container-fluid text-center">
                                        <Header/>
                                        <Head/>
                                    </div>
                                </div>
                            </main>
                        </Route>
                        <Route path="/menuItems" exact>
                            <main role="main" className={"flex-shrink-0"}>
                                <div className={"align-items-center"}>
                                    <div className="container-fluid text-center">
                                        <Header/>
                                        <MenuList/>
                                    </div>
                                </div>
                            </main>
                        </Route>
                        <Route path="/menuItems/add">
                            <main role="main" className={"flex-shrink-0"}>
                                <div className={"align-items-center"}>
                                    <div className="container-fluid text-center">
                                        <Header/>
                                        <MenusItemAdd/>
                                    </div>
                                </div>
                            </main>
                        </Route>
                        <Route path="/menuItems/:id/update">
                            <main role="main" className={"flex-shrink-0"}>
                                <div className={"align-items-center"}>
                                    <div className="container-fluid text-center">
                                        <Header/>
                                        <MenuItemUpdate/>
                                    </div>
                                </div>
                            </main>
                        </Route>
                        <Route path="/:username" exact>
                            <Header/>
                            <PublicLanding/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;