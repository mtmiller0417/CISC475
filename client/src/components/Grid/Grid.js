import React from 'react';
import styles from './Grid.module.scss';

export default class Grid extends React.Component {
  render() {
    return(
      <div className={styles.grid}>
        {this.props.children}
      </div>
    );
  }
}