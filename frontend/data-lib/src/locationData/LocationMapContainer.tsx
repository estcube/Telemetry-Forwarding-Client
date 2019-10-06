import React, {useState} from 'react';
// @ts-ignore
import { createStyles, makeStyles } from '@material-ui/core/styles';
// @ts-ignore
import {Button} from '@material-ui/core';
import {LocationMap} from '../locationMap/LocationMap';

const LocationMapContainer = () => {

  const [mapOpened, setMapOpened] = useState(false);

  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        width: '100%',
        textAlign: 'center'
      },
    }),
  );

  const classes = useStyles();

  let map;
  if (mapOpened) {
    map = <LocationMap />;
  } else {
    map = null;
  }

  return(
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={() => setMapOpened(!mapOpened)}>
            Show map
      </Button>
      {map}
    </div>
  );
};

export default LocationMapContainer;