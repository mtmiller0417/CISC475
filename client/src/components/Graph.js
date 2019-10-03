import React, { Component } from 'react'
import {Line} from 'react-chartjs-2';
// Some of the changes I made to test
import * as d3 from 'd3';
import data from '../csv_files/13013356000.csv'; // Hard coded in...

//C:\Users\mattm\Documents\Files\CISC475\CISC475\client\src\csv_files\13013356000.csv       // file
//C:\Users\mattm\Documents\Files\CISC475\CISC475\client\src\components\Graph.js             // Graph.js

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
        var parsed_csv = d3.csv(data);

        //Resolve the returned promise to gain access to the newly created array
        //Then iterate through it and assign the correct values to the correct arrays
        parsed_csv.then(function(data)
        {
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
            }
        });

        //Fake data stuff
        let fake_data = [-92, -87, -82, -78, -73, -73, -92, -190, -287]

        //Graph Stuff
        this.state = {
            graphData:{
                //labels: ['Boston', 'New York', 'Paris'],
                labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
                //labels: labels,
                datasets:[
                {
                    label:'Population',
                    //data: [-92, -87, -82, -78, -73, -73, -92, -190, -287],
                    data: lead_i,
                    backgroundColor:['rgba(255,99,132,0.6)',]
                      
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
                    options={{ maintainAspectRatio: false }}
               />
            </div>
         )
    }
}

export default Graph;
