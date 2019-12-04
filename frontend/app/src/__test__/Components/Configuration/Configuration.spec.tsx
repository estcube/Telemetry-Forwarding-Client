import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ConfigurationForms from '../../../Components/Configuration/ConfigurationForms';

function sampleFunc() {
  return true;
}

function renderConfPage() {
  const props = { A: { B: 'C' } };
  return render(
    <BrowserRouter>
      <ConfigurationForms
        confValues={props}
        handleConfPost={sampleFunc}
        dataPosted
        confPostLoading={false}
        errorMessage={null}
      />
    </BrowserRouter>
  );
}

describe('Find conf form class', () => {
  afterEach(cleanup);
  it('should find conf-form class', async () => {
    const mcsConfPage = renderConfPage();
    const confFormInDocument = await mcsConfPage.findByTestId('conf-form');
    expect(confFormInDocument).toBeInTheDocument();
  });
});
