import React, { Component } from 'react'
import {Line} from 'react-chartjs-2';
// Some of the changes I made to test
import * as d3 from 'd3';
import data from '../csv_files/13013356000.csv'; // Hard coded in...

//C:\Users\mattm\Documents\Files\CISC475\CISC475\client\src\csv_files\13013356000.csv       // file
//C:\Users\mattm\Documents\Files\CISC475\CISC475\client\src\components\Graph.js             // Graph.js

let dynamic_labels = [2500];
for(var i = 0; i < 2500; i++)
{
    dynamic_labels[i] = i;
}

class Graph extends Component{
    constructor(props){
        super(props);

        //Define arrays
        var lead_i = [];
        let lead_ii = [];
        let lead_iii = [];
        let lead_avr = [];
        let lead_avl = [];
        let lead_avf = [];
        let lead_v1 = [];
        let lead_v2 = [];
        let lead_v3 = [];
        let lead_v4 = [];
        let lead_v5 = [];
        let lead_v6 = [];
    
        /*
        var parsed_csv = d3.csv(data).then(function(data)
        {
            console.log(data[0].I);
        });
        */

        //Parse the CSV into an array of objects where each object represents a row
        var parsed_csv = d3.csv(data, function(d)
        {
            //Function is neccessary to handle the fact that the CSV has spaces AND commas
            //The left hand side of each line defines a new field to handle spaces before field names
            //The + is used to convert each data point to an integer since they are read in as strings w/ leading space
            return {
                I: +d["I"],
                II: +d[" II"],
                III: +d[" III"],
                aVR: +d[" aVR"],
                aVL: +d[" aVL"],
                aVF: +d[" aVF"],
                V1: +d[" V1"],
                V2: +d[" V2"],
                V3: +d[" V3"],
                V4: +d[" V4"],
                V5: +d[" V5"],
                V6: +d[" V6"]
            }
        });
        
        //Resolve the returned promise to gain access to the newly created array
        //Then iterate through it and assign the correct values to the correct arrays
        parsed_csv.then(function(data)
        {
            console.log(data)
            //console.log(data[0].I);
            for(var i = 0; i < data.length; i++)
            {
                //Push the data points of the current object to the appropriate arrays
                lead_i.push(data[i].I);
                lead_ii.push(data[i].II);
                lead_iii.push(data[i].III);
                lead_avr.push(data[i].aVR);
                lead_avl.push(data[i].aVL);
                lead_avf.push(data[i].aVF);
                lead_v1.push(data[i].V1);
                lead_v2.push(data[i].V2);
                lead_v3.push(data[i].V3);
                lead_v4.push(data[i].V4);
                lead_v5.push(data[i].V5);
                lead_v6.push(data[i].V6);

                //console.log(data[i]);
            }

            //console.log(lead_ii[0]);
        });

        //Fake data stuff
        //let fake_data = [-92, -87, -82, -78, -73, -73, -92, -190, -287]

        //Graph Stuff
        this.state = {
            graphData:{
                //labels: ['Boston', 'New York', 'Paris'],
                labels: dynamic_labels,
                //labels: labels,
                datasets:[
                {
                    label:'Lead I',
                    data: [-92, -87, -82, -78, -73, -73, -92, -190, -287],
                    //data: lead_i,
                    //backgroundColor:['rgba(255,99,132,0.6)',]
                }
            ]
        }
    }
        
}

    //Render the graph
    render(){
        return(
            <div className="graph">
                <Line
                    data={this.state.graphData}
                    options={{
                        scales: {
                            yAxes: [{
                                ticks: {
                                    //min: -1000,
                                    //max: 1000
                                }
                            }]
                        }
                    }}
               />
            </div>
         )
    }
}

export default Graph; 