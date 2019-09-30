import React from 'react'
import {csv} from 'd3-fetch'
import Grid from '../Grid/Grid';
import styles from './Metadata.module.scss';

export default class Metadata extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            csvData: csv('').then(function(data){
                console.log(data);
            }),
            patientID: 123456789,
            scanID: 987654321,
            gender: "Male",
            age: 21,
            race: "Caucasian",
            height: 70 + " inches",
            weight: 145 + " pounds",
            acquisitionDateTime: "27 September 2019 19:41",
            sampleBase: 500
        }
    }

    render(){
        return(
            <div className={styles.metadata}>
                <Grid>
                    <h4 className={styles.metadataHeader}>Patient Metadata</h4>
                    <div className={styles.metadataInfo}><b>Patient ID:</b> {this.state.patientID}</div>
                    <div className={styles.metadataInfo}><b>ECG ID:</b> {this.state.scanID}</div>
                    <div className={styles.metadataInfo}><b>Gender:</b> {this.state.gender}</div>
                    <div className={styles.metadataInfo}><b>Age:</b> {this.state.age}</div>
                    <div className={styles.metadataInfo}><b>Race:</b> {this.state.race}</div>
                    <div className={styles.metadataInfo}><b>Height:</b> {this.state.height}</div>
                    <div className={styles.metadataInfo}><b>Weight:</b> {this.state.weight}</div>
                    <div className={styles.metadataInfo}><b>Acquistion Date/Time:</b> {this.state.acquisitionDateTime}</div>
                    <div className={styles.metadataInfo}><b>Sample Base:</b> {this.state.sampleBase}</div>
                </Grid>
            </div>
        )
    }
}