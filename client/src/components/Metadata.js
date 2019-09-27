import React from 'react'
import {csv} from 'd3-fetch'
import GridItem from './Grid/GridItem/GridItem';

class Metadata extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filePath: null,
            csvData: csv(filePath),
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
            <div className="metadata">
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
                </Grid>
            </div>
        )
    }
}