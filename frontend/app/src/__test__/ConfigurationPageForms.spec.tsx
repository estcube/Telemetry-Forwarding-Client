import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import ConfigurationPage from '../Components/ConfigurationPage';

function renderConfPage() {
  return render(<ConfigurationPage />);
}

describe('ConfigurationPage MSC', () => {
  afterEach(cleanup);
  it('should display msc conf form', async () => {
    const mcsConfPage = renderConfPage();
    const mcsConfForm = await mcsConfPage.getByTestId('mcsConfForm');
    expect(mcsConfForm).toBeInTheDocument();
  });
});

describe('ConfigurationPage TNC', () => {
  afterEach(cleanup);
  it('should display msc conf form', async () => {
    const mcsConfPage = renderConfPage();
    const tncConfForm = await mcsConfPage.getByTestId('tncConfForm');
    expect(tncConfForm).toBeInTheDocument();
  });
});
