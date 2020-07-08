import React, {Component} from 'react';

import LandingMenu from "./LandingMenu";
import LandingHead from "./LandingHead";
import "./landing.css"

class Landing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            loading: true
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/landing/me", {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token"),
            }
        }).then(response => response.json()).then(response => {
            this.setState({
                ...response.result,
                loading: false
            })
        })
    }

    render() {
        return (
            <div>
                {this.state.loading ? <p>loading</p> :
                    (
                        <div>
                            <LandingHead {...this.state}/>
                            <LandingMenu {...this.state}/>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Landing;