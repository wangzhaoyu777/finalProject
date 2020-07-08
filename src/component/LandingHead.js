import React, {Component} from 'react';

class LandingHead extends Component {
    render() {
        let {head} = this.props;
        return (
            <div>

                <div className={'head'} style={{backgroundImage:`url(${head.img_url})`}}>
                    <div className="inner_wrap">
                        <h4 className={'head_title'}>{head.title}</h4>
                        <p className="head_desc">{head.description}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingHead;