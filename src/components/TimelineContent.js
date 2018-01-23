import React, { Component } from 'react';
import { Button, Collapse, Container, Row, Col} from 'reactstrap';

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

        var content = this.props.data;
        var isClosed = this.props.collapseArray[this.props.collapseArrayKey];
        var buttonText = this.props.collapseArray[this.props.collapseArrayKey] ? {text: "see less"} : {text: "see more"};

        return(
            <div>
                <Container>
                    <Row>
                        <Col sm="11"></Col>
                        <Col sm="1">
                        <Button outline color="secondary" 
                                onClick={(e) => {this.props.onClick(this.props.collapseArrayKey, isClosed)}} 
                        >
                            {buttonText.text}
                        </Button>
                        </Col>
                    </Row>
                </Container>
                
                <Collapse isOpen={this.state.collapseArray[this.props.collapseArrayKey]}>
                    {
                        Object.keys(content).map(function (key) {
                            return <div key={key}> {content[key].title}</div>
                        })
                    } 
                </Collapse>
            </div>
        );    
    
    
    }

}

export default TimelineContent;