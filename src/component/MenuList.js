import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";

class MenuList extends Component {

    constructor(props) {
        super(props);
        this.state ={
            data:[]
        }
    }

    componentDidMount() {
        this.getMenuItem();
    }

    getMenuItem(){
        fetch("http://localhost:8080/menusItems/me",{
            method:"GET",
            headers:{
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }).then(response => response.json()).then(response =>{
            this.setState({
                data: response.result
            })
        })
    }

    handleDelete = (id) =>{
        fetch((`http://localhost:8080/menusItems/me/${id}`),{
            method:"DELETE",
            headers:{
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }).then(response => response.json()).then(response =>{
            if (response.result){
                this.getMenuItem();
            }
        })
    }

    render() {
        return (
            <div>
                <div className="text-left mt-3">
                    <Link to={"/builder"} className="btn btn-primary">
                        Back
                    </Link>
                </div>
                <h1>Menu List Page</h1>
                <Link to={"/menuItems/add"}>Add </Link>

                <div className="menu_items_wrap">
                    <ul className="list-group">
                        {this.state.data.map((item, key) => {
                           return (<li className="list-group-item" key={key}>{item.name} {item.price}
                               <button type="button" className="btn btn-warning" onClick={
                                   (e)=> {
                                       e.preventDefault();
                                       this.props.history.push(`/menuItems/${item.id}/update`)
                                   }
                                   }>Edit</button>
                               <button type="button" className="btn btn-danger" onClick={
                                   (e)=> {
                                       e.preventDefault();
                                       this.handleDelete(item.id);
                                   }
                               }>Delete</button></li>)
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}
export default withRouter(MenuList);
