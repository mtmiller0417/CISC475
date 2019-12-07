import React from "react";
import styles from "./MainContainer.module.scss";
import grid_styles from "../Grid/Grid.module.scss"
import control_styles from "../ControlPanel/ControlPanel.module.scss"
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
import  KeyHandler,{ KEYPRESS } from 'react-key-handler';

let data = ""

export default class MainContainer extends React.Component {

    base64String = '';

	constructor(props){
        super(props);

        this.pRef = React.createRef();
        this.qRef = React.createRef();
        this.rRef = React.createRef();
        this.sRef = React.createRef();
        this.tRef = React.createRef();
        
        // Bind functions to 'this'
        this.dataCallBack = this.dataCallBack.bind(this)
        this.changeForm = this.changeForm.bind(this);
        this.setRadioButton = this.setRadioButton.bind(this);
        this.changeForm = this.changeForm.bind(this);

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
                selectedAnnotation: -1
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
        data = update
        this.parseData()
        this.setState({ data: update })
        this.forceUpdate();
    }

    //Function to generalize the loading of annotation files
    //Since the logic for all 5 is the exact same
    //Receives a CSV file and an array for output
    //Processes the CSV file into the specified array
    //Returns nothing
    parseAnnotationCsv(inputCsv){
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
            //this.parseData();
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
        //console.log(freq)

        const CONSTANT = 15
        const TIME = 10
        let winWidth = window.screen.width;
        let containerSize = winWidth * .95
        let actualWidth = containerSize - CONSTANT
        const boxesper10 = (TIME/0.2) 

        // Calculate the correct size of the box
        let side_length = Math.ceil(actualWidth/boxesper10) - 2
    
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
        context.stroke(); // Draw all the minor rectangles

        // Convert to base64 and set as variable
        this.base64String = canvas.toDataURL("grid_background/png"); 
    }

