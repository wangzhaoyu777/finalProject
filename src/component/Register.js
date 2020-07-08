import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

const isEmptyObject = (obj) =>{
    return Object.entries(obj).length ===0;
}
class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message:'',
            confirmedPassword:''
        }
    }

    componentDidMount() {}

    handleFormSubmit = (event) =>{
        event.preventDefault();
        let errors = this.validate();
        if(isEmptyObject(errors)){
            fetch("http://localhost:8080/users/register", {
                method: "POST",
                body: JSON.stringify(this.state),
                headers:{
                    "Content-Type": "application/json"
                }
            }).then(response => response.json()).then(response => {
                console.log(response.message);
                if(response.result == null){
                    this.setState({
                        message: response.message,
                    })
                }else {
                    this.props.history.push('/login')
                }
            });
        } else {
            this.setState({errors: errors})
        }
    }

    validate = () => {
        let errors = {};
        if(!this.state.username){
            errors.username = "field username required";
        }

        if(!this.state.password){
            errors.password = "field password required";
        }
        if (this.state.password != this.state.confirmedPassword){
            errors.confirmedPassword = "provide a same password";
        }
        return errors;
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
        let {error} = this.state;

        return (
            <div className="container">
                <h1 className={"mt-3"}>
                    Register
                </h1>
                <div className="d-flex justify-content-center">
                    <form onSubmit={this.handleFormSubmit}>

                        {this.state.message && <div className="p-3 mb-2 bg-danger text-white" >{this.state.message}</div>}

                        <div className={"form-group"}>
                            <label className="form-label ">Username</label>
                            <input type="text" name="username" placeholder="username" className="form-control " onInput={this.handleInputChange}/>
                        </div>

                        <div className={"form-group"}>
                            <label className="form-label">Password</label>
                            <input type="password" name="password" placeholder="password" className="form-control" onInput={this.handleInputChange}/>
                            <div className="invalid-feedback">
                                Please provide a valid state.
                            </div>
                        </div>
                        <div className={"form-group"}>
                            <label className="form-label">Confirmed Password</label>
                            <input type="password" name="confirmedPassword" placeholder="password" className="form-control" onInput={this.handleInputChange}/>
                            <div className="invalid-feedback">
                                Please provide a same state.
                            </div>
                        </div>
                        <div className={"form-group"}>
                            <label className="form-label">First Name</label>
                            <input type="text" name="firstName" className="form-control" onInput={this.handleInputChange}/>
                        </div>

                        <div className={"form-group"}>
                            <label className="form-label">Last Name</label>
                            <input type="text" name="lastName" className="form-control" onInput={this.handleInputChange}/>
                        </div>

                        <div className={"form-group"}>
                            <label className="form-label">Phone Number</label>
                            <input type="number" name="phone" className="form-control" onInput={this.handleInputChange}/>
                        </div>

                        <div className={"form-group"}>
                            <label className="form-label">Address</label>
                            <input type="text" name="address" className="form-control" onInput={this.handleInputChange}/>
                        </div>

                        <button type={"submit"} className="btn btn-primary">Done</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default withRouter(Register);
