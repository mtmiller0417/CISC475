import React, { Component } from 'react'
import {Line} from 'react-chartjs-2';

class Graph extends Component{
    constructor(props){
        super(props);

        this.state = ({
            graphData:{
                labels: this.props.inputArr.labels,
                datasets:[{
                    radius: 0, // Makes the dots go away
                    label: this.props.inputArr.title,
                    fill: false,
                    borderColor: ['black'],
                    data: this.props.inputArr.data,
                    backgroundColor:['rgba(255,99,132,0.6)',],
                    borderWidth: 1
                }]
            }
        })
    }

    // Might need to add UNSAFE_ to this function name
    // Call this when this component receives new props
    componentWillReceiveProps(props){
        // Calling setState causes this component to re-render with the new data its received

        console.log("Updated Graph props:")
        console.log(props);

        this.setState({
            graphData:{
                labels: props.inputArr.labels,
                datasets:[{
                    radius: 0, // Makes the dots go away
                    label: this.props.inputArr.title,
                    fill: false,
                    borderColor: ['black'],
                    data: props.inputArr.data,
                    backgroundColor:['rgba(255,99,132,0.6)',],
                    borderWidth: 1
                }]
            },
            max: props.inputArr.max,
            min: props.inputArr.min
        });
    }

    //static getDerivedStateFromProps(props, state){}

    //Render the graph
    render(){
        return(
            <React.Fragment>
                {
                    this.state.graphData ? 
                    <div className="graph">
                        <Line
                            data={this.state.graphData}
                            height={50}
                            options={{
                                title: {
                                display: true,
                                text: this.props.inputArr.title,
                                fontSize: 18,
                                fontFamily: "sans-serif"
                                },
                                legend: {
                                    display: false
                                },
                                scales: {
                                    xAxes: [{
                                        //type: 'linear', // This causes no data to show...
                                        ticks: {
                                            //stacked: true,
                                            stepSize: 100
                                        },
                                        // Vertical grid-lines
                                        gridLines: {
                                            display: true,
                                        }
                                    }],
                                    yAxes: [{
                                        type: 'linear', // Doesn't cause a problem in y-axis
                                        ticks: {
                                            stacked: true,
                                            min: this.state.min,
                                            max: this.state.max
                                        },
                                        gridLines: {
                                            display: true
                                        }
                                    }]
                                }
                            }}
                         />
                    </div>
                    :
                    <div class="graph">
                        Loading...
                    </div>
                }
            </React.Fragment>
         )
    }
}

export default Graph; 
