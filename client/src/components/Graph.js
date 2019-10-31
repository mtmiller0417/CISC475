import React, { Component } from 'react';
import {Scatter} from 'react-chartjs-2';
import styles from 'C:/Users/mattm/Documents/Files/CISC475/CISC475/client/src/components/Grid/GridItem/GridItem.module.scss';
import ReactDOM from 'react-dom';

// Set constant colors here
let lightOpacity = .2
let pastelOrange = 'rgba(255,180,71,1)';
let pastelOrangeLightOpacity = 'rgba(255,180,71,' + lightOpacity + ')';
let pastelRed = 'rgba(255,105,97,1)';
let pastelRedLightOpacity = 'rgba(255,105,97,' + lightOpacity + ')';
let pastelBlue = 'rgba(88,148,156,1)';
let pastelBlueLightOpacity = 'rgba(88,148,156,' + lightOpacity + ')';
let pastelGreen = 'rgba(133,222,119,1)';
let pastelGreenLightOpacity = 'rgba(133,222,119,' + lightOpacity + ')';
let pastelPurple = 'rgba(178,157,217,1)';
let pastelPurpleLightOpacity = 'rgba(178,157,217,' + lightOpacity + ')';

class Graph extends Component{

    constructor(props){
        super(props);

        this.ref = React.createRef()

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
                min:this.props.inputArr.extra_info.min, 
                parent_width: 0
            }
        })
    }

    componentDidMount(){
        /*let width = ReactDOM.findDOMNode(this).getBoundingClientRect().width + 0;
        let height = ReactDOM.findDOMNode(this).getBoundingClientRect().height + 0;
        console.log('width')
        console.log(width)
        console.log('height')
        console.log(height)*/
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

        //console.log('props')
        //console.log(next_props);

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
                parent_width: next_props.width
            }
        }
    }

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
                    pointStyle: 'circle',
                    pointBorderColor: pastelRed,
                    pointRadius: 5,
                    pointHitRadius: 3,
                    pointBorderWidth: 2,
                    backgroundColor: pastelRedLightOpacity,
                    showLine: false,
                    data: this.state.data.annotation.p
                },
                { 
                    label:'Q-Annotation',
                    fill:true,
                    pointStyle: 'circle',
                    pointBorderColor: pastelPurple,
                    pointRadius: 5,
                    pointHitRadius: 3,
                    pointBorderWidth: 2,
                    backgroundColor: pastelPurpleLightOpacity,
                    showLine: false,
                    data: this.state.data.annotation.q
                },
                { 
                    label:'R-Annotation',
                    fill:true,
                    pointStyle: 'circle',
                    pointBorderColor: pastelOrange, 
                    pointRadius: 5,
                    pointHitRadius: 3,
                    pointBorderWidth: 2,
                    backgroundColor: pastelOrangeLightOpacity,
                    showLine: false,
                    data: this.state.data.annotation.r
                },
                { 
                    label:'S-Annotation',
                    fill:true,
                    pointStyle: 'circle',
                    pointBorderColor: pastelBlue,
                    pointRadius: 5,
                    pointHitRadius: 3,
                    pointBorderWidth: 2,
                    backgroundColor: pastelBlueLightOpacity,
                    showLine: false,
                    data: this.state.data.annotation.s
                },
                {  
                    label:'T-Annotation',
                    fill:true,
                    pointStyle: 'circle',
                    pointBorderColor: pastelGreen,
                    pointRadius: 5,
                    pointHitRadius: 3,
                    pointBorderWidth: 2,
                    backgroundColor: pastelGreenLightOpacity,
                    showLine: false,
                    data: this.state.data.annotation.s
                }
            ], 
        };

        // The stated height of the chart
        const HEIGHT = 225;

        let dataLen = this.state.data.datasets.data.length
        let total_time = 1
        if(this.state.data.datasets.data[dataLen - 1]){
            total_time = this.state.data.datasets.data[dataLen - 1].x
        }
        const INTERVAL = 0.2 // 0.2 seconds or 200 ms

        //let between_tick = dataLen / ticks_on_x
        let range = Math.abs(this.state.data.min) + Math.abs(this.state.data.max) 

        // Number of seconds to fit on the screen at a time
        const TIME_PER_WIDTH = 5

        // The amount of the width/height that is not part of the graph
        const width_offset = 79 
        const height_offset = 60 

        // The fixed width of the container on the screen
        const parent_width = this.state.data.parent_width - width_offset

        // The amount of px that will be visible in every given second of the x axis
        const px_per_second = parent_width / TIME_PER_WIDTH;

        // Calculates the width of the graph(can be greater than the fixed width, scrollable allow the excess to be seen)
        const width = (TIME_PER_WIDTH * px_per_second); // 1571

        // The true height/width px on the screen
        const true_with = width                     // 1571px
        const true_height = HEIGHT - height_offset  // 165px

        const ticks_per_width = Math.min(TIME_PER_WIDTH, total_time) / INTERVAL; // 25
        const ratio = true_height / (true_with / ticks_per_width); // Solve 1571/25 = 165/x
        const round_up_ratio = Math.ceil(ratio)
        //const rounded_range = Math.round((range / ratio) * round_up_ratio)
        const y_step = Math.round(range / ratio) 
        const max_y = (y_step* round_up_ratio) - Math.abs(this.state.data.min)

        /*const y_step_size = rounded_range / (round_up_ratio - 1)
        console.log('y_step_size')
        console.log(y_step_size)*/

        return(
        <React.Fragment>
            {
                // Changing the width here changes the width of the graph ()
                <div className="graph" style={{width: width+width_offset+'px'}}>
                    <Scatter 
                        data={dat} 
                        height={HEIGHT}
                        options={{
                            maintainAspectRatio: false,
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
                                display: false,
                                text: this.state.data.datasets.label,
                                fontSize: 13,
                                fontFamily: "serif",
                                position:'left'
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
                                        stepSize: INTERVAL//skip Measured in seconds(200 miliseconds)
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Seconds'
                                    }
                                }],
                                yAxes: [{
                                    ticks: {
                                        display: false,
                                        stepSize: y_step, // 1379
                                        min: this.state.data.min,
                                        max: max_y
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
    }
}

export default Graph; 
