import React from 'react';
// @ts-ignore
import {Box} from '@material-ui/core';
import SatelliteDataCharts from './satelliteData/SatelliteDataCharts';
import SatelliteDataTable from './satelliteData/SatelliteDataTable';

const SatelliteData = () => {
  return(
    <div>
      <Box display="flex" flexDirection="row" bgcolor="grey.400" width="100%">
        <Box m={1} p={1} bgcolor="grey.200" width="100%">
          <SatelliteDataCharts />
        </Box>
        <Box m={1} p={1} bgcolor="grey.200" width="100%">
          <SatelliteDataTable />
        </Box>
      </Box>
    </div>
  );
};

export default SatelliteData;