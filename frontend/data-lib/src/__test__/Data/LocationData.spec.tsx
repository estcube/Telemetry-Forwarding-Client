import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import LocationData from '../../Data/LocationData';

function renderLocationDataPage() {
  return render(<LocationData />);
}

describe('Find locationSignalData class', () => {
  afterEach(cleanup);
  it('should locationSignalData class', async () => {
    const page = renderLocationDataPage();
    const result = await page.findByTestId('locationSignalData');
    expect(result).toBeInTheDocument();
  });
});

describe('Find locationDataParams class', () => {
  afterEach(cleanup);
  it('should find locationDataParams class', async () => {
    const page = renderLocationDataPage();
    const result = await page.findByTestId('locationDataParams');
    expect(result).toBeInTheDocument();
  });
});

describe('Find locationDataMap class', () => {
  afterEach(cleanup);
  it('should find locationDataMap class', async () => {
    const page = renderLocationDataPage();
    const result = await page.findByTestId('locationDataMap');
    expect(result).toBeInTheDocument();
  });
});
