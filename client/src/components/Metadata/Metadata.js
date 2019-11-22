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

	// Can not call this.setState b/c this method is static
	static getDerivedStateFromProps(next_props, prev_state){
		let props = next_props.metadata;

		// The state is set from what is returned from this
		// This also causes a re-render of the new information
		return{
			patientID: props.patientID,
			scanID: props.scanID,
			gender: props.gender,
			age: props.age,
			race: props.race,
			height: props.height,
			weight: props.weight,
			acquisitionDateTime: props.acquisitionDateTime,
			sampleBase: props.sampleBase
		}
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
