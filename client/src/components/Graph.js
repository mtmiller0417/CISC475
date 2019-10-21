import React, { Component } from 'react';
import {Line, Scatter} from 'react-chartjs-2';

//C:\Users\mattm\Documents\Files\CISC475\CISC475\client\node_modules\canvasjs
//C:\Users\mattm\Documents\Files\CISC475\CISC475\client\src\components\Graph.js

class Graph extends Component{

    constructor(props){
        super(props);

        /*this.state = ({
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
        })*/

        this.state = ({
            data:{
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
    componentWillReceiveProps(new_props){
        // Calling setState causes this component to re-render with the new data its received

        //console.log("Updated Graph props:")
        //console.log(props);


        /*this.setState({
            graphData:{
                labels: props.inputArr.labels,
                datasets:[{
                    radius: 0, // Makes the dots go away
                    label: props.inputArr.title,
                    fill: false,
                    borderColor: ['black'],
                    data: props.inputArr.data,
                    backgroundColor:['rgba(255,99,132,0.6)',],
                    borderWidth: 1
                }]
            }
        });*/

        // Used for scatterplot
        this.setState({
            data:{
                datasets:{
                    radius: 0, // Makes the dots go away
                    label: new_props.inputArr.title,
                    fill: false,
                    borderColor: ['black'],
                    data: new_props.inputArr.data,
                    backgroundColor:['rgba(255,99,132,0.6)',],
                    borderWidth: 1
                }
            }
        });

        console.log('State after update')
        //console.log(this.state.data.datasets.data)
        //console.log(new_props.inputArr.data[0])
        console.log(this.state.data)
    }

    //static getDerivedStateFromProps(props, state){}

    // Notes for rendering the annotations
    // ... Make current data a scatter plot rn
    //  Multiple graphs on top of one another
    //  Create data pairs for annotation data, making a scatter plot
    
    //  stepSize, tooltips, canvasJS?


    //Render the graph
    render(){

        const dat = {
            labels: ['Scatter'],
            datasets: [
              {
                label: 'My First dataset',
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 1,
                pointRadius: 0, // pointRadius: 1
                pointHitRadius: 10,
                borderWidth: 1,
                borderColor:'black',
                showLine: true,
                data: this.state.data.datasets.data
              }
            ], 
          };

        return(
        <React.Fragment>
            {
                <div className="graph">
                    <Scatter 
                        data={dat} 
                        height={50}
                    />
                </div>
            }
        </React.Fragment>)

        /*return(
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
                                            //stepSize: 500,
                                            stacked: true,
                                            //stepSize: 1000
                                            //min: -2000,
                                            //max: 2000
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
         )*/
    }
}

export default Graph; 
