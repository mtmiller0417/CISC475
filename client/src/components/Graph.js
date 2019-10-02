import React, { Component } from 'react'
import {Line} from 'react-chartjs-2';
import * as d3 from 'd3';

class Graph extends Component{
    constructor(props){
        super(props);
        d3.csv("CISC475/ECG Dataset/13013356000.csv",function(data){
            // Write code dealing with data
            console.log(data.data);
        });
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
