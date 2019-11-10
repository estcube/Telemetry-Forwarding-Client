import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import ConfigurationPage from '../../Components/ConfigurationPage';

function renderConfPage() {
  return render(<ConfigurationPage />);
}

describe('ConfigurationPage', () => {
  afterEach(cleanup);
  it('should find configuration div', async () => {
    const mcsConfPage = renderConfPage();
    const mcsConfForm = await mcsConfPage.getByTestId('confDiv');
    expect(mcsConfForm).toBeInTheDocument();
  });
});