    parseData(){

        console.log('parseData() entered');
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
        console.log('parsing data csv');
        parsed_csv.then((data) => {
            let freq = Number(this.state.metadata.sampleBase);
            //console.log("data[0]");
            //console.log(data[0]);
            for(var i = 0; i < data.length; i++){
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
        console.log('componentWillMount()')
        // Parse the metaData
        this.parseMetaData();

        // Parse the data
        //this.parseData();

        // Parse the annotations
        this.parseAnnotations();
    }

    // Takes a number, not an event
    // The number should be from 0-4 and is gotten in the event from event.target.value
    // Theses are the values of the radioButtons and will tell which annotation set to add
    changeForm(value){
        this.setState({
            extra_info:{
                min: this.state.extra_info.min, 
                max: this.state.extra_info.max,
                selectedAnnotation: Number(value)
            }
        });
    }

    setRadioButton(event){
        // Check the selected button as well as make sure to call the 
        // function that changes the state to reflect the button change
        if(event.key === 'p'){
            this.pRef.current.checked = true;
            //this.pRef.current.focus();
            this.changeForm('0');
        }
        else if(event.key === 'q'){
            this.qRef.current.checked = true;
            //this.qRef.current.focus();
            this.changeForm('1');
        }
        else if(event.key === 'r'){
            this.rRef.current.checked = true;
            //this.rRef.current.focus();
            this.changeForm('2');
        }
        else if(event.key === 's'){
            this.sRef.current.checked = true;
            //this.sRef.current.focus();
            this.changeForm('3');
        }
        else if(event.key === 't'){
            this.tRef.current.checked = true;
            //this.tRef.current.focus();
            this.changeForm('4');
        } 
    }

    // <div ><b>aVL</b></div> // Use this if you want some more spacing between

       /**<div style={radioStyle} onChange={this.changeForm.bind(this)}>
                    <div style={{position:'absolute'}}>
                        P <input type="radio" value="0" name="annotation"/><br />
                        Q <input type="radio" value="1" name="annotation"/><br />
                        R <input type="radio" value="2" name="annotation"/><br />
                        S <input type="radio" value="3" name="annotation"/><br />
                        T <input type="radio" value="4" name="annotation"/><br />
                    </div>
                </div> */

	render() {
        // Style json for radio button
        const radioStyle= {
            position: 'sticky',
            marginLeft: -40,
            top: 50,
            width: 30,
            height: 10,
            fontWeight: 'bold'
        };

		return (
            <React.Fragment>

            <KeyHandler
                keyEventName={KEYPRESS}
                keyValue="p"
                onKeyHandle={this.setRadioButton}
            />
            <KeyHandler
                keyEventName={KEYPRESS}
                keyValue="q"
                onKeyHandle={this.setRadioButton}
            />
            <KeyHandler
                keyEventName={KEYPRESS}
                keyValue="r"
                onKeyHandle={this.setRadioButton}
            />
            <KeyHandler
                keyEventName={KEYPRESS}
                keyValue="s"
                onKeyHandle={this.setRadioButton}
            />
            <KeyHandler
                keyEventName={KEYPRESS}
                keyValue="t"
                onKeyHandle={this.setRadioButton}
            />

			<div className={styles.container}>
                <div className={styles.headerGrid}>
                    <Header />
                    <div className={styles.directions}>
                        <h2 className={styles.directionText}>Please select a file from the dropdown below</h2>
                    </div>
                </div>
                <div className={styles.metadataGrid}>
                    <Metadata metadata= {this.state.metadata}/>
                    <LoadData callBack={this.dataCallBack} className={styles.loadData}/>
                </div>

                <div style={radioStyle} onChange={(e) => this.changeForm(e.target.value)}>
                    <div style={{position:'absolute', fontWeight: 'bold'}}>ADD</div>
                    <br />
                    <div style={{position:'absolute', color: 'rgba(255,105,97,1)', marginTop: -10}}>
                        <input type="radio" ref={this.pRef} value="0" name="annotation"/> P
                    </div>
                    <br />
                    <div style={{position:'absolute', color: 'rgba(178,157,217,1)', marginTop: -20}}>
                        <input type="radio" ref={this.qRef} value="1" name="annotation"/> Q
                    </div>
                    <br />
                    <div style={{position:'absolute', color: 'rgba(255,180,71,1)', marginTop: -30}}>
                        <input type="radio" ref={this.rRef} value="2" name="annotation"/> R
                    </div>
                    <br />
                    <div style={{position:'absolute', color: 'rgba(88,148,156,1)', marginTop: -40}}>
                        <input type="radio" ref={this.sRef} value="3" name="annotation"/> S
                    </div>
                    <br />
                    <div style={{position:'absolute', color: 'rgba(133,222,119,1)', marginTop: -50}}>
                        <input type="radio" ref={this.tRef} value="4" name="annotation"/> T
                    </div>
                </div>

				<Grid >
                    <div className={styles.graphBackground} style = {{ backgroundImage: 'url('+this.base64String+')', backgroundRepeat: 'repeat'}}>
                    
					<GridItem inputArr={{data: this.state.i, title: "I", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, extra_info: this.state.extra_info, freq: this.state.metadata.sampleBase}}/>
					
                    <GridItem inputArr={{data: this.state.avl, title: "aVL", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, extra_info: this.state.extra_info, freq: this.state.metadata.sampleBase}}/>

                    <GridItem inputArr={{data: this.state.ii, title: "II", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, extra_info: this.state.extra_info, freq: this.state.metadata.sampleBase}}/>
					
                    <GridItem inputArr={{data: this.state.iii, title: "III", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, extra_info: this.state.extra_info, freq: this.state.metadata.sampleBase}}/>
					
                    <GridItem inputArr={{data: this.state.avf, title: "aVF", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, extra_info: this.state.extra_info, freq: this.state.metadata.sampleBase}}/>
					
                    <GridItem inputArr={{data: this.state.avr, title: "aVR", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, extra_info: this.state.extra_info, freq: this.state.metadata.sampleBase}}/>
					
                    <GridItem inputArr={{data: this.state.v1, title: "V1", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, extra_info: this.state.extra_info, freq: this.state.metadata.sampleBase}}/>
				
                    <GridItem inputArr={{data: this.state.v2, title: "V2", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, extra_info: this.state.extra_info, freq: this.state.metadata.sampleBase}}/>
				
                    <GridItem inputArr={{data: this.state.v3, title: "V3", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, extra_info: this.state.extra_info, freq: this.state.metadata.sampleBase}}/>
				
                    <GridItem inputArr={{data: this.state.v4, title: "V4", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, extra_info: this.state.extra_info, freq: this.state.metadata.sampleBase}}/>
				
                    <GridItem inputArr={{data: this.state.v5, title: "V5", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, extra_info: this.state.extra_info, freq: this.state.metadata.sampleBase}}/>
					
                    <GridItem inputArr={{data: this.state.v6, title: "V6", labels: this.state.labels, p: this.state.p, q: this.state.q, r: this.state.r, s: this.state.s, t: this.state.t, extra_info: this.state.extra_info, freq: this.state.metadata.sampleBase}}/>
                    </div>
                </Grid>
			</div>
            </React.Fragment>
		);
	}
}