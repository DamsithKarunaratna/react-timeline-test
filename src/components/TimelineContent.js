import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';
import { Button, Stack } from '@shopify/polaris';
import { isObject } from 'util';

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
        if(this.height > 105){
            this.setState({isCollsapsible:true});
        }  
        console.log(this.height);
    }

    render() {

        var stageData = this.props.data;
        var isClosed = this.props.collapseArray[this.props.collapseArrayKey];
        // var buttonText = this.props.collapseArray[this.props.collapseArrayKey] ? {text: "see less \u25B2"} : {text: "see more \u25BC"};
        var buttonText = this.props.collapseArray[this.props.collapseArrayKey] ? {text: "see less   "} : {text: "see more..."};
        var divStyle = this.state.isCollsapsible ? (!this.state.collapseArray[this.props.collapseArrayKey] ? {overflow:"hidden", height:105, transition: 'all 0.7s ease-in-out'} : {overflow:"hidden", height:this.height, transition: 'all 0.7s ease-in-out'}) : {} ;
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
                        
                        let subGroup = stageData[key];

                        if(subGroup.hasOwnProperty("value")){
                            // subgroups which have the value field set won't have grouping
                            // In the subgroups with grouping the groups will be stored as objects  
                            return <div key={key}> <span style={{fontWeight:'bold', fontSize: 14}}> {subGroup.title} :</span> {subGroup.value}</div>
                        } else {

                            return(
                                <div key={key}>
                                    <span style={{fontWeight:'bold', fontSize: 14, color:'green'}}>
                                            {stageData[key].title} :
                                    </span>
                                    {
                                        Object.keys(subGroup).map((innerKey)=>{
                                
                                            if(isObject(subGroup[innerKey])){
                                                return(
                                                    <div key={innerKey}><span style={{fontWeight: 'bold'}}>&nbsp;&nbsp;&nbsp;{subGroup[innerKey].title}</span> : <span>{subGroup[innerKey].value}</span></div>
                                                )
                                            }
                                            return null;
                                            
                                        })
                                    }
                                    
                                </div>       
                            );
                           
                        }
                        
                    })
                } 
                </div>
                
                <div style={{background:"white", opacity:"0.5", paddingLeft:"60", paddingRight:0}}>
          
                    <div style={{ }}>
                    {buttonCode}
                    </div>
         
                </div>
                   
            </div>
        );    
    
    
    }

}

export default TimelineContent;