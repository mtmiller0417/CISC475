import React from 'react';
import styles from './GridItem.module.scss';

export default class GridItem extends React.Component {
  render() {
    return(
      <div class={styles.gridItem}>
        Grid Item
      </div>
    );
  }
}