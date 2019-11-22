import React from "react";
import styles from "./MainContainer.module.scss";
import grid_styles from "../Grid/Grid.module.scss"
import Grid from "../Grid/Grid";
import GridItem from "../Grid/GridItem/GridItem";
import Metadata from "../Metadata/Metadata";
import metaData from "../Metadata/meta.csv"
import LoadData from "../LoadData/LoadData";
import Header from "../Header/Header";
import ControlPanel from "../ControlPanel/ControlPanel";
import * as d3 from 'd3';
import csv_p from '../../csv_files/Annotattion/P.csv';
import csv_q from '../../csv_files/Annotattion/Q.csv';
import csv_r from '../../csv_files/Annotattion/R.csv';
import csv_s from '../../csv_files/Annotattion/S.csv';
import csv_t from '../../csv_files/Annotattion/T.csv';
//import Canvas from 'canvas'
import { fontWeight } from "@material-ui/system";

let data = ""

export default class MainContainer extends React.Component {

    base64String = '';

	constructor(props){
        super(props);
        
        // Bind callback function, used in LoadData
        this.dataCallBack = this.dataCallBack.bind(this)

        // Set initial state 
        this.state={
            labels: [],
            i: '', ii: '', iii: '',
            avr: '', avl: '', avf: '',
            v1: '', v2: '', v3: '', v4: '', v5: '', v6: '',
            p: '', q: '', r: '', s: '', t: '', 
            extra_info: {
                min: 0, 
                max: 0, 
            },
            metadata: {
                patientID: 0,
			    scanID: 0,
			    gender: '',
			    age: 0,
			    race: '',
			    height: 0,
			    weight: 0,
			    acquisitionDateTime: '',
			    sampleBase: 0
            }
        }
    }
    
    // Callback function passed to LoadData, to get which CSV to load in
    dataCallBack(update){
        console.log(update)
        data = update
        this.parseData()
        this.setState({
                      data: update
                      })
        
       this.forceUpdate();
    }

    //Function to generalize the loading of annotation files
    //Since the logic for all 5 is the exact same
    //Receives a CSV file and an array for output
    //Processes the CSV file into the specified array
    //Returns nothing
    parseAnnotationCsv(inputCsv)
    {
        var parsed_val = d3.text(inputCsv, function(text) {
                var data = d3.csv.parseRows(text, function(d) {
                                            return d.map(Number);
                                            });
                });
        
        return parsed_val.then(data => {
                               return data.split(',').map(function(item){
                                            return parseInt(item,10);
                                                                    })
                                            });
    }

    parseMetaData(){
        let ecg_ID = [];
		let patient_ID = [];
		let gender = [];
		let race = [];
		let age = [];
		let height = [];
		let weight = [];
		let ac_Date = [];
		let ac_Time = [];
        let sample_base = [];
        
        var metadata = d3.csv(metaData, function(metaData) {
			return {
				ECGID: metaData["ECG ID"],
				PatientID: metaData["Patient ID"],
				Gender: metaData["Gender"],
				Race: metaData["Race"],
				Age: metaData["Age"],
				Height: metaData["Height (in)"],
				Weight: metaData["Weight "],
				AcquisitionDate: metaData["Acquisition Date"],
				AcquisitionTime: metaData["Acquisition Time"],
				SampleBase: metaData["Sample Base"]
			};
        });
        metadata.then(data => {

			ecg_ID.push(data[1].ECGID);
			patient_ID.push(data[1].PatientID);
			gender.push(data[1].Gender);
			race.push(data[1].Race);
			age.push(data[1].Age);
			height.push(data[1].Height);
			weight.push(data[1].Weight);
			ac_Date.push(data[1].AcquisitionDate);
			ac_Time.push(data[1].AcquisitionTime);
			sample_base.push(data[1].SampleBase);

			this.setState({
                metadata: {
				    patientID: patient_ID[0],
				    scanID: ecg_ID[0],
				    gender: gender[0],
				    age: age[0],
				    race: race[0],
				    height: height[0],
				    weight: weight[0],
				    acquisitionDateTime: ac_Date[0] + " @ " + ac_Time[0],
                    sampleBase: sample_base[0]
                }
            });
            
            // Reparse the data bc the frequency has been updated...
            this.parseData();
            this.createBackgroundImage(this.state.metadata.sampleBase)

		});
    }

    createData(type, mimetype) {
        return {
            type:type,
            value:mimetype
        }
    }

