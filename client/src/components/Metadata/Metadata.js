import React from "react";
import * as d3 from "d3";
import data from "./meta.csv";
import styles from "./Metadata.module.scss";

export default class Metadata extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			patientID: 0,
			scanID: 0,
			gender: '',
			age: 0,
			race: '',
			height: 0,
			weight: 0,
			acquisitionDateTime: '',
			sampleBase: 0
		};
	}

	componentWillMount() {
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

		var csvData = d3.csv(data, function(data) {
			return {
				ECGID: data["ECG ID"],
				PatientID: data["Patient ID"],
				Gender: data["Gender"],
				Race: data["Race"],
				Age: data["Age"],
				Height: data["Height (in)"],
				Weight: data["Weight "],
				AcquisitionDate: data["Acquisition Date"],
				AcquisitionTime: data["Acquisition Time"],
				SampleBase: data["Sample Base"]
			};
		});

		csvData.then(data => {
			//console.log(data);

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
				patientID: patient_ID,
				scanID: ecg_ID,
				gender: gender,
				age: age,
				race: race,
				height: height,
				weight: weight,
				acquisitionDateTime: ac_Date + " @ " + ac_Time,
				sampleBase: sample_base
			});
		});
	}

	render() {
		return (
			<div className={styles.metadata}>
				<h4 className={styles.metadataHeader}>Patient Information</h4>
				<div className={styles.metadataGrid}>
					<div className={styles.metadataInfo}>
						<b>Patient ID:</b> {this.state.patientID}
					</div>
					<div className={styles.metadataInfo}>
						<b>ECG ID:</b> {this.state.scanID}
					</div>
					<div className={styles.metadataInfo}>
						<b>Gender:</b> {this.state.gender}
					</div>
					<div className={styles.metadataInfo}>
						<b>Age:</b> {this.state.age}
					</div>
					<div className={styles.metadataInfo}>
						<b>Race:</b> {this.state.race}
					</div>
					<div className={styles.metadataInfo}>
						<b>Height:</b> {this.state.height}
					</div>
					<div className={styles.metadataInfo}>
						<b>Weight:</b> {this.state.weight}
					</div>
					<div className={styles.metadataInfo}>
						<b>Acquistion Date/Time:</b>{" "}
						{this.state.acquisitionDateTime}
					</div>
					<div className={styles.metadataInfo}>
						<b>Sample Base:</b> {this.state.sampleBase}
					</div>
				</div>
			</div>
		);
	}
}
