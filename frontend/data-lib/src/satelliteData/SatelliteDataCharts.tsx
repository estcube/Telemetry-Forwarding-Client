import React from 'react';
// @ts-ignore
// eslint-disable-next-line no-unused-vars
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const SatelliteDataCharts = () => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: '100%',
      },
      sampleImage: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
        width: '100%',
        height: 'auto'
      }
    }),
  );

  const classes = useStyles();

  return(
    <div className={classes.root}>
      Sample responsive chart/picture
      <img className={classes.sampleImage} src="https://en.es-static.us/upl/2019/05/spacewalks-chart.jpg" alt="sampleGraph"/>
    </div>
  );
};

export default SatelliteDataCharts;