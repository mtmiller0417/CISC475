import React from "react";
import styles from "./ControlPanel.module.scss";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

export default class ControlPanel extends React.Component {
	//classes = useStyles();

	render() {
		return (
			<div className={styles.controlPanel}>
				<div className={styles.controlGrid}>
					<h2 className={styles.controlHeader}>Control Panel</h2>
					<AddCircleIcon className={styles.controlButton} />
					<div className={styles.controlButtonText}>Add</div>
					<RemoveCircleIcon className={styles.controlButton} />
					<div className={styles.controButtonText}>Delete</div>
				</div>
			</div>
		);
	}
}
