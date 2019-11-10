import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import ConfigurationForm from '../../Configuration/ConfigurationForm';

function renderConfForm(mcsFormName: string, tncFormName: string, formsHeader: string) {
  return render(<ConfigurationForm mcsFormName={mcsFormName} tncFormName={tncFormName} formsHeader={formsHeader} />);
}

describe('Find conf form props', () => {
  afterEach(cleanup);
  it('should find conf form props', async () => {
    const props = {
      mcsFormName: 'Mission Control',
      tncFormName: 'TNC Interface',
      formsHeader: 'Configuration'
    };
    const mcsConfForm = renderConfForm(props.mcsFormName, props.tncFormName, props.formsHeader);
    const prop1 = await mcsConfForm.findByText(props.mcsFormName);
    expect(prop1).toBeInTheDocument();
    const prop2 = await mcsConfForm.findByText(props.tncFormName);
    expect(prop2).toBeInTheDocument();
    const prop3 = await mcsConfForm.findByText(props.formsHeader);
    expect(prop3).toBeInTheDocument();
  });
});
