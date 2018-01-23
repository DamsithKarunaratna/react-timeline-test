import {Timeline, TimelineEvent} from 'react-event-timeline'
import React, { Component } from 'react';
import * as axios from 'axios';
import {
    TextStyle,
    Card,
    Page,
    Heading
} from '@shopify/polaris';

class NewTimeline extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timeline: "",
            istimelineLoading: true
        };
    }

    componentDidMount() {
        axios({
            method: 'get',
            //https://tracified-mock-api.herokuapp.com/Traceability_data/otp/customer-app
            url: 'http://www.mocky.io/v2/5a66f8be2d0000ae07beccf3', headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
        })
            .then(response => {
                let timeline = response.data[2];
                this.setState({
                    timeline: timeline,
                    istimelineLoading: false
                });
            });

    }

    render(){

        let timelineTopStyle = {
            backgroundColor: 'rgba(0,0,0,0.8)', 
            height: 130, 
            width: 300,
            marginLeft: 10,
            padding: 10
        };

        if (this.state.istimelineLoading) {
            return <h2>Loading...</h2>;
        }
        else{
            
            return(
                
                <div style={{backgroundColor: '#f4f6f8', paddingTop: 10}}> 
                    <div style={timelineTopStyle}>
                        <h1 style={{color: 'white', textAlign: 'center'}}>
                            <span style={{color: 'white'}}>
                            Traci
                            </span>
                            <span style={{color: 'green'}}>
                            fied
                            </span> 
                        </h1>
                        <p style={{color: 'white', fontSize: 12, textAlign: 'center', marginBottom: 3}}>Order ID: 1000</p>
                        <p style={{color: 'white', fontSize: 12, textAlign: 'center', marginBottom: 3}}>Ordered by: Jhon Doe</p>
                        <p style={{color: 'white', fontSize: 12, textAlign: 'center', marginBottom: 3}}>Ordered On: 18-01-2018</p>
                    
                    </div>
                    <div style={{paddingLeft: 30}}>
                        <Timeline>
                        {this.state.timeline.items.map((stage, index) => {

                            let titleText = (index+1)+". "+stage.title;
                            let descriptionText = stage.description;

                            var ico = (<svg height="50" width="35" >
                                            <image width="32" height="50" xlinkHref={stage.icon}  />    
                                        </svg>);
                                        

                            return(
                                <TimelineEvent
                                    key={index}
                                    title={titleText}
                                    titleStyle={{fontSize:15, fontWeight: "bold"}}
                                    subtitle={descriptionText}
                                    subtitleStyle={{fontSize:15}}
                                    icon={ico}
                                    contentStyle={{fontSize:13}}
                                    bubbleStyle={{border: "none"}}
                                >
                                    {

                                        Object.keys(stage.data).map(function (key) {
                                            return <div key={key}> {stage.data[key].title}</div>;
                                        })

                                    }
                                </TimelineEvent>                                    
                            );

                        })}
                        </Timeline>
                    </div>     
                </div>
            );    

        }

    }
    
}

export default NewTimeline;
