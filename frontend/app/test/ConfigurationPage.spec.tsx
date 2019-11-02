import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import { ConfigurationPage } from '../src/Components/ConfigurationPage';

describe('ConfigurationPage', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(<ConfigurationPage />);

    expect(baseElement).toBeTruthy();
  });
});