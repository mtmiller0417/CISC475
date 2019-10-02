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

        let array=[]

        let labels = []

        let ecg0 = []
        /*let ecg1 = []
        let ecg2 = []
        let ecg3 = []
        let ecg4 = []
        let ecg5 = []
        let ecg6 = []
        let ecg7 = []
        let ecg8 = []
        let ecg9 = []
        let ecg10 = []
        let ecg11 = []*/
        let i = 0
        let y = 0
        d3.csv(data,function(data){
            // Write code dealing with data
            //console.log(data);
            // Create an array of maps
            //console.log(data['I'] + 0)
            y = data['I'] + 0
            labels.push(i)
            array.push(data);
            ecg0.push(parseInt(data['I'],10))
            //console.log(ecg0[i])
            /*ecg1.push(parseInt(data['II'],10))
            ecg2.push(parseInt(data['III'],10))
            ecg3.push(parseInt(data['aVR'],10))
            ecg4.push(parseInt(data['aVL'],10))
            ecg5.push(parseInt(data['aVF'],10))
            ecg6.push(parseInt(data['V1'],10))
            ecg7.push(parseInt(data['V2'],10))
            ecg8.push(parseInt(data['V3'],10))
            ecg9.push(parseInt(data['V4'],10))
            ecg10.push(parseInt(data['V5'],10))
            ecg11.push(parseInt(data['V6'],10))*/
            i++
        });
        //console.log(ecg0[0])
        let fake_data = [-92, -87, -82, -78, -73, -73, -92, -190, -287]
        if (fake_data[0] !== ecg0[0]){
            console.log("Something is wrong")
            console.log("   fake_data: " + fake_data[0])
            console.log("   ecg0: " + ecg0[0])
        }
        //console.log(fake_data)
        //console.log(y)
        /*let ecg0 = array.map(function(pt){
            //console.log(pt);
            return pt;
        });*/

        this.state = {
            graphData:{
                //labels: ['Boston', 'New York', 'Paris'],
                labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
                //labels: labels,
                datasets:[
                {
                    label:'Population',
                    //data: [-92, -87, -82, -78, -73, -73, -92, -190, -287],
                    data: fake_data,
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
