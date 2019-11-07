import React, { Component } from 'react';
import {Scatter} from 'react-chartjs-2';
import cloneDeep from 'lodash/cloneDeep';

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

    deleteAnnotation(annotationArray, arraryIndex, event){
        //annotationArray[arraryIndex] = ""; // Dont delete, just make it empty
        annotationArray.splice(arraryIndex, 1)
        console.log(annotationArray);

        this.setState = ({
            data:{ 
                annotation:{
                    p: this.state.data.annotation.p,
                    q: this.state.data.annotation.q,
                    r: this.state.data.annotation.r,
                    s: this.state.data.annotation.s,
                    t: this.state.data.annotation.t    
                }
            }
        });

        event[0]._chart.chart.update();
    }

    addAnnotation(e) {
        console.log(e);
    }

    modifyGraph(e) {
        console.log(e);
        let arrIndex = e[0]._index;
        let dataSet = e[0]._datasetIndex;
        let coordinates = this.state.data.datasets.data[arrIndex];
        switch (dataSet) { 
            case 0:
                //add a point to a specific set of annotations
                console.log(this.state.data.datasets.data);

                //Grab x coordinate from coordinates

                //Let index = 0
                //While (x coordinates.x > this.state.annotation.p[index].x)
                    //i++
                //Add in the new data using splice
                //this.state.data.annotation.p.splice(index, 0, coordinates)
                break;
            case 1:
                this.deleteAnnotation(this.state.data.annotation.p, arrIndex, e);

                break;
            case 2:
                this.deleteAnnotation(this.state.data.annotation.q, arrIndex, e);
                break;
            case 3:
                this.deleteAnnotation(this.state.data.annotation.r, arrIndex, e);
                break;
            case 4:
                this.deleteAnnotation(this.state.data.annotation.s, arrIndex, e);
                break;
            case 5:
                this.deleteAnnotation(this.state.data.annotation.t, arrIndex, e);
                break;
            default:
                console.log("Point not in any available dataset.");
        }
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
    //
   // static getDerivedStateFromProps
    static getDerivedStateFromProps(next_props, prev_state){
        var freq = next_props.inputArr.extra_info.freq

        let props_array = next_props.inputArr;
        
        let p_pair = [];
        let q_pair = [];
        let r_pair = [];
        let s_pair = [];
        let t_pair = [];
        var x = 0;
        // p_pair
        for(let i = 0; i < props_array.p.length; i++){
            x++;
            p_pair.push({
                x: props_array.p[i] * (1/freq),
                y: next_props.inputArr.data[props_array.p[i]]
            });
        }
        // q_pair
        for(let i = 0; i < props_array.q.length; i++){
            q_pair.push({
                x: props_array.q[i] * (1/freq),
                y: next_props.inputArr.data[props_array.q[i]]
            });
        }
        // r_pair
        for(let i = 0; i < props_array.r.length; i++){
            r_pair.push({
                x: props_array.r[i] * (1/freq),
                y: next_props.inputArr.data[props_array.r[i]]
            });
        }
        // s_pair
        for(let i = 0; i < props_array.s.length; i++){
            s_pair.push({
                x: props_array.s[i] * (1/freq),
                y: next_props.inputArr.data[props_array.s[i]]
            });
        }
        // t_pair
        for(let i = 0; i < props_array.t.length; i++){
            t_pair.push({
                x: props_array.t[i] * (1/freq),
                y: next_props.inputArr.data[props_array.t[i]]
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
                    pointHitRadius: 2,
                    borderWidth: 1,
                    borderColor:'black',
                    showLine: true,
                    tooltipHidden: true,
                    data: this.state.data.datasets.data,
                },
                { 
                    label:'P',
                    fill:true,
                    pointStyle: 'circle',
                    pointBorderColor: pastelRed,
                    pointRadius: 5,
                    pointHitRadius: 3,
                    pointHoverRadius: 10,
                    pointBorderWidth: 2,
                    backgroundColor: pastelRedLightOpacity,
                    showLine: false,
                    tooltipHidden: false,
                    data: this.state.data.annotation.p
                    //data: this.state.data.annotation.p,
                },
                { 
                    label:'Q',
                    fill:true,
                    pointStyle: 'circle',
                    pointBorderColor: pastelPurple,
                    pointRadius: 5,
                    pointHitRadius: 3,
                    pointHoverRadius: 10,
                    pointBorderWidth: 2,
                    backgroundColor: pastelPurpleLightOpacity,
                    showLine: false,
                    tooltipHidden: false,
                    data: this.state.data.annotation.q
                },
                { 
                    label:'R',
                    fill:true,
                    pointStyle: 'circle',
                    pointBorderColor: pastelOrange, 
                    pointRadius: 5,
                    pointHitRadius: 3,
                    pointHoverRadius: 10,
                    pointBorderWidth: 2,
                    backgroundColor: pastelOrangeLightOpacity,
                    showLine: false,
                    tooltipHidden: false,
                    data: this.state.data.annotation.r
                },
                { 
                    label:'S',
                    fill:true,
                    pointStyle: 'circle',
                    pointBorderColor: pastelBlue,
                    pointRadius: 5,
                    pointHitRadius: 3,
                    pointHoverRadius: 10,
                    pointBorderWidth: 2,
                    backgroundColor: pastelBlueLightOpacity,
                    showLine: false,
                    tooltipHidden: false,
                    data: this.state.data.annotation.s
                },
                {  
                    label:'T',
                    fill:true,
                    pointStyle: 'circle',
                    pointBorderColor: pastelGreen,
                    pointRadius: 5,
                    pointHitRadius: 3,
                    pointHoverRadius: 10,
                    pointBorderWidth: 2,
                    backgroundColor: pastelGreenLightOpacity,
                    showLine: false,
                    tooltipHidden: false,
                    data: this.state.data.annotation.t
                }
            ], 
        };

        let dataLen = this.state.data.datasets.data.length
        let total_time = 1
        if(this.state.data.datasets.data[dataLen - 1]){
            total_time = this.state.data.datasets.data[dataLen - 1].x
            total_time += 1/this.state.data.freq
        }

        // Some constants
        const HEIGHT = 225; // The stated height of the chart
        const INTERVAL = 0.2 // 0.2 seconds or 200 ms
        const TIME_PER_WIDTH = Math.min(5, total_time) // Number of seconds to fit on the screen at a time

        //let between_tick = dataLen / ticks_on_x
        let range = Math.abs(this.state.data.min) + Math.abs(this.state.data.max) 

        // The amount of the width/height that is not part of the graph
        const width_offset = 86 // 79     (75 + 10 + 1 + 1) = offset = 86
        const height_offset = 60 // 60   (30 + 1 + 1) = offset = 32

        // The fixed width of the container on the screen
        const parent_width = this.state.data.parent_width - width_offset

        // The amount of px that will be visible in every given second of the x axis
        const px_per_second = parent_width / TIME_PER_WIDTH;

        // Calculates the width of the graph(can be greater than the fixed width, scrollable allow the excess to be seen)
        const width = total_time * px_per_second;

        // The true height/width px on the screen
        const true_width = parent_width              // 1571px 1564px
        const true_height = HEIGHT - height_offset   // 165px 193

        const ticks_per_width = Math.min(TIME_PER_WIDTH, total_time) / INTERVAL; // 25
        const ratio = true_height / (true_width / ticks_per_width); // Solve 1571/25 = 165/x
        const round_up_ratio = Math.ceil(ratio)
        const y_step = Math.round(range / ratio)

        const max_y = (y_step * round_up_ratio) - Math.abs(this.state.data.min)

        // Add the width_offset and 'px' to the width to be set in the graph div
        let full_width = width+width_offset
        full_width += 'px'

        return(
        <React.Fragment>
            {
                <div className="graph" style={{width: full_width}}>
                    <Scatter 
                        data={dat}
                        redraw={true} 
                        height={HEIGHT}
                        getElementAtEvent={(point) =>{
                            if(point.length > 0){
                                this.modifyGraph(point);
                            }
                        }}
                        options={{
                            maintainAspectRatio: false,
                            tooltips:{
                                enabled: true,
                                mode: 'nearest',
                                custom: function(tooltipModel) {
                                    // EXTENSION: filter is not enough! Hide tooltip frame
                                    if (!tooltipModel.body || tooltipModel.body.length < 1) {
                                        tooltipModel.caretSize = 0;
                                        tooltipModel.xPadding = 0;
                                        tooltipModel.yPadding = 0;
                                        tooltipModel.cornerRadius = 0;
                                        tooltipModel.width = 0;
                                        tooltipModel.height = 0;
                                    }
                                },
                                filter: function(tooltipItem, data) {
                                    return !data.datasets[tooltipItem.datasetIndex].tooltipHidden;
                                },
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
                                display:true,
                                position: 'right',
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
                                        display: false,
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
                                        display: false,
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
