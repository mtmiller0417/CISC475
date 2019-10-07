import React from 'react';
import styles from './Header.module.scss';

export default class Header extends React.Component{
    render() {
        return(
            <div className={styles.header}>
                <h1 className={styles.headerText}>ECG Annotator</h1>
            </div>
        )
    }
}