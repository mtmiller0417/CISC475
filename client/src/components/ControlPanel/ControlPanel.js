import React from "react";
import styles from "./ControlPanel.module.scss";

export default class ControlPanel extends React.Component {
	render() {
		return (
			<div className={styles.controlPanel}>
				<div className={styles.controlGrid}>
					<h2 className={styles.controlHeader}>Control Panel</h2>
					<div className={styles.controlButtonText}>Move</div>
					<div className={styles.controlButtonText}>Add</div>
					<div className={styles.controlButtonText}>Delete</div>
					<div className={styles.controlButton}>MoveButton</div>
					<div className={styles.controlButton}>AddButton</div>
					<div className={styles.controlButton}>DeleteButton</div>
				</div>
			</div>
		);
	}
}
