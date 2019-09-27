import React from 'react'
//import {csv} from 'd3-fetch'
//import GridItem from '../Grid/GridItem/GridItem';
import styles from '../Grid/GridItem/GridItem.module.scss';

export default class Metadata extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            //filePath: null,
            //csvData: csv(filePath),
            patientID: null,
            scanID: null,
            gender: null,
            age: null,
            race: null,
            height: null,
            weight: null,
            acquisitionDateTime: null,
            sampleBase: null
        }
    }

    render(){
        return(
            <div className={styles.gridItem}>
                Hello World!
            </div>
        )
    }
}