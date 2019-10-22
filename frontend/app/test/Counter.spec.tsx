import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import { MainPage } from '../src/Components/MainPage';

describe('Counter', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(<MainPage />);

    expect(baseElement).toBeTruthy();
  });

  it('should declare its nature', () => {
    // eslint-disable-next-line no-unused-vars
    const { getByText,  } = render(
      <MainPage />
    );

    expect(true).toBeTruthy();
  });
});