import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import MainPage from '../Components/MainPage';

describe('MainPage', () => {
  afterEach(cleanup);

  it('should render a main page', () => {
    const { baseElement } = render(<MainPage />);

    expect(baseElement).toBeTruthy();
  });
});
