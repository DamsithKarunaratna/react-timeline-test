import React, { Component } from 'react';
import * as axios from 'axios';
import {
    Spinner,
    DisplayText,
    TextStyle,
    Card,
    Page,
    Avatar,
    Heading
} from '@shopify/polaris';
import { Row, Col, Container } from 'reactstrap';


class TraceTimeLine extends Component {

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
            url: 'https://tracified-mock-api.herokuapp.com/Traceability_data/otp/customer-app', headers: {
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

    render() {

        var line = {
            "margin": "90% 35% 35% 35%",
            "border-size": "0.5px",
            "border-width": "thin",
            "border-style": "solid",
            "border-color": "black",
            "height": "100px",
            "width": "0%"
        }



        if (this.state.istimelineLoading) {
            return <h2>Loading...</h2>;
        }
        else {
            
            return (
                <Page title="Trace Back Timeline" >
                    <DisplayText size="small">

                        {this.state.timeline.items.map((stage, index) => {
                            return (
                                <Card key={stage.stage}
                                >
                                    <Card.Section>
                                        <Row>
                                            <Col sm='2'>
                                                <Avatar
                                                    customer
                                                    name="Farrah"
                                                    source={stage.icon}
                                                />
                                            </Col>
                                            <Col sm='10'>
                                            <TextStyle variation='strong' >
                                                {index+1}.&nbsp;{stage.title}
                                            </TextStyle>
                                            </Col>



                                        </Row>
                                        <div >
                                            <Row>
                                                <Col sm="8">
                                                    <Heading> <div > {stage.description} </div> </Heading> <br />

                                                    {

                                                        Object.keys(stage.data).map(function (key) {
                                                            return <div> {stage.data[key].title}</div>;
                                                        })

                                                    }
                                                </Col>
                                            </Row>
                                        </div>


                                    </Card.Section>
                                </Card>

                            )
                        })}

                    </DisplayText>
                </Page>

            );
        }
    }
}

export default TraceTimeLine;
