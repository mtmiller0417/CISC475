import React, { Component } from 'react';
import {Scatter} from 'react-chartjs-2';
import cloneDeep from 'lodash/cloneDeep';
import styles from "./MainContainer/MainContainer.module.scss";

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

/**
 * This component defines the individual graphs for each lead and annotation set
 */
class Graph extends Component{

    /**
     * Constructor is used here to create a ref and set initial state according to the props
     */
    constructor(props){
        super(props);

        this.chartRef = React.createRef();

        this.state = ({
            data:{
                datasets:{
                    dataRead: false,
                    radius: 0, // Makes the dots go away
                    label: this.props.inputArr.title,
                    fill: false,
                    borderColor: ['black'],
                    data: this.props.inputArr.data,
                    backgroundColor:['rgba(255,99,132,0.6)',],
                    borderWidth: 1
                },
                annotation:{
                    selectedAnnotation: this.props.inputArr.extra_info.selectedAnnotation,
                    p: '',
                    q: '',
                    r: '',
                    s: '',
                    t: '',
                    oldP: [''],
                    oldQ: [''],
                    oldR: [''],
                    oldS: [''],
                    oldT: [''],
                    p_flag: false,
                    q_flag: false,
                    r_flag: false,
                    s_flag: false,
                    t_flag: false,
                }, 
                freq: 0,
                max:this.props.inputArr.extra_info.max,
                min:this.props.inputArr.extra_info.min, 
                parent_width: 0
            }
        })
    }

    /**
     * 
     * @brief This method deletes the annotation from annotationArray at arrayIndex.
     * After deletion the state is updated and chart rerendered
     * 
     * @param {[]} annotationArray representing the data array for a given annotation
     * @param {int} arraryIndex representing the index for deletion in the given array
     * @param {Event} event representing the click event returned by chartJS
     */
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

