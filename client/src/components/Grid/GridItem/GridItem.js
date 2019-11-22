import React from 'react';
import styles from './GridItem.module.scss';
import Graph from '../../Graph'
import Modal from '../../Modal/Modal';

export default class GridItem extends React.Component {
  state = {
    show: false
  };
  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };
  render() {
    return(
      <div onClick={e => {this.showModal();}} className={styles.gridItem}>
        <Graph inputArr={this.props.inputArr}/>
        <Modal onClose={this.showModal} show={this.state.show} data="Hello" />
      </div>
    );
  }
}
