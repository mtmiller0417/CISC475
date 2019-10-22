import React, { Component } from 'react';
import {Scatter} from 'react-chartjs-2';

//C:\Users\mattm\Documents\Files\CISC475\CISC475\client\node_modules\canvasjs
//C:\Users\mattm\Documents\Files\CISC475\CISC475\client\src\components\Graph.js

class Graph extends Component{

    constructor(props){
        super(props);

        this.state = ({
            data:{
                datasets:{
                    radius: 0, // Makes the dots go away
                    label: this.props.inputArr.title,
                    fill: false,
                    borderColor: ['black'],
                    data: this.props.inputArr.data,
                    backgroundColor:['rgba(255,99,132,0.6)',],
                    borderWidth: 1
                },
                annotations:{
                    p: '',
                    q: '',
                    r: '',
                    s: '',
                    t: ''
                }, 
                frequency: 0
            }
        })
    }

    // 
    parseAnnotation(annotation, pair_array, props){
        for(let i = 0; i < annotation.length; i++){
            pair_array.push({
                x: annotation[i],
                y: props.inputArr.data[annotation[i]].y
            });
        }
    }

    // Might need to add UNSAFE_ to this function name
    // Call this when this component receives new props
    /*componentWillReceiveProps(new_props){
        // Calling setState causes this component to re-render with the new data its received

        //console.log("Updated Graph props:")
        //console.log(new_props);


        // Used for scatterplot

        let props_array = new_props.inputArr;

        let p_pair = [];
        //this.parseAnnotation(props_array.p, p_pair, new_props);

        for(let i = 0; i < props_array.p.length; i++){
            p_pair.push({
                x: props_array.p[i],
                y: new_props.inputArr.data[props_array.p[i]].y
            });
        }
        let q_pair = [];
        //this.parseAnnotation(props_array.q, q_pair, new_props);
        let r_pair = [];
        //this.parseAnnotation(props_array.r, r_pair, new_props);
        let s_pair = [];
        //this.parseAnnotation(props_array.s, s_pair, new_props);
        let t_pair = [];
        //this.parseAnnotation(props_array.t, t_pair, new_props);

        console.log('P-Pair')
        console.log(p_pair)

        // Update the annotations
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
                },
                annotations:{
                    p: p_pair,
                    q: q_pair,
                    r: r_pair,
                    s: s_pair,
                    t: t_pair
                }, 
            }
        });

        console.log('State after update')
        console.log(this.state)
    }*/

    // Can't use 'this.' because this is a static function
    // The state is updated through what is returned from this function
    // This loads metadata... but sometimes doesnt load all of them? is kinda random...
    // Fills the data properly
    static getDerivedStateFromProps(next_props, prev_state){
        let props_array = next_props.inputArr;
        let p_pair = [];
        let q_pair = [];
        let r_pair = [];
        let s_pair = [];
        let t_pair = [];
        // p_pair
        for(let i = 0; i < props_array.p.length; i++){
            p_pair.push({
                x: props_array.p[i],
                y: next_props.inputArr.data[props_array.p[i]].y
            });
        }
        // q_pair
        for(let i = 0; i < props_array.q.length; i++){
            q_pair.push({
                x: props_array.q[i],
                y: next_props.inputArr.data[props_array.q[i]].y
            });
        }
        // r_pair
        for(let i = 0; i < props_array.r.length; i++){
            r_pair.push({
                x: props_array.r[i],
                y: next_props.inputArr.data[props_array.r[i]].y
            });
        }
        // s_pair
        for(let i = 0; i < props_array.s.length; i++){
            s_pair.push({
                x: props_array.s[i],
                y: next_props.inputArr.data[props_array.s[i]].y
            });
        }
        // t_pair
        for(let i = 0; i < props_array.t.length; i++){
            t_pair.push({
                x: props_array.t[i],
                y: next_props.inputArr.data[props_array.t[i]].y
            });
        }
        return{
            data:{
                datasets:{
                    radius: 0, // Makes the dots go away
                    label: next_props.inputArr.title,
                    fill: false,
                    borderColor: ['black'],
                    data: next_props.inputArr.data,
                    backgroundColor:['rgba(255,99,132,0.6)',],
                    borderWidth: 1
                },
                annotation:{
                    p:p_pair,
                    q:q_pair,
                    r:r_pair,
                    s:s_pair,
                    t:t_pair
                }, 
                frequency: 500
            }
        }
    }

    // Notes for rendering the annotations
    // ... Make current data a scatter plot rn
    //  Multiple graphs on top of one another
    //  Create data pairs for annotation data, making a scatter plot
    
    //  stepSize, tooltips, canvasJS?


    //Render the graph
    render(){

        //console.log('RENDER in Graph.js')
        //console.log(this.state)

        const dat = {
            type:'Scatter',
            datasets: [
                {
                    label:'Main-Data',
                    fill: false,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 1,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 1,
                    pointRadius: 0, // This makes the individual points disappear
                    pointHitRadius: 10,
                    borderWidth: 1,
                    borderColor:'black',
                    showLine: true,
                    data: this.state.data.datasets.data
                },
                { 
                    label:'P-Annotation',
                    fill:true,
                    pointStyle: 'star',
                    pointBorderColor: 'red',
                    pointRadius: 8,
                    pointBorderWidth: 2,
                    showLine: false,
                    data: this.state.data.annotation.p
                },
                { 
                    label:'Q-Annotation',
                    fill:true,
                    pointStyle: 'star',
                    pointBorderColor: 'blue',
                    pointRadius: 8,
                    pointBorderWidth: 2,
                    showLine: false,
                    data: this.state.data.annotation.q
                },
                { 
                    label:'R-Annotation',
                    fill:true,
                    pointStyle: 'star',
                    pointBorderColor: 'yellow',
                    pointRadius: 8,
                    pointBorderWidth: 2,
                    showLine: false,
                    data: this.state.data.annotation.r
                },
                { 
                    label:'S-Annotation',
                    fill:true,
                    pointStyle: 'star',
                    pointBorderColor: 'green',
                    pointRadius: 8,
                    pointBorderWidth: 2,
                    showLine: false,
                    data: this.state.data.annotation.s
                },
                { 
                    label:'T-Annotation',
                    fill:true,
                    pointStyle: 'star',
                    pointBorderColor: 'black',
                    pointRadius: 8,
                    pointBorderWidth: 2,
                    showLine: false,
                    data: this.state.data.annotation.t
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
                        options={{
                            title: {
                                display: true,
                                text: this.state.data.datasets.label,
                                fontSize: 18,
                                fontFamily: "sans-serif"
                            },
                            legend: {
                                display: false
                            },
                            scales: {
                                xAxes: [{
                                    ticks: {
                                        // Change this stepsize based on metadata info...
                                        stepSize: 0.2//skip Measured in seconds
                                    },
                                    // Vertical grid-lines
                                    /*gridLines: {
                                        display: true,
                                    },*/
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Time in Seconds'
                                      }
                                }],
                                yAxes: [{
                                    ticks: {
                                        stepSize: 500
                                    },
                                    gridLines: {
                                        display: true
                                    }
                                }]
                            }
                        }}
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
