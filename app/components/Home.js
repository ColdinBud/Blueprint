import React, {Component} from 'react'
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Draggable, { DraggableCore } from 'react-draggable';
import { Field, FieldArray, reduxForm } from 'redux-form';

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

    addPiece(fields) {
        
        let tempPieces = this.state.pieces;

        let piece = {id: "circle", xAxis: 0, yAxis: 0};
        tempPieces.push(piece);

        this.setState({pieces: tempPieces});

        fields.push({ id: "circle", xAxis: 0, yAxis: 0});
    }

    onSubmitForm(formData) {
        console.log("formData", formData);
    }

    render () {

        const { deltaPosition } = this.state;
        const { handleSubmit, pristine, reset, submitting } = this.props;

        const renderField = ({ input, label,type, meta:{ touched, error } }) => (
            <div>
                <input {...input} type={type} placeholder={label} />
                { touched && error && <span>{error}</span> }
            </div>
        );

        const renderMembers = ({ fields, meta:{ touched, error } }) => (
            <ul>
                <li>
                    <button type="button" onClick={this.addPiece.bind(this, fields)}> Add Field </button>
                    { touched && error && <span>{error}</span> }
                </li>
                {
                    fields.map((member, index) =>
                        <li key={index}>
                            <button type="button" title="Remove Field" onClick={() => fields.remove(index)} />
                            <h6>#{index+1}</h6>
                            <Field name={`${member}.xAxis`} type="text" component={renderField} label="xAxis" />
                            <Field name={`${member}.yAxis`} type="text" component={renderField} label="yAxis" />
                        </li>
                    )
                }
            </ul>
        );

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

                <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
                    <Field name="clubName" type="text" component={renderField} label="Club Name" />
                    <FieldArray name="member" component={renderMembers} />
                    <div>
                        <button type="submit" disabled={ submitting }> Submit </button>
                        <button type="button" disabled={ pristine || submitting } onClick={reset}> Clear Value </button>
                    </div>
                </form>


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

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'fieldArrays'
    })
)(Home);