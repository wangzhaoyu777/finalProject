import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";

class Builder extends Component {




    render() {
        return (
            <div>
                <Link to="/head">Head</Link>
                <Link to="/menuItems">Menu List</Link>

                builder
            </div>
        );
    }
}


export default withRouter(Builder);