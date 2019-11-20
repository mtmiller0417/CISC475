import React from "react";
import * as d3 from "d3";
import styles from "./LoadData.module.scss";
//import MainContainer from "../MainContainer/MainContainer";
//import files from '../../csv_files'
//import * as Items from '../../csv_files';
//import listReactFiles from 'list-react-files'
var file_list = [];
//var file_names = [];

export default class LoadData extends React.Component {
    
     importAll(r) {
        return r.keys().map(r);
        //r.keys().forEach(module => { files.push(r(module).default) });
        // r.keys().map((item, index) => { files[item.replace('./', '')] = r(item); });
    }
    
    importAllNames(r){
        let files = [];
    }
    
    constructor(props) {
        super(props);
    
        file_list = this.importAll(require.context('../../csv_files', false,  /\.csv$/));

        const {callBack} = this.props
        callBack(file_list[2])
        
        let x = file_list.toString()
        console.log(x);
        
        this.state = {
            file_names: file_list
            };
    }
    
    componentDidMount() {
        this.setState({
                      file_names: file_list
        });
    }
    
    
    render () {
        const { file_names } = this.state;
        let file_s = file_names.length > 0
        && file_names.map((item, i) => {
                         return (
                                <option>{file_list[i]}</option>
                                 )
                         }, this);
        
        return (
                <div>
                <select>
                {file_s}
                </select>
                </div>
                );
    }
}

