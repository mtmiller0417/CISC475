import React from 'react';
import styles from './GridItem.module.scss';
import Graph from '../../Graph'

/**
 * This component defines the individual GridItem which contains a Graph component
 * That is used to graph and display the scan and annotation data for each lead
 */
export default class GridItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      width: 0
    }
  };

  /**
   * Method that dynamically calculates window width and sets it to a state value
   * Which is later used in Graph.js to size and display the background ECG grid
   * 
   * componentDidMount() is a React method which handles when the resulting code
   * will be called. Additional information is available in the React docs
   */
  componentDidMount(){
    let node = this.refs["reference"]
    let nodeStyle = window.getComputedStyle(node)
    let widthStr = nodeStyle.getPropertyValue('width')
    let width = Number(widthStr.slice(0, -2)) // Converts string 1650px to number 1650
    //console.log('width')
    //console.log(width)
    this.setState({
      width: width
    });
  }

  render() {
    return(
      <div ref="reference" className={styles.gridItem}>
        <Graph inputArr={this.props.inputArr} width={this.state.width}/>
      </div>
    );
  }
}
