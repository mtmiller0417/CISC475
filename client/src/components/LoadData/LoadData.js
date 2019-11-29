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

        const {callBack} = this.props
        
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
    
    importAnnotations(csv_name){
        // Following line gets new CSV name without ./ and .csv (returned by importAll)
        let csv_spliced = csv_name.slice(2, csv_name.length - 4)
        
        // Set Leads (Index 0: P, Index 1: Q, R, S, T)
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
        
        // Get full list of annotations
        let annotations = this.importAll(require.context('../../annotations', false,  /\.csv$/));
        
        let correct_a = [];
        
        // Correct_a saves annotations for the correct graph
        annotations.forEach(element => {
                            if(element.includes(csv_spliced, 0)){
                               correct_a.push(element)
                            
                            }
                            });
        
        correct_a.forEach(element => {
                          if(element.includes("I", 0)){
                                lead_i.push(element)
                          } else if(element.includes("aVL", 0)){
                                lead_avl.push(element)
                          } else if(element.includes("II", 0)){
                                lead_ii.push(element)
                          } else if(element.includes("III", 0)){
                                lead_iii.push(element)
                          } else if(element.includes("aVF", 0)){
                                lead_avf.push(element)
                          } else if(element.includes("aVR", 0)){
                                lead_avr.push(element)
                          } else if(element.includes("V1", 0)){
                                lead_v1.push(element)
                          } else if(element.includes("V2", 0)){
                                lead_v2.push(element)
                          } else if(element.includes("V3", 0)){
                                lead_v3.push(element)
                          } else if(element.includes("V4", 0)){
                                lead_v4.push(element)
                          } else if(element.includes("V5", 0)){
                                lead_v5.push(element)
                          } else if(element.includes("V6", 0)){
                                lead_v6.push(element)
                          }
                    })
        
        // Sorts them in alphabetical order, so they match (P,Q,R,S,T indices)
        lead_i.sort()
        lead_ii.sort()
        lead_iii.sort()
        lead_avl.sort()
        lead_avf.sort()
        lead_avr.sort()
        lead_v1.sort()
        lead_v2.sort()
        lead_v3.sort()
        lead_v4.sort()
        lead_v5.sort()
        lead_v6.sort()
        
        let all_annotations = [lead_i, lead_avl, lead_ii, lead_iii, lead_avf, lead_avr, lead_v1, lead_v2, lead_v3, lead_v4, lead_v5, lead_v6]
    
        return all_annotations
    }
    
    
    // Sets state for options, and handles which CSV is loaded upon selection
    state = {
    selectedOption: null,
    };
    handleChange = selectedOption => {
        this.setState(
                      { selectedOption },
                      () => this.props.callBack(this.state.selectedOption.value, this.importAnnotations(this.state.selectedOption.label))
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

