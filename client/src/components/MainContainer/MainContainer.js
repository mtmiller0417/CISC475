import React from "react";
import styles from "./MainContainer.module.scss";
import Grid from "../Grid/Grid";
import GridItem from "../Grid/GridItem/GridItem";
import Metadata from "../Metadata/Metadata";
import Header from "../Header/Header";
import ControlPanel from "../ControlPanel/ControlPanel";
import * as d3 from 'd3';
import data from '../../csv_files/13013356000.csv'; // Hard coded in...
import csv_p from '../../csv_files/Annotattion/P.csv';
import csv_q from '../../csv_files/Annotattion/Q.csv';
import csv_r from '../../csv_files/Annotattion/R.csv';
import csv_s from '../../csv_files/Annotattion/S.csv';
import csv_t from '../../csv_files/Annotattion/T.csv';


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
            t: '',
            max: 0,
            min: 0
        }
    }

    //Function to generalize the loading of annotation files
    //Since the logic for all 5 is the exact same
    //Receives a CSV file and an array for output
    //Processes the CSV file into the specified array
    //Returns nothing
    parseAnnotationCsv(inputCsv, outputArr)
    {
        var parsed_p = d3.csv(inputCsv).then(function(data)
        {
            return data;
        })

        parsed_p.then(function(data)
        {
            for(var i = 0; i < data.columns.length; i++)
            {
                outputArr.push(+data.columns[i]);
            }
        })
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

        //Define Min/Max trackers
        let max = 0;
        let min = 0;

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
                lead_i.push(data[i].I); if(max < data[i].I){max = data[i].I}; if(min > data[i].I){min = data[i].I};
                lead_ii.push(data[i].II); if(max < data[i].II){max = data[i].II}; if(min > data[i].II){min = data[i].II};
                lead_iii.push(data[i].III); if(max < data[i].III){max = data[i].III}; if(min > data[i].III){min = data[i].III};
                lead_avr.push(data[i].aVR); if(max < data[i].aVR){max = data[i].aVR}; if(min > data[i].aVR){min = data[i].aVR};
                lead_avl.push(data[i].aVL); if(max < data[i].aVL){max = data[i].aVL}; if(min > data[i].aVL){min = data[i].aVL};
                lead_avf.push(data[i].aVF); if(max < data[i].aVF){max = data[i].aVF}; if(min > data[i].aVF){min = data[i].aVF};
                lead_v1.push(data[i].V1); if(max < data[i].V1){max = data[i].V1}; if(min > data[i].V1){min = data[i].V1};
                lead_v2.push(data[i].V2); if(max < data[i].V2){max = data[i].V2}; if(min > data[i].V2){min = data[i].V2};
                lead_v3.push(data[i].V3); if(max < data[i].V3){max = data[i].V3}; if(min > data[i].V3){min = data[i].V3};
                lead_v4.push(data[i].V4); if(max < data[i].V4){max = data[i].V4}; if(min > data[i].V4){min = data[i].V4};
                lead_v5.push(data[i].V5); if(max < data[i].V5){max = data[i].V5}; if(min > data[i].V5){min = data[i].V5};
                lead_v6.push(data[i].V6); if(max < data[i].V6){max = data[i].V6}; if(min > data[i].V6){min = data[i].V6};
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
                v6: lead_v6,
                max: +max,
                min: +min
            })
        })

        //Parse and store all annotation data in the appropriate arrays
        this.parseAnnotationCsv(csv_p, annotation_p);
        this.parseAnnotationCsv(csv_q, annotation_q);
        this.parseAnnotationCsv(csv_r, annotation_r);
        this.parseAnnotationCsv(csv_s, annotation_s);
        this.parseAnnotationCsv(csv_t, annotation_t);

        //Update the state again now that annotation data is parsed
        this.setState({
                p: annotation_p,
                q: annotation_q,
                r: annotation_r,
                s: annotation_s,
                t: annotation_t
        })
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
					<GridItem inputArr={{data: this.state.i, title: "I", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, max: this.state.max, min: this.state.min}}/>
					<GridItem inputArr={{data: this.state.avl, title: "aVL", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, max: this.state.max, min: this.state.min}}/>
					<GridItem inputArr={{data: this.state.ii, title: "II", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, max: this.state.max, min: this.state.min}}/>
					<GridItem inputArr={{data: this.state.iii, title: "III", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, max: this.state.max, min: this.state.min}}/>
					<GridItem inputArr={{data: this.state.avf, title: "aVF", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, max: this.state.max, min: this.state.min}}/>
					<GridItem inputArr={{data: this.state.avr, title: "aVR", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, max: this.state.max, min: this.state.min}}/>
					<GridItem inputArr={{data: this.state.v1, title: "V1", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, max: this.state.max, min: this.state.min}}/>
					<GridItem inputArr={{data: this.state.v2, title: "V2", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, max: this.state.max, min: this.state.min}}/>
					<GridItem inputArr={{data: this.state.v3, title: "V3", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, max: this.state.max, min: this.state.min}}/>
					<GridItem inputArr={{data: this.state.v4, title: "V4", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, max: this.state.max, min: this.state.min}}/>
					<GridItem inputArr={{data: this.state.v5, title: "V5", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, max: this.state.max, min: this.state.min}}/>
					<GridItem inputArr={{data: this.state.v6, title: "V6", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, max: this.state.max, min: this.state.min}}/>
				</Grid>
			</div>
		);
	}
}


