import React from "react";
import styles from "./MainContainer.module.scss";
import Grid from "../Grid/Grid";
import GridItem from "../Grid/GridItem/GridItem";
import Metadata from "../Metadata/Metadata";
import Header from "../Header/Header";
import ControlPanel from "../ControlPanel/ControlPanel";

export default class MainContainer extends React.Component {
	render() {
		return (
			<div className={styles.container}>
				<Grid>
					<Header />
					<Metadata />
					<ControlPanel />
				</Grid>

				<Grid>
					<GridItem />
					<GridItem />
					<GridItem />
					<GridItem />
					<GridItem />
					<GridItem />
					<GridItem />
					<GridItem />
					<GridItem />
					<GridItem />
					<GridItem />
					<GridItem />
				</Grid>
			</div>
		);
	}
}
