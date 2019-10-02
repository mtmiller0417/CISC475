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

        let array=[];
        d3.csv(data,function(data){
            // Write code dealing with data
            //console.log(data);
            // Create an array of maps
            array.push(data);
        });

        let ecg0 = array.map(function(pt){
            return pt['I']
        })
        console.log(ecg0);
        let ecg1 = []
        let ecg2 = []
        let ecg3 = []
        let ecg4 = []
        let ecg5 = []
        let ecg6 = []
        let ecg7 = []
        let ecg8 = []
        let ecg9 = []
        let ecg11 = []

        this.state = {
            graphData:{
                labels: ['Boston', 'New York', 'Paris'],
                datasets:[
                {
                    label:'Population',
                    data:[3234, 5637, 50],
                    backgroundColor:['rgba(255,99,132,0.6)',]
                      
                }
            ]
        }
    }
}
    
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
