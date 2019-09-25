import React from 'react';
import styles from './MainContainer.module.scss';

export default class MainContainer extends React.Component {
  render() {
    return(
      <div className={styles.container}>
        {
          // Here, we are using the prop 'message' that we passed in from App.js
        }
        <h1>{this.props.message}</h1>
      </div>
    );
  }
}