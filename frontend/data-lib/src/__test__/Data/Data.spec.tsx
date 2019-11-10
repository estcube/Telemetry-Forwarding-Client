import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import Data from '../../Data/Data';

function renderDataPage() {
  return render(<Data />);
}

describe('Find time-location-map class', () => {
  afterEach(cleanup);
  it('should find time-location-map class', async () => {
    const dataPage = renderDataPage();
    const timeLocationMapInDocument = await dataPage.findByTestId('time-location-map');
    expect(timeLocationMapInDocument).toBeInTheDocument();
  });
});

describe('Find satellite-data class', () => {
  afterEach(cleanup);
  it('should find satellite-data class', async () => {
    const dataPage = renderDataPage();
    const satelliteDataInDocument = await dataPage.findByTestId('satellite-data');
    expect(satelliteDataInDocument).toBeInTheDocument();
  });
});
