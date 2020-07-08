import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

class MenuItemUpdate extends Component {

    menusItemId;

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            description: '',
            img_url: '',
            message: '',
            categories: ['Breakfast','Lunch',' Dinner'],
            category:'Breakfast'
        }
        let {params} = this.props.match;
        this.menusItemId = params.id;

    }

    componentDidMount() {
        fetch((`http://localhost:8080/menusItems/me/${this.menusItemId}`), {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }).then(response => response.json()).then(response => {
            this.setState({
                ...response.result
            })
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        fetch((`http://localhost:8080/menusItems/me/${this.menusItemId}`), {
            method: "PUT",
            body: JSON.stringify(this.state),
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }).then(response => response.json()).then(response => {
            if (response.result) {
                this.setState({message: "Item Updated Successfully"});

                this.props.history.push('/menuItems');

            }
        });
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <div className={"form-group"}>
                        <label className="form-label ">Name</label>
                        <input type="text" name="name" placeholder="name" value={this.state.name}
                               className="form-control " onChange={this.handleInputChange}/>
                    </div>

                    <div className={"form-group"}>
                        <label className="form-label ">Price</label>
                        <input type="number" name="price" placeholder="price" value={this.state.price}
                               className="form-control " onChange={this.handleInputChange}/>
                    </div>

                    <div className={"form-group"}>
                        <label className="form-label ">Category</label>
                        <select name="category" value={this.state.category}
                                className="form-control " onChange={this.handleInputChange}>
                            {
                                this.state.categories.map((item,key)=>{
                                    return(
                                        <option key={key}>{item}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className={"form-group"}>
                        <label className="form-label ">Description</label>
                        <input type="text" name="description" placeholder="description" value={this.state.description}
                               className="form-control " onChange={this.handleInputChange}/>
                    </div>
                    <div className={"form-group"}>
                        <label className="form-label ">ImageUrl</label>
                        <input type="text" name="img_url" placeholder="imageUrl" value={this.state.img_url}
                               className="form-control " onChange={this.handleInputChange}/>
                    </div>
                    {this.state.message && <div className={"alert alert-light"} role="alert">
                        {this.state.message}
                    </div>
                    }
                    <button type={"submit"} className="btn btn-primary">Save</button>
                </form>
            </div>
        );
    }
}

export default withRouter(MenuItemUpdate);
