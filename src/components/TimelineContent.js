import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';
import { Button, Stack } from '@shopify/polaris';
import {isArray} from 'util';

class TimelineContent extends Component {

    constructor(props) {
        super(props);
        this.height = 0;
        this.onClick = this.props.onClick;
        this.state = {
            collapseArray: this.props.collapseArray,
            isCollsapsible: false
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ collapseArray: props.collapseArray });  
    }

    componentDidMount() {
        this.height = document.getElementById(this.props.componentID).clientHeight;
        if(this.height > 109){
            this.setState({isCollsapsible:true});
        }  
        console.log(this.height);
    }

    render() {

        var stageData = this.props.data;
        var isClosed = this.props.collapseArray[this.props.collapseArrayKey];
        // var buttonText = this.props.collapseArray[this.props.collapseArrayKey] ? {text: "see less \u25B2"} : {text: "see more \u25BC"};
        var buttonText = this.props.collapseArray[this.props.collapseArrayKey] ? {text: "see less   "} : {text: "see more..."};
        var divStyle = this.state.isCollsapsible ? (!this.state.collapseArray[this.props.collapseArrayKey] ? {overflow:"hidden", height:109, transition: 'all 0.7s ease-in-out'} : {overflow:"hidden", height:this.height, transition: 'all 0.7s ease-in-out'}) : {} ;
        var buttonCode = <p></p>;

        if(this.state.isCollsapsible){
            buttonCode =     <Button plain 
                                    onClick={(e) => {this.props.onClick(this.props.collapseArrayKey, isClosed)}} 
                            >
                                {buttonText.text}
                            </Button>
        }
        
        return(
            <div>
                    
                <div style={divStyle} id={this.props.componentID} >                
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
                                                <div key={key}><span style={{fontWeight: 'bold'}}>&nbsp;&nbsp;&nbsp;{vals[key].title}</span> : <span>{vals[key].value}</span></div>
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
                
                <Stack distribution="trailing">
                
                {buttonCode}
                
                </Stack>
                   
            </div>
        );    
    
    
    }

}

export default TimelineContent;