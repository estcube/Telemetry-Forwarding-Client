import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import Configuration from '../../Configuration/Configuration';

function renderConfPage() {
  return render(<Configuration />);
}

describe('Find conf form class', () => {
  afterEach(cleanup);
  it('should find conf-form class', async () => {
    const mcsConfPage = renderConfPage();
    const confFormInDocument = await mcsConfPage.findByTestId('conf-form');
    expect(confFormInDocument).toBeInTheDocument();
  });
});
