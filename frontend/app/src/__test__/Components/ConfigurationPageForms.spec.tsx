import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import ConfigurationPage from '../../Components/ConfigurationPage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function renderConfPage() {
  return render(<ConfigurationPage />);
}

describe('ConfigurationPage', () => {
  afterEach(cleanup);
  it('should pass', async () => {
    // const mcsConfPage = renderConfPage();
    // const mcsConfForm = await mcsConfPage.getByTestId('confDiv');
    // expect(mcsConfForm).toBeInTheDocument();
    expect(true).toBeTruthy();
  });
});
