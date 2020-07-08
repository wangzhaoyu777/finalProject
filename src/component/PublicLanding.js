import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import LandingHead from "./LandingHead";
import "./landing.css"


class PublicLanding extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categoryList: ['Breakfast', 'Lunch', ' Dinner'],
            menusItems: [],
            activeTabIndex: 0,
            loading: true
        }
    }

    componentDidMount() {

        console.log(this.state);

        fetch(`http://localhost:8080/landing/${this.props.match.params.username}`, {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }).then(response => response.json()).then(response => {
            let categoryList = response.result.menusItems.map((item, key) => {
                return item.category;
            })
            this.setState({
                loading: false,
                ...response.result,
                categoryList
            })
        })
    }

    handleTabChange = (key) => {
        this.setState(
            {activeTabIndex: key}
        )
    }

    render() {
        console.log(this.props.match);

        if (this.state.loading) {
            return null;
        }
        return (
            <div>
                <div className={'head'} style={{backgroundImage: `url(${this.state.head.img_url})`}}>
                    <div className="inner_wrap">
                        <h4 className={'head_title'}>{this.state.head.title}</h4>
                        <p className="head_desc">{this.state.head.description}</p>
                    </div>
                </div>

                <section id="menu" className="spacer-double-lg">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col">
                                <div className="mb-5 pb-5 text-center">
                                    <span className="label-title mb-3">Our Menu</span>
                                    <h1 className="h2 font-alt">Foxeresto Menu</h1>
                                    <p className="w-md-40 mb-0 mx-auto lead">The time has come to bring those ideas and
                                        plans to life. This is where we really begin to visualize.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col d-flex justify-content-center">
                                <ul className=" mb-5 pb-5 nav nav-menu-tabs" role="tablist">
                                    {this.state.categoryList.map((item, key) => {
                                        return (
                                            <li key={key}>
                                                <a onClick={(e) => {
                                                    e.preventDefault();
                                                    this.handleTabChange(key);
                                                }} className=" font-weight-700 letter-spacing-medium"
                                                   data-toggle="tab" href="#tab-one" role="tab" aria-controls="tab-one"
                                                   aria-selected="true">{item}
                                                </a>
                                            </li>)
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row justify-content-around align-items-center">
                            <div className="col-md-8 col-lg-7 ">
                                <div className="tab-content">
                                    {this.state.categoryList.map((item, key) => {
                                        let className = "tab-pane fade";
                                        if (key === this.state.activeTabIndex) {
                                            className += " active show"
                                        }
                                        //className="tab-pane fade active show"
                                        return (<div className={className} id="tab-one" role="tabpanel" key={key}>
                                            {this.state.menusItems && this.state.menusItems.map((menuItem, key2) => {
                                                console.log(menuItem.category, item);
                                                if (menuItem.category == item) {
                                                    return (<div className="media align-items-center mb-4 " key={key2}>
                                                        <img className="avatar-sm rounded-circle mr-3"
                                                             src="assets/img/menu/breakfest/1.jpg" alt=""/>
                                                        <div className="media-body position-relative">
                                                            <h6 className="mb-0 position-relative  z-index-2 font-size-15"><span
                                                                className="bg-white">{menuItem.name}  </span></h6>
                                                            <span className="dots-price"></span>
                                                            <span
                                                                className="menu-price mb-0 h6">${menuItem.price}</span>
                                                            <p className="mb-0 font-size-14">{menuItem.description}</p>
                                                        </div>
                                                    </div>)
                                                }
                                            })}
                                        </div>)
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}


export default withRouter(PublicLanding);

