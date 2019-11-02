import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import MainPage from '../src/Components/MainPage';

describe('MainPage', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(<MainPage />);

    expect(baseElement).toBeTruthy();
  });
});
