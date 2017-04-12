import React, {Component} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as testAreaActionCreators from '../actions/testArea';

class Home extends Component {

    constructor(props, context) {
        super(props, context);

        console.log(this.props);

        this.state = {
            
        };

        this.clickTestArea = this.clickTestArea.bind(this);
    }
    
    clickTestArea() {
        this.props.testAreaActions.addTest("TEST AREA TEXT");
    }

    render () {
        return (
            <div className="page-home">
                <h4>Home!</h4>
                <button onClick={this.clickTestArea}>
                    TEST
                </button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        testAreaActions: bindActionCreators(testAreaActionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);