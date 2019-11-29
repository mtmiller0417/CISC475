import React from 'react';
import styles from './GridItem.module.scss';
import Graph from '../../Graph'

export default class GridItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      width: 0
    }
  };

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
      console.log("hello:" + this.props.inputArr.annotations)
    return(
      <div ref="reference" className={styles.gridItem}>
        <Graph inputArr={this.props.inputArr} width={this.state.width}/>
      </div>
    );
  }
}
