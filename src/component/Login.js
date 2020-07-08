import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

const isEmptyObject = (obj) =>{
    return Object.entries(obj).length ===0;
}
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {}

    handleFormSubmit = (event) =>{
        event.preventDefault();

        let errors = this.validate();

        if(isEmptyObject(errors)){
            fetch("http://localhost:8080/users/login", {
                method: "POST",
                body: JSON.stringify(this.state),
                headers:{
                    "Content-Type": "application/json",
                }
            }).then(response => response.json()).then(response => {
                //save token
                console.log(response.message)
                if (response.result) {
                    localStorage.setItem("token", response.result)
                    this.setState({
                        message: response.message,

                    })
                    setTimeout(() => {
                        this.props.history.push('/landing');
                    },2000)
                } else {
                    this.setState({
                        message: response.message,
                    })
                }
            });
        } else {
            alert(errors.core);
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    validate = () => {
        let errors = {};
        if(!this.state.username){
            errors.core = "field username required";
        }

        if(!this.state.password){
            errors.core = "field password required";
        }
        return errors;
    }

    render() {
        return (
            <div className="container">
                <h1 className={"mt-3"}>
                    Login
                </h1>
                <div className="d-flex justify-content-center">
                    <form onSubmit={this.handleFormSubmit}>
                        <div className={"form-group"}>
                            <label className="form-label">Username</label>
                            <input type="username" name="username" placeholder="username" value={this.state.username} className="form-control" onInput={this.handleInputChange}/>
                        </div>

                        <div className={"form-group"}>
                            <label className="form-label">Password</label>
                            <input type="password" name="password" placeholder="password" value={this.state.password} className="form-control" onInput={this.handleInputChange}/>
                        </div>
                        {this.state.message && <div className="text-danger">{this.state.message}</div>}

                        <button type={"submit"} className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);