    /**
     * 
     * @brief This method adds an annotation located at the coordinates of the point parameter
     * to the passed in annotationArray. It also causes a rerender and updates state after addition
     * 
     * @param {[]} annotationArray representing the data array for a given annotation
     * @param {Event} event representing the click event returned by chartJS
     * @param {Object} point representing the (x,y) coordinates of the click
     */
    addAnnotation(annotationArray, event, point)
    {
        annotationArray.push({x: point.x, y: point});
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

    /**
     * 
     * @brief Method that is called whenever a point is clicked on the graph, where e is the click event.
     * This method handles determining whether to add or remove an annotation and calls the required method
     * 
     * @param {Event} e which is the click event returned by chartJS
     */
    modifyGraph(e) {
        console.log(e);

        const node = this.chartRef.current;
        console.log("NODE");
        console.log(node);

        let arrIndex = e[0]._index;
        let dataSet = e[0]._datasetIndex;
        let coordinates = this.state.data.datasets.data[arrIndex];
        switch (dataSet) { 
            case 0:
                //add a point to a specific set of annotations
                console.log(this.state.data.datasets.data);
                console.log(coordinates);

                //Let the user select the type of point to add from some menu 
                //and set the response to this variable
                //Hardcoded to 0 now to inidicate P
                let inputChoice = this.state.data.annotation.selectedAnnotation;
                console.log('inputChoice')
                console.log(inputChoice)
                if(inputChoice === -1){
                    console.log('break')
                    break;
                }
                
                
                //User wants to add P
                if(inputChoice === 0){
                    //Duplicate the current state
                    //this.setState({oldP: this.state.data.annotation.oldP.push(this.state.data.annotation.p)});

                    //Add the annotation
                    this.addAnnotation(this.state.data.annotation.p, e, coordinates);
                }
                //User wants to add Q
                else if(inputChoice === 1){
                    this.addAnnotation(this.state.data.annotation.q, e, coordinates);
                }
                //User wants to add R
                else if(inputChoice === 2){
                    this.addAnnotation(this.state.data.annotation.r, e, coordinates);
                }
                //User wants to add S
                else if(inputChoice === 3){
                    this.addAnnotation(this.state.data.annotation.s, e, coordinates);
                }
                //User wants to add a T
                else if(inputChoice === 4){
                    this.addAnnotation(this.state.data.annotation.t, e, coordinates);
                }
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

    /**
     * 
     * @brief React method that handles setting state when new props are passed from the parent container.
     * Here we are using this method to take annotation data passed in a props and format it correctly
     * for display as a Scatter plot in Chartjs. Sets new state for the graph after processing the props
     * 
     * @param {props} next_props 
     * @param {props} prev_state 
     */
    static getDerivedStateFromProps(next_props, prev_state){
        var freq = next_props.inputArr.freq

        let props_array = next_props.inputArr;

        let p_pair = [];
        let q_pair = [];
        let r_pair = [];
        let s_pair = [];
        let t_pair = [];

        let dataRead = prev_state.data.datasets.dataRead
        
        // Check if there is data, if so create the annotations(and if the data hasnt already been read)
        if(next_props.inputArr.data && !dataRead){
            // Stops the data from being read each time new add_annotation is selected
            dataRead = true;
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
        }

        // Set default value of flag variables
        let p_flag = prev_state.data.annotation.p_flag
        let q_flag = prev_state.data.annotation.q_flag
        let r_flag = prev_state.data.annotation.r_flag
        let s_flag = prev_state.data.annotation.s_flag
        let t_flag = prev_state.data.annotation.t_flag

        // If the flag was set before, dont change the data
        if(p_flag)
            p_pair = prev_state.data.annotation.p;
        if(q_flag)
            q_pair = prev_state.data.annotation.q;
        if(r_flag)
            r_pair = prev_state.data.annotation.r;
        if(s_flag)
            s_pair = prev_state.data.annotation.s;
        if(t_flag)
            t_pair = prev_state.data.annotation.t;
        

        // Set flag to true if the data has been loaded
        if(!p_flag && p_pair.length > 0)
            p_flag = true;

        if(!q_flag && q_pair.length > 0)
            q_flag = true;

        if(!r_flag && r_pair.length > 0)
            r_flag = true;

        if(!s_flag && s_pair.length > 0)
            s_flag = true;

        if(!t_flag && t_pair.length > 0)
            t_flag = true;

        // If the flag for an annotation has been set, dont update its annotations

        return{
            data:{
                datasets:{
                    dataRead: dataRead,
                    radius: 0, // Makes the dots go away
                    label: next_props.inputArr.title,
                    fill: false,
                    borderColor: ['black'],
                    data: next_props.inputArr.data,
                    backgroundColor:['rgba(255,99,132,0.6)',],
                    borderWidth: 1
                },
                annotation:{
                    selectedAnnotation: next_props.inputArr.extra_info.selectedAnnotation,
                    p:p_pair,
                    q:q_pair,
                    r:r_pair,
                    s:s_pair,
                    t:t_pair, 
                    p_flag:p_flag,
                    q_flag:q_flag,
                    r_flag:r_flag,
                    s_flag:s_flag,
                    t_flag:t_flag
                }, 
                freq: freq, 
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
                    borderWidth: 1.5, // Change this back to 1???
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
        const SECONDS_PER_WIDTH_MAX = 10
        const TIME_PER_WIDTH = Math.min(SECONDS_PER_WIDTH_MAX, total_time) // Number of seconds to fit on the screen at a time

        // The amount of the width/height that is not part of the graph
        const width_offset = 86 //     (75 + 10 + 1 + 1) = offset = 86

        // The fixed width of the container on the screen
        const parent_width = this.state.data.parent_width - width_offset

        // The amount of px that will be visible in every given second of the x axis
        const px_per_second = parent_width / TIME_PER_WIDTH;

        // Calculates the width of the graph(can be greater than the fixed width, scrollable allow the excess to be seen)
        let width = total_time * px_per_second;
        width += width_offset
        width += 'px'

        return(
        <React.Fragment>
            {

                <div className="wrapper" style={{position: 'relative', height:HEIGHT}}>

                    <div style={{position:'absolute', fontSize: 20, marginTop: -10, fontWeight: 'bold'}}>{this.state.data.datasets.label}</div>

                    <div style={{position: 'absolute', top:0, right:0}}>
                    <ul style = {{ position: 'relative', fontSize: '9px', fontWeight: 'bold' , marginLeft: -10}}> 
                        <div><span className={styles.p} ></span>P</div>
                        <div><span className={styles.q}></span>Q</div>
                        <div><span className={styles.r}></span>R</div>
                        <div><span className={styles.s}></span>S</div>
                        <div><span className={styles.t}></span>T</div>
                    </ul>
                    </div>

                <div className="graph" style={{position:'absolute', top: 0, left: 0, width: width}}>
                    <Scatter 
                        data={dat}
                        redraw={true} 
                        height={HEIGHT}
                        ref={this.chartRef}
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
                                /*custom: function(tooltipModel) {
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
                                },*/
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
                                position: 'right',
                                labels: {
                                    // generateLabel
                                    boxWidth: 10, 
                                    filter: function(item) {
                                        // Remove the legend of the main-data, keep the annotation legend
                                        return !item.text.includes('Main-Data');
                                    }
                                }
                            },
                            scales: {
                                xAxes: [{
                                    ticks: {
                                        display:false,
                                        stepSize: 0.2
                                    },
                                    gridLines:{
                                        display:false 
                                    },
                                    scaleLabel: {
                                        display: false,
                                        labelString: 'Seconds'
                                    }
                                }],
                                yAxes: [{
                                    ticks: {
                                        display: false,
                                        min: this.state.data.min,
                                        max: this.state.data.max + 50
                                    },
                                    gridLines: {
                                        display: false
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
                </div>
            }
        </React.Fragment>)
    }

}

export default Graph; 
