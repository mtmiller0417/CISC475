import React from 'react';
import styles from './GridItem.module.scss';
import Graph from '../../Graph'

export default class GridItem extends React.Component {
  render() {
    return(
      <div className={styles.gridItem}>
        <Graph inputArr={this.props.inputArr}/>
      </div>
    );
  }
}
