import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import ConfigurationFormMCS from '../../Configuration/ConfigurationFormMCS';

function renderConfFormMCS() {
  return render(<ConfigurationFormMCS confFormName="Conf Form" />);
}

describe('ConfigurationPage MSC', () => {
  afterEach(cleanup);
  it('should display msc conf form', async () => {
    const mcsConfPage = renderConfFormMCS();
    const mcsConfForm = await mcsConfPage.getByTestId('mcsConfForm');
    expect(mcsConfForm).toBeInTheDocument();
  });
});
