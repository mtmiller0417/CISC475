import React from 'react';
import styles from './Grid.module.scss';

/**
 * This component sets up the outer grid which holds 12 griditem components, 
 * one for each lead being displayed. 
 */
export default class Grid extends React.Component {
  render() {
    return(
      <div className={styles.grid}>
        {this.props.children}
      </div>
    );
  }
}