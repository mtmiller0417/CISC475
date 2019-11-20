import React from "react";
import * as d3 from "d3";
import styles from "./FileExplorer.module.scss";
//import * as Items from '../../csv_files';
//import listReactFiles from 'list-react-files'

function buildFileSelector(){
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', 'multiple');
    return fileSelector;
}

export default class FileExplorer extends React.Component {
    componentDidMount(){
        this.fileSelector = buildFileSelector();
    }
    
    handleFileSelect = (e) => {
        e.preventDefault();
        let x = this.fileSelector.click();
    //console.log(x[0].files);
    }
    
    

    
    render(){
        return <a className="button" href="" onClick={this.handleFileSelect}>Select Files</a>
    }
}
