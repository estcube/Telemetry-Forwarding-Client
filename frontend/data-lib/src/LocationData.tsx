import React from 'react';
// @ts-ignore
import {Box} from '@material-ui/core';
// @ts-ignore
import { createStyles, makeStyles } from '@material-ui/core/styles';
import SignalDataAcquisition from './locationData/SignalDataAcquisition';
import SignalDataLossAndLoc from './locationData/SignalDataLossAndLoc';
import LocationMapContainer from './locationData/LocationMapContainer';

const LocationData = () => {

  const useStyles = makeStyles(() =>
    createStyles({
      map: {
        width: '100%',
        textAlign: 'center'
      },
    }),
  );

  const classes = useStyles();

  return(
    <div>
      <Box p={1} bgcolor="grey.300" display="flex" flexDirection="column">
        <Box p={1} bgcolor="grey.200" width="auto">
          <SignalDataAcquisition />
        </Box>
        <Box p={1} bgcolor="grey.200" display="flex" flexDirection="row">
          <Box p={1} bgcolor="grey.200" width="100%">
            <SignalDataLossAndLoc />
          </Box>
        </Box>
        <Box pb={1} bgcolor="grey.200" display="flex" flexDirection="row">
          <Box bgcolor="grey.200" width="auto" className={classes.map}>
            <LocationMapContainer />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default LocationData;