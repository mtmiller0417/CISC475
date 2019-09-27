import React from 'react';
import styles from './MainContainer.module.scss';
import Grid from '../Grid/Grid';
import GridItem from '../Grid/GridItem/GridItem';

export default class MainContainer extends React.Component {
  render() {
    return(
      <div className={styles.container}>
           <Grid>
           <GridItem />
           <GridItem />
           <GridItem />
           <GridItem />
           <GridItem />
           <GridItem />
           <GridItem />
           <GridItem />
           <GridItem />
           <GridItem />
           <GridItem />
           <GridItem />
           </Grid>
      </div>
    );
  }
}
