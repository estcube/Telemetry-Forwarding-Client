import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import Configuration from '../../Configuration/Configuration';

function sampleFunc() {
  return true;
}

function renderConfPage() {
  const props = { A: { B: 'C' } };
  return render(<Configuration confValues={props} handleConfPost={sampleFunc} dataPosted confPostLoading={false} />);
}

describe('Find conf form class', () => {
  afterEach(cleanup);
  it('should find conf-form class', async () => {
    const mcsConfPage = renderConfPage();
    const confFormInDocument = await mcsConfPage.findByTestId('conf-form');
    expect(confFormInDocument).toBeInTheDocument();
  });
});