    createBackgroundImage(freq){
        let canvas = document.createElement('canvas');
        console.log(freq)

        const CONSTANT = 15
        const TIME = 10
        let winWidth = window.screen.width;
        let containerSize = winWidth * .95
        let actualWidth = containerSize - CONSTANT
        const boxesper10 = (TIME/0.2) 


        // Calculate the correct size of the box
        let side_length = Math.ceil(actualWidth/boxesper10) - 2//34\
        console.log("side_length")
        console.log(side_length)
    
        canvas.height = side_length;
        canvas.width = side_length;

        let context = canvas.getContext("2d");
        context.lineWidth = 0.75;
        context.strokeStyle = "gray";
        context.rect(0,0,side_length,side_length); // x-pos,y-pos,width,height
        context.stroke(); // Draw the main rectangle

        // Change line settings for minor ticks
        context.lineWidth = 0.5;
        context.strokeStyle = "lightgray";

        // One main tick is 0.2s, each minor is 0.04 so there are 5 minor ticks to 1 major tick
        let unit = side_length/5;
        // Loop through and fill the big square with small squares
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                if(i > 0){
                    context.rect(i*unit,j*unit,unit, unit) // x-pos,y-pos,width,height
                } else {
                    context.rect(i*unit,j*unit,unit, unit) // x-pos,y-pos,width,height
                }
            }
        }
        //context.stroke(); // Draw all the minor rectangles

        // Convert to base64 and set as variable
        this.base64String = canvas.toDataURL("grid_background/png"); 
        console.log()
    }

    parseData(){

        //Define arrays
        let lead_i = [];
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

        /*let annotation_p = [];
         let annotation_q = [];
         let annotation_r = [];
         let annotation_s = [];
         let annotation_t = [];*/
        let labels = [];
        
        //Define Min/Max trackers
        let max = 0;
        let min = 0;
        var parsed_csv = d3.csv(data, function(d)
                                {
                                //console.log(this.state.data)
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
        parsed_csv.then((data) => {
            let freq = Number(this.state.metadata.sampleBase);

            for(var i = 0; i < data.length; i++)
            {
                labels.push(i);
                // Way to create scatterplot data
                lead_i.push({
                    x:(i * 1/freq),
                    y:data[i].I
                });
                lead_ii.push({
                    x:(i * 1/freq),
                    y:data[i].II
                });
                lead_iii.push({
                    x:(i * 1/freq),
                    y:data[i].III
                });
                lead_avr.push({
                    x:(i * 1/freq),
                    y:data[i].aVR
                });
                lead_avl.push({
                    x:(i * 1/freq),
                    y:data[i].aVL
                });
                lead_avf.push({
                    x:(i * 1/freq),
                    y:data[i].aVF
                });
                lead_v1.push({
                   x:(i * 1/freq),
                    y:data[i].V1
                });
                lead_v2.push({
                    x:(i * 1/freq),
                    y:data[i].V2
                });
                lead_v3.push({
                    x:(i * 1/freq),
                    y:data[i].V3
                });
                lead_v4.push({
                    x:(i * 1/freq),
                    y:data[i].V4
                });
                lead_v5.push({
                   x:(i * 1/freq),
                    y:data[i].V5
                });
                lead_v6.push({
                    x:(i * 1/freq),
                    y:data[i].V6
                });

                // Check for max / min for each array

                if (lead_i[i].y < min){ min = lead_i[i].y }
                if (lead_i[i].y > max){ max = lead_i[i].y }

                if (lead_ii[i].y < min){ min = lead_ii[i].y }
                if (lead_ii[i].y > max){ max = lead_ii[i].y }

                if (lead_iii[i].y < min){ min = lead_iii[i].y }
                if (lead_iii[i].y > max){ max = lead_iii[i].y }

                if (lead_avr[i].y < min){ min = lead_avr[i].y }
                if (lead_avr[i].y > max){ max = lead_avr[i].y }

                if (lead_avl[i].y < min){ min = lead_avl[i].y }
                if (lead_avl[i].y > max){ max = lead_avl[i].y }

                if (lead_avl[i].y < min){ min = lead_avl[i].y }
                if (lead_avl[i].y > max){ max = lead_avl[i].y }

                if (lead_avf[i].y < min){ min = lead_avf[i].y }
                if (lead_avf[i].y > max){ max = lead_avf[i].y }

                if (lead_v1[i].y < min){ min = lead_v1[i].y }
                if (lead_v1[i].y > max){ max = lead_v1[i].y }

                if (lead_v2[i].y < min){ min = lead_v2[i].y }
                if (lead_v2[i].y > max){ max = lead_v2[i].y }

                if (lead_v3[i].y < min){ min = lead_v3[i].y }
                if (lead_v3[i].y > max){ max = lead_v3[i].y }

                if (lead_v4[i].y < min){ min = lead_v4[i].y }
                if (lead_v4[i].y > max){ max = lead_v4[i].y }

                if (lead_v5[i].y < min){ min = lead_v5[i].y }
                if (lead_v5[i].y > max){ max = lead_v5[i].y }

                if (lead_v6[i].y < min){ min = lead_v6[i].y }
                if (lead_v6[i].y > max){ max = lead_v6[i].y }

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
                extra_info: {
                    min: min, 
                    max: max
                }
            })
        })
    }

    parseAnnotations(){
        this.parseAnnotationCsv(csv_p).then(data => {
            this.setState({
                p: data
            })
        })
        this.parseAnnotationCsv(csv_q).then(data => {
            this.setState({
                q: data
            })
        })
        this.parseAnnotationCsv(csv_r).then(data => {
            this.setState({
                r: data
            })
        })
        this.parseAnnotationCsv(csv_s).then(data => {
            this.setState({
                s: data
            })
        })
        this.parseAnnotationCsv(csv_t).then(data => {
            this.setState({
                t: data
            })
        })
    }

    componentWillMount(){

        // Parse the metaData
        this.parseMetaData();

        // Parse the data
        this.parseData();

        // Parse the annotations
        this.parseAnnotations();
    }
	
	render() {
		return (
			<div className={styles.container}>
				<Grid>
                    <LoadData callBack={this.dataCallBack}/>
					<Header />
				</Grid>

				<Grid >
                    <Metadata metadata= {this.state.metadata}/>
                    <div className={styles.graphBackground} style = {{ backgroundImage: 'url('+this.base64String+')', backgroundRepeat: 'repeat'}}>
                    <div><b>I</b></div>
					<GridItem inputArr={{data: this.state.i, title: "I", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, extra_info: this.state.extra_info, freq: this.state.metadata.sampleBase}}/>
					<div ><b>aVL</b></div>
                    <GridItem inputArr={{data: this.state.avl, title: "aVL", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, extra_info: this.state.extra_info, freq: this.state.metadata.sampleBase}}/>
                    <div><b>II</b></div>
                    <GridItem inputArr={{data: this.state.ii, title: "II", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, extra_info: this.state.extra_info, freq: this.state.metadata.sampleBase}}/>
					<div><b>III</b></div>
                    <GridItem inputArr={{data: this.state.iii, title: "III", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, extra_info: this.state.extra_info, freq: this.state.metadata.sampleBase}}/>
					<div><b>aVF</b></div>
                    <GridItem inputArr={{data: this.state.avf, title: "aVF", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, extra_info: this.state.extra_info, freq: this.state.metadata.sampleBase}}/>
					<div><b>aVR</b></div>
                    <GridItem inputArr={{data: this.state.avr, title: "aVR", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, extra_info: this.state.extra_info, freq: this.state.metadata.sampleBase}}/>
					<div><b>V1</b></div>
                    <GridItem inputArr={{data: this.state.v1, title: "V1", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, extra_info: this.state.extra_info, freq: this.state.metadata.sampleBase}}/>
					<div><b>V2</b></div>
                    <GridItem inputArr={{data: this.state.v2, title: "V2", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, extra_info: this.state.extra_info, freq: this.state.metadata.sampleBase}}/>
					<div><b>V3</b></div>
                    <GridItem inputArr={{data: this.state.v3, title: "V3", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, extra_info: this.state.extra_info, freq: this.state.metadata.sampleBase}}/>
					<div><b>V4</b></div>
                    <GridItem inputArr={{data: this.state.v4, title: "V4", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, extra_info: this.state.extra_info, freq: this.state.metadata.sampleBase}}/>
					<div><b>V5</b></div>
                    <GridItem inputArr={{data: this.state.v5, title: "V5", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, extra_info: this.state.extra_info, freq: this.state.metadata.sampleBase}}/>
					<div><b>V6</b></div>
                    <GridItem inputArr={{data: this.state.v6, title: "V6", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, extra_info: this.state.extra_info, freq: this.state.metadata.sampleBase}}/>
                    </div>
                </Grid>
			</div>
		);
	}
}