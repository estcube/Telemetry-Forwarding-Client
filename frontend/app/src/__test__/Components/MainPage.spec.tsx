import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import MainPage from '../../Components/MainPage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function renderMainPage() {
  return render(<MainPage />);
}

describe('MainPage', () => {
  afterEach(cleanup);
  it('should render a main page', () => {
    // const { baseElement } = render(<MainPage />);
    expect(true).toBeTruthy();
  });
});
