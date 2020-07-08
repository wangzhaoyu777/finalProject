import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";

class Header extends Component {


    logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        this.props.history.push("/");
    }

    render() {

        if (!localStorage.getItem("token")) {
            return (
                <header className="header default switched-header" id="landing_header">
                    <div className="header-section">
                        <div className="container-fluid ">
                            <nav className="navbar navbar-expand-lg header-navbar ">
                                <a className=" navbar-brand navbar-logo scroll" href="#wrapper">
                                    <img className="mb-0 logo-light" src="assets/svg/logo-light.svg" alt=""/>
                                    <img className="mb-0 logo-dark" src="assets/svg/logo-dark.svg" alt=""/>
                                </a>
                                <button className="navbar-toggler btn-navbar-toggler" type="button"
                                        data-toggle="collapse" data-target=".nav-menu" aria-expanded="true"
                                        aria-label="Toggle navigation">
                                    <span className="fa fa-bars"></span>
                                </button>
                                <div
                                    className="nav-menu collapse navbar-collapse navbar-collapse justify-content-end py-0 ">
                                    <ul className=" navbar-nav  header-navbar-nav">
                                        <li className="nav-item active">
                                            <Link className="nav-link" to="/">Home <span
                                                className="sr-only">(current)</span></Link>
                                        </li>
                                        <li className="ml-lg-auto"><a className=" nav-link nav-divider scroll"
                                                                      href="#reservation">
                                            <img src="assets/svg/ring-bell-dark.svg" alt=""
                                                 className="max-width-xsm bell-dark"/></a>
                                        </li>
                                        <span className="navbar-text">
                                          <ul className="navbar-nav mr-auto">
                                              <li className="nav-item active">
                                                  <Link className="nav-link" to="/login">Login</Link>
                                              </li>
                                              <li className="nav-item active">
                                                <Link className="nav-link " to="/register">Register</Link>
                                              </li>
                                          </ul>
                                        </span>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </header>
            )

        } else {
            return (
                <header className="header switched-header" id="landing_header">
                    <div className="header-section">
                        <div className="container-fluid ">
                            <nav className="navbar navbar-expand-lg header-navbar ">
                                <a className=" navbar-brand navbar-logo scroll" href="#wrapper">
                                    <img className="mb-0 logo-light" src="assets/svg/logo-light.svg" alt=""/>
                                    <img className="mb-0 logo-dark" src="assets/svg/logo-dark.svg" alt=""/>
                                </a>
                                <button className="navbar-toggler btn-navbar-toggler" type="button"
                                        data-toggle="collapse" data-target=".nav-menu" aria-expanded="true"
                                        aria-label="Toggle navigation">
                                    <span className="fa fa-bars"></span>
                                </button>
                                <div
                                    className="nav-menu collapse navbar-collapse navbar-collapse justify-content-end py-0 ">
                                    <ul className=" navbar-nav  header-navbar-nav">
                                        <li className="nav-item active">
                                            <Link className="nav-link" to="/">Home <span
                                                className="sr-only">(current)</span></Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link className="nav-link " to="/builder">Build</Link>
                                        </li>

                                        <li className="ml-lg-auto"><a className=" nav-link nav-divider scroll"
                                                                      href="#reservation">
                                            <img src="assets/svg/ring-bell-dark.svg" alt=""
                                                 className="max-width-xsm bell-dark"/></a>
                                        </li>
                                        <span className="navbar-text">
                                          <ul className="navbar-nav mr-auto">
                                              <li className="nav-item active">
                                                <Link className="nav-link disabled" to="/profile">Profile</Link>
                                              </li>
                                              <li className="nav-item active">
                                                  <Link className="nav-link" to="/" onClick={this.logout}>Logout</Link>
                                              </li>
                                          </ul>
                                        </span>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </header>
            )
        }

    }
}

export default withRouter(Header);
