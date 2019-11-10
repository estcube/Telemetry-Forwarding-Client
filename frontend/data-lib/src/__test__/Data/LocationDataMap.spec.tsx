import * as React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import LocationDataMap from '../../Data/LocationDataMap';

function renderDataMapPage() {
  return render(<LocationDataMap />);
}

describe('Find map button and click it', () => {
  afterEach(cleanup);
  it('should see Show map', async () => {
    const page = renderDataMapPage();
    const result = await page.findByTestId('mapButton');
    expect(result).toHaveTextContent('Show map');
  });
  it('should click it and see Close map', async () => {
    const page = renderDataMapPage();
    fireEvent.click(page.getByText('Show map'));
    const result = await page.getByText('Close map');
    expect(result).toHaveTextContent('Close map');
  });
});

describe('Find map attribution', () => {
  afterEach(cleanup);
  it('should find map attribution', async () => {
    const page = renderDataMapPage();
    fireEvent.click(page.getByText('Show map'));
    const result = await page.findByTestId('leafletMap');
    expect(result).toBeInTheDocument();
  });
});
