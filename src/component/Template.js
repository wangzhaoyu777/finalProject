import React, {Component} from 'react';
import Head from "./Head";
import Header from "./Header";
import Builder from "./Builder";

class Template extends Component {


    render() {
        return (
            <main role="main" className={"flex-shrink-0"}>
                <div className={"align-items-center"}>
                    <div className="container-fluid text-center">
                        <Header/>
                        {this.props.children}

                    </div>
                </div>
            </main>
        );
    }
}

export default Template;