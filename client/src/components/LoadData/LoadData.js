import React from "react";
import * as d3 from "d3";
import styles from "./LoadData.module.scss";
import Select from 'react-select';
//import MainContainer from "../MainContainer/MainContainer";
//import files from '../../csv_files'
//import * as Items from '../../csv_files';
//import listReactFiles from 'list-react-files'
var file_list = [];
var file_names = [];
const options = [];




export default class LoadData extends React.Component {
    
    // Loads first CSV and imports the list of CSVs
    constructor(props) {
        super(props);
    
        file_list = this.importAll(require.context('../../csv_files', false,  /\.csv$/));
        var file_string = this.importAllNames(require.context('../../csv_files', false,  /\.csv$/));
        console.log("File String:" + file_string);
        //file_names = file_string.split("/");

        const {callBack} = this.props
        //callBack(file_list[1])
        
        for(var i = 0; i < file_list.length; i++){
            options.push({ label: file_string[i], value: file_list[i]});
        }
        
    }
    
    // Imports list of CSV files
    importAll(r) {
        return r.keys().map(r);
    }
    
    // Imports list of CSV file names (readable), to be used for selection
    importAllNames(r){
        return r.keys();
    }
    
    
    // Sets state for options, and handles which CSV is loaded upon selection
    state = {
    selectedOption: null,
    };
    handleChange = selectedOption => {
        this.setState(
                      { selectedOption },
                      () => this.props.callBack(this.state.selectedOption.value)
                      );
    };
    
    // Renders the selectable list at the top
    render () {
        const { selectedOption } = this.state;
        const { file_names } = this.state;
        
        return (
                <div>
                <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                />
                </div>
                );
    }
}

