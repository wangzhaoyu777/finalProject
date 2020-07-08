import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/users/me",{
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(response =>
        response.json()).then(response => {
            console.log(response);
            this.setState({
                isLoading: false,
                ...response.result,
                readOnly: true
                })
        })
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    toggleEditProfile = (e)=>{
        e.preventDefault();
        console.log(e);
        this.setState({readOnly: !this.state.readOnly})
    }

    handleFormSave = (e) =>{
        e.preventDefault();
        //update profile
        fetch("http://localhost:8080/users/me",{
            method:"POST",
            body: JSON.stringify(this.state),
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }).then(response => response.json()).then(response => {
            this.setState({
                isLoading: false,
                ...response.result,
                readOnly: true
                });
        })
    }

    render() {
        console.log(this.state);
        if(this.state.isLoading){return null;}
        return (
            <div className="container">
                <h1 className={"mt-3"}>
                    profile
                </h1>
                <div className="d-flex justify-content-center">
                    <form>
                        <div className={"form-group"}>
                            <label className="form-label ">Username</label>
                            <input type="text" name="username" disabled={this.state.readOnly} placeholder="username" defaultValue={this.state.username} className="form-control " onChange={this.handleInputChange}/>
                        </div>

                        <div className={"form-group"}>
                            <label className="form-label">First Name</label>
                            <input type="text" name="firstName" disabled={this.state.readOnly} className="form-control" defaultValue={this.state.firstName} onChange={this.handleInputChange}/>
                        </div>

                        <div className={"form-group"}>
                            <label className="form-label">Last Name</label>
                            <input type="text" name="lastName" disabled={this.state.readOnly} className="form-control" defaultValue={this.state.lastName} onChange={this.handleInputChange}/>
                        </div>

                        <div className={"form-group"}>
                            <label className="form-label">Phone Number</label>
                            <input type="text" name="phone" className="form-control" disabled={this.state.readOnly}  defaultValue={this.state.phone} onChange={this.handleInputChange}/>
                        </div>

                        <div className={"form-group"}>
                            <label className="form-label">Address</label>
                            <input type="text" name="address" className="form-control" disabled={this.state.readOnly} defaultValue={this.state.address} onChange={this.handleInputChange}/>
                        </div>

                        {this.state.readOnly ? (<button type={"button"} className="btn btn-primary" onClick={this.toggleEditProfile}>Edit</button>) : (<button type={"submit"} className="btn btn-primary" onClick={this.handleFormSave}>Save</button>)}

                    </form>
                </div>
            </div>
        );
    }
}
export default withRouter(Profile);
