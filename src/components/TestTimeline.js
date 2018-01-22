import {Timeline, TimelineEvent} from 'react-event-timeline'
import React, { Component } from 'react';
import * as axios from 'axios';
import { Page } from '@shopify/polaris';
import TimelineContent from './TimelineContent';

class NewTimeline extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            array: [],
            timeline: "",
            istimelineLoading: true,
        };
    }


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
            url: 'https://tracified-mock-api.herokuapp.com/Traceability_data/otp/customer-app', headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
        })
            .then(response => {
                let timeline = response.data[2];
                let itms = response.data[2].items;

                let arr = [];

                itms.map((e,i) => {
                    arr.push(false);
                    return true;
                });

                this.setState({
                    timeline: timeline,
                    istimelineLoading: false,
                    array: arr
                });
            });

    }

    render(){

        if (this.state.istimelineLoading) {
            return <h2>Loading...</h2>;
        }
        else{
            
            return(
                <div style={{backgroundColor: '#f4f6f8'}}>
                    <Page title="Trace Back Timeline" separator>    
                        <Timeline>
                        {this.state.timeline.items.map((stage, index) => {

                            let titleText = (index+1)+". "+stage.title;
                            let descriptionText = stage.description;

                            var ico = (<svg height="20" width="20" >
                                            <image width="20" height="20" xlinkHref={stage.icon}  />    
                                        </svg>);

                            var stageData = stage.data;

                            return(
                                <TimelineEvent
                                    key={index}
                                    title={titleText}
                                    titleStyle={{fontSize:17}}
                                    subtitle={descriptionText}
                                    subtitleStyle={{fontSize:15}}
                                    icon={ico}
                                    iconColor="#6fba1c"
                                    contentStyle={{fontSize:13}}
                                >
<<<<<<< HEAD
                                    
                                    <TimelineContent 
                                        collapseArray={this.state.array} 
                                        collapseArrayKey={index} 
                                        data={stageData} 
                                        onClick={this.handleClick}
                                    />
=======
                                    {

                                        Object.keys(stage.data).map(function (key) {
                                            return <div key={key}> {stage.data[key].title}</div>;
                                        })
>>>>>>> f87e2a2b86b5ebc7e2412124c3d1b3e49a0f86b6

                                </TimelineEvent>                                    
                            );

                        })}
                        </Timeline>
                    </Page>
                </div>
            );    

        }

    }
    
}

export default NewTimeline;
