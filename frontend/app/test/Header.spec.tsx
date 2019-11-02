import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import Header from '../src/Components/Header';

describe('Header', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(baseElement).toBeTruthy();
  });
});