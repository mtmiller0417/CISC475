import React from "react";
import styles from "./MainContainer.module.scss";
import Grid from "../Grid/Grid";
import GridItem from "../Grid/GridItem/GridItem";
import Metadata from "../Metadata/Metadata";
import Header from "../Header/Header";
import ControlPanel from "../ControlPanel/ControlPanel";
import * as d3 from 'd3';
import data from '../../csv_files/13013356000.csv'; // Hard coded in...
import annotation_p from '../../csv_files/Annotattion/P.csv';
import annotation_q from '../../csv_files/Annotattion/Q.csv';
import annotation_r from '../../csv_files/Annotattion/R.csv';
import annotation_s from '../../csv_files/Annotattion/S.csv';
import annotation_t from '../../csv_files/Annotattion/T.csv';


export default class MainContainer extends React.Component {
	constructor(props){
        super(props);

        // Set initial state 
        this.state={
            labels: [],
            i: '',
            ii: '',
            iii: '',
            avr: '',
            avl: '',
            avf: '',
            v1: '',
            v2: '',
            v3: '',
            v4: '',
            v5: '',
            v6: '',
            p: '',
            q: '',
            r: '',
            s: '',
            t: ''
        }
    }

    componentWillMount(){
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
        let annotation_p = [];
        let annotation_q = [];
        let annotation_r = [];
        let annotation_s = [];
        let annotation_t = [];
        let labels = [];

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
        parsed_csv.then((data) =>
        {
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
                labels.push(i);
            }

            // Update the state and cause a re-render
            this.setState({
                labels: labels,
                i: lead_i,
                ii: lead_ii,
                iii: lead_iii,
                avr: lead_avr,
                avl: lead_avl,
                avf: lead_avf,
                v1: lead_v1,
                v2: lead_v2,
                v3: lead_v3,
                v4: lead_v4,
                v5: lead_v5,
                v6: lead_v6
            })   
        })
        
        //Handle Parsing the annotation data 
    }
	
	render() {
		return (
			<div className={styles.container}>
				<Grid>
					<Header />
					<Metadata />
					<ControlPanel />
				</Grid>

				<Grid>
					<GridItem inputArr={{data: this.state.i, title: "Lead I", labels: this.state.labels}}/>
					<GridItem inputArr={{data: this.state.avl, title: "Lead aVL", labels: this.state.labels}}/>
					<GridItem inputArr={{data: this.state.ii, title: "Lead II", labels: this.state.labels}}/>
					<GridItem inputArr={{data: this.state.iii, title: "Lead III", labels: this.state.labels}}/>
					<GridItem inputArr={{data: this.state.avf, title: "Lead aVF", labels: this.state.labels}}/>
					<GridItem inputArr={{data: this.state.avr, title: "Lead aVR", labels: this.state.labels}}/>
					<GridItem inputArr={{data: this.state.v1, title: "Lead V1", labels: this.state.labels}}/>
					<GridItem inputArr={{data: this.state.v2, title: "Lead V2", labels: this.state.labels}}/>
					<GridItem inputArr={{data: this.state.v3, title: "Lead V3", labels: this.state.labels}}/>
					<GridItem inputArr={{data: this.state.v4, title: "Lead V4", labels: this.state.labels}}/>
					<GridItem inputArr={{data: this.state.v5, title: "Lead V5", labels: this.state.labels}}/>
					<GridItem inputArr={{data: this.state.v6, title: "Lead V6", labels: this.state.labels}}/>
				</Grid>
			</div>
		);
	}
}
