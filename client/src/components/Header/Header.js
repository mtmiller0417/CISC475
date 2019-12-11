import React from 'react';
import styles from './Header.module.scss';

/**
 * Simple component which defines the header text for the application page
 */
export default class Header extends React.Component{
    render() {
        return(
            <div className={styles.header}>
                <h2 className={styles.headerText}>ECG Annotator</h2>
            </div>
        )
    }
}