import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Head extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title:'',
            description:'',
            img_url:''
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/heads/me",{
            method:"GET",
            headers:{
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }).then(response => response.json()).then(response =>{
            this.setState({
                ...response.result
            })
        })
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    toggleEditHead = (e)=>{
        e.preventDefault();
        console.log(e);
        this.setState({readOnly: !this.state.readOnly})
    }

    handleFormSave = (e) =>{
        e.preventDefault();
        fetch("http://localhost:8080/heads/me",{
            method:"PUT",
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
            this.setState({message:"updated successfully"});
        })
    }

    render() {
        return (
            <div>
                <div className="text-left mt-3">
                    <Link to={'/builder'} className="btn btn-primary">
                        Back
                    </Link>

                </div>
                <form>
                    <div className={"form-group"}>
                        <label className="form-label ">Title</label>
                        <input type="text" name="title" disabled={this.state.readOnly} placeholder="title" defaultValue={this.state.title} className="form-control " onChange={this.handleInputChange}/>
                    </div>
                    <div className={"form-group"}>
                        <label className="form-label ">Description</label>
                        <input type="text" name="description" disabled={this.state.readOnly} placeholder="description" defaultValue={this.state.description} className="form-control " onChange={this.handleInputChange}/>
                    </div>
                    <div className={"form-group"}>
                        <label className="form-label ">ImageUrl</label>
                        <input type="text" name="img_url" disabled={this.state.readOnly} placeholder="imageUrl" defaultValue={this.state.img_url} className="form-control " onChange={this.handleInputChange}/>
                    </div>
                    {this.state.message && <div className={"alert alert-light"} role="alert">
                        {this.state.message}
                    </div>
                    }

                    {this.state.readOnly ? (<button type={"button"} className="btn btn-primary" onClick={this.toggleEditHead}>Edit</button>) :
                        (<button type={"submit"} className="btn btn-primary" onClick={this.handleFormSave}>Save</button>)}

                </form>
            </div>
        );
    }
}

export default Head;