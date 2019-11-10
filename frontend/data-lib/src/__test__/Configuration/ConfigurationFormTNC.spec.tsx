import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import ConfigurationFormTNC from '../../Configuration/ConfigurationFormTNC';

function renderConfFormTNC() {
  return render(<ConfigurationFormTNC confFormName="Conf Form" />);
}

describe('ConfigurationPage MSC', () => {
  afterEach(cleanup);
  it('should display msc conf form', async () => {
    const mcsConfPage = renderConfFormTNC();
    const mcsConfForm = await mcsConfPage.getByTestId('tncConfForm');
    expect(mcsConfForm).toBeInTheDocument();
  });
});
