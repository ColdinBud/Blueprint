import React, {Component} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Draggable, { DraggableCore } from 'react-draggable';

import * as testAreaActionCreators from '../actions/testArea';

class Home extends Component {

    constructor(props, context) {
        super(props, context);

        console.log(this.props);

        this.state = {
            pieces: [],
            deltaPosition: {
                x: 0,
                y: 0
            }
        };

        this.clickTestArea = this.clickTestArea.bind(this);
    }
    
    clickTestArea() {
        this.props.testAreaActions.addTest("TEST AREA TEXT");
    }

    addPiece() {
        
        console.log("ADDDDDD");
        let tempPieces = this.state.pieces;

        let piece = {id: "circle", xAxis: 0, yAxis: 0};
        tempPieces.push(piece);

        this.setState({pieces: tempPieces});


    }

    render () {

        const { deltaPosition } = this.state;

        let pieces = [];
        if(this.state.pieces.length > 0) {
            this.state.pieces.map((e, ind) => {
                if(e.id == "circle") {
                    pieces.push(
                        <Draggable bounds="parent" key={"circle" + ind}>
                            <div className="circlePiece" key={"circle" + ind} style={{position: 'absolute', top:'0px', left:'0px'}} />
                        </Draggable>
                    );
                } 
            });
        }

        return (
            <div className="page-home">
                <h4>Home!</h4>
                <button onClick={this.clickTestArea}>
                    TEST
                </button>

                <button onClick={this.addPiece.bind(this)} >
                    Add
                </button>

                <div className="base" id="base">
                    
                    {pieces}

                    <Draggable bounds="parent" grid={[1,1]}>
                        <div className="box" id="rec1" style={{position: 'absolute', top:'50px', left: '50px'}}>
                            x: {deltaPosition.x.toFixed(0)},
                            y: {deltaPosition.y.toFixed(0)}
                        </div>
                    </Draggable>

                </div>

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