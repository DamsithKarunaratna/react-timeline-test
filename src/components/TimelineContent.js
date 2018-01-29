import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';
import { Button } from '@shopify/polaris';
import {isArray} from 'util';

class TimelineContent extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.props.onClick;
        this.state = {
            collapseArray: this.props.collapseArray,
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ collapseArray: props.collapseArray });  
      }

    render() {

        var stageData = this.props.data;
        var isClosed = this.props.collapseArray[this.props.collapseArrayKey];
        var buttonText = this.props.collapseArray[this.props.collapseArrayKey] ? {text: "see less \u25B2"} : {text: "see more \u25BC"};
        var divStyle = !this.state.collapseArray[this.props.collapseArrayKey] ? {overflow:"hidden", height:109} : {};
        
        return(
            <div>
                <Container>
                    <Row>
                        <Col sm="12">
                            <div style={divStyle}>                
                            { 
                                
                                Object.keys(stageData).map(function (key) {
                                    if(isArray(stageData[key].value)) {   
                                        var vals = stageData[key].value;

                                        return(
                                            <div key={key}>
                                                <span style={{fontWeight:'bold', fontSize: 14, color:'green'}}>
                                                        {stageData[key].title} :
                                                </span>
                                                {
                                                    Object.keys(vals).map(function (key) {
                                                        
                                                        return(
                                                            <div><span style={{fontWeight: 'bold'}}>&nbsp;&nbsp;&nbsp;{vals[key].title}</span> : <span>{vals[key].value}</span></div>
                                                        )
                                                    })
                                                }
                                                
                                            </div>       
                                        ); 
                                                    
                                    }
                                    return <div key={key}> <span style={{fontWeight:'bold', fontSize: 14, color:'green'}}> {stageData[key].title} :</span> {stageData[key].value}</div>
                                })
                            } 
                            </div>
                        </Col>
                        </Row>
                        <Row>
                        <Col sm="10">
                        </Col>    
                        <Col sm="2">
                        <Button plain 
                                onClick={(e) => {this.props.onClick(this.props.collapseArrayKey, isClosed)}} 
                        >
                            {buttonText.text}
                        </Button>
                        </Col>
                        </Row>
                    
                </Container>
            </div>
        );    
    
    
    }

}

export default TimelineContent;