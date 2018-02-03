import {Timeline, TimelineEvent} from 'react-event-timeline'
import React, { Component } from 'react';
import * as axios from 'axios';
import TimelineContent from './TimelineContent';
import { isObject } from 'util';

class NewTimeline extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        // this.showMessage = this.showMessage.bind(this);
        this.state = {
            array: [],
            timeline: "",
            istimelineLoading: true,
            // isColap:true
        };
    }

    // showMessage = () => {
    //     this.setState({isColap:!this.state.isColap});
    //     console.log();
    // }

    handleClick = (index, isClosed) => {

        if(!isClosed){
        //reset all values in array to false -> (sets all cards' "isOpen" attributes to false)
        this.state.array.fill(false);

        }

        //set only this card's collapse attribute to true
        var temp = this.state.array.slice();
        temp[index] = !(temp[index]);
        // replace array with modified temp array
        this.setState({array: temp});

    }


    componentDidMount() {
        axios({
            method: 'get',
            //https://tracified-mock-api.herokuapp.com/Traceability_data/otp/customer-app
            url: 'http://www.mocky.io/v2/5a75a9b32e00004d006ab1e3', headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        })
            .then(response => {
                let timeline = response.data[0].tabs[2]

                timeline.items.map((stage, index) => {
                    let titleText = (index+1)+". "+stage.title;
                    let descriptionText = stage.description;
                    var ico = (<svg height="50" width="35" >
                                    <image width="32" height="50" xlinkHref={stage.icon}  />    
                                </svg>);

                    var stageData = stage.data;
                    console.log("stage is: "+stage.title);
                    Object.keys(stageData).map((key)=>{
                        let subGroup = stageData[key];
                        console.log("\tmain group is : "+subGroup.title);
                        if(subGroup.hasOwnProperty("value")){
                            console.log("\t\t"+subGroup.title+" has no grouping");
                        }else{
                            console.log("\t\tsubgroup is : "+ subGroup.title);
                            Object.keys(subGroup).map((innerKey)=>{
                                
                                if(isObject(subGroup[innerKey])){
                                    console.log("\t\t\tsubgroup items : "+subGroup[innerKey].title);
                                }
                                
                            });
                        }
                        
                        
                    });
                    
                });
                // let timeline = response.data[2];
                // let itms = response.data[2].items;

                // let arr = [];

                // itms.map((e,i) => {
                //     arr.push(false);
                //     return true;
                // });

                // this.setState({
                //     timeline: timeline,
                //     istimelineLoading: false,
                //     array: arr
                    
                // });
            });

    }

    render(){

        
        let timelineTopStyle = {
            backgroundColor: 'rgba(0,0,0,0.8)', 
            height: 110, 
            width: 220,
            marginLeft: 10,
            padding: 10
        };

        // if (this.state.istimelineLoading) {
        //     return <h2>Loading...</h2>;
        // }
        // else{
            
            return(
                
        //         <div style={{backgroundColor: '#f4f6f8', paddingTop: 10}}> 
                    <div style={timelineTopStyle}>
                        <h1 style={{color: 'white', textAlign: 'center'}}>
                            <span style={{color: 'white'}}>
                            Traci
                            </span>
                            <span style={{color: 'green'}}>
                            fied
                            </span> 
                        </h1>
                        <p style={{color: 'white', fontSize: 12, textAlign: 'center', marginBottom: 1}}>Item ID: 1000</p>
                        <p style={{color: 'white', fontSize: 12, textAlign: 'center', marginBottom: 1}}>Ordered by: Jhon Doe</p>
                        <p style={{color: 'white', fontSize: 12, textAlign: 'center', marginBottom: 1}}>Ordered On: 18-01-2018</p>
                    
                    </div>
            );
        //             <div style={{paddingLeft: 30}}>
        //                 <Timeline>
        //                 {this.state.timeline.items.map((stage, index) => {

        //                     let titleText = "0"+(index+1)+". "+stage.title;
        //                     let descriptionText = stage.description;

        //                     var ico = (<svg height="50" width="35" >
        //                                     <image width="32" height="50" xlinkHref={stage.icon}  />    
        //                                 </svg>);
                                        

        //                     var stageData = stage.data;

        //                     return(
        //                         <TimelineEvent
        //                             key={index}
        //                             title={titleText}
        //                             titleStyle={{fontSize:15, fontWeight: "bold"}}
        //                             subtitle={descriptionText}
        //                             subtitleStyle={{fontSize:15}}
        //                             icon={ico}
        //                             contentStyle={{fontSize:13}}
        //                             bubbleStyle={{border: "none"}}
        //                             // onClick={this.showMessage}
        //                         ><div id={index}>
                                    
        //                             <TimelineContent 
        //                                 collapseArray={this.state.array} 
        //                                 collapseArrayKey={index} 
        //                                 data={stageData}
        //                                 componentID={"component"+index} 
        //                                 onClick={this.handleClick}
        //                             />

                                    

        //                         </div>            
        //                         </TimelineEvent>                                    
        //                     );

        //                 })}
        //                 </Timeline>
        //             </div>     
        //         </div>
            // );    

        // }
    }
    
}

export default NewTimeline;
