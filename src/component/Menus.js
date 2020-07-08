import React, {Component} from 'react';

class Menus extends Component {

    constructor(props) {
        super(props);
        this.state ={
            data:[]
        }
    }
    componentDidMount() {
        fetch("http://localhost:8080/menusItems/",{
            method:"GET",
            headers:{
                "Content-Type": "application/json"
            }
        }).then(response => response.json()).then(response =>{
            this.setState({
                data: response.result
            })
        })
    }

    render() {
        return (
            <div>
                <div className="menu_items_wrap">
                    <ul className="list-group">
                        {this.state.data.map((item, key) => {
                            return (<li className="list-group-item" key={key}>{item.name} {item.price}
                                </li>)
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Menus;