import React, { Component } from 'react'
import {Line} from 'react-chartjs-2';

class Graph extends Component{
    constructor(props){
        super(props);
        this.state = {
            graphData:{
            labels: ['Boston', 'New York', 'Paris'],
            datasets:[
                {
                      label:'Population',
                      data:[3234, 5637, 50],
                      backgroundColor:[
                        'rgba(255,99,132,0.6)',
                      ]
                      
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
                   width={600}
                   height={300}
                   options={{ maintainAspectRatio: false }}
                   />
            </div>
         )
    }
}

export default Graph;
