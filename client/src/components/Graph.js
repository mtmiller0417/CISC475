import React, { Component } from 'react';
import {Scatter} from 'react-chartjs-2';

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
                annotation:{
                    p: '',
                    q: '',
                    r: '',
                    s: '',
                    t: ''
                }, 
                freq: 0,
                max:this.props.inputArr.extra_info.max,
                min:this.props.inputArr.extra_info.min
            }
        })
    }

    parseAnnotation(annotation, pair_array, props){
        for(let i = 0; i < annotation.length; i++){
            pair_array.push({
                x: annotation[i],
                y: props.inputArr.data[annotation[i]].y
            });
        }
    }

    // Can't use 'this.' because this is a static function
    // The state is updated through what is returned from this function
    // This loads metadata... but sometimes doesnt load all of them? is kinda random...
    // Fills the data properly
    static getDerivedStateFromProps(next_props, prev_state){

        var max = prev_state.max
        var min = prev_state.min

        var freq = next_props.inputArr.extra_info.freq

        let props_array = next_props.inputArr;
        
        let p_pair = [];
        let q_pair = [];
        let r_pair = [];
        let s_pair = [];
        let t_pair = [];

        // p_pair
        for(let i = 0; i < props_array.p.length; i++){
            p_pair.push({
                x: props_array.p[i] * (1/freq),
                y: next_props.inputArr.data[props_array.p[i]].y
            });
        }
        // q_pair
        for(let i = 0; i < props_array.q.length; i++){
            q_pair.push({
                x: props_array.q[i] * (1/freq),
                y: next_props.inputArr.data[props_array.q[i]].y
            });
        }
        // r_pair
        for(let i = 0; i < props_array.r.length; i++){
            r_pair.push({
                x: props_array.r[i] * (1/freq),
                y: next_props.inputArr.data[props_array.r[i]].y
            });
        }
        // s_pair
        for(let i = 0; i < props_array.s.length; i++){
            s_pair.push({
                x: props_array.s[i] * (1/freq),
                y: next_props.inputArr.data[props_array.s[i]].y
            });
        }
        // t_pair
        for(let i = 0; i < props_array.t.length; i++){
            t_pair.push({
                x: props_array.t[i] * (1/freq),
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
                freq: next_props.inputArr.extra_info.freq, 
                min: next_props.inputArr.extra_info.min, 
                max: next_props.inputArr.extra_info.max, 
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
                    pointHitRadius: 1,
                    borderWidth: 1,
                    borderColor:'black',
                    showLine: true,
                    data: this.state.data.datasets.data,
                },
                { 
                    label:'P-Annotation',
                    fill:true,
                    pointStyle: 'star',
                    pointBorderColor: 'red',
                    pointRadius: 8,
                    pointHitRadius: 3,
                    pointBorderWidth: 2,
                    backgroundColor: 'red',
                    showLine: false,
                    data: this.state.data.annotation.p
                },
                { 
                    label:'Q-Annotation',
                    fill:true,
                    pointStyle: 'star',
                    pointBorderColor: 'blue',
                    pointRadius: 8,
                    pointHitRadius: 3,
                    pointBorderWidth: 2,
                    backgroundColor: 'blue',
                    showLine: false,
                    data: this.state.data.annotation.q
                },
                { 
                    label:'R-Annotation',
                    fill:true,
                    pointStyle: 'star',
                    pointBorderColor: 'purple',
                    pointRadius: 8,
                    pointHitRadius: 3,
                    pointBorderWidth: 2,
                    backgroundColor: 'purple',
                    showLine: false,
                    data: this.state.data.annotation.r
                },
                { 
                    label:'S-Annotation',
                    fill:true,
                    pointStyle: 'star',
                    pointBorderColor: 'green',
                    pointRadius: 8,
                    pointHitRadius: 3,
                    pointBorderWidth: 2,
                    backgroundColor: 'green',
                    showLine: false,
                    data: this.state.data.annotation.s
                },
                { 
                    label:'T-Annotation',
                    fill:true,
                    pointStyle: 'star',
                    pointBorderColor: 'black',
                    pointRadius: 8,
                    pointHitRadius: 3,
                    pointBorderWidth: 2,
                    backgroundColor: 'black',
                    showLine: false,
                    data: this.state.data.annotation.t
                }
            ], 
          };

          let height = 50
          let dataLen = this.state.data.datasets.data.length
          let total_time = 1
          if(this.state.data.datasets.data[dataLen - 1]){
            total_time = this.state.data.datasets.data[dataLen - 1].x
          }
          let interval = 0.2 // 0.2 seconds or 200 ms
          let ticks_on_x = total_time / interval
          let between_tick = dataLen / ticks_on_x
          let range = Math.abs(this.state.data.min) + Math.abs(this.state.data.max) 
          let q = range / height
          let y_axis_step_size = q * (height/5)
          console.log('y_step_size: ' + y_axis_step_size)
          console.log('\n')

        return(
        <React.Fragment>
            {
                <div className="graph">
                    <Scatter 
                        data={dat} 
                        height={height}
                        options={{
                            tooltips:{
                                enabled: true,
                                mode: 'nearest',
                                callbacks: {
                                    label: function(tooltipItems, data) { 
                                        return tooltipItems.xLabel + ' s, ' + tooltipItems.yLabel + ' mv';
                                    }
                                }
                            },
                            title: {
                                display: true,
                                text: this.state.data.datasets.label,
                                fontSize: 13,
                                fontFamily: "serif",
                                position: 'left'
                            },
                            legend: {
                                display:false,
                                labels: {
                                    filter: function(item) {
                                        // Remove the legend of the main-data, keep the annotation legend
                                        return !item.text.includes('Main-Data');
                                    }
                                }
                            },
                            scales: {
                                xAxes: [{
                                    ticks: {
                                        // Change this stepsize based on metadata info...
                                        stepSize: 0.2//skip Measured in seconds(200 miliseconds)
                                    },
                                    // Vertical grid-lines
                                    /*gridLines: {
                                        display: true,
                                    },*/
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Seconds'
                                    }
                                }],
                                yAxes: [{
                                    ticks: {
                                        stepSize: y_axis_step_size, //724
                                        min: this.state.data.min,
                                        max: this.state.data.max
                                    },
                                    gridLines: {
                                        display: true
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'MV'
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
         )*/
    }
}

export default Graph; 